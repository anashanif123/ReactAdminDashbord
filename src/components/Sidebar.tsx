import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Package, 
  FileText, 
  Calendar, 
  User, 
  MessageSquare, 
  Settings,
  X
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 glass">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  Admin Pro
                </span>
              </motion.div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        to={item.href}
                        className={clsx(
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200',
                          isActive
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        )}
                      >
                        <Icon className={clsx(
                          'mr-3 flex-shrink-0 h-5 w-5 transition-colors',
                          isActive 
                            ? 'text-primary-500' 
                            : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                        )} />
                        {item.name}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
      >
        <div className="flex flex-col h-full glass">
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                Admin Pro
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={clsx(
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200',
                      isActive
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Icon className={clsx(
                      'mr-3 flex-shrink-0 h-5 w-5 transition-colors',
                      isActive 
                        ? 'text-primary-500' 
                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                    )} />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;