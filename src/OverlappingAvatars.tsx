import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OverlappingAvatars() {
    const avatars = [
        { name: "A", src: "" },
        { name: "B", src: "" },
        { name: "C", src: "" },
    ];

    return (
        <div className="flex items-center">
            <div className="flex -space-x-3">
                {avatars.map((avatar, index) => (
                    <Avatar
                        key={index}
                        className="w-7 h-7 border-2 border-white shadow-md"
                    >
                        <AvatarImage src={avatar.src} />
                        <AvatarFallback className="bg-gray-200 text-gray-500">
                            {avatar.name}
                        </AvatarFallback>
                    </Avatar>
                ))}
            </div>
            <span className="text-gray-500 text-sm ml-3">+2명</span>
        </div>
    );
}