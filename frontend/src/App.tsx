import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/(public)/home/page'
import About from '@/pages/(public)/About/page'
import Login from '@/pages/(public)/login/page'
import Register from '@/pages/(public)/register/page'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App