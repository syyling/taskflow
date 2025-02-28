import {supabase} from '@/supabase.ts';
import {FeatureDTO, ProjectDTO} from '@/features/project/types/project.dto.ts';

export const fetchProjects = async (onlyVisible, userId): Promise<ProjectDTO[] | null> => {
  const { data: projectIds, error: idError } = await supabase
    .from('project_in_user')
    .select('project_id')
    .eq('user_id', userId);

  if (idError) throw idError;

  const projectIdList = projectIds.map(p => p.project_id);

  if (projectIdList.length === 0) return [];

  let query = supabase
    .from('project')
    .select(
      `
      id, 
      name, 
      description, 
      startDate, 
      endDate, 
      progress, 
      isVisible,
      users:project_in_user(
          role, authLevel,
          user(id, name, img)
    )
    `
    )
    .in('id', projectIdList);

  if (onlyVisible) {
    query = query.eq('isVisible', true);
  }

  const { data: projects, error: projectError } = await query.returns<ProjectDTO[]>();

  if (projectError) throw projectError;
  return projects;
};

export const fetchProject = async ({ projectId }: { projectId: number }): Promise<ProjectDTO | null> => {
  const query = supabase
    .from('project')
    .select(
      `id, name, description, startDate, endDate, progress, isVisible, 
      users:project_in_user(
          role, authLevel,
          user(id, name, img))`
    )
    .eq('id', projectId);

  const { data: project, error } = await query.returns<ProjectDTO>();

  if (error) throw error;
  return project;
};

export const updateProjectVisibility = async (projectId, isVisible) => {
  const { data, error } = await supabase.from('project').update({ isVisible: !isVisible }).eq('id', projectId);
};

export const fetchFeatures = async (projectId): Promise<FeatureDTO | null> => {
  const query = supabase.from('feature').select(`id, feature`).eq('id', projectId);

  const { data: features, error } = await query.returns<FeatureDTO>();

  if (error) throw error;
  return features;
};

export const getProjectMembers = async (projectId) => {
  type ProjectMember = {
    authLevel: string;
    role: string;
    user_id: string;
    project_id: string;
    user?: { name: string }; // user가 존재하지 않을 수도 있으므로 옵셔널 처리
  };

  const { data, error } = await supabase
    .from('project_in_user')
    .select(`
            authLevel,
            role,
            user_id,
            project_id,
            user (name)
          `)
    .eq("project_id", projectId)
    .returns<ProjectMember[]>(); // 반환 타입을 명시적으로 설정

  if (error) throw error;

  return data.map(member => ({
    ...member,
    name: member.user?.name
  }));
}

export const upsertProjectInUsers = async (projectTeam, deleteMembers, projectId) => {
  const records = projectTeam.map(team => ({
    project_id: projectId,
    authLevel: team.authLevel || '',
    role: team.role || '',
    user_id: team.id || ''
  }));

  const [deleteResult, upsertResult] = await Promise.all([
    deleteMembers.length > 0
      ? supabase
        .from('project_in_user')
        .delete()
        .eq('project_id', projectId)
        .in('user_id', deleteMembers)
      : Promise.resolve({ error: null }),

    records.length > 0
      ? supabase
        .from('project_in_user')
        .upsert(records)
        .select()
      : Promise.resolve({ data: [], error: null })
  ]);

  if (deleteResult.error) throw deleteResult.error;
  if (upsertResult.error) throw upsertResult.error;

  return upsertResult.data;
}
