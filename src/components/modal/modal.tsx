import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDom from 'react-dom';

import style from './modal.module.css';

type TModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, onClose }: TModalProps): React.JSX.Element | null => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onEsc);
    return (): void => {
      document.removeEventListener('keydown', onEsc);
    };
  }, [onClose]);
  if (!modalRoot) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={style.modal}>
      <CloseIcon type="primary" onClick={onClose} className={style.modalClose} />
      <div>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
