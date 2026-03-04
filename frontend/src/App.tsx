import { Navigate, Route, Routes } from 'react-router-dom'
import Home from "@/pages/(public)/home/page.tsx"
import About from '@/pages/(public)/about/page.tsx'
import Login from '@/pages/(public)/login/page.tsx'
import Register from '@/pages/(public)/register/page.tsx'
import DashboardLayout from '@/components/DashboardLayout'

// Student Components
import SubmitComplaint from '@/components/student/SubmitComplaint.tsx'
import ProfilePage from '@/components/student/Profile.tsx'
import MyComplaints from '@/components/student/MyComplaints.tsx'
import StudentDashboard from '@/components/student/StudentDashboard.tsx'
import ComplaintDetail from '@/components/student/ComplaintDetail.tsx'

import ManageUsers from '@/components/admin/StudentsList.tsx'
import CategoryManager from '@/components/admin/CategoryManager.tsx'
import AdminComplaints from '@/components/admin/AdminComplaints.tsx'
import AdminDashboard from '@/components/admin/AdminDashboard.tsx'
import ComplaintDetails from '@/components/admin/ComplaintDetails.tsx'
import StaffComplaintDetail from '@/components/staff/StaffComplaintDetail.tsx'
import StaffDashboard from '@/components/staff/StaffDashboard.tsx'
import AssignedComplaints from '@/components/staff/AssignedComplaints.tsx'
import StaffManagement from '@/components/admin/StaffManagement.tsx'

const App = () => {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
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