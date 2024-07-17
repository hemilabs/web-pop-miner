import { HemiLogo } from 'components/hemiLogo'
import { Link } from 'react-router-dom'
import { IntroSteps } from './_components/introSteps'

export const IntroPage = function () {
  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 md:flex-row">
      <div className="flex h-full w-full flex-col md:w-3/5">
        <div className="bg-gray-intro flex w-full flex-1 items-center justify-center p-4">
          <div className="flex max-w-xl flex-col items-start p-2">
            <div className="mb-6 h-10 w-28 md:mb-9">
              <HemiLogo />
            </div>
            <h1 className="mb-4 text-3xl font-medium text-neutral-950 md:text-6xl">
              Operate the PoP Miner application and earn rewards
            </h1>
            <p className="mb-4 text-base font-medium text-neutral-500 md:text-lg">
              Mining within the Hemi Network involves a specialized process
              designed to intertwine the security of the Hemi Network with that
              of the Bitcoin blockchain.
            </p>
            <div className="flex w-full flex-col justify-start space-y-4 text-base font-medium md:mb-6 md:flex-row md:space-x-4 md:space-y-0">
              <Link to="/manage" className="w-full">
                <button className="w-full rounded-lg bg-orange-500 p-2 text-white transition-colors duration-300 hover:bg-orange-600">
                  Open web PoP miner
                </button>
              </Link>
              <a
                href="https://docs.hemi.xyz/how-to-tutorials/pop-mining"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="w-full rounded-lg border border-solid bg-white p-2 text-neutral-950 shadow-custom-intro transition-colors duration-300 hover:bg-neutral-50">
                  Learn more about PoP mining
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="relative flex w-full flex-1 items-center justify-center bg-custom-intro-mobile-img p-4 md:bg-none">
          <div className="relative z-10 flex flex-col">
            <h2 className="mb-4 text-lg font-medium text-neutral-500">
              How It Works?
            </h2>
            <div className="max-w-lg space-y-6">
              <hr className="mb-8 w-full border-neutral-200" />
              <IntroSteps
                position={1}
                textBold="Fetching Headers:"
                text="The PoP Miner retrieves network headers from the Bitcoin Finality Governor for Bitcoin blockchain publication."
              />
              <IntroSteps
                position={2}
                textBold="Transaction Construction:"
                text="The miner constructs Bitcoin transactions embedding aforementioned Hemi Network headers."
              />
              <IntroSteps
                position={3}
                textBold="Proof of Publication:"
                text="Miners broadcast transactions through the Governor. These transactions are then integrated into Hemi’s consensus layer after being validated via the Bitcoin network, resulting in miner rewards."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto hidden h-1/2 w-full max-w-4xl items-center justify-center md:flex md:h-full md:w-1/2">
        <img
          className="h-full w-full object-fill"
          src="/images/miningFlowCover.webp"
          alt="Mining illustration"
        />
      </div>
    </div>
  )
}
