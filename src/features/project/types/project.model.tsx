export interface User {
  id: string;
  img: string;
  name: string;
  role: string;
  authLevel: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: string;
  isVisible: boolean;
  users: User[];
}
