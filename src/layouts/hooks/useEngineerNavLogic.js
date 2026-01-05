import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useEngineerNavLogic = () => {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // 🔹 Nav links with individual active colors
  const navLinks = [
    {
      label: 'My Projects',
      link: '/engineer/my-projects',
      icon: '📁',
      activeClass: 'bg-red-600 text-white'
    },
    {
      label: 'Project Reports',
      link: '/engineer/project-reports',
      icon: '📊',
      activeClass: 'bg-blue-600 text-white'
    }
  ]

  return { pathname, navLinks, menuOpen, setMenuOpen }
}
