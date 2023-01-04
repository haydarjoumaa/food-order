import style from "./modal.module.css";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div className={style.backdrop} onClick={props.onClose}></div>;
};
const Modaloverlay = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <Modaloverlay>{props.children}</Modaloverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};
export default Modal;
