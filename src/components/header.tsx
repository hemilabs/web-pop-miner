import { usePopminerContext } from 'context/popminerContext'
import { PlayButton } from './playButton'
import { Steps } from './steps'
import { Link, useLocation } from 'react-router-dom'
import { HemiLogo } from './hemiLogo'
import { OpenLinkIcon } from 'icons/openLinkIcon'
import { LoadingSpinner } from './loadingSpinner'

export const Header = function () {
  const { state, setState } = usePopminerContext()
  const { pathname } = useLocation()

  const TestnetLabel = () => (
    <div className="solid flex items-center justify-center rounded-full border border-orange-200/55 bg-orange-50 px-3 py-1 text-base font-medium leading-normal text-orange-950">
      <span>{!state.rightPanel ? 'PoP Miner -' : ''} Testnet</span>
    </div>
  )

  const handlePlay = () => {
    setState(prevState => ({ ...prevState, active: !prevState.active }))
  }

  const showTestnetLabel = pathname !== '/' && !state.rightPanel

  return (
    <header className="mx-4 flex items-center justify-between py-4">
      <div className="flex items-center gap-x-4">
        <Link to="/">
          <div className="h-10 w-28">
            <HemiLogo />
          </div>
        </Link>
        {showTestnetLabel && <TestnetLabel />}
      </div>
      <div className="flex flex-grow justify-center">
        <div className="hidden items-center md:flex">
          <Steps />
        </div>
      </div>
      {pathname === '/explorer' ? (
        <div className="flex flex-grow justify-end">
          <div className="hidden items-center md:flex">
            {state.active && (
              <>
                <LoadingSpinner />
                <p className="mx-2 text-base leading-normal text-neutral-500">
                  <span className="mr-1 text-orange-500">
                    The PoP Miner is running.
                  </span>
                  Don’t close the page
                </p>
              </>
            )}
            <PlayButton onClick={handlePlay} isPlaying={state.active} />
          </div>
        </div>
      ) : (
        <>
          {!state.rightPanel ? (
            <a
              href={`${
                import.meta.env.VITE_HEMI_DOCS_URL
              }/how-to-tutorials/pop-mining/web-based-pop-miner`}
              rel="noopener noreferrer"
              target="_blank"
              className="hidden items-center md:flex"
            >
              <p className="flex items-center text-center text-sm font-medium text-neutral-500">
                Learn more about the Web PoP Miner
                <span className="ml-1">
                  <OpenLinkIcon />
                </span>
              </p>
            </a>
          ) : (
            <TestnetLabel />
          )}
        </>
      )}
    </header>
  )
}
