import React from 'react';
import TaskItem from '../components/TaskItem';
import { MOCK_TASKS } from '../constants';

const TasksView: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-warm-white">Development Task List</h2>
      <div className="space-y-4">
        {MOCK_TASKS.map(task => <TaskItem key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default TasksView;