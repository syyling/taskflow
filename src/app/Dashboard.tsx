import ProjectCard from "../components/home/ProjectCard.tsx";
import SearchBar from "../components/home/SearchBar.tsx"
import {useEffect, useState} from "react";
import {supabase} from "@/supabase.ts";
import {ProjectDialog} from "@/components/home/ProjectDialog.tsx";


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

    useEffect(()=> {
        queryData();
    }, []);

    const queryData = async () => {
        const { data: projects, error } = await supabase
            .from('project')
            .select(`id, name, description, deadline, progress, users:project_in_user(user(id, name, img))`);
        setProjects(projects);
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
                <ProjectDialog />
            </div>

          <div className="grid h-full gap-4 pt-3">
              {projects.map((project : Project, index : number) => (
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