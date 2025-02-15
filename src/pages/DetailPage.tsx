import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  FileText,
  GitBranch,
  Link,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "@/components/detail/ProgressCard.tsx";
import ProgressCard from "@/components/detail/ProgressCard.tsx";
import { motion } from "framer-motion";
import MemberCard from "@/components/detail/MemberCard.tsx";
import TechStackCard from "@/components/detail/TechStackCard.tsx";

export default function DetailPage() {
  const project = {
    title: "프로젝트명",
    status: "진행중",
    description: "프로젝트 설명이 들어갑니다.",
    progress: 65,
    startDate: "2024.02",
    endDate: "2024.06",
    team: [
      { name: "김서영", role: "FRONTEND", authLevel: "ADMIN" },
      { name: "박솔", role: "BACKEND", authLevel: "VIEWER" },
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background flex flex-col px-4 justify-items-center"
    >
      <div className="min-h-screen w-full bg-background flex flex-col px-4 justify-items-center">
        <main className="flex-1 w-full justify-items-center">
          <div className="container h-full py-6 space-y-8 items-center">
            {/* 프로젝트 헤더 */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{project.title}</h1>
                  <Badge variant="secondary" className="capitalize">
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary transition-colors py-2 px-4"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Github
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary transition-colors py-2 px-4"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  문서
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary transition-colors py-2 px-4"
                  onClick={onClickButton}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  칸반보드
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </Badge>
              </div>
            </div>
            {/* Progress Card - Full Width */}
            <ProgressCard project={project} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <Card>
                <CardContent className="pt-6 space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">프로젝트 설명</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">주요 기능</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Right Column */}
              <div className="space-y-6">
                <MemberCard project={project} />
                <TechStackCard project={project} />
              </div>
            </div>

            {/* Timeline */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6">
                  프로젝트 타임라인
                </h3>
                <div className="space-y-1">
                  {project.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 border-l-2 border-muted pl-4 relative"
                    >
                      <div className="absolute -left-[5px] top-5 w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-medium">{milestone.title}</p>
                          <Badge
                            variant={milestone.done ? "default" : "secondary"}
                            className="flex-shrink-0"
                          >
                            {milestone.done ? "완료" : "예정"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {milestone.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
