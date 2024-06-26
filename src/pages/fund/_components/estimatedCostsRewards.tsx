import React from 'react'
import Skeleton from 'react-loading-skeleton'
import {
  calculateCostsRewards,
  useCostsRewards,
} from '../_hooks/useCostsRewards'

export const EstimatedCostsRewards = () => {
  const { data, isLoading } = useCostsRewards()
  const dataToRender = calculateCostsRewards(
    data || { bitcoinCost: 0, hemiReward: 0 },
  )

  return (
    <div className="grid w-full grid-cols-3-column-layout pt-4">
      <div className="col-start-2 mx-auto max-w-lg">
        <div className="rounded-3xl border border-solid border-slate-100 bg-white px-10 py-6">
          <div className="flex w-full flex-col gap-y-3">
            <h2 className="mb-2 text-base font-medium leading-tight text-neutral-950">
              Estimated mining costs and rewards
            </h2>
            <div className="overflow-x-auto">
              <div className="overflow-hidden rounded-t-lg">
                <table className="min-w-full bg-white">
                  <thead className="bg-neutral-50">
                    <tr className="border border-neutral-100 bg-neutral-50">
                      <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">
                        Cost (est.)
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">
                        Reward (est.)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading
                      ? [1, 2, 3].map(i => (
                          <tr key={i} className="border-t border-neutral-200">
                            <td className="px-6 py-3">
                              <Skeleton width={100} />
                            </td>
                            <td className="px-6 py-3">
                              <Skeleton width={100} />
                            </td>
                            <td className="px-6 py-3">
                              <Skeleton width={100} />
                            </td>
                          </tr>
                        ))
                      : dataToRender.map(({ id, time, cost, reward, unit }) => (
                          <tr key={id} className="border-t border-neutral-200">
                            <td className="px-6 py-3 text-sm font-medium text-neutral-950">
                              {time}
                            </td>
                            <td className="whitespace-nowrap px-6 py-3">
                              <div className="flex items-center">
                                <span className="rounded-full bg-neutral-50 px-2 py-1 text-neutral-500">
                                  {cost}
                                </span>
                                <span className="ml-2 text-neutral-500">
                                  Bitcoin
                                </span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-3">
                              <div className="flex items-center">
                                <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-600">
                                  {reward}
                                </span>
                                <span className="ml-2 text-neutral-500">
                                  {unit}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
