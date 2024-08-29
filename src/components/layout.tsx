import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './footer'
import { Header } from './header'
import { DesignForDesktop } from './designForDesktop'
import { IntroPage } from 'pages/intro/page'
import { usePopminerContext } from 'context/popminerContext'
import { HelpSection } from './helpSection'
import { ReactNode } from 'react'

interface RightPanelProps {
  content: ReactNode
}

const RightPanel = ({ content }: RightPanelProps) => (
  <div className="my-3 mr-3 hidden flex-grow flex-col overflow-y-auto rounded-2xl border border-slate-100 bg-custom-gradient-rightpanel shadow-custom-rightpanel md:flex md:w-1/2">
    <div className="flex flex-grow items-center justify-center">{content}</div>
    <HelpSection />
  </div>
)

export const Layout = function () {
  const { pathname } = useLocation()
  const { state } = usePopminerContext()

  return (
    <div
      className={`flex min-h-screen flex-col ${
        pathname === '/explorer' ? 'bg-custom-gradient-explorer' : ''
      }`}
    >
      {pathname === '/' ? (
        <IntroPage />
      ) : (
        <>
          <main className="flex flex-grow">
            <div
              className={`flex flex-col ${
                state.rightPanel ? 'w-full md:w-1/2' : 'w-full'
              } overflow-y-auto`}
            >
              <Header />
              <div className="flex-grow md:flex md:items-center md:justify-center">
                <div className="py-16 md:hidden">
                  <DesignForDesktop />
                </div>
                <div className="hidden flex-grow items-center justify-center md:flex">
                  <Outlet />
                </div>
              </div>
              <div className="flex-shrink-0">
                <Footer />
              </div>
            </div>
            {state.rightPanel && <RightPanel content={state.rightPanel} />}
          </main>
        </>
      )}
    </div>
  )
}
