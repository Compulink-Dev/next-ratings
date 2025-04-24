import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  currentRole: 'client' | 'caregiver' | 'company';
  setCurrentRole: (role: 'client' | 'caregiver' | 'company') => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        currentRole: 'client',
        setCurrentRole: (role) => set({ currentRole: role }),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);