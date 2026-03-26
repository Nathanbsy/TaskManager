import { create } from 'zustand';
import { Usuario } from '@/types';
import Cookie from 'js-cookie';

interface AuthStore {
  usuario: Usuario | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  setUsuario: (usuario: Usuario | null) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setLoading: (isLoading: boolean) => void;
  login: (usuario: Usuario, token: string, refreshToken: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  usuario: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,
  
  setUsuario: (usuario) => set({ usuario }),
  
  setToken: (token) => {
    Cookie.set('token', token, { expires: 1 });
    set({ token });
  },
  
  setRefreshToken: (refreshToken) => {
    Cookie.set('refreshToken', refreshToken, { expires: 7 });
    set({ refreshToken });
  },
  
  setLoading: (isLoading) => set({ isLoading }),
  
  login: (usuario, token, refreshToken) => {
    Cookie.set('token', token, { expires: 1 });
    Cookie.set('refreshToken', refreshToken, { expires: 7 });
    set({
      usuario,
      token,
      refreshToken,
      isAuthenticated: true,
    });
  },
  
  logout: () => {
    Cookie.remove('token');
    Cookie.remove('refreshToken');
    set({
      usuario: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
  
  hydrate: () => {
    const token = Cookie.get('token');
    const refreshToken = Cookie.get('refreshToken');
    
    if (token && refreshToken) {
      set({
        token,
        refreshToken,
        isAuthenticated: true,
      });
    }
  },
}));
