import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
}

const Portal: FC<PortalProps> = ({ children }) => {
  const [portal] = useState((): HTMLDivElement => {
    const el = document.createElement('div');
    el.id = 'portal';
    return el;
  });

  useEffect(() => {
    document.body.appendChild(portal);
    return () => {
      document.body.removeChild(portal);
    };
  }, []);

  return createPortal(children, portal);
};

export default Portal;
