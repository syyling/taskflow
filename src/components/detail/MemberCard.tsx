import { Card, CardContent } from "@/components/ui/card.tsx";
import {
  BadgeHelp,
  Briefcase,
  IdCard,
  Shield,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { AuthLevel, Role } from "@/types/enums.tsx";
import { useState } from "react";

const MemberCard = ({ project }) => {
  const [projectTeam, setProjectTeam] = useState(project.team);
  return (
    <Sheet>
      <SheetTrigger asChild className="w-full">
        <Card className="w-full">
          <CardContent className="pt-4">
            <h3 className="text-lg font-semibold mb-3">팀 구성원</h3>
            <div className="divide-y divide-border">
              {project.team.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-2 first:pt-0 last:pb-0"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[400px] [&>button]:hidden">
        <SheetHeader>
          <div className="flex items-center justify-between mb-4">
            <SheetTitle className="text-lg">팀 구성원 수정</SheetTitle>
            <Button size="sm" className="h-7 text-xs font-medium">
              저장
            </Button>
          </div>
        </SheetHeader>
        <div>
          <div className="space-y-4">
            {projectTeam.map((member) => (
              <div key={member.id} className="relative">
                <Card className="p-3 border border-gray-200">
                  <Button
                    variant="ghost"
                    className="absolute right-1.5 top-1.5 h-6 w-6 p-0"
                    aria-label="멤버 삭제"
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="grid gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-secondary p-1.5 rounded-full">
                        <UserCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Label
                          htmlFor={`name-${member.id}`}
                          className="text-sm"
                        >
                          이름
                        </Label>
                        <Input
                          id={`name-${member.id}`}
                          defaultValue={member.name}
                          className="w-full h-8 text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-secondary p-1.5 rounded-full">
                        <IdCard className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Label
                          htmlFor={`role-${member.id}`}
                          className="text-sm"
                        >
                          역할
                        </Label>
                        <Select>
                          <SelectTrigger
                            id={`role-${member.id}`}
                            className="w-full h-8 text-sm"
                          >
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
                        <Shield className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Label
                          htmlFor={`role-${member.id}`}
                          className="text-sm"
                        >
                          권한
                        </Label>
                        <Select>
                          <SelectTrigger
                            id={`name-${member.id}`}
                            className="w-full h-8 text-sm"
                          >
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
              CopyonClick={() =>
                setProjectTeam({
                  ...projectTeam,
                  team: [
                    ...projectTeam.team,
                    {
                      name: "",
                      role: "",
                      authLevel: "",
                    },
                  ],
                })
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
