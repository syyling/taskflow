import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const DetailPageSkeleton = () => {
  return (
      <div className="min-h-screen w-full bg-background flex flex-col px-4 justify-items-center">
        <main className="flex-1 w-full justify-items-center">
          <div className="container h-full py-6 space-y-8 items-center">
            {/* 프로젝트 헤더 스켈레톤 */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* 프로젝트 이름 스켈레톤 */}
                  <div className="h-9 w-48 bg-muted rounded-md animate-pulse"></div>
                  {/* 진행 상태 배지 스켈레톤 */}
                  <div className="h-6 w-20 bg-muted rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-muted" />
                  {/* 날짜 스켈레톤 */}
                  <div className="h-4 w-40 bg-muted rounded-md animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* 링크 배지 스켈레톤 */}
                <div className="h-10 w-24 bg-muted rounded-full animate-pulse"></div>
                <div className="h-10 w-24 bg-muted rounded-full animate-pulse"></div>
                <div className="h-10 w-24 bg-muted rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress Card 스켈레톤 */}
            <div className="w-full h-32 bg-muted rounded-lg animate-pulse"></div>
            
            {/* Main Content Grid 스켈레톤 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <Card>
                <CardContent className="pt-6 space-y-8">
                  <div className="space-y-3">
                    {/* 프로젝트 설명 제목 스켈레톤 */}
                    <div className="h-7 w-36 bg-muted rounded-md animate-pulse"></div>
                    {/* 프로젝트 설명 스켈레톤 */}
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
                      <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {/* 주요 기능 제목 스켈레톤 */}
                    <div className="h-7 w-36 bg-muted rounded-md animate-pulse"></div>
                    {/* 주요 기능 목록 스켈레톤 */}
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
                      <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* 멤버 카드 스켈레톤 */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="h-7 w-36 bg-muted rounded-md animate-pulse mb-4"></div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                        <div className="h-5 w-32 bg-muted rounded-md animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                        <div className="h-5 w-32 bg-muted rounded-md animate-pulse"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 기술 스택 카드 스켈레톤 */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="h-7 w-36 bg-muted rounded-md animate-pulse mb-4"></div>
                    <div className="flex flex-wrap gap-2">
                      <div className="h-8 w-20 bg-muted rounded-full animate-pulse"></div>
                      <div className="h-8 w-20 bg-muted rounded-full animate-pulse"></div>
                      <div className="h-8 w-20 bg-muted rounded-full animate-pulse"></div>
                      <div className="h-8 w-20 bg-muted rounded-full animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Timeline 스켈레톤 */}
            <Card>
              <CardContent className="pt-6">
                <div className="h-7 w-48 bg-muted rounded-md animate-pulse mb-6"></div>
                <div className="space-y-6 border-l-2 border-muted pl-4">
                  {/* 타임라인 아이템 스켈레톤 (3개) */}
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-muted animate-pulse"></div>
                      <div className="flex justify-between items-start">
                        <div className="h-5 w-48 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
                      </div>
                      <div className="h-4 w-24 bg-muted rounded-md animate-pulse mt-2"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  );
};

export default DetailPageSkeleton;