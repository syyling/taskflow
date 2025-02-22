import { supabase } from '@/supabase.ts';
import { FeatureDTO, ProjectDTO } from '@/fecthers/project/project.dto.ts';
import { useAuth } from '@/contexts/AuthContext.tsx';

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
      `id, name, description, startDate, endDate, progress, isVisible, users:project_in_user(user(id, name, img))`
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
