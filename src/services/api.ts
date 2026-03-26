import axios from 'axios';
import Cookie from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = Cookie.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para lidar com erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookie.remove('token');
      Cookie.remove('refreshToken');
      window.location.href = '/autenticacao';
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTENTICAÇÃO
// ============================================

export const authService = {
  register: (username: string, email: string, senha: string) =>
    api.post('/auth/register', { username, email, senha }),
  
  login: (email: string, senha: string) =>
    api.post('/auth/login', { email, senha }),
  
  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh-token', { refreshToken }),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
};

// ============================================
// USUÁRIOS
// ============================================

export const usuarioService = {
  getById: (id: number) =>
    api.get(`/usuario/${id}`),
  
  getAll: () =>
    api.get('/usuarios'),
  
  update: (id: number, data: any) =>
    api.put(`/usuario/${id}`, data),
  
  updateEmail: (id: number, email: string) =>
    api.put(`/usuario/${id}/email`, { email }),
  
  delete: (id: number) =>
    api.delete(`/usuario/${id}`),
};

// ============================================
// EMPRESAS
// ============================================

export const empresaService = {
  getById: (id: number) =>
    api.get(`/empresas/${id}`),
  
  getAll: () =>
    api.get('/empresas'),
  
  update: (id: number, data: any) =>
    api.put(`/empresas/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/empresas/${id}`),
};

// ============================================
// PROJETOS
// ============================================

export const projetoService = {
  create: (data: any) =>
    api.post('/projetos', data),
  
  getByEmpresa: (idEmpresa: number) =>
    api.get(`/empresas/${idEmpresa}/projetos`),
  
  getById: (id: number) =>
    api.get(`/projetos/${id}`),
  
  update: (id: number, data: any) =>
    api.put(`/projetos/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/projetos/${id}`),
  
  // Membros
  addMembro: (idProjeto: number, data: any) =>
    api.post(`/projetos/${idProjeto}/membros`, data),
  
  getMembros: (idProjeto: number) =>
    api.get(`/projetos/${idProjeto}/membros`),
  
  updateMembro: (id: number, data: any) =>
    api.put(`/membros/${id}`, data),
  
  removeMembro: (id: number) =>
    api.delete(`/membros/${id}`),
};

// ============================================
// ISSUES
// ============================================

export const issueService = {
  create: (idProjeto: number, data: any) =>
    api.post(`/projetos/${idProjeto}/issues`, data),
  
  getByProjeto: (idProjeto: number, params?: any) =>
    api.get(`/projetos/${idProjeto}/issues`, { params }),
  
  getById: (id: number) =>
    api.get(`/issues/${id}`),
  
  update: (id: number, data: any) =>
    api.put(`/issues/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/issues/${id}`),
};

// ============================================
// EPICS
// ============================================

export const epicService = {
  create: (idProjeto: number, data: any) =>
    api.post(`/projetos/${idProjeto}/epics`, data),
  
  getByProjeto: (idProjeto: number) =>
    api.get(`/projetos/${idProjeto}/epics`),
};

// ============================================
// SPRINTS
// ============================================

export const sprintService = {
  create: (idProjeto: number, data: any) =>
    api.post(`/projetos/${idProjeto}/sprints`, data),
  
  getByProjeto: (idProjeto: number) =>
    api.get(`/projetos/${idProjeto}/sprints`),
};

// ============================================
// STATUS
// ============================================

export const statusService = {
  create: (idProjeto: number, data: any) =>
    api.post(`/projetos/${idProjeto}/status`, data),
  
  getByProjeto: (idProjeto: number) =>
    api.get(`/projetos/${idProjeto}/status`),
  
  update: (id: number, data: any) =>
    api.put(`/status/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/status/${id}`),
};

// ============================================
// LABELS
// ============================================

export const labelService = {
  create: (idProjeto: number, data: any) =>
    api.post(`/projetos/${idProjeto}/labels`, data),
  
  getByProjeto: (idProjeto: number) =>
    api.get(`/projetos/${idProjeto}/labels`),
  
  update: (id: number, data: any) =>
    api.put(`/labels/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/labels/${id}`),
  
  // Issue - Label
  addToIssue: (idIssue: number, idLabel: number) =>
    api.post(`/issues/${idIssue}/labels/${idLabel}`),
  
  getFromIssue: (idIssue: number) =>
    api.get(`/issues/${idIssue}/labels`),
  
  removeFromIssue: (idIssue: number, idLabel: number) =>
    api.delete(`/issues/${idIssue}/labels/${idLabel}`),
};

// ============================================
// COMPONENTES
// ============================================

export const componenteService = {
  create: (idProjeto: number, data: any) =>
    api.post(`/projetos/${idProjeto}/componentes`, data),
  
  getByProjeto: (idProjeto: number) =>
    api.get(`/projetos/${idProjeto}/componentes`),
  
  update: (id: number, data: any) =>
    api.put(`/componentes/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/componentes/${id}`),
  
  // Issue - Componente
  addToIssue: (idIssue: number, idComponente: number) =>
    api.post(`/issues/${idIssue}/componentes/${idComponente}`),
  
  getFromIssue: (idIssue: number) =>
    api.get(`/issues/${idIssue}/componentes`),
  
  removeFromIssue: (idIssue: number, idComponente: number) =>
    api.delete(`/issues/${idIssue}/componentes/${idComponente}`),
};

// ============================================
// COMENTÁRIOS
// ============================================

export const comentarioService = {
  create: (idIssue: number, texto: string) =>
    api.post(`/issues/${idIssue}/comentarios`, { texto }),
  
  getByIssue: (idIssue: number) =>
    api.get(`/issues/${idIssue}/comentarios`),
  
  update: (id: number, texto: string) =>
    api.put(`/comentarios/${id}`, { texto }),
  
  delete: (id: number) =>
    api.delete(`/comentarios/${id}`),
};

export default api;
