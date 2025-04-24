"use client"
import React, { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';

// Simplified types
type TaskType = 'assessment' | 'exam' | 'teamwork';

interface Task {
  id: number;
  title: string;
  type: TaskType;
  dueDate: Date;
}

// Sample task data
const taskData: Task[] = [
  { id: 1, title: 'Project Proposal', type: 'teamwork', dueDate: new Date(2025, 2, 14) },
  { id: 2, title: 'Midterm Exam', type: 'exam', dueDate: new Date(2025, 2, 15) },
  { id: 3, title: 'Essay Submission', type: 'assessment', dueDate: new Date(2025, 2, 16) },
  { id: 4, title: 'Group Presentation', type: 'teamwork', dueDate: new Date(2025, 2, 17) },
  { id: 5, title: 'Quiz', type: 'exam', dueDate: new Date(2025, 2, 18) },
  { id: 6, title: 'Lab Report', type: 'assessment', dueDate: new Date(2025, 2, 19) },
  { id: 7, title: 'Final Project Submission', type: 'teamwork', dueDate: new Date(2025, 2, 20) },
];

// Simplified color mapping
const taskColors: Record<TaskType, string> = {
  assessment: 'bg-orange-500',
  exam: 'bg-red-500',
  teamwork: 'bg-blue-500',
};

// Simplified Task Card component
const TaskCard = ({ task }: { task: Task }) => (
  <div className="rounded-lg shadow-md p-4 mb-3 bg-white border-l-4" 
       style={{ borderLeftColor: task.type === 'assessment' ? '#f97316' : 
                                task.type === 'exam' ? '#ef4444' : '#3b82f6' }}>
    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
    <p className="text-sm text-gray-600">Due: {format(task.dueDate, 'dd MMM yyyy')}</p>
  </div>
);

// Simplified Task Column component
const TaskColumn = ({ 
  title, 
  tasks, 
  colorClass 
}: { 
  title: string; 
  tasks: Task[]; 
  colorClass: string 
}) => (
  <div className="flex-1 mx-2 rounded-lg shadow-lg overflow-hidden bg-gray-50">
    <div className={`${colorClass} text-white p-4`}>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    <div className="p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p className="text-gray-500 italic">No tasks this week</p>
      )}
    </div>
  </div>
);

// Main component
const WeeklyTaskView = () => {
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

  // Filter tasks by current week
  const currentWeekTasks = taskData.filter((task) => {
    const taskDate = task.dueDate;
    return taskDate >= weekStart && taskDate < addDays(weekStart, 7);
  });

  // Group tasks by type
  const assessments = currentWeekTasks.filter((task) => task.type === 'assessment');
  const exams = currentWeekTasks.filter((task) => task.type === 'exam');
  const teamwork = currentWeekTasks.filter((task) => task.type === 'teamwork');

  // Week navigation handlers
  const handlePreviousWeek = () => setWeekStart(addDays(weekStart, -7));
  const handleNextWeek = () => setWeekStart(addDays(weekStart, 7));

  return (
    <div className="min-h-screen bg-gray-100 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with week navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Weekly Task Dashboard
          </h1>
          <div className="flex items-center">
            <button
              onClick={handlePreviousWeek}
              className="px-4 py-2 bg-blue-500 text-white rounded-l-lg hover:bg-blue-600 transition-colors"
            >
              Previous Week
            </button>
            <span className="px-4 py-2 bg-gray-200 text-gray-800 font-medium">
              {format(weekStart, 'dd MMM')} - {format(addDays(weekStart, 6), 'dd MMM yyyy')}
            </span>
            <button
              onClick={handleNextWeek}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              Next Week
            </button>
          </div>
        </div>

        {/* Task columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn title="Assessments" tasks={assessments} colorClass={taskColors.assessment} />
          <TaskColumn title="Exams" tasks={exams} colorClass={taskColors.exam} />
          <TaskColumn title="Teamwork" tasks={teamwork} colorClass={taskColors.teamwork} />
        </div>
      </div>
    </div>
  );
};

export default WeeklyTaskView;