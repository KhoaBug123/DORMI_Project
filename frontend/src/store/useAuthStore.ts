import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockCredentials } from '../data/mockData';

export type UserRole = 'tenant' | 'landlord' | 'admin' | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  avatar?: string;
  kycStatus?: 'pending' | 'verified' | 'rejected';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  verifyLandlord: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 800));
          
          const credential = mockCredentials.find(
            c => c.email === email && c.password === password
          );

          if (!credential) {
            set({ 
              error: 'Email hoặc mật khẩu không chính xác', 
              isLoading: false 
            });
            return false;
          }

          // Mock mapping to user data
          const user: User = {
            id: credential.userId,
            email: credential.email,
            role: credential.role as UserRole,
            kycStatus: credential.kycStatus as any,
          };

          if (user.role === 'tenant') {
             user.name = 'Nguyễn Minh Khoa';
             user.avatar = 'https://i.pravatar.cc/200?img=52';
          } else if (user.role === 'landlord') {
             user.name = user.id === 'landlord-001' ? 'Nguyễn Văn Phúc' : 'Trần Quốc Bảo';
             user.avatar = user.id === 'landlord-001' ? 'https://i.pravatar.cc/200?img=11' : 'https://i.pravatar.cc/200?img=33';
          } else if (user.role === 'admin') {
             user.name = 'Admin DORMI';
             user.avatar = 'https://i.pravatar.cc/200?img=1';
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          return true;
        } catch (error) {
          set({ 
            error: 'Đã xảy ra lỗi khi đăng nhập', 
            isLoading: false 
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      clearError: () => set({ error: null }),
      verifyLandlord: () => set((state) => ({ user: state.user ? { ...state.user, kycStatus: 'verified' } : null }))
    }),
    {
      name: 'dormi-auth-storage',
    }
  )
);
