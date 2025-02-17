export interface UserDTO {
  id: number;
  img: string;
  name: string;
}

export interface ProjectDTO {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  progress: string;
  isVisible: boolean;
  users: { user: UserDTO }[];
}
