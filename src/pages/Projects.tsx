import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { api, Project } from '../services/api';
import styles from './Projects.module.css';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await api.getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'var(--success)';
      case 'planning': return 'var(--info)';
      case 'on-hold': return 'var(--warning)';
      case 'completed': return 'var(--text-muted)';
      default: return 'var(--text-muted)';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'var(--error)';
      case 'medium': return 'var(--warning)';
      case 'low': return 'var(--success)';
      default: return 'var(--text-muted)';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--error)';
  };

  if (loading) {
    return (
      <div className={styles.projects}>
        <div className={styles.loading}>Loading projects...</div>
      </div>
    );
  }

  return (
    <div className={styles.projects}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Portfolio overview and project management</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <Search size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
          <button className={styles.addButton}>
            <Plus size={20} />
            New Project
          </button>
        </div>
      </header>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{projects.length}</h3>
            <p className={styles.statLabel}>Total Projects</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>
              {projects.filter(p => p.status === 'active').length}
            </h3>
            <p className={styles.statLabel}>Active Projects</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>
              {projects.filter(p => p.riskLevel === 'high').length}
            </h3>
            <p className={styles.statLabel}>High Risk</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Calendar size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>
              {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
            </h3>
            <p className={styles.statLabel}>Avg Progress</p>
          </div>
        </div>
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <div className={styles.projectMeta}>
                  <span 
                    className={styles.statusBadge}
                    style={{ 
                      backgroundColor: getStatusColor(project.status),
                      color: 'white'
                    }}
                  >
                    {project.status}
                  </span>
                  <span className={styles.teamSize}>
                    <Users size={14} />
                    {project.teamSize} members
                  </span>
                </div>
              </div>
              <div 
                className={styles.healthScore}
                style={{ color: getHealthColor(project.healthScore) }}
              >
                {project.healthScore}%
              </div>
            </div>

            <div className={styles.projectProgress}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>Progress</span>
                <span className={styles.progressValue}>{project.progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ 
                    width: `${project.progress}%`,
                    backgroundColor: getHealthColor(project.healthScore)
                  }}
                />
              </div>
            </div>

            <div className={styles.projectMetrics}>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Risk Level</span>
                <span 
                  className={styles.riskBadge}
                  style={{ 
                    backgroundColor: getRiskColor(project.riskLevel),
                    color: 'white'
                  }}
                >
                  {project.riskLevel}
                </span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Health Score</span>
                <span 
                  className={styles.metricValue}
                  style={{ color: getHealthColor(project.healthScore) }}
                >
                  {project.healthScore}%
                </span>
              </div>
            </div>

            <div className={styles.projectActions}>
              <button className={styles.viewButton}>View Details</button>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <TrendingUp size={48} />
          </div>
          <h3 className={styles.emptyTitle}>No projects found</h3>
          <p className={styles.emptyDescription}>
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first project to get started'
            }
          </p>
          <button className={styles.emptyAction}>
            <Plus size={20} />
            Create Project
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;