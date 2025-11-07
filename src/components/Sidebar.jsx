import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaList, FaUtensils, FaCalendarCheck, FaSignOutAlt } from 'react-icons/fa'
import RegaliaLogo from "../assets/Regalia.png"

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('User')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('role')
    window.location.href = '/'
  }

  const menuItems = [
    {
      title: 'Calendar',
      icon: FaCalendarAlt,
      path: '/calendar'
    },
    {
      title: 'Booking List',
      icon: FaList,
      path: '/banquet/list-booking'
    },
    {
      title: 'Menu Plan',
      icon: FaUtensils,
      path: '/menu-plan'
    },
    {
      title: 'Lagan Calendar',
      icon: FaCalendarCheck,
      path: '/lagan-calendar'
    }
  ]

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 w-64 bg-gray-800 text-white min-h-screen z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-600">
        <div className="flex flex-col items-center">
          <div className="w-49 h-49 text-2xl">
            <img src={RegaliaLogo} alt="Regalia Logo" className="w-full h-full object-contain" />
          </div>
          {/* <h1 className="text-xl font-bold text-yellow-400">ASHOKA</h1>
          <p className="text-xs text-gray-400 uppercase tracking-wider">HOTEL</p>
          <p className="text-xs text-gray-500 mt-1">SAPAN SINCE COMFORT</p> */}
        </div>
      </div>

      {/* Admin Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-[#c3ad6b] font-semibold text-lg">ADMIN</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 flex flex-col">
        <ul className="space-y-2 flex-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-[#c3ad6b] text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3 text-[#c3ad6b]" />
                <span className="font-medium">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            <FaSignOutAlt className="w-5 h-5 mr-3 text-[#c3ad6b]" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
      </div>
    </>
  )
}

export default Sidebar