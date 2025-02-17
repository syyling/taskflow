import { ProjectDTO, UserDTO } from '@/fecthers/project/project.dto.ts';
import { Project, User } from '@/types/project.model.tsx';

// User DTO를 User 모델로 변환하는 매퍼 함수
export const mapUserDTOToUser = (userDTO: UserDTO): User => {
  return {
    id: userDTO.id,
    img: userDTO.img,
    name: userDTO.name,
  };
};

// Project DTO를 Project 모델로 변환하는 매퍼 함수
export const mapProjectDTOToProject = (projectDTO: ProjectDTO): Project => {
  return {
    id: projectDTO.id,
    name: projectDTO.name,
    description: projectDTO.description,
    deadline: projectDTO.deadline,
    progress: projectDTO.progress,
    isVisible: projectDTO.isVisible,
    users: projectDTO.users.map((userWrapper) => ({
      user: mapUserDTOToUser(userWrapper.user),
    })),
  };
};

// 여러 Project DTO를 Project 모델 배열로 변환하는 헬퍼 함수
export const mapProjectDTOsToProjects = (projectDTOs: ProjectDTO[] | null | undefined): Project[] => {
  if (!projectDTOs) {
    return [];
  }
  return projectDTOs.map(mapProjectDTOToProject);
};
