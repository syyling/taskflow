import { Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card.tsx"
import { Progress } from "../ui/progress.tsx";
import OverlappingAvatars from "@/components/home/OverlappingAvatars.tsx";
import { Calendar } from "lucide-react";

interface User {
    id: number;
    img: string;
    name: string;
}

interface Project {
    name: string;
    description: string;
    deadline: Date;
    progress: string;
    users?: User;
}

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {

    function calculateDDay(targetDate: Date): number {
        const currentDate: Date = new Date();

        const timeDifference: number = targetDate.getTime() - currentDate.getTime();
        const dayDifference: number = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return dayDifference;
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col text-left justify-start gap-1">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.progress + " 마감일 D-" +  calculateDDay(new Date(project.deadline))}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col content-start text-left gap-1">
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
            <CardContent className="flex flex-row content-start text-left gap-1">
                <OverlappingAvatars users={project.users} />
            </CardContent>
          <CardFooter className="flex">
              <div className="flex flex-row items-center w-[120px]">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <CardDescription className="pl-0.5">{project.deadline.toString()}</CardDescription>
              </div>
              <Progress></Progress>
          </CardFooter>
        </Card>
    );
}