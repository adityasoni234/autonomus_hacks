import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, MoreHorizontal, Clock, User, AlertTriangle } from 'lucide-react';
import { api, Task } from '../services/api';
import styles from './Tasks.module.css';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
    { id: 'review', title: 'Review', status: 'review' as const },
    { id: 'done', title: 'Done', status: 'done' as const },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await api.getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical': return 'var(--error)';
      case 'high': return 'var(--warning)';
      case 'medium': return 'var(--info)';
      case 'low': return 'var(--success)';
      default: return 'var(--text-muted)';
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
  };

  if (loading) {
    return (
      <div className={styles.tasks}>
        <div className={styles.loading}>Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className={styles.tasks}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Tasks & Projects</h1>
          <p className={styles.subtitle}>AI-powered task orchestration board</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <Search size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.filterButton}>
            <Filter size={20} />
            Filter
          </button>
          <button className={styles.addButton}>
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </header>

      <div className={styles.board}>
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);
          return (
            <div key={column.id} className={styles.column}>
              <div className={styles.columnHeader}>
                <h3 className={styles.columnTitle}>{column.title}</h3>
                <span className={styles.taskCount}>{columnTasks.length}</span>
              </div>
              
              <div className={styles.columnContent}>
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className={styles.taskCard}
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className={styles.taskHeader}>
                      <div 
                        className={styles.priorityIndicator}
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      />
                      <button className={styles.taskMenu}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    
                    <h4 className={styles.taskTitle}>{task.title}</h4>
                    <p className={styles.taskDescription}>{task.description}</p>
                    
                    <div className={styles.taskMeta}>
                      <div className={styles.roleAssignment}>
                        <User size={14} />
                        <span>{task.assignedRole}</span>
                      </div>
                      <div className={styles.deadline}>
                        <Clock size={14} />
                        <span>{new Date(task.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {task.aiReason && (
                      <div className={styles.aiIndicator}>
                        <AlertTriangle size={12} />
                        <span>AI Assigned</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {columnTasks.length === 0 && (
                  <div className={styles.emptyColumn}>
                    <p>No tasks in {column.title.toLowerCase()}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className={styles.modalOverlay} onClick={closeTaskModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedTask.title}</h2>
              <button className={styles.closeButton} onClick={closeTaskModal}>
                ×
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.taskDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Priority:</span>
                  <span 
                    className={styles.priorityBadge}
                    style={{ color: getPriorityColor(selectedTask.priority) }}
                  >
                    {selectedTask.priority}
                  </span>
                </div>
                
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Assigned Role:</span>
                  <span className={styles.detailValue}>{selectedTask.assignedRole}</span>
                </div>
                
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Assigned To:</span>
                  <span className={styles.detailValue}>{selectedTask.assignedTo}</span>
                </div>
                
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Deadline:</span>
                  <span className={styles.detailValue}>
                    {new Date(selectedTask.deadline).toLocaleDateString()}
                  </span>
                </div>
                
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Workload Impact:</span>
                  <span className={styles.detailValue}>{selectedTask.workloadImpact}h</span>
                </div>
              </div>
              
              <div className={styles.description}>
                <h4>Description</h4>
                <p>{selectedTask.description}</p>
              </div>
              
              {selectedTask.aiReason && (
                <div className={styles.aiExplanation}>
                  <h4>Why was this assigned to you?</h4>
                  <p>{selectedTask.aiReason}</p>
                  <div className={styles.aiActions}>
                    <button className={styles.acceptButton}>Accept Assignment</button>
                    <button className={styles.overrideButton}>Request Override</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;