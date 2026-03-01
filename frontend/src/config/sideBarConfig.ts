import { 
  LayoutDashboard, 
  MessageSquarePlus, 
  ListChecks, 
  User, 
  Users, 
  ShieldCheck,
} from 'lucide-react';

export const sidebarConfig = {
  student: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { name: 'Submit Complaint', icon: MessageSquarePlus, path: '/student/submit-complaint' },
    { name: 'My Complaints', icon: ListChecks, path: '/student/my-complaints' },
    { name: 'Profile', icon: User, path: '/student/profile' },
  ],
  staff: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/staff/dashboard' },
    { name: 'Assigned Complaints', icon: ListChecks, path: '/staff/assigned' },
  ],
  admin: [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'All Complaints', icon: ListChecks, path: '/admin/complaints' }, 
  { name: 'Manage Users', icon: Users, path: '/admin/students' }, 
  { name: 'Staff Management', icon: Users, path: '/admin/staff-management' }, 
  { name: 'Categories', icon: ShieldCheck, path: '/admin/categories' },
]
};

export type Role = keyof typeof sidebarConfig;