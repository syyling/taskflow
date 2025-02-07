import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, GitBranch, Link, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetailPage() {
  const project = {
    title: "프로젝트명",
    status: "진행중",
    description: "프로젝트 설명이 들어갑니다.",
    progress: 65,
    startDate: "2024.02",
    endDate: "2024.06",
    team: [
      { name: "김개발", role: "프론트엔드" },
      { name: "이백엔드", role: "백엔드" },
    ],
    features: ["기능 1", "기능 2", "기능 3"],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind"],
      backend: ["Node.js", "Express", "PostgreSQL"],
    },
    milestones: [
      { title: "기획", date: "2024-02", done: true },
      { title: "MVP 개발", date: "2024-04", done: false },
      { title: "베타 출시", date: "2024-06", done: false },
    ],
  };

  const nav = useNavigate();
  const onClickButton = () => {
    nav("/kanban");
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col pl-2 pr-2">
      <header className="flex items-center h-16 w-full border-b text-2xl ">
        <div>TaskFlow</div>
      </header>

      <main className="flex-1 w-full">
        <div className="container h-full pt-3 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-left">{project.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{project.status}</Badge>
                <span className="text-sm text-muted-foreground">
                  {project.startDate} - {project.endDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer">
                <Link className="w-4 h-4 mr-2" />
                Github
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                <FileText className="w-4 h-4 mr-2" />
                문서
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer"
                onClick={onClickButton}
              >
                <FileText className="w-4 h-4 mr-2" />
                칸반보드
              </Badge>
            </div>
          </div>

          <Card className="w-[440px]">
            <CardContent className="pt-3 w-96">
              <div className="space-y-2 w-96">
                <div className="flex justify-between items-center">
                  <span>진행률</span>
                  <span className="text-sm">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-[440px] grid-cols-4">
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="team">팀</TabsTrigger>
              <TabsTrigger value="tech">기술</TabsTrigger>
              <TabsTrigger value="timeline">타임라인</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">프로젝트 설명</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">주요 기능</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {project.team.map((member, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tech">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">프론트엔드</h3>
                      <div className="flex gap-2">
                        {project.stack.frontend.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">백엔드</h3>
                      <div className="flex gap-2">
                        {project.stack.backend.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {project.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {milestone.date}
                          </p>
                        </div>
                        <Badge
                          variant={
                            milestone.done
                              ? "destructive"
                              : ("secondary" as "destructive" | "secondary")
                          }
                        >
                          {milestone.done ? "완료" : "예정"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t w-full"></footer>
    </div>
  );
}
