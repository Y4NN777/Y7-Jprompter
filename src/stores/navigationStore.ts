import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ViewType = 'home' | 'converter' | 'history' | 'templates' | 'settings' | 'about';

interface NavigationState {
    // Current view
    currentView: ViewType;
    setCurrentView: (view: ViewType) => void;

    // Sidebar state
    sidebarOpen: boolean;
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;

    // Mobile menu state
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;

    // Navigation history
    navigationHistory: ViewType[];
    goBack: () => void;
    canGoBack: boolean;
}

export const useNavigationStore = create<NavigationState>()(
    persist(
        (set, get) => ({
            // Initial state
            currentView: 'home',
            sidebarOpen: true,
            sidebarCollapsed: false,
            mobileMenuOpen: false,
            navigationHistory: ['home'],
            canGoBack: false,

            // Actions
            setCurrentView: (view) =>
                set((state) => ({
                    currentView: view,
                    navigationHistory: [...state.navigationHistory, view],
                    canGoBack: state.navigationHistory.length > 0,
                    mobileMenuOpen: false, // Close mobile menu when navigating
                })),

            toggleSidebar: () =>
                set((state) => ({
                    sidebarOpen: !state.sidebarOpen,
                })),

            setSidebarCollapsed: (collapsed) =>
                set({
                    sidebarCollapsed: collapsed,
                }),

            setMobileMenuOpen: (open) =>
                set({
                    mobileMenuOpen: open,
                }),

            goBack: () => {
                const history = get().navigationHistory;
                if (history.length > 1) {
                    const newHistory = history.slice(0, -1);
                    const previousView = newHistory[newHistory.length - 1];
                    set({
                        currentView: previousView,
                        navigationHistory: newHistory,
                        canGoBack: newHistory.length > 1,
                    });
                }
            },
        }),
        {
            name: 'navigation-storage',
            partialize: (state) => ({
                sidebarCollapsed: state.sidebarCollapsed,
                currentView: state.currentView,
            }),
        }
    )
);
