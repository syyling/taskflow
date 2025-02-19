export interface DashboardState {
    checked: boolean;
    setChecked: () => void;
}

export interface SidebarState {
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    setIsSidebarOpen: () => void;
    setIsSidebarCollapsed: () => void;
}
