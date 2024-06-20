import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Footer } from './footer'
import { Header } from './header'
import { useEffect } from 'react'
import { DesignForDesktop } from './designForDesktop'

export const Layout = function () {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(
    function redirectToFirstStep() {
      if (pathname === '/') {
        navigate('/manage')
      }
    },
    [navigate, pathname],
  )

  return (
    <div className="flex min-h-screen flex-col px-12 py-8">
      <div className="flex-shrink-0 ">
        <Header />
      </div>
      <div className="py-16 md:hidden">
        <DesignForDesktop />
      </div>
      <div className="hidden flex-grow items-center justify-center md:flex">
        <Outlet />
      </div>
      <div className="hidden flex-shrink-0 md:flex">
        <Footer />
      </div>
    </div>
  )
}
