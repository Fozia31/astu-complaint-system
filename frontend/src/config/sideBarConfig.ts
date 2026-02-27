import { 
  LayoutDashboard, 
  MessageSquarePlus, 
  ListChecks, 
  User, 
  Users, 
  ShieldCheck,
  Settings
} from 'lucide-react';

export const  sidebarConfig = {

  student: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { name: 'Submit Complaint', icon: MessageSquarePlus, path: '/student/submit-complaint' },
    { name: 'My Complaints', icon: ListChecks, path: '/student/my-complaints' },
    { name: 'Profile', icon: User, path: '/student/profile' },
  ],
  staff: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/staff/dashboard' },
    { name: 'Assigned Complaints', icon: ListChecks, path: '/staff/assigned' },
    { name: 'Profile', icon: User, path: '/profile' },
  ],
  admin: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'All Complaints', icon: ListChecks, path: '/admin/all-complaints' },
    { name: 'Manage Users', icon: Users, path: '/admin/users' },
    { name: 'Categories', icon: ShieldCheck, path: '/admin/categories' },
    { name: 'System Settings', icon: Settings, path: '/admin/settings' },
  ]
};

export type Role = keyof typeof sidebarConfig;