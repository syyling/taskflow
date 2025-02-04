import ProjectCard from "../components/home/ProjectCard.tsx";
import SearchBar from "../components/home/SearchBar.tsx";
import { useEffect, useState } from "react";
import { ProjectDialog } from "@/components/home/ProjectDialog.tsx";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getAllProjects, getVisibleProjects } from "../services/supabaseApi.js";
import useDashBoardStore from "../store/useDashBoardStore.js";

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
  users: { user: User }[];
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const checked = useDashBoardStore((state) => state.checked);
  const setChecked = useDashBoardStore((state) => state.setChecked);

  useEffect(() => {
    if (checked) {
      setAllProjects();
    } else {
      setVisibleProjects();
    }
  }, [checked]);

  const setVisibleProjects = async () => {
    try {
      const projects = await getVisibleProjects();
      setProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  const setAllProjects = async () => {
    try {
      const projects = await getAllProjects();
      setProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col pl-2 pr-2">
      <header className="flex items-center h-16 w-full border-b text-2xl ">
        <div>TaskFlow</div>
      </header>

      <main className="flex-1 w-full">
        <div className="container h-full pt-3">
          <div className="flex justify-between w-full">
            <SearchBar />
            <div className="flex flex-row">
              <div className="flex items-center space-x-2 pr-4">
                <Switch
                  id="mode"
                  checked={checked}
                  onCheckedChange={setChecked}
                />
                <Label htmlFor="mode">숨긴 프로젝트도 함께 보기</Label>
              </div>
              <ProjectDialog />
            </div>
          </div>

          <div className="grid h-full gap-4 pt-3">
            {projects.map((project: Project, index: number) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t w-full">
        <div className="container mx-auto flex h-14 items-center px-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
