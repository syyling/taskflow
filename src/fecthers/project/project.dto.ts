export interface UserDTO {
  id: string;
  img: string;
  name: string;
}

export interface ProjectDTO {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: string;
  isVisible: boolean;
  users: { role: string; authLevel: string; user: UserDTO }[];
}

export interface FeatureDTO {
  id: number;
  feature: string;
}
