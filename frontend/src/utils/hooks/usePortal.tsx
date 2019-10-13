import { useEffect, useMemo, ReactPortal, ReactNode } from 'react';
import ReactDOM from 'react-dom';

const rootPortalDiv = document.getElementById('root-portal')!;

type UsePortalReturn = { renderPortal: (children: ReactNode) => ReactPortal | null };

export const usePortal = (): UsePortalReturn => {
  const el = useMemo(() => {
    return document.createElement('div');
  }, []);

  useEffect(() => {
    rootPortalDiv.appendChild(el);

    return () => {
      rootPortalDiv.removeChild(el);
    };
  }, []);

  return { renderPortal: children => ReactDOM.createPortal(children, el) };
};
