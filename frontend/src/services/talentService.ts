import { api } from './api';

export interface Talent {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  skills?: string;
  experience?: string;
  education?: string;
  dateOfBirth?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  currentPosition?: string;
  desiredPosition?: string;
  salaryExpectation?: number;
  availability?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export const talentService = {
  getAllTalents: async (
    page = 0,
    size = 10,
    sortBy = 'id',
    sortDir = 'asc'
  ): Promise<PagedResponse<Talent>> => {
    const response = await api.get('/talents', {
      params: { page, size, sortBy, sortDir },
    });
    return response.data;
  },

  getTalentById: async (id: number): Promise<Talent> => {
    const response = await api.get(`/talents/${id}`);
    return response.data;
  },

  createTalent: async (talent: Talent): Promise<ApiResponse<Talent>> => {
    const response = await api.post('/talents', talent);
    return response.data;
  },

  updateTalent: async (id: number, talent: Talent): Promise<ApiResponse<Talent>> => {
    const response = await api.put(`/talents/${id}`, talent);
    return response.data;
  },

  deleteTalent: async (id: number): Promise<ApiResponse> => {
    const response = await api.delete(`/talents/${id}`);
    return response.data;
  },

  searchTalents: async (
    keyword: string,
    page = 0,
    size = 10
  ): Promise<PagedResponse<Talent>> => {
    const response = await api.get('/talents/search', {
      params: { keyword, page, size },
    });
    return response.data;
  },

  countTalents: async (): Promise<ApiResponse<number>> => {
    const response = await api.get('/talents/count');
    return response.data;
  }
};

export default talentService;
