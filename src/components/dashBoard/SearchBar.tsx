import { Input } from "@/components/ui/input.tsx";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
      <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
              type="text"
              placeholder="프로젝트 검색..."
              className="pl-10"
          />
      </div>



  );
}