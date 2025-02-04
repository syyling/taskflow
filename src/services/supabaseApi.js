import {supabase} from "@/supabase.ts";

export const getVisibleProjects = async () => {
    const { data: projects, error } = await supabase
        .from('project')
        .select(`id, name, description, deadline, progress, users:project_in_user(user(id, name, img))`)
        .eq('isVisible', true);

    if (error) throw error;
    return projects;
};

export const getAllProjects = async () => {
    const { data: projects, error } = await supabase
        .from('project')
        .select(`id, name, description, deadline, progress, users:project_in_user(user(id, name, img))`);

    if (error) throw error;
    return projects;
};