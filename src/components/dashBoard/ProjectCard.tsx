import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Progress } from "../ui/progress.tsx";
import OverlappingAvatars from "@/components/dashBoard/OverlappingAvatars.tsx";
import { Calendar, MoreHorizontal } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Project } from "@/pages/Dashboard.tsx";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button.tsx";
import { supabase } from "@/supabase.ts";
import { updateVisible } from "@/fecthers/supabaseApi";
import { useQueryClient } from "@tanstack/react-query";
import useDashBoardStore from "@/store/useDashBoardStore";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard(
  { project }: ProjectCardProps,
  { handleHidden },
) {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const [progress, setProgress] = useState(0);
  const checked = useDashBoardStore((state) => state.checked);

  // Todo: project.startDate 추가 후 로직 수정
  useEffect(() => {
    const currentDate: Date = new Date();

    const timeDifference: number =
      new Date(project.deadline).getTime() - currentDate.getTime();
    const dayDifference: number = Math.ceil(
      timeDifference / (1000 * 3600 * 24),
    );
    const timer = setTimeout(() => setProgress(dayDifference), 500);
    return () => clearTimeout(timer);
  }, []);

  function calculateDDay(targetDate: Date): number {
    const currentDate: Date = new Date();

    const timeDifference: number = targetDate.getTime() - currentDate.getTime();
    const dayDifference: number = Math.ceil(
      timeDifference / (1000 * 3600 * 24),
    );
    return dayDifference;
  }

  async function handleHide(): Promise<void> {
    await updateVisible(project.id, project.isVisible);
    queryClient.invalidateQueries({ queryKey: ["projects", checked] });
    //Todo: 성공 실패 여부 toast로 보여주기
  }

  const onClickCard = () => {
    nav(`/detail/${project.id}`);
  };

  return (
    <Card
      className="w-full hover:shadow-md transition-all duration-200 border border-gray-200"
      onClick={onClickCard}
    >
      <CardHeader className="flex flex-col text-left justify-start gap-2 pb-3">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold">
              {project.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <span>{project.progress}</span>
              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                마감일 D-{calculateDDay(new Date(project.deadline))}
              </span>
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem className="cursor-pointer">
                수정
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleHide();
                }}
                className="cursor-pointer"
              >
                {project.isVisible ? "숨기기" : "꺼내기"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col content-start text-left gap-2 pb-3">
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {project.description}
        </CardDescription>
      </CardContent>

      <CardContent className="flex flex-row content-start text-left gap-1 pb-3">
        <OverlappingAvatars users={project.users} />
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <CardDescription>
              {project.deadline
                ? format(new Date(project.deadline), "yyyy-MM-dd")
                : "날짜 미정"}
            </CardDescription>
          </div>
          <span className="text-sm font-medium text-gray-600">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardFooter>
    </Card>
  );
}
