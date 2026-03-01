import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '@/pages/(public)/home/page'
import About from '@/pages/(public)/About/page'
import Login from '@/pages/(public)/login/page'
import Register from '@/pages/(public)/register/page'
import DashboardLayout from './components/DashboardLayout'

// Student Components
import SubmitComplaint from './components/student/SubmitComplaint'
import ProfilePage from './components/student/Profile'
import MyComplaints from './components/student/MyComplaints'
import StudentDashboard from './components/student/StudentDashboard'
import ComplaintDetail from './components/student/ComplaintDetail'

import ManageUsers from './components/admin/StudentsList'
import CategoryManager from './components/admin/CategoryManager'
import AdminComplaints from './components/admin/AdminComplaints'
import AdminDashboard from './components/admin/AdminDashboard'
import ComplaintDetails from './components/admin/ComplaintDetails'
import StaffComplaintDetail from './components/staff/StaffComplaintDetail'
import StaffDashboard from './components/staff/StaffDashboard'
import AssignedComplaints from './components/staff/AssignedComplaints'
import StaffManagement from './components/admin/StaffManagement'

const App = () => {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/student" element={<DashboardLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<StudentDashboard />} />
    <Route path="submit-complaint" element={<SubmitComplaint />} />
    <Route path="my-complaints" element={<MyComplaints />} />
    <Route path="my-complaints/:id" element={<ComplaintDetail />} />
    <Route path="profile" element={<ProfilePage />} />
  </Route> 

  <Route path="/admin" element={<DashboardLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} /> 
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="complaints" element={<AdminComplaints />} />
    <Route path="complaints/:id" element={<ComplaintDetails />} />
    <Route path="students" element={<ManageUsers />} />
    <Route path="categories" element={<CategoryManager />} />
    <Route path="staff-management" element={<StaffManagement />} />
  </Route>

  {/* Staff Protected Routes */}
  <Route path="/staff" element={<DashboardLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<StaffDashboard />} />
    <Route path="assigned" element={<AssignedComplaints />} />
    <Route path="complaints/:id" element={<StaffComplaintDetail />} />
  </Route>

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
  )
}

export default App