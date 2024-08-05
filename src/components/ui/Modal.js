'use client'

const Modal = ({ id, title, message, submit = true, cancel = true, onConfirm, onCancel }) => {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className={`btn  btn-primary ${submit ? ' ' : 'hidden'}`} type="submit" onClick={onConfirm}>Confirm</button>
          <button className={`btn ${cancel ? ' ' : 'hidden'}`} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;