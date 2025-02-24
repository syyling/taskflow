import { Card, CardContent } from '@/components/ui/card.tsx';
import { BadgeHelp, Briefcase, IdCard, Shield, UserCircle, Users, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@radix-ui/react-label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { AuthLevel, Role } from '@/types/enums.tsx';
import { useEffect, useState } from 'react';
import SaveAlertDialog from '@/components/dialog/SaveAlertDialog.tsx';

const MemberCard = ({ users }) => {
  const [projectTeam, setProjectTeam] = useState([]);

  useEffect(() => {
    setProjectTeam(users);
  }, [users]);

  const getRoleLabel = (role: keyof typeof Role) => Role[role];
  const getAuthLevelLabel = (authLevel: keyof typeof AuthLevel) => AuthLevel[authLevel];

  const handleDeleteButton = (index) => {
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

  const handleSave = () => {
    //Todo: 저장로직 추가
    setSheetOpen(false);
  };

  const handleDiscard = () => {
    setShowAlert(false);
    setSheetOpen(false);
    setProjectTeam(users);
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={handleSheetClose}>
      <SaveAlertDialog open={showAlert} onOpenChange={setShowAlert} onDiscard={handleDiscard} />
      <SheetTrigger asChild className="w-full">
        <Card className="w-full transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardContent className="pt-4">
            <h3 className="text-lg font-semibold mb-3">팀 구성원</h3>
            <div className="divide-y divide-gray-300">
              {users?.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-3 first:pt-0 last:pb-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-base text-gray-800 text-left">{user?.name}</p>
                    <p className="text-xs text-gray-500 text-left">{getRoleLabel(user?.role)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[400px] [&>button]:hidden overflow-auto">
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
              <div key={member.id} className="relative">
                <Card className="p-3 border border-gray-200">
                  <Button
                    variant="ghost"
                    className="absolute right-1.5 top-1.5 h-6 w-6 p-0"
                    aria-label="멤버 삭제"
                    onClick={() => handleDeleteButton(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="grid gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-secondary p-1.5 rounded-full">
                        <UserCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Label htmlFor={`name-${member.id}`} className="text-sm">
                          이름
                        </Label>
                        <Input id={`name-${member.id}`} defaultValue={member.name} className="w-full h-8 text-sm" />
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
                        <Select value={getRoleLabel(member?.role)}>
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
                        <Select value={getAuthLevelLabel(member?.authLevel)}>
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
            <Button
              className="w-full h-8 text-sm"
              variant="secondary"
              size="sm"
              onClick={() =>
                setProjectTeam((prevTeam) => [
                  ...prevTeam,
                  {
                    name: '',
                    role: '',
                    authLevel: '',
                  },
                ])
              }
            >
              팀원 추가
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MemberCard;
