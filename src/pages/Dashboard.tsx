import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Plus,
  ArrowDownCircle,
  ArrowUpCircle,
  Globe,
  ShoppingBag,
  Package,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Card from "../components/Card";
import {
  dashboardStats,
  chartData,
  pieChartData,
  recentOrders,
} from "../data/mockData";
import FeaturesWidget from "../components/FeaturesWidget";

// ---------------- StatCard ----------------
const StatCard: React.FC<{
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  index: number;
}> = ({ title, value, change, icon: Icon, index }) => {
  const isPositive = change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {value}
            </p>
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                vs last month
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// ---------------- Dashboard ----------------
const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section with full-bleed image */}
      <div className="relative w-full h-[400px]">
        <img
          src="https://plus.unsplash.com/premium_photo-1661508620175-3ae20da61cda?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8fDA%3D"
          alt="Business Overview"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Overlapping Features Widget */}
        <div className="absolute left-1/2 bottom-[-80px] transform -translate-x-1/2 w-full max-w-3xl">
          <FeaturesWidget />
        </div>
      </div>

      {/* Main + Sidebar */}
      <div className="pt-32 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back! Here's what's happening with your business today.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            <StatCard
              title="Total Revenue"
              value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
              change={dashboardStats.revenueGrowth}
              icon={DollarSign}
              index={0}
            />
            <StatCard
              title="Total Users"
              value={dashboardStats.totalUsers.toLocaleString()}
              change={dashboardStats.userGrowth}
              icon={Users}
              index={1}
            />
            <StatCard
              title="Total Sessions"
              value={dashboardStats.totalSessions.toLocaleString()}
              change={dashboardStats.sessionGrowth}
              icon={Activity}
              index={2}
            />
            <StatCard
              title="Conversion Rate"
              value={`${dashboardStats.conversionRate}%`}
              change={dashboardStats.conversionGrowth}
              icon={TrendingUp}
              index={3}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Revenue Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Revenue Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-200 dark:stroke-gray-700"
                  />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Traffic Pie Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Traffic Sources
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Orders
              </h3>
              <button className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {order.customer}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {order.product}
                      </td>
                      <td className="py-3 px-4 font-medium">${order.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Balance Card */}
          <Card className="p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Balance
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                $12,430
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +$1,240 profit this month
              </p>
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700">
              <Plus className="w-5 h-5" />
            </button>
          </Card>

          {/* Activity Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Activity
              </h3>
              <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
                See All
              </button>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ArrowDownCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Withdraw Earnings
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  +$450
                </span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ArrowUpCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Pending Payment
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  -$120
                </span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Website Tax
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  -$60
                </span>
              </li>
            </ul>
          </Card>

          {/* Top Categories */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Top Categories
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your store’s most popular categories this month. These drive the
              highest sales volume.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Footwear
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  240 units
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Package className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Accessories
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  180 units
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
