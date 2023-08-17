import React from 'react';
import './Modal.css';

const Modal = ({ activeObj, title, children }) => {
    const { setActive } = activeObj;

    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">{title}</h4>
                        <button type="button" className="btn-close" onClick={() => setActive(false)} aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body mx-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;