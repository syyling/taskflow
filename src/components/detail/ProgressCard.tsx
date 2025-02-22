import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

const ProgressCard = ({ startDate, endDate }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeDifference: number = endDate.getTime() - startDate.getTime();
    const dayDifference: number = Math.ceil(timeDifference / (1000 * 3600 * 24));
    setProgress(dayDifference);
  }, [startDate, endDate]);

  const getProgressClass = (value) => {
    return `h-3 rounded-lg ${
      value < 30
        ? '[&>div]:bg-red-500'
        : value < 70
          ? '[&>div]:bg-yellow-500'
          : '[&>div]:bg-green-500'
    }`;
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-left">전체 진행률</span>
              <p className="text-sm text-muted-foreground mt-1 text-left">
                {progress < 30 ? '초기 단계' : progress < 70 ? '진행 중' : '마무리 단계'}
              </p>
            </div>
            <span className="text-2xl font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className={getProgressClass(progress)} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
