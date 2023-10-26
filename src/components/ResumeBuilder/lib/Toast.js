import React from 'react';
import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
// import ToastUndo from '../components/ToastUndo';
import { ToastUndo } from 'components/ResumeBuilder/component';

const config = {
    position: 'bottom-left',
    autoClose: 7000,
    // hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Flip,
};

const Toast = {
    showUndo: (id, data, type, message = 'item removed', item, pathName) => {
        toast.dismiss();
        toast(<ToastUndo itemId={id} data={data} message={message} type={type} item={item} pathName={pathName} />, config);
    },

    show: (message = '...') => {
        toast.dismiss();
        toast(message, config);
    },

    dismiss: () => {
        toast.dismiss();
    },
};

/* Export ================================ */
export default Toast;
