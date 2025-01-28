import ProjectCard from "../components/home/ProjectCard.tsx";
import SearchBar from "../components/home/SearchBar.tsx"
import { Button } from "@/components/ui/button.tsx";

export default function Layout() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col pl-2 pr-2">
      {/* Header */}
      <header className="flex items-center h-16 w-full border-b text-2xl ">
        <div>TaskFlow</div>
      </header>

      {/*p-6 Main Content */}
      <main className="flex-1 w-full">
        <div className="container h-full pt-3">
            <div className="flex justify-between w-full">
                <SearchBar />
                <Button>+ 새프로젝트 추가</Button>
            </div>

          <div className="grid h-full gap-4 pt-3">

            {/* Content Area */}
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </main>

      {/* Footer */}
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