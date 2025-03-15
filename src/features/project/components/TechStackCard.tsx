import { Card, CardContent } from '@/components/ui/card.tsx';
import { Plus, Users, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, getTechStacks } from '@/features/project/fetchers/project.tsx';
import { useEffect, useState } from 'react';

const TechStackCard = ({ projectId }) => {
  const [techStack, setTechStack] = useState([]);

  const {
    data: fetchData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['techStacks', projectId],
    queryFn: () => getTechStacks(projectId),
    enabled: !!projectId,
  });

  const groupedTechStack = fetchData
    ? fetchData.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {})
    : {};

  useEffect(() => {
    setTechStack(groupedTechStack);
  }, [fetchData]);

  return (
    <Sheet>
      <SheetTrigger asChild className="w-full">
        <Card className="w-full transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardContent className="pt-4">
            <h3 className="text-lg font-semibold mb-3">기술 스택</h3>
            <div className="space-y-4">
              {Object.entries(techStack).map(([category, techs]) => (
                <div key={category} className="flex items-center gap-4">
                  <h4 className="font-medium text-foreground mb-1 text-left min-w-[100px]">{category}</h4>
                  <div className="flex flex-wrap gap-2 flex-grow">
                    {Array.isArray(techs) &&
                      techs.map((tech) => (
                        <Badge key={tech.id} variant="secondary" className="py-1.5 px-3 text-sm font-medium">
                          {tech.name}
                        </Badge>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] [&>button]:hidden">
        <SheetHeader>
          <div className="flex items-center justify-between mb-4">
            <SheetTitle className="text-lg">기술 스택</SheetTitle>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-1" /> 카테고리 추가
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {Object.entries(techStack).map(([category, techs]) => (
            <div key={category}>
              {/* 카테고리 헤더 */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-foreground">{category.toUpperCase()}</h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* 기술 목록 - 단순한 카드 형태 */}
              <div className="rounded-md border border-border p-4">
                <div className="space-y-2">
                  {/* 각 기술 항목 */}
                  {techs.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={tech} className="flex-1" placeholder={'기술을 입력해주세요'} />
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {/* 기술 추가 버튼 - 중앙 정렬 */}
                  <div className="flex justify-center mt-4 pt-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3 py-1 bg-muted w-full rounded-md text-sm font-medium"
                    >
                      <Plus className="h-4 w-4 mr-2" /> 기술 추가
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TechStackCard;
