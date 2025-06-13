import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import Card from '../components/Card';
import { messages } from '../data/mockData';

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Mock sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Stay connected with your team and clients</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Messages List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                    selectedMessage.id === message.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={message.avatar}
                        alt={message.sender}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {message.unread && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium truncate ${
                          message.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {message.sender}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className={`text-sm truncate mt-1 ${
                        message.unread ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedMessage.avatar}
                    alt={selectedMessage.sender}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedMessage.sender}
                    </h3>
                    <p className="text-sm text-green-500">Online</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {formatDate(selectedMessage.timestamp)}
                </span>
              </div>
              
              {/* Received Message */}
              <div className="flex items-start space-x-3">
                <img
                  src={selectedMessage.avatar}
                  alt={selectedMessage.sender}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-900 dark:text-white">{selectedMessage.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    {formatTime(selectedMessage.timestamp)}
                  </span>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex items-start space-x-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="bg-primary-500 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-white">Thanks for reaching out! I'll get back to you shortly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Messages;