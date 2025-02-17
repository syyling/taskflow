import { supabase } from '@/supabase.ts';
import { ProjectDTO } from '@/fecthers/project/project.dto.ts';

export const fetchProjects = async ({ onlyVisible = true } = {}): Promise<ProjectDTO[] | null> => {
  let query = supabase
    .from('project')
    .select(`id, name, description, deadline, progress, isVisible, users:project_in_user(user(id, name, img))`);

  if (onlyVisible) {
    query = query.eq('isVisible', true);
  }

  const { data: projects, error } = await query.returns<ProjectDTO[]>();

  if (error) throw error;
  return projects;
};

export const updateProjectVisibility = async (projectId, isVisible) => {
  const { data, error } = await supabase.from('project').update({ isVisible: !isVisible }).eq('id', projectId);
};
