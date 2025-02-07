import { supabase } from "@/supabase.ts";

export const getProjects = async ({ onlyVisible = true } = {}) => {
  console.log("조회");
  console.log(onlyVisible);
  let query = supabase
    .from("project")
    .select(
      `id, name, description, deadline, progress, isVisible, users:project_in_user(user(id, name, img))`,
    );

  if (onlyVisible) {
    query = query.eq("isVisible", true);
  }

  const { data: projects, error } = await query;

  if (error) throw error;
  return projects;
};

export const updateVisible = async (projectId, isVisible) => {
  const { data, error } = await supabase
    .from("project")
    .update({ isVisible: !isVisible })
    .eq("id", projectId);
};
