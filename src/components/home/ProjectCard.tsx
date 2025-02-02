import { Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card.tsx"
import { Progress } from "../ui/progress.tsx";
import OverlappingAvatars from "@/components/home/OverlappingAvatars.tsx";
import { Calendar } from "lucide-react";
import { Ellipsis } from 'lucide-react';
import {Project} from "@/app/Dashboard.tsx";
import { format } from "date-fns";
import {useEffect, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button.tsx";



interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {

    const [progress, setProgress] = useState(0)

    // Todo: project.startDate 추가 후 로직 수정
    useEffect(() => {
        const currentDate: Date = new Date();

        const timeDifference: number = new Date(project.deadline).getTime() - currentDate.getTime();
        const dayDifference: number = Math.ceil(timeDifference / (1000 * 3600 * 24));
        const timer = setTimeout(() => setProgress(dayDifference), 500)
        return () => clearTimeout(timer)
    }, []);

    function calculateDDay(targetDate: Date): number {
        const currentDate: Date = new Date();

        const timeDifference: number = targetDate.getTime() - currentDate.getTime();
        const dayDifference: number = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return dayDifference;
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col text-left justify-start gap-1">
                <div className="flex justify-between w-full">
                    <CardTitle className="w-[auto]">{project.name}</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="w-[16px] h-[16px]">
                            <Button variant="ghost" ><Ellipsis /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>수정</DropdownMenuItem>
                            <DropdownMenuItem>삭제</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
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
                  <CardDescription className="pl-0.5">{project.deadline ? format(project.deadline, "yyyy-MM-dd") : undefined}</CardDescription>
              </div>
              <Progress value={progress}></Progress>
          </CardFooter>
        </Card>
    );
}