import { ProjectDTO, UserDTO } from '@/features/project/types/project.dto.ts';
import { Project, User } from '@/features/project/types/project.model.tsx';

export const mapUserDTOToUser = (userDTO: UserDTO, role: string, authLevel: string): User => {
  return {
    id: userDTO.id,
    img: userDTO.img,
    name: userDTO.name,
    role: role,
    authLevel: authLevel,
  };
};

export const mapProjectDTOToProject = (projectDTO: ProjectDTO): Project => {
  return {
    id: projectDTO.id,
    name: projectDTO.name,
    description: projectDTO.description,
    startDate: new Date(projectDTO.startDate),
    endDate: new Date(projectDTO.endDate),
    progress: projectDTO.progress,
    isVisible: projectDTO.isVisible,
    users: projectDTO.users.map(
      (userWrapper) => mapUserDTOToUser(userWrapper.user, userWrapper.role, userWrapper.authLevel) // role 전달
    ),
  };
};

export const mapProjectDTOsToProjects = (projectDTOs: ProjectDTO[] | null | undefined): Project[] => {
  if (!projectDTOs) {
    return [];
  }
  return projectDTOs.map(mapProjectDTOToProject);
};
