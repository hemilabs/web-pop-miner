import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './footer'
import { Header } from './header'
import { DesignForDesktop } from './designForDesktop'
import { IntroPage } from 'pages/intro/page'

export const Layout = function () {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      {pathname === '/' ? (
        <IntroPage />
      ) : (
        <>
          <Header />
          <main className="flex max-h-[calc(100vh-9rem)] flex-grow flex-col overflow-y-auto">
            <div className="flex-grow py-16 md:hidden">
              <DesignForDesktop />
            </div>
            <div className="hidden flex-grow items-center justify-center md:flex">
              <Outlet />
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
