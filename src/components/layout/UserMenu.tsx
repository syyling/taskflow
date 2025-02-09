import { useState } from "react";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu.tsx";
import LoginModal from "@/components/modal/LoginModal.tsx";
import SignupModal from "@/components/modal/SignupModal.tsx";

interface UserMenuProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isAuthenticated }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      //await onLogout();
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-2 rounded-full p-2 transition-colors hover:bg-muted/50">
          <User className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {isAuthenticated ? (
            <>
              <DropdownMenuItem>프로필</DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-red-500"
              >
                {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => setShowLoginModal(true)}>
                로그인
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowSignupModal(true)}>
                회원가입
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {showLoginModal && (
        <LoginModal isOpen={showLoginModal} onOpenChange={setShowLoginModal} />
      )}
      {showSignupModal && (
        <SignupModal
          isOpen={showSignupModal}
          onOpenChange={setShowSignupModal}
        />
      )}
    </div>
  );
};

export default UserMenu;
