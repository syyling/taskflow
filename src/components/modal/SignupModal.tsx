import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/supabase.ts";
import {useToast} from "@/hooks/use-toast.ts";



export interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupModal = ({ isOpen, onOpenChange } :AuthModalProps) => {
  const { toast } = useToast();

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!signUpForm.email || !signUpForm.password || !signUpForm.confirmPassword || !signUpForm.name) {
      setError("모든 필드를 입력해주세요.");
      return false;
    }

    if (!signUpForm.email.includes("@")) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return false;
    }

    if (signUpForm.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return false;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: signUpForm.email,
        password: signUpForm.password,
        options: {
          data: { name: signUpForm.name },
        }
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          setError("이미 사용 중인 이메일입니다.")
        }
        return;
      } else {
        toast({
          variant: "default",
          title: "환영합니다! 🎉",
          description: `${signUpForm.name}님, 함께 시작해볼까요?`,
        });
        onOpenChange(false);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "회원가입 실패",
        description: "회원가입 중 오류가 발생했습니다.",
      });
    }

    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">회원가입</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
          <DialogDescription>새로운 계정을 만들어보세요</DialogDescription>
        </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                  <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                  </Alert>
              )}
              <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="이름을 입력해주세요"
                      value={signUpForm.name}
                      onChange={handleChange}
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="example@email.com"
                      value={signUpForm.email}
                      onChange={handleChange}
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                      id="password"
                      name="password"
                      type="password"
                      value={signUpForm.password}
                      onChange={handleChange}
                      placeholder="6자 이상 입력해주세요"
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={signUpForm.confirmPassword}
                      onChange={handleChange}
                      placeholder="비밀번호를 한번 더 입력해주세요"
                  />
              </div>
              <div className="flex justify-end space-x-2">
                  <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                  >
                      취소
                  </Button>
                  <Button type="submit">가입하기</Button>
              </div>
          </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
