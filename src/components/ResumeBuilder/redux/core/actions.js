import { actionTypes } from './actionTypes';
import AppConfig from '../../constant/config';
import ApiConst from '../../constant/api';

export const updateByPathName = (data) => {
    return {
        type: actionTypes.UPDATE_BY_PATH_NAME,
        payload: data,
    };
};

export const addByPathName = (data) => {
    return {
        type: actionTypes.ADD_BY_PATH_NAME,
        payload: data,
    };
};

export const deleteByPathName = (data) => {
    return {
        type: actionTypes.DELETE_BY_PATH_NAME,
        payload: data,
    };
};

export const updateUserData = (data) => {
    return {
        type: actionTypes.UPDATE_USER_DATA,
        payload: data,
    };
};

export const updateTheme = (data) => {
    return {
        type: actionTypes.UPDATE_THEME,
        payload: data,
    };
};

export const updateItemStatus = (data) => {
    return {
        type: actionTypes.UPDATE_ITEM_STATUS,
        payload: data,
    };
};

export const exportUserData = () => {
    return (dispatch, getState) => {
        const userData = getState().userData;
        const workExperience = getState().workExperience;
        const education = getState().education;
        const skills = getState().skills;
        const theme = getState().theme;
        const itemStatus = getState().itemStatus;

        let data = [];
        data = {
            userData,
            workExperience,
            education,
            skills,
            theme,
            itemStatus,
        };

        return data;
    };
};

export const importUserData = (data) => {
};

export const uploadImageAction = (image) => {
    return () =>
        new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', image);
            fetch(ApiConst.imgurHostname, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Client-ID ${AppConfig.imgurClientId}`,
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
};
