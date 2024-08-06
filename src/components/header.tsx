import { usePopminerContext } from 'context/popminerContext'
import { PlayButton } from './playButton'
import { Steps } from './steps'
import { Link, useLocation } from 'react-router-dom'
import { HemiLogo } from './hemiLogo'
import { OpenLinkIcon } from 'icons/openLinkIcon'
import { LoadingSpinner } from './loadingSpinner'

const TestnetLabel = () => (
  <div className="solid flex items-center justify-center rounded-full border border-orange-200/55 bg-orange-50 px-3 py-1 text-base font-medium leading-normal text-orange-950">
    <span>PoP Miner - Testnet</span>
  </div>
)

export const Header = function () {
  const { state, setState } = usePopminerContext()
  const { pathname } = useLocation()

  const handlePlay = () => {
    setState(prevState => ({ ...prevState, active: !prevState.active }))
  }

  return (
    <header className="mx-4 flex items-center justify-between p-4 md:mx-20">
      <div className="flex items-center gap-x-4">
        <Link to="/">
          <div className="h-10 w-28">
            <HemiLogo />
          </div>
        </Link>
        {pathname !== '/' && <TestnetLabel />}
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
      )}
    </header>
  )
}
