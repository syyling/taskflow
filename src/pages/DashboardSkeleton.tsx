import Skeleton from 'react-loading-skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';

const DashboardSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Glass-morphism Header */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg shadow-lg p-4 mb-8 rounded-xl">
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0">
            <Skeleton className="h-9 w-36 bg-gray-200 dark:bg-gray-600 animate-pulse rounded-md"/> {/* TaskFlow 로고 */}
            <div className="w-full md:w-auto md:min-w-[320px]">
              <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-1">
                <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-600 animate-pulse rounded-md"/> {/* 검색바 */}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            {/* 토글 스위치 */}
            <div className="flex items-center gap-2 h-10 px-3">
              <Skeleton className="h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse"/> {/* 스위치 */}
              <Skeleton className="h-5 w-28 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"/> {/* 스위치 텍스트 */}
            </div>

            {/* 새 프로젝트 버튼 */}
            <Skeleton className="h-10 w-32 rounded-md bg-gray-200 dark:bg-gray-600 animate-pulse"/> {/* 프로젝트 버튼 */}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 px-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
        {Array(4).fill().map((_, index) => (
          <Card key={index} className="w-full hover:shadow-md transition-all duration-200 border border-gray-200">
            <CardHeader className="flex flex-col text-left justify-start gap-2 pb-3">
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-6 w-32"/> {/* 프로젝트 이름 */}
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-20"/> {/* 진행 상태 */}
                    <Skeleton className="h-4 w-24 rounded-full"/> {/* 마감일 */}
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded-md"/> {/* 더보기 버튼 */}
              </div>
            </CardHeader>

            <CardContent className="flex flex-col content-start text-left gap-2 pb-3">
              <Skeleton className="h-4 w-full"/> {/* 설명 첫 줄 */}
              <Skeleton className="h-4 w-4/5"/> {/* 설명 두번째 줄 */}
            </CardContent>

            <CardContent className="flex flex-row content-start text-left gap-1 pb-3">
            <div className="flex -space-x-2">
                {Array(3).fill().map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full border-2 border-white"/> /* 사용자 아바타 */
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4"/> {/* 캘린더 아이콘 */}
                  <Skeleton className="h-4 w-24"/> {/* 날짜 */}
                </div>
                <Skeleton className="h-4 w-10"/> {/* 퍼센트 */}
              </div>
              <Skeleton className="h-2 w-full rounded"/> {/* 프로그레스 바 */}
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default DashboardSkeleton;
