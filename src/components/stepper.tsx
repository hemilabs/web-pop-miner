import React from 'react'

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" fill="none">
    <path
      stroke="#10B981"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.0}
      d="m.75 5.375 3 3 4.5-6.75"
    />
  </svg>
)

/**
 * Props for the Stepper component are defined here as an interface.
 * The currentStep prop is a number that represents the current step in the stepper.
 * It starts from 0 and goes up to the number of steps in the stepper.
 * The steps prop is an array of strings that represent the steps in the stepper.
 */
interface Props {
  currentStep: number
  steps: string[]
}

export const Stepper = function ({ currentStep, steps }: Props) {
  const totalFutureSteps = steps.length - currentStep - 1
  const currentText = steps[currentStep] || 'No steps found'
  const currentStepText = currentStep + 1

  return (
    <div className="flex items-center">
      <div className="h-[1.5px] w-10 bg-gradient-to-l from-emerald-500 to-transparent" />

      {Array.from({ length: currentStep }, (_, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className="h-[1.5px] w-10 bg-emerald-500" />}
          <div className="flex items-center space-x-2 rounded-full border-2 border-emerald-500 p-[5px]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-base font-medium text-emerald-500">
              <CheckIcon />
            </div>
          </div>
        </React.Fragment>
      ))}

      {currentStep > 0 && <div className="h-[1.5px] w-10 bg-emerald-500" />}
      <div className="flex items-center space-x-2 rounded-full border-2 border-emerald-500 px-2 py-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-base font-medium text-emerald-500">
          {currentStepText}
        </div>
        <span className="text-base text-neutral-950">{currentText}</span>
      </div>

      {Array.from({ length: totalFutureSteps }, (_, index) => (
        <React.Fragment key={index}>
          <div className="h-[1.5px] w-8 bg-slate-100" />
          <div className="flex items-center space-x-2 rounded-full border-2 border-slate-100 p-[5px]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-base font-medium text-neutral-950">
              {currentStep + index + 2}
            </div>
          </div>
        </React.Fragment>
      ))}

      {totalFutureSteps > 0 && (
        <div className="h-[1.5px] w-10 bg-gradient-to-l from-transparent to-slate-100" />
      )}

      {totalFutureSteps === 0 && (
        <div className="h-[1.5px] w-10 bg-gradient-to-l from-transparent to-emerald-500" />
      )}
    </div>
  )
}
