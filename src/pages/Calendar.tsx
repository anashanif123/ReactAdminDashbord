import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactCalendar from 'react-calendar';
import { Plus, Clock, Users, Phone } from 'lucide-react';
import Card from '../components/Card';
import { calendarEvents } from '../data/mockData';
import 'react-calendar/dist/Calendar.css';

const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return calendarEvents.filter(event => event.date === dateString);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return Users;
      case 'call':
        return Phone;
      case 'deadline':
        return Clock;
      default:
        return Clock;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'call':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'deadline':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const events = getEventsForDate(date);
      if (events.length > 0) {
        return (
          <div className="flex justify-center mt-1">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your schedule and appointments</p>
        </div>
        
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="calendar">
              <ReactCalendar
                onChange={(value) => {
                  setDate(value as Date);
                  setSelectedDate(value as Date);
                }}
                value={date}
                tileContent={tileContent}
                className="w-full"
              />
            </div>
          </Card>
        </motion.div>

        {/* Events Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Today's Events */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {selectedDate ? `Events for ${selectedDate.toLocaleDateString()}` : "Today's Events"}
            </h3>
            <div className="space-y-3">
              {(selectedDate ? getEventsForDate(selectedDate) : getEventsForDate(new Date())).map((event) => {
                const Icon = getEventIcon(event.type);
                return (
                  <div
                    key={event.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{event.time}</p>
                    </div>
                  </div>
                );
              })}
              {(selectedDate ? getEventsForDate(selectedDate) : getEventsForDate(new Date())).length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  No events scheduled
                </p>
              )}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {calendarEvents.map((event) => {
                const Icon = getEventIcon(event.type);
                return (
                  <div
                    key={event.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Events</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Meetings</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Calls</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Deadlines</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">4</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Calendar;