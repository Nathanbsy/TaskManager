import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';

export const useAuth = () => {
  const auth = useAuthStore();
  
  useEffect(() => {
    auth.hydrate();
  }, []);
  
  return auth;
};

export const useVerifyAuth = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated;
};
