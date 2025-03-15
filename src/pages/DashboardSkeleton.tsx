import Skeleton from 'react-loading-skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import Spinner from '@/components/Spinner.tsx';

const DashboardSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-background px-3">
      {/* 헤더 Skeleton */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg shadow-lg p-4 mb-8 rounded-xl">
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0">
            <Skeleton className="h-8 w-36 rounded-lg" />
            <Skeleton className="h-10 w-full md:w-[320px] rounded-lg" />
          </div>
          <div className="flex flex-row space-x-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-lg" />
          </div>
        </div>
      </div>

      {/* 프로젝트 카드 리스트 Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="w-full animate-pulse">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 rounded-lg" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2 rounded-lg" />
              <Skeleton className="h-4 w-5/6 mb-2 rounded-lg" />
              <Skeleton className="h-4 w-4/6 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
