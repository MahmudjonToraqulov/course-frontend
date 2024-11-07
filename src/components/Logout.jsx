import React, { useState } from 'react'

function Logout() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }
  return (
    <>
      { isAuthenticated && <button onClick={handleLogout} style={{ color: 'white', padding: '5px 10px', fontSize: '20px', background: 'crimson' }}> Logout </button>}
    </>
  )
}

export default Logout
