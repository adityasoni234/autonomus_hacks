// API base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Types
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignedRole: string;
  assignedTo: string;
  deadline: string;
  aiReason?: string;
  workloadImpact: number;
}

export interface Project {
  id: string;
  name: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  healthScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  progress: number;
  teamSize: number;
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
}

export interface WorkloadData {
  userId: string;
  currentLoad: number;
  capacity: number;
  efficiency: number;
  burnoutRisk: number;
}

// API functions
class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Tasks
  async getTasks(userId?: string): Promise<Task[]> {
    const query = userId ? `?userId=${userId}` : '';
    return this.request<Task[]>(`/tasks${query}`);
  }

  async getTask(id: string): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`);
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects');
  }

  async getProject(id: string): Promise<Project> {
    return this.request<Project>(`/projects/${id}`);
  }

  // AI Insights
  async getAIInsights(context?: string): Promise<AIInsight[]> {
    const query = context ? `?context=${context}` : '';
    return this.request<AIInsight[]>(`/ai/insights${query}`);
  }

  async getTaskAssignmentReason(taskId: string): Promise<{ reason: string; confidence: number }> {
    return this.request<{ reason: string; confidence: number }>(`/ai/assignment-reason/${taskId}`);
  }

  // Workload
  async getWorkload(userId: string): Promise<WorkloadData> {
    return this.request<WorkloadData>(`/workload/${userId}`);
  }

  async getTeamWorkload(): Promise<WorkloadData[]> {
    return this.request<WorkloadData[]>('/workload/team');
  }

  // Analytics
  async getExecutiveMetrics(): Promise<{
    portfolioHealth: number;
    resourceUtilization: number;
    roi: number;
    efficiency: number;
  }> {
    return this.request('/analytics/executive');
  }

  async getManagerMetrics(projectId?: string): Promise<{
    sprintProgress: number;
    teamVelocity: number;
    riskScore: number;
    deliveryPrediction: number;
  }> {
    const query = projectId ? `?projectId=${projectId}` : '';
    return this.request(`/analytics/manager${query}`);
  }
}

export const api = new ApiService();