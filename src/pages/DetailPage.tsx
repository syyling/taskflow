import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Link, Calendar, ArrowUpRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressCard from '@/features/project/components/ProgressCard.tsx';
import { motion } from 'framer-motion';
import MemberCard from '@/features/project/components/MemberCard.tsx';
import { useQuery } from '@tanstack/react-query';
import { fetchProject } from '@/features/project/fetchers/project.tsx';
import { useEffect, useState } from 'react';
import { Project } from '@/features/project/types/project.model.tsx';
import { mapProjectDTOToProject } from '@/features/project/project.mapper.ts';
import TechStackCard from '@/features/project/components/TechStackCard.tsx';
import DetailPageSkeleton from '@/pages/DetailPageSkeleton.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';

export default function DetailPage() {
  const [project, setProject] = useState<Project>();
  const nav = useNavigate();
  const onClickButton = () => {
    nav('/kanban');
  };

  const { projectId } = useParams();

  const {
    data: projectData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => fetchProject({ projectId: Number(projectId) }),
    enabled: !!projectId,
  });

  useEffect(() => {
    if (projectData) {
      setProject(mapProjectDTOToProject(projectData[0]));
    }
  }, [projectData]);

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (error) {
    return <ErrorPage />;
  }

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
                  <h1 className="text-foreground text-3xl font-bold">{project?.name}</h1>
                  <Badge variant="secondary" className="capitalize">
                    {project?.progress}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-foreground" />
                  <span className="text-sm text-foreground">
                    {project?.startDate?.toISOString().split('T')[0]} - {project?.endDate?.toISOString().split('T')[0]}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary transition-colors py-2 px-4">
                  <Link className="w-4 h-4 mr-2" />
                  Github
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary transition-colors py-2 px-4">
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
            {project && <ProgressCard startDate={project.startDate} endDate={project.endDate} />}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <Card>
                <CardContent className="pt-6 space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">프로젝트 설명</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project?.description}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">주요 기능</h3>
                    {/*<ul className="text-sm text-muted-foreground space-y-2">*/}
                    {/*  {project?.features?.map((feature, index) => (*/}
                    {/*    <li key={index} className="flex items-start gap-2">*/}
                    {/*      <span className="text-primary mt-1">•</span>*/}
                    {/*      <span>{feature}</span>*/}
                    {/*    </li>*/}
                    {/*  ))}*/}
                    {/*</ul>*/}
                  </div>
                </CardContent>
              </Card>

              {/* Right Column */}
              <div className="space-y-6">
                <MemberCard projectId={project?.id} />
                <TechStackCard projectId={project?.id} />
              </div>
            </div>

            {/* Timeline */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6">프로젝트 타임라인</h3>
                <div className="space-y-1">
                  {/*{project?.milestones.map((milestone, index) => (*/}
                  {/*  <div*/}
                  {/*    key={index}*/}
                  {/*    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 border-l-2 border-muted pl-4 relative"*/}
                  {/*  >*/}
                  {/*    <div className="absolute -left-[5px] top-5 w-2 h-2 rounded-full bg-primary" />*/}
                  {/*    <div className="flex-1">*/}
                  {/*      <div className="flex items-center justify-between gap-4">*/}
                  {/*        <p className="font-medium">{milestone.title}</p>*/}
                  {/*        <Badge*/}
                  {/*          variant={milestone?.done ? "default" : "secondary"}*/}
                  {/*          className="flex-shrink-0"*/}
                  {/*        >*/}
                  {/*          {milestone.done ? "완료" : "예정"}*/}
                  {/*        </Badge>*/}
                  {/*      </div>*/}
                  {/*      <p className="text-sm text-muted-foreground mt-1">*/}
                  {/*        {milestone.date}*/}
                  {/*      </p>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*))}*/}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
