import ProjectCard from '@/features/project/components/ProjectCard.tsx';
import SearchBar from '@/components/dashBoard/SearchBar.tsx';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch.tsx';
import { fetchProjects } from '@/features/project/fetchers/project.tsx';
import useDashBoardStore from '../store/useDashBoardStore.tsx';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { Project } from '@/features/project/types/project.model.tsx';
import { mapProjectDTOsToProjects } from '@/features/project/project.mapper.ts';
import { ProjectDialog } from '@/features/project/components/ProjectDialog.tsx';
import DashboardSkeleton from '@/pages/DashboardSkeleton.tsx';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[] | undefined>([]);
  const checked = useDashBoardStore((state) => state.checked);
  const setChecked = useDashBoardStore((state) => state.setChecked);
  const { user } = useAuth();

  const {
    data: projectsData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['projects', checked, user?.id],
    queryFn: () => fetchProjects(!checked, user?.id),
    enabled: !!user,
  });

  useEffect(() => {
    setProjects(mapProjectDTOsToProjects(projectsData));
  }, [projectsData]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="w-full min-h-screen bg-background px-8">
      {/* Glass-morphism Header */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg shadow-lg p-4 mb-8 rounded-xl">
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            {user && (
              <div className="w-full md:w-auto md:min-w-[320px]">
                <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg">
                  <SearchBar />
                </div>
              </div>
            )}
          </div>

          {user && (
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              {/* 토글 스위치 */}
              <div className="flex items-center gap-2 h-10 px-3">
                <Switch
                  checked={checked}
                  onCheckedChange={setChecked}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 data-[state=checked]:bg-primary"
                >
                  <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 translate-x-0.5" />
                </Switch>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">숨긴 프로젝트 보기</span>
              </div>

              {/* 새 프로젝트 버튼 */}
              <ProjectDialog />
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid with Masonry-like Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
        {projects?.map((project, index) => (
          <div key={index} className="transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {user && (!projects || projects.length === 0) && (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
          <p className="text-xl font-medium text-muted-foreground mb-2">프로젝트가 없습니다</p>
          <p className="text-sm text-muted-foreground mb-6">새로운 프로젝트를 추가해보세요</p>
        </div>
      )}
      {!user && (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
          <p className="text-xl font-medium text-muted-foreground mb-2">프로젝트가 기다리고 있어요!</p>
          <p className="text-sm text-muted-foreground mb-6">로그인하고 나만의 프로젝트를 관리해보세요</p>
        </div>
      )}
    </div>
  );
}
