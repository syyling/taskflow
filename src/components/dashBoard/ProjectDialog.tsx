import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  PlusCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ChangeEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { supabase } from "@/supabase.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import useDashBoardStore from "@/store/useDashBoardStore.tsx";

interface UserOption {
  value: number;
  label: string;
}

interface ProjectForm {
  name: string;
  description: string;
  deadline: Date | null;
  selectedUsers: number[];
  progress: string;
}

const progressOptions = [
  {
    id: "1",
    label: "진행중",
  },
  {
    id: "2",
    label: "완료",
  },
  {
    id: "3",
    label: "중단",
  },
  {
    id: "4",
    label: "시작 전",
  },
] as const;

export function ProjectDialog() {
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [projectData, setProjectData] = useState<ProjectForm>({
    name: "",
    description: "",
    deadline: null,
    selectedUsers: [],
    progress: "",
  });

  const checked = useDashBoardStore((state) => state.checked);

  useEffect(() => {
    queryData();
  }, []);

  const queryData = async () => {
    const { data: users, error } = await supabase
      .from("user")
      .select("id, name");

    if (users) {
      const formattedUsers = users.map((user) => ({
        value: user.id,
        label: user.name,
      }));
      setUsers(formattedUsers);
    }
  };

  const handleSave = async () => {
    const { data, error } = await supabase
      .from("project")
      .insert([
        {
          name: projectData.name,
          description: projectData.description,
          deadline: projectData.deadline,
          progress: projectData.progress,
        },
      ])
      .select();

    if (data) {
      const projectId = data[0].id;
      projectData.selectedUsers.map(async (selectedUser) => {
        const { data: projectinusers, error } = await supabase
          .from("project_in_user")
          .insert([{ project_id: projectId, user_id: selectedUser }])
          .select();
      });
    }

    queryClient.invalidateQueries({ queryKey: ["projects", checked] });
  };

  const handleUserSelect = (userValue: number) => {
    setProjectData((prev) => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(userValue)
        ? prev.selectedUsers.filter((id) => id !== userValue)
        : [...prev.selectedUsers, userValue],
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (selectedDate: Date) => {
    setProjectData((prev) => ({
      ...prev,
      deadline: selectedDate,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          새프로젝트 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            프로젝트 추가
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">제목</Label>
            <Input
              id="name"
              placeholder="프로젝트 제목을 입력하세요"
              className="w-full"
              value={projectData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">설명</Label>
            <Input
              id="description"
              placeholder="프로젝트 설명을 입력하세요"
              className="w-full"
              value={projectData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="deadline">마감일</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !projectData.deadline && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {projectData.deadline ? (
                    format(projectData.deadline, "yyyy-MM-dd")
                  ) : (
                    <span>날짜를 선택하세요</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={projectData.deadline}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="user">참여자</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {projectData.selectedUsers.length > 0
                    ? projectData.selectedUsers
                        .map(
                          (value) =>
                            users.find((user) => user.value === value)?.label,
                        )
                        .join(", ")
                    : "참여자를 선택하세요"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="참여자 검색..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>검색 결과가 없습니다</CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.value}
                          value={user.label}
                          onSelect={() => {
                            handleUserSelect(user.value);
                            setOpen(false);
                          }}
                          className="flex items-center justify-between"
                        >
                          {user.label}
                          <Check
                            className={cn(
                              "h-4 w-4",
                              projectData.selectedUsers.includes(user.value)
                                ? "opacity-100"
                                : "opacity-0",
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

          <div className="flex flex-col space-y-2">
            <Label htmlFor="progress">진행 상황</Label>
            <Select
              onValueChange={(value) => handleInputChange("progress", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="진행 상황을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {progressOptions.map((option) => (
                  <SelectItem key={option.id} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
