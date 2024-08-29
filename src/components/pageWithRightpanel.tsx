import React, { ReactNode, useEffect } from 'react'
import { usePopminerContext } from 'context/popminerContext'

interface Props {
  rightPanel: ReactNode
  children: ReactNode
}

export const PageWithRightpanel = ({ rightPanel, children }: Props) => {
  const { setState } = usePopminerContext()

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      rightPanel,
    }))

    return () => {
      setState(prevState => ({
        ...prevState,
        rightPanel: null,
      }))
    }
  }, [])

  return <>{children}</>
}
