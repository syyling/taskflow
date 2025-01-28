import { Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card.tsx"
import { Progress } from "../ui/progress.tsx";
import OverlappingAvatars from "@/components/home/OverlappingAvatars.tsx";
import { Calendar } from "lucide-react";

export default function ProjectCard() {
  return (
    <Card className="w-full">
        <CardHeader className="flex flex-col text-left justify-start gap-1">
            <CardTitle>프로젝트 1</CardTitle>
            <CardDescription>진행중 마감일 D-7</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col content-start text-left gap-1">
          <CardDescription>프로젝트 설명이 여기에 들어갑니다</CardDescription>
        </CardContent>
        <CardContent className="flex flex-row content-start text-left gap-1">
            <OverlappingAvatars />
        </CardContent>
      <CardFooter className="flex">
          <div className="flex flex-row items-center w-[100px]">
              <Calendar className="w-4 h-4 text-gray-500" />
              <CardDescription className="pl-0.5">12월 31일</CardDescription>
          </div>
          <Progress></Progress>
      </CardFooter>
    </Card>
  );
}