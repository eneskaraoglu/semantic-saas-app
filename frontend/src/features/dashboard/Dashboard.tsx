import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample data for the dashboard widgets
  const metrics = [
    { name: 'Stock Items', value: '1,284', change: '12%', trend: 'up' },
    { name: 'Production Orders', value: '52', change: '3%', trend: 'down' },
    { name: 'Revenue', value: '$45,200', change: '18%', trend: 'up' },
    { name: 'Expenses', value: '$12,500', change: '5%', trend: 'up' },
  ];

  const recentActivities = [
    { id: 1, action: 'Item Stock Updated', user: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'New Production Order Created', user: 'Jane Smith', time: '5 hours ago' },
    { id: 3, action: 'Monthly Report Generated', user: 'Mike Johnson', time: '1 day ago' },
    { id: 4, action: 'New User Added', user: 'Admin', time: '2 days ago' },
  ];

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">Export</button>
          <button className="btn-primary">New Report</button>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.name}</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {metric.change}
                {metric.trend === 'up' ? (
                  <svg className="self-center flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="self-center flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Activity List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activities</h2>
        </div>
        <div className="p-4">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="py-3">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">by {activity.user}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t dark:border-gray-700">
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            View all activities
          </a>
        </div>
      </div>
      
      {/* Empty Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Chart</h2>
        <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-gray-500 dark:text-gray-400">Chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
