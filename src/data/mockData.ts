// Mock data for the dashboard
export const dashboardStats = {
  totalRevenue: 45231.89,
  totalUsers: 2350,
  totalSessions: 12234,
  conversionRate: 3.24,
  revenueGrowth: 12.5,
  userGrowth: 8.2,
  sessionGrowth: 15.3,
  conversionGrowth: -2.4
};

export const chartData = [
  { name: 'Jan', revenue: 4000, users: 240, sessions: 1200 },
  { name: 'Feb', revenue: 3000, users: 139, sessions: 980 },
  { name: 'Mar', revenue: 2000, users: 980, sessions: 1400 },
  { name: 'Apr', revenue: 2780, users: 390, sessions: 1200 },
  { name: 'May', revenue: 1890, users: 480, sessions: 1100 },
  { name: 'Jun', revenue: 2390, users: 380, sessions: 1300 },
  { name: 'Jul', revenue: 3490, users: 430, sessions: 1400 },
  { name: 'Aug', revenue: 4000, users: 520, sessions: 1600 },
  { name: 'Sep', revenue: 3200, users: 450, sessions: 1350 },
  { name: 'Oct', revenue: 4100, users: 580, sessions: 1700 },
  { name: 'Nov', revenue: 3800, users: 520, sessions: 1550 },
  { name: 'Dec', revenue: 4500, users: 650, sessions: 1800 }
];

export const pieChartData = [
  { name: 'Desktop', value: 68, fill: '#3B82F6' },
  { name: 'Mobile', value: 24, fill: '#8B5CF6' },
  { name: 'Tablet', value: 8, fill: '#10B981' }
];

export const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    email: 'john@example.com',
    product: 'Premium Plan',
    amount: 299.99,
    status: 'completed',
    date: '2024-01-15'
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    email: 'sarah@example.com',
    product: 'Basic Plan',
    amount: 99.99,
    status: 'pending',
    date: '2024-01-14'
  },
  {
    id: 'ORD-003',
    customer: 'Mike Davis',
    email: 'mike@example.com',
    product: 'Pro Plan',
    amount: 199.99,
    status: 'completed',
    date: '2024-01-13'
  }
];

export const users = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-14T15:22:00Z'
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'User',
    status: 'inactive',
    lastLogin: '2024-01-10T09:15:00Z'
  }
];

export const products = [
  {
    id: '1',
    name: 'Premium Dashboard Template',
    price: 299.99,
    category: 'Templates',
    stock: 45,
    status: 'active',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: 234
  },
  {
    id: '2',
    name: 'UI Component Library',
    price: 199.99,
    category: 'Components',
    stock: 0,
    status: 'out-of-stock',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: 156
  },
  {
    id: '3',
    name: 'Landing Page Kit',
    price: 149.99,
    category: 'Templates',
    stock: 23,
    status: 'active',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: 89
  }
];

export const invoices = [
  {
    id: 'INV-001',
    customer: 'Acme Corp',
    email: 'billing@acme.com',
    amount: 1299.99,
    status: 'paid',
    date: '2024-01-15',
    dueDate: '2024-02-15'
  },
  {
    id: 'INV-002',
    customer: 'Tech Solutions Ltd',
    email: 'finance@techsolutions.com',
    amount: 899.99,
    status: 'pending',
    date: '2024-01-12',
    dueDate: '2024-02-12'
  },
  {
    id: 'INV-003',
    customer: 'Digital Agency',
    email: 'accounts@digitalagency.com',
    amount: 599.99,
    status: 'overdue',
    date: '2024-01-05',
    dueDate: '2024-02-05'
  }
];

export const messages = [
  {
    id: '1',
    sender: 'Alice Cooper',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    message: 'Hey! How are you doing today?',
    timestamp: '2024-01-15T10:30:00Z',
    unread: true
  },
  {
    id: '2',
    sender: 'Bob Wilson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    message: 'Can we schedule a meeting for tomorrow?',
    timestamp: '2024-01-15T09:15:00Z',
    unread: true
  },
  {
    id: '3',
    sender: 'Carol Davis',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    message: 'The project looks great! Well done.',
    timestamp: '2024-01-14T16:45:00Z',
    unread: false
  }
];

export const calendarEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2024-01-20',
    time: '10:00 AM',
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Project Deadline',
    date: '2024-01-25',
    time: '5:00 PM',
    type: 'deadline'
  },
  {
    id: '3',
    title: 'Client Call',
    date: '2024-01-18',
    time: '2:00 PM',
    type: 'call'
  }
];