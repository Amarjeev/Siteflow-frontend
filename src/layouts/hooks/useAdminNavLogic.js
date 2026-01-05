import { useState} from 'react'
import { useLocation } from 'react-router-dom'

export const useAdminNavLogic = () => {
  const { pathname } = useLocation()

  const [adminEmail, _setAdminEmail] = useState(
    () => sessionStorage.getItem('userEmail') || 'N/A'
  )

  const [adminName, _setAdminName] = useState(
    () => sessionStorage.getItem('userName') || 'N/A'
  )

  const [menuOpen, setMenuOpen] = useState(false)


  const navLinks = [
    ['Projects', '/admin/projects', '📁'],
    ['Create Project', '/admin/create-project', '➕'],
    ['Add Staff', '/admin/create/staff-profile', '👤'],
    ['Project Assignment', '/admin/projects/assign', '🧩'],
    ['Staff Profiles', '/admin/staff/profile/edit', '🗂️'],
    ['Labour Profiles', '/admin/labour/profile', '🧑']
  ]

  const linkStyle = isActive =>
    `
      relative flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
      transition-all duration-200
      ${
        isActive
          ? 'text-red-600 bg-red-50'
          : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
      }
      hover:scale-[1.05]
    `

  return {
    adminName,
    adminEmail,
    menuOpen,
    setMenuOpen,
    pathname,
    navLinks,
    linkStyle
  }
}
