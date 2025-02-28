import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import {useNavigate, useRoutes} from "react-router-dom";

const ErrorPage = () => {
  const nav = useNavigate();

  const goToHome = () => {
    nav(`/`);
  };

  const refreshPage = () => {
    window.location.reload()
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold">오류가 발생했습니다</CardTitle>
        </CardHeader>

        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>문제가 발생했습니다</AlertTitle>
            <AlertDescription>
              페이지를 표시하는 중에 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
            </AlertDescription>
          </Alert>

          <div className="text-sm text-gray-500 mt-4">
            <p>오류 코드: ERR_PAGE_NOT_FOUND</p>
            <p>시간: {new Date().toLocaleString()}</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToHome}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            홈으로
          </Button>

          <Button
            onClick={refreshPage}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            다시 시도
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;