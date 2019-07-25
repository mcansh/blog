import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
}

const Portal = ({ children }: Props) => {
  const element = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    element.current = document.getElementById('portal');
  }, []);

  if (element.current == null) return null;
  return ReactDOM.createPortal(children, element.current);
};

export default Portal;
