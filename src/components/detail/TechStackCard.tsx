import { Card, CardContent } from "@/components/ui/card.tsx";
import { Plus, Users, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TechStackCard = ({ project }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="w-full">
        <Card className="w-full">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-6">기술 스택</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-muted-foreground mb-3">
                  프론트엔드
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.frontend.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="py-1 px-3"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-muted-foreground mb-3">
                  백엔드
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.backend.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="py-1 px-3"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] [&>button]:hidden">
        <SheetHeader>
          <SheetTitle>기술 스택 수정</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">프론트엔드</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                추가
              </Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {project.stack.frontend.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input defaultValue={tech} className="w-full" />
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">백엔드</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                추가
              </Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {project.stack.backend.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input defaultValue={tech} className="w-full" />
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TechStackCard;
