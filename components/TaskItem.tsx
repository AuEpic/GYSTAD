
import React from 'react';
import type { DevTask } from '../types';
import { TaskStatus } from '../types';

interface TaskItemProps {
  task: DevTask;
}

const getStatusStyles = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.Done:
      return 'bg-success-green/20 text-success-green';
    case TaskStatus.InProgress:
      return 'bg-warning-amber/20 text-warning-amber';
    case TaskStatus.Todo:
    default:
      return 'bg-neutral-gray/20 text-neutral-gray';
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between border border-slate-700 hover:border-accent-blue transition-colors">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-neutral-gray">Wk{task.week}</span>
        <p className="text-warm-white">{task.title}</p>
      </div>
      <div className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusStyles(task.status)}`}>
        {task.status}
      </div>
    </div>
  );
};

export default TaskItem;
