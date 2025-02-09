import { supabase } from "@/supabase.ts";
import { Project } from "@/pages/Dashboard.tsx";

export const getProjects = async ({ onlyVisible = true } = {}): Promise<
  Project[] | null
> => {
  let query = supabase
    .from("project")
    .select(
      `id, name, description, deadline, progress, isVisible, users:project_in_user(user(id, name, img))`,
    );

  if (onlyVisible) {
    query = query.eq("isVisible", true);
  }

  const { data: projects, error } = await query.returns<Project[]>();

  if (error) throw error;
  return projects;
};

export const updateVisible = async (projectId, isVisible) => {
  const { data, error } = await supabase
    .from("project")
    .update({ isVisible: !isVisible })
    .eq("id", projectId);
};
