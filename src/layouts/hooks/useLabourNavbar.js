import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLabourNavbar = () => {
  const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, _setUserRole] = useState(
    () => sessionStorage.getItem('userRole') || ''
  )

  useEffect(() => {
    const roleExist = sessionStorage.getItem('userRole')
    if (!roleExist) {
      navigate('/')
      return
    }
  }, [navigate])

   const handleExit = () => {
    sessionStorage.removeItem("userRole");

    navigate("/");
  };

  return { userRole ,handleExit,menuOpen, setMenuOpen}
}
