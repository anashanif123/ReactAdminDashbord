import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, Search, Check, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #ORD-001 has been placed by John Smith',
      time: '2 minutes ago',
      unread: true,
      type: 'order'
    },
    {
      id: '2',
      title: 'Payment Processed',
      message: 'Payment of $299.99 has been successfully processed',
      time: '15 minutes ago',
      unread: true,
      type: 'payment'
    },
    {
      id: '3',
      title: 'User Registration',
      message: 'New user Sarah Johnson has registered',
      time: '1 hour ago',
      unread: false,
      type: 'user'
    },
    {
      id: '4',
      title: 'System Update',
      message: 'System maintenance completed successfully',
      time: '2 hours ago',
      unread: false,
      type: 'system'
    },
    {
      id: '5',
      title: 'Invoice Generated',
      message: 'Invoice #INV-004 has been generated for Acme Corp',
      time: '3 hours ago',
      unread: false,
      type: 'invoice'
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return '🛒';
      case 'payment':
        return '💳';
      case 'user':
        return '👤';
      case 'system':
        return '⚙️';
      case 'invoice':
        return '📄';
      default:
        return '📢';
    }
  };

  const markAsRead = (notificationId: string) => {
    // In a real app, this would update the notification status
    console.log('Marking notification as read:', notificationId);
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    console.log('Marking all notifications as read');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
       style={{ position: 'relative', zIndex: 1000 }}
      className="glass border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 lg:px-6"
    >
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center ml-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                style={{ zIndex: 9999 }} 
                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                          notification.unread ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={`text-sm font-medium truncate ${
                                notification.unread 
                                  ? 'text-gray-900 dark:text-white' 
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}>
                                {notification.title}
                              </h4>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-primary-500 rounded-full ml-2 flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;