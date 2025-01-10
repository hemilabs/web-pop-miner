import React, { ReactNode, useEffect } from 'react';
import { usePopminerContext } from 'context/popminerContext';

interface Props {
  rightPanel: ReactNode;
  children: ReactNode;
}

export function PageWithRightpanel({ rightPanel, children }: Props) {
  const { setState } = usePopminerContext();

  useEffect(function () {
    setState(prevState => ({
      ...prevState,
      rightPanel,
    }));

    return function () {
      setState(prevState => ({
        ...prevState,
        rightPanel: null,
      }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
