// @flow
import * as React from 'react';
import styles from './Modal.scss';

const Modal = ({
  children,
  isOpen,
  stylesProp,
  handleClick
}: {
  children: React.Node,
  isOpen: boolean,
  stylesProp: { [string]: string },
  handleClick: () => void
}) => (
  <div className={isOpen ? styles.isOpen : ''}>
    <div className={[styles.closeTarget, stylesProp.closeTarget].join(' ')} onClick={handleClick} />
    <div className={[styles.window, stylesProp.window].join(' ')}>
      {children}
    </div>
  </div>
);

export default Modal;
