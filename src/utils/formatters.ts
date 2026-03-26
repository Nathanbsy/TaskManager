export const getInitials = (name: string): string => {
  return name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '';
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('pt-BR');
};

export const getColorByPriority = (priority: number): string => {
  switch (priority) {
    case 1:
      return '#9AADBA'; // Trivial
    case 2:
      return '#4A90E2'; // Baixa
    case 3:
      return '#F5A623'; // Média
    case 4:
      return '#E84C3D'; // Alta
    case 5:
      return '#D0021B'; // Crítica
    default:
      return '#999999';
  }
};

export const getPriorityLabel = (priority: number): string => {
  switch (priority) {
    case 1:
      return 'Trivial';
    case 2:
      return 'Baixa';
    case 3:
      return 'Média';
    case 4:
      return 'Alta';
    case 5:
      return 'Crítica';
    default:
      return 'Desconhecida';
  }
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'TODO':
      return '#4A90E2';
    case 'IN_PROGRESS':
      return '#F5A623';
    case 'DONE':
      return '#7ED321';
    default:
      return '#999999';
  }
};
