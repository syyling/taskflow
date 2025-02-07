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
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

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
        <Button className="h-[30px]">+ 새프로젝트 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로젝트 추가</DialogTitle>
          {/*<DialogDescription>*/}
          {/*    Make changes to your profile here. Click save when you're done.*/}
          {/*</DialogDescription>*/}
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              제목
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={projectData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("name", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              설명
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={projectData.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("description", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">
              마감일
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-0 h-3 w-3" />
                  {projectData.deadline ? (
                    format(projectData.deadline, "yyyy-MM-dd")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={projectData.deadline}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="user" className="text-right">
              참여자
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[280px] justify-between"
                >
                  {projectData.selectedUsers.length > 0
                    ? projectData.selectedUsers
                        .map(
                          (value) =>
                            users.find((user) => user.value === value)?.label,
                        )
                        .join(", ")
                    : "Select users..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0">
                <Command>
                  <CommandInput placeholder="Search user..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>사용자가 없습니다.</CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.value}
                          value={user.label}
                          onSelect={() => {
                            handleUserSelect(user.value);
                            setOpen(false); // Close popover after selecting
                          }}
                        >
                          {user.label}
                          <Check
                            className={cn(
                              "ml-auto",
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="progress" className="text-right">
              진행 상황
            </Label>
            <Select
              onValueChange={(value) => handleInputChange("progress", value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {progressOptions.map((progressOption) => (
                  <SelectItem
                    key={progressOption.id}
                    value={progressOption.label}
                  >
                    {progressOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
