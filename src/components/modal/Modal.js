
import './modal.css'

const Modal = (props) => {

    const {
        children,
        onClose,
        title,
        isOpen,
        className,
        ...otherProps
    } = props;
    return (
        <div className={`${isOpen ? "modal display-block" : "modal display-none"} ${className}`} {...otherProps}>
        <div className="modal-main">
            <header className="modal-card-head d-flex align-items-center">
            <p className="modal-card-title">{title}</p>
            <button className="btn btn-light delete" aria-label="close" onClick={onClose}> Close</button>
            </header>
            <section className="modal-card-body">
            {children}
            </section>
        </div>
        </div>
    );
}
export default Modal;