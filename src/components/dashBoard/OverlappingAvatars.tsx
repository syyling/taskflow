import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { User } from '@/types/project.model.tsx';

export default function OverlappingAvatars({ users }) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-3">
        {users.map((user, index) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar key={index} className="w-7 h-7 border-2 border-white shadow-md">
                  <AvatarImage src={user.img} />
                  <AvatarFallback className="bg-gray-200 text-gray-500 text-xs">
                    {user.name ? user.name.charAt(0) : '?'}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      {/*<span className="text-gray-500 text-sm ml-3">+2명</span>*/}
    </div>
  );
}
