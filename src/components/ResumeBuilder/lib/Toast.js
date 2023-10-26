import React from 'react';
import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { ToastUndo } from 'components/ResumeBuilder/component';

const config = {
    position: 'bottom-left',
    autoClose: 7000,
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

    showUndoMessage: ({ data, message = 'Item removed', item, pathName }) => {
        toast.dismiss();
        toast(<ToastUndo data={data} message={message} item={item} pathName={pathName} />, config);
    },

    show: (message = '...') => {
        toast.dismiss();
        toast(message, config);
    },

    dismiss: () => {
        toast.dismiss();
    },
};

export default Toast;
