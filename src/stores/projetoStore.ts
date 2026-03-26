import { create } from 'zustand';
import { Projeto } from '@/types';

interface ProjetoStore {
  projetoAtual: Projeto | null;
  filtros: {
    search: string;
    status: string;
    responsavel: string;
  };
  
  setProjetoAtual: (projeto: Projeto | null) => void;
  setFiltros: (filtros: any) => void;
  resetFiltros: () => void;
}

export const useProjetoStore = create<ProjetoStore>((set) => ({
  projetoAtual: null,
  filtros: {
    search: '',
    status: '',
    responsavel: '',
  },
  
  setProjetoAtual: (projeto) => set({ projetoAtual: projeto }),
  
  setFiltros: (filtros) =>
    set((state) => ({
      filtros: { ...state.filtros, ...filtros },
    })),
  
  resetFiltros: () =>
    set({
      filtros: {
        search: '',
        status: '',
        responsavel: '',
      },
    }),
}));
