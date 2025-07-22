import style from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
};

const ModalOverlay = ({ onClose }: TModalOverlayProps): React.JSX.Element => {
  return <div className={style.modalOverlay} onClick={onClose}></div>;
};

export default ModalOverlay;
