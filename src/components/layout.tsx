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
    <div className="flex min-h-screen flex-col">
      <div className="flex-shrink-0">
        <Header />
      </div>
      <main className="flex max-h-[calc(100vh-9rem)] flex-grow flex-col overflow-y-auto">
        <div className="flex-grow py-16 md:hidden">
          <DesignForDesktop />
        </div>
        <div className="hidden flex-grow items-center justify-center md:flex">
          <Outlet />
        </div>
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  )
}
