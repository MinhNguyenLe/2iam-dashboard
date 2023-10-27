import React from 'react';

import { appStore } from '../../redux/store';
import { addByPathName } from '../../redux/core/actions';

import styles from './toastUndo.module.scss';

const ToastUndo = ({ message, closeToast, item, pathName }) => {
    function handleClick() {
        appStore.dispatch(addByPathName({ pathName, newValue: item }));
        closeToast();
    }

    return (
        <div className={styles.toastBox}>
            <div className={styles.toastMessage}>{message}</div>
            <div className={styles.toastUndoBtn} onClick={handleClick}>
                UNDO
            </div>
        </div>
    );
};

export default ToastUndo;
