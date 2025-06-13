import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Globe, Palette, Monitor, Save } from 'lucide-react';
import Card from '../components/Card';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

const Settings: React.FC = () => {
  const { theme, colorTheme, setTheme, setColorTheme } = useTheme();
  const { logout } = useAuth();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
    dataCollection: true
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC-8',
    dateFormat: 'MM/DD/YYYY',
    autoSave: true
  });

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' }
  ];

  const colors = [
    { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { value: 'green', label: 'Green', color: 'bg-green-500' },
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
    { value: 'rose', label: 'Rose', color: 'bg-rose-500' }
  ];

  const handleSaveSettings = () => {
    // Mock save functionality
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account preferences and application settings</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption.value}
                      onClick={() => setTheme(themeOption.value as any)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        theme === themeOption.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{themeOption.icon}</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {themeOption.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Color Theme
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setColorTheme(color.value as any)}
                      className={`relative p-3 rounded-lg border-2 transition-all ${
                        colorTheme === color.value
                          ? 'border-gray-400 dark:border-gray-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className={`w-8 h-8 ${color.color} rounded-full mx-auto`}></div>
                      <div className="text-xs font-medium text-gray-900 dark:text-white mt-2">
                        {color.label}
                      </div>
                      {colorTheme === color.value && (
                        <div className="absolute inset-0 rounded-lg border-2 border-gray-400 dark:border-gray-300"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {key === 'sms' ? 'SMS' : key} Notifications
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Receive {key} notifications for important updates
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Security</h3>
            </div>

            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {key === 'profileVisible' && 'Public Profile'}
                      {key === 'activityVisible' && 'Activity Status'}
                      {key === 'dataCollection' && 'Data Collection'}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {key === 'profileVisible' && 'Make your profile visible to other users'}
                      {key === 'activityVisible' && 'Show when you\'re online or active'}
                      {key === 'dataCollection' && 'Allow collection of usage data for improvements'}
                    </p>
                  </div>
                  <button
                    onClick={() => setPrivacy({ ...privacy, [key]: !value })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* General Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Preferences</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">GMT (UTC+0)</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date Format
                </label>
                <select
                  value={preferences.dateFormat}
                  onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Auto-save</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Automatically save changes as you work
                  </p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, autoSave: !preferences.autoSave })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.autoSave ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
      >
        <button
          onClick={handleSaveSettings}
          className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          Save All Settings
        </button>

        <button
          onClick={handleLogout}
          className="px-6 py-3 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Log Out
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;