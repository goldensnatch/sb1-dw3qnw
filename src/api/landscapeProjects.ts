import { fetchApi } from './client';

export interface ProjectMaterial {
  id?: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
  landscapeProjectId?: number;
}

export interface LandscapeProject {
  id?: number;
  projectType: string;
  customerId: string;
  length: number;
  width: number;
  height: number;
  createdDate?: string;
  materials?: ProjectMaterial[];
  totalCost?: number;
}

export const landscapeProjectsApi = {
  create: (project: Omit<LandscapeProject, 'id' | 'createdDate'>) =>
    fetchApi<LandscapeProject>('/api/LandscapeProject', {
      method: 'POST',
      body: JSON.stringify(project),
    }),

  getById: (id: number) =>
    fetchApi<LandscapeProject>(`/api/LandscapeProject/${id}`),

  getCustomerProjects: (customerId: string) =>
    fetchApi<LandscapeProject[]>(`/api/LandscapeProject/customer/${customerId}`),
};