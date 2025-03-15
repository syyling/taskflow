import { Card, CardContent } from '@/components/ui/card.tsx';
import { Check, ChevronsUpDown, IdCard, Shield, UserCircle, Users, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@radix-ui/react-label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { AuthLevel, Role } from '@/types/enums.tsx';
import { useEffect, useState } from 'react';
import SaveAlertDialog from '@/components/dialog/SaveAlertDialog.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { supabase } from '@/supabase.ts';
import { cn } from '@/lib/utils.ts';
import { fetchProjects, getProjectMembers, upsertProjectInUsers } from '@/features/project/fetchers/project.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import { useQuery } from '@tanstack/react-query';

const MemberCard = ({ projectId }) => {
  const { toast } = useToast();

  const [projectTeam, setProjectTeam] = useState([]);
  const [usersAll, setUsersAll] = useState([]);
  const [deleteMembers, setDeleteMembers] = useState([]);

  useEffect(() => {
    queryData();
  }, []);

  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProjectMembers(projectId),
    enabled: !!projectId,
  });

  useEffect(() => {
    setProjectTeam(users);
  }, [users]);

  const queryData = async () => {
    const { data: users, error } = await supabase.from('user').select('id, name');

    if (users) {
      const formattedUsers = users.map((user) => ({
        value: user.id,
        label: user.name,
      }));
      setUsersAll(formattedUsers);
    }
  };

  const getRoleLabel = (role: string | undefined) => Role[role];
  const getAuthLevelLabel = (authLevel: string | undefined) => AuthLevel[authLevel];

  const handleDeleteButton = (index: number, member) => {
    setDeleteMembers((prev) => [...prev, member.id]);
    const newTeam = [...projectTeam];
    newTeam.splice(index, 1);
    setProjectTeam(newTeam);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSheetClose = (open) => {
    if (!open) {
      setShowAlert(true);
      return;
    }
    setSheetOpen(open);
  };

  const handleSave = async () => {
    try {
      const isValid = projectTeam.every((member) => member.id && member.authLevel && member.role);

      if (!isValid) {
        toast({
          variant: 'destructive',
          title: '저장 실패',
          description: `필수값을 모두 입력해주세요!`,
        });
        return;
      }
      await upsertProjectInUsers(projectTeam, deleteMembers, projectId);
      refetch();
      toast({
        variant: 'success',
        title: '저장 성공',
        description: `저장에 성공했습니다!`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '저장 실패',
        description: '알 수 없는 오류가 발생했습니다.',
      });
    }
  };

  const handleDiscard = () => {
    setShowAlert(false);
    setSheetOpen(false);
    setProjectTeam(users);
  };

  const handleAddMember = () => {
    setProjectTeam((prevTeam) => [
      ...prevTeam,
      {
        user_id: '',
        role: '',
        authLevel: '',
      },
    ]);
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    console.log(value);
    setProjectTeam((prevTeam) => {
      const updatedTeam = [...prevTeam];
      updatedTeam[index] = { ...updatedTeam[index], [field]: value };
      return updatedTeam;
    });
  };

  const [open, setOpen] = useState(false);

  //Todo: shadcn form으로 마이그레이션
  return (
    <Sheet open={sheetOpen} onOpenChange={handleSheetClose} modal={false}>
      <SaveAlertDialog open={showAlert} onOpenChange={setShowAlert} onDiscard={handleDiscard} />
      <SheetTrigger asChild className="w-full">
        <Card className="w-full transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardContent className="pt-4">
            <h3 className="text-lg font-semibold mb-3">팀 구성원</h3>
            <div className="divide-y divide-gray-300">
              {users?.map((user, index) => (
                <div key={index} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-foreground text-left">{user?.name}</p>
                    <p className="text-xs text-foreground text-left">{getRoleLabel(user?.role)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[400px] [&>button]:hidden overflow-auto shadow-[0_0_25px_rgba(0,0,0,0.5)]">
        <SheetHeader>
          <div className="flex items-center justify-between mb-4">
            <SheetTitle className="text-lg">팀 구성원</SheetTitle>
            <div className="flex gap-1">
              <Button
                size="sm"
                className="h-7 text-xs font-medium bg-muted text-muted-foreground"
                onClick={() => setSheetOpen(false)}
              >
                취소
              </Button>
              <Button
                size="sm"
                className="h-7 text-xs font-medium bg-primary text-primary-foreground"
                onClick={handleSave}
              >
                저장
              </Button>
            </div>
          </div>
        </SheetHeader>
        <div>
          <div className="space-y-4">
            {projectTeam?.map((member, index) => (
              <div key={member.user_id} className="relative">
                <Card className="p-3 border border-gray-200">
                  <Button
                    variant="ghost"
                    className="absolute right-1.5 top-1.5 h-6 w-6 p-0"
                    aria-label="멤버 삭제"
                    onClick={() => handleDeleteButton(index, member)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="grid gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-secondary p-1.5 rounded-full">
                        <UserCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Label htmlFor={`user-${index}`} className="text-sm">
                          참여자
                        </Label>
                        <Popover modal={false}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full h-8 text-sm justify-between !border !border-input"
                              onClick={() => setOpen(!open)}
                            >
                              {member.user_id
                                ? usersAll.find((user) => user.value === member.user_id)?.label || '참여자를 선택하세요'
                                : '참여자를 선택하세요'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="참여자 검색..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>검색 결과가 없습니다</CommandEmpty>
                                <CommandGroup>
                                  {usersAll.map((user) => (
                                    <CommandItem
                                      key={user.value}
                                      value={user.value}
                                      onSelect={() => {
                                        handleFieldChange(index, 'user_id', user.value);
                                        setOpen(false);
                                      }}
                                      className={cn(
                                        'flex items-center justify-between',
                                        member.user_id === user.value ? '!bg-accent !text-accent-foreground' : '',
                                        member.user_id !== user.value
                                          ? 'data-[selected=true]:!bg-transparent data-[selected=true]:!text-foreground'
                                          : ''
                                      )}
                                    >
                                      {user.label}
                                      <Check
                                        className={cn(
                                          'h-4 w-4',
                                          member.user_id === user.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-secondary p-1.5 rounded-full">
                        <IdCard className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Label htmlFor={`role-${member.id}`} className="text-sm">
                          역할
                        </Label>
                        <Select
                          value={getRoleLabel(member?.role)}
                          onValueChange={(displayValue) => {
                            const keyValue = Object.keys(Role).find((key) => Role[key] === displayValue);
                            handleFieldChange(index, 'role', keyValue);
                          }}
                        >
                          <SelectTrigger id={`role-${member.id}`} className="w-full h-8 text-sm !border !border-input">
                            <SelectValue placeholder="역할을 선택하세요" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(Role).map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-secondary p-1.5 rounded-full">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Label htmlFor={`role-${member.id}`} className="text-sm">
                          권한
                        </Label>
                        <Select
                          value={getAuthLevelLabel(member?.authLevel)}
                          onValueChange={(displayValue) => {
                            const keyValue = Object.keys(AuthLevel).find((key) => AuthLevel[key] === displayValue);
                            handleFieldChange(index, 'authLevel', keyValue);
                          }}
                        >
                          <SelectTrigger id={`name-${member.id}`} className="w-full h-8 text-sm">
                            <SelectValue placeholder="권한을 선택하세요" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(AuthLevel).map((authLevel) => (
                              <SelectItem key={authLevel} value={authLevel}>
                                {authLevel}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button className="w-full h-8 text-sm" variant="secondary" size="sm" onClick={handleAddMember}>
              팀원 추가
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MemberCard;
