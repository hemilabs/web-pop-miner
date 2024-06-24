import { useLocation } from 'react-router-dom'
import { Stepper } from './stepper'

export const Steps = function () {
  const { pathname } = useLocation()
  const steps = ['Manage Private Key', 'Fund Address']

  const routeToStep: { [key: string]: number } = {
    manage: 0,
    fund: 1,
  }

  const foundKey = Object.keys(routeToStep).find(key => pathname.endsWith(key))
  const currentStep = foundKey !== undefined ? routeToStep[foundKey] : -1

  if (currentStep === -1) return null

  return <Stepper currentStep={currentStep} steps={steps} />
}
