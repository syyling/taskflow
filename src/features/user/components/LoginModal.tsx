import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { supabase } from '@/supabase.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { AuthModalProps } from '@/features/user/components/SignupModal.tsx';

const AUTH_ERROR_MESSAGES = {
  TITLE: '로그인 실패',
  SUPABASE_MESSAGE: 'Invalid login credentials',
  INVALID_CREDENTIALS: '비밀번호가 올바르지 않습니다. 다시 시도해주세요.',
  UNKNOWN_ERROR: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
};

const LoginModal = ({ isOpen, onOpenChange }: AuthModalProps) => {
  const { toast } = useToast();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes(AUTH_ERROR_MESSAGES.SUPABASE_MESSAGE)) {
          toast({
            variant: 'destructive',
            title: AUTH_ERROR_MESSAGES.TITLE,
            description: AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS,
          });
        }
        return;
      }
      onOpenChange(false);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: AUTH_ERROR_MESSAGES.TITLE,
        description: AUTH_ERROR_MESSAGES.UNKNOWN_ERROR,
      });
    }
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>계정 정보를 입력해주세요</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit">로그인</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
