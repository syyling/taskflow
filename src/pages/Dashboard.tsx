import ProjectCard from "@/components/dashBoard/ProjectCard.tsx";
import SearchBar from "@/components/dashBoard/SearchBar.tsx";
import { useEffect, useState } from "react";
import { ProjectDialog } from "@/components/dashBoard/ProjectDialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Button } from "@/components/ui/button.tsx";
import { getProjects } from "@/fecthers/supabaseApi.tsx";
import useDashBoardStore from "../store/useDashBoardStore.tsx";
import { useQuery } from "@tanstack/react-query";
import LoginModal from "@/components/modal/LoginModal.tsx";
import SignupModal from "@/components/modal/SignupModal.tsx";
import UserMenu from "@/components/layout/UserMenu.tsx";
import { useAuth } from "@/contexts/AuthContext.tsx";

export interface User {
  id: number;
  img: string;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  progress: string;
  isVisible: boolean;
  users: { user: User }[];
}

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
    queryKey: ["projects", checked],
    queryFn: () => getProjects({ onlyVisible: !checked }),
    enabled: !!user,
  });

  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  return (
    <div className="w-full min-h-screen bg-background p-3 lg:p-8">
      {/* Glass-morphism Header */}
      <div className="rounded-xl bg-background/60 backdrop-blur-lg border shadow-md p-3 mb-8">
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            {user && (
              <div className="w-full md:w-auto md:min-w-[320px]">
                <SearchBar />
              </div>
            )}
          </div>

          {user && (
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                <Switch
                  id="mode"
                  checked={checked}
                  onCheckedChange={setChecked}
                  className="relative inline-flex h-6 w-12 items-center rounded-full border bg-gray-300 transition-colors
             data-[state=checked]:bg-primary"
                >
                  <span
                    className="inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform
               data-[state=checked]:translate-x-6 translate-x-1"
                  />
                </Switch>
                <Label
                  htmlFor="mode"
                  className="text-sm font-medium cursor-pointer"
                >
                  숨긴 프로젝트 보기
                </Label>
              </div>

              <ProjectDialog />
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid with Masonry-like Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
        {projects?.map((project, index) => (
          <div
            key={index}
            className="transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <ProjectCard project={project} handleHidden={refetch} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {user && (!projects || projects.length === 0) && (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
          <p className="text-xl font-medium text-muted-foreground mb-2">
            프로젝트가 없습니다
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            새로운 프로젝트를 추가해보세요
          </p>
        </div>
      )}
      {!user && (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
          <p className="text-xl font-medium text-muted-foreground mb-2">
            프로젝트가 기다리고 있어요!
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            로그인하고 나만의 프로젝트를 관리해보세요
          </p>
        </div>
      )}
    </div>
  );
}
