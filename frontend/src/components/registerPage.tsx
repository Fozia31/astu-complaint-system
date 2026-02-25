// import React from 'react'

const registerPage = () => {

    
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="">

        </div>

        <div className="">
            <h1 className="text-2xl font-bold mb-4">Register </h1>
            <p className=""></p>
            <form action="" className="">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" className="" />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="" />

                <label htmlFor="department">Department</label>
                <input type="text" name="department" id="department" className="" />

                <label htmlFor="role">Role</label>
                <select name="role" id="role">
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                </select>
            </form>
        </div>
    </div>
  )
}

export default registerPage