import React from 'react';

import classes from './checkbox.scss';

type CheckboxProps = {
  id: string;
  checked: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Checkbox = ({ id, checked, onClick, ...rest }: CheckboxProps) => (
  <div
    className={[classes.checkbox, checked ? classes.checked : ''].join(' ')}
    onClick={onClick}
    {...rest}
  >
    <input id={id} type="checkbox" checked={checked} readOnly />
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
      <path d="M18 32.34L9.66 24l-2.83 2.83L18 38l24-24-2.83-2.83z" />
    </svg>
  </div>
);

export default Checkbox;
