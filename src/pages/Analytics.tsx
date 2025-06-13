import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, Download, Filter, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import { chartData } from '../data/mockData';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const metrics = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'users', label: 'Users' },
    { value: 'sessions', label: 'Sessions' }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Deep insights into your business performance</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
          
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$45,231', change: 12.5, icon: TrendingUp },
          { title: 'Page Views', value: '234,567', change: 8.2, icon: TrendingUp },
          { title: 'Conversion Rate', value: '3.24%', change: -2.4, icon: TrendingUp },
          { title: 'Avg. Session Duration', value: '4m 32s', change: 15.3, icon: TrendingUp }
        ].map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change > 0 ? '+' : ''}{kpi.change}%
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <kpi.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Trends</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {metrics.map((metric) => (
                  <option key={metric.value} value={metric.value}>{metric.label}</option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backdropFilter: 'blur(8px)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backdropFilter: 'blur(8px)'
                  }}
                />
                <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detailed Reports</h3>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Page Views</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Unique Visitors</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Bounce Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {chartData.slice(0, 6).map((data, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{data.name} 2024</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{data.sessions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{data.users.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{(Math.random() * 50 + 25).toFixed(1)}%</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{(Math.random() * 5 + 2).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;