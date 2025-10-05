
import React, { useState } from 'react';
import type { DevTask } from '../types';
import { TaskStatus } from '../types';

interface TaskItemProps {
  task: DevTask;
}

const statusStyles = {
  [TaskStatus.Todo]: 'bg-neutral-gray/20 text-neutral-gray border-neutral-gray',
  [TaskStatus.InProgress]: 'bg-warning-amber/20 text-warning-amber border-warning-amber',
  [TaskStatus.Done]: 'bg-success-green/20 text-success-green border-success-green',
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [status, setStatus] = useState<TaskStatus>(task.status);

  const toggleStatus = () => {
    if (status === TaskStatus.Todo) setStatus(TaskStatus.InProgress);
    else if (status === TaskStatus.InProgress) setStatus(TaskStatus.Done);
    else setStatus(TaskStatus.Todo);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700/50 transition-colors">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={status === TaskStatus.Done}
          onChange={toggleStatus}
          className="h-5 w-5 rounded bg-slate-900 border-slate-700 text-accent-blue focus:ring-accent-blue cursor-pointer"
        />
        <div className="ml-4">
          <p className={`font-medium ${status === TaskStatus.Done ? 'line-through text-neutral-gray' : 'text-warm-white'}`}>{task.title}</p>
          <span className="text-sm text-neutral-gray">Phase {Math.ceil(task.week/4)} - Week {task.week}</span>
        </div>
      </div>
      <div 
        onClick={toggleStatus}
        className={`text-xs font-bold px-3 py-1 border rounded-full cursor-pointer ${statusStyles[status]}`}
      >
        {status}
      </div>
    </div>
  );
};

export default TaskItem;
