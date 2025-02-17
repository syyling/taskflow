export interface User {
  id: number;
  img: string;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  progress: string;
  isVisible: boolean;
  users: { user: User }[];
}
