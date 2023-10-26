import { actionTypes } from './actionTypes';

function updateNestedValue(obj, keys, newValue) {
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) {
            if (!isNaN(keys[i + 1])) {
                current[key] = [];
            } else {
                current[key] = {};
            }
        }
        current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    if (Array.isArray(current)) {
        current[parseInt(lastKey, 10)] = newValue;
    } else {
        current[lastKey] = newValue;
    }
}
function pushNestedValue(obj, keys, newValue) {
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) {
            current[key] = {};
        }
        current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    if (Array.isArray(current[lastKey])) {
        current[lastKey].push(newValue);
    }
}
function removeNestedValue(obj, keys) {
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (current[key] === undefined) {
            // Path doesn't exist, nothing to remove
            return;
        }
        current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    current.splice(lastKey, 1)
}

const initialState = {
    iam: {
        position: "",
        full_name: "",
        nickname: "",
        icon: "",
        image: ""
    },
    contact: {
        object_title: "Contact",
        email: "",
        phone: "",
        address: "",
        email_service: "",
        current_company: "",
        website: "",
        social_media: [
            {
                id: "1",
                name: "",
                icon: "",
                link: ""
            },
            {
                id: "2",
                name: "",
                icon: "",
                link: ""
            }, {
                id: "3",
                name: "",
                icon: "",
                link: ""
            }
        ],
    },
    userData: {
        name: '',
        address: '',
        email: '',
        phone_number: '',
        userData: '',
        profile: '',
        infoTitle: 'Personal info',
        profileTitle: 'Profile',
        workExperienceTitle: 'Work experience',
        educationTitle: 'Education',
        skillsTitle: 'Skills',
        photo: 'images/nobody.jpg',
    },
    workExperience: [{ id: '1' }],
    education: [{ id: '1' }],
    skills: [{ id: '1' }],
    theme: {
        color: '#03A9F4',
        fontFamily: 'Source Sans Pro',
    },
    itemStatus: {
        picture: false,
        info: true,
        profile: true,
        workExperience: true,
        education: true,
        skills: true,
    },
};

export default function core(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_BY_PATH_NAME: {
            if (!action.payload) return state;

            const newState = JSON.parse(JSON.stringify(state));
            const { newValue, pathName } = action.payload;

            updateNestedValue(
                newState,
                typeof pathName === "string" ? pathName.split(".") : pathName,
                newValue
            );

            return newState;
        }

        case actionTypes.ADD_BY_PATH_NAME: {
            if (!action.payload) return state;

            const newState = JSON.parse(JSON.stringify(state));
            const { newValue, pathName } = action.payload;

            pushNestedValue(
                newState,
                typeof pathName === "string" ? pathName.split(".") : pathName,
                newValue
            );

            return newState;
        }

        case actionTypes.DELETE_BY_PATH_NAME: {
            if (!action.payload) return state;

            const newState = JSON.parse(JSON.stringify(state));
            const { pathName } = action.payload;

            removeNestedValue(
                newState,
                typeof pathName === "string" ? pathName.split(".") : pathName,
            );

            return newState;
        }

        case actionTypes.UPDATE_CONTACT: {
            if (!action.payload) return state;

            return {
                ...state,
                contact: {
                    ...state.contact,
                    ...action.payload,
                },
            };
        }

        case actionTypes.UPDATE_IAM:
            if (!action.payload) return state;

            return {
                ...state,
                iam: {
                    ...state.iam,
                    ...action.payload,
                },
            };

        case actionTypes.UPDATE_USER_DATA:
            if (!action.payload) return state;

            return {
                ...state,
                userData: {
                    ...state.userData,
                    ...action.payload,
                },
            };

        case actionTypes.UPDATE_THEME:
            if (!action.payload) return state;

            return {
                ...state,
                theme: {
                    ...state.theme,
                    ...action.payload,
                },
            };
        case actionTypes.UPDATE_ITEM_STATUS:
            if (!action.payload) return state;

            return {
                ...state,
                itemStatus: {
                    ...state.itemStatus,
                    ...action.payload,
                },
            };

        case actionTypes.ADD_NEW_WORK_EXPERIENCE:
            if (!action.payload) return state;

            return {
                ...state,
                workExperience: [
                    ...state.workExperience,
                    {
                        ...action.payload,
                    },
                ],
            };

        case actionTypes.UPDATE_WORK_EXPERIENCE:
            if (!action.payload) return state;

            return Object.assign({}, state, {
                workExperience: action.payload,
            });

        case actionTypes.UPDATE_WORK_EXPERIENCE_DATA:
            if (!action.payload || !action.payloadId) return state;

            const newWorkExperience = JSON.parse(JSON.stringify(state.workExperience));
            const index = state.workExperience
                .map((itm) => {
                    return itm.id;
                })
                .indexOf(action.payloadId);
            if (index > -1) {
                Object.keys(action.payload).forEach(function (key) {
                    newWorkExperience[index][key] = action.payload[key];
                });
            }
            return {
                ...state,
                workExperience: [...newWorkExperience],
            };

        case actionTypes.DELETE_WORK_EXPERIENCE_DATA:
            if (!action.payload) return state;

            let newWkE = JSON.parse(JSON.stringify(state.workExperience));
            newWkE = state.workExperience.filter(({ id }) => id !== action.payload);
            return {
                ...state,
                workExperience: [...newWkE],
            };

        case actionTypes.ADD_DELETED_WORK_EXPERIENCE_ITEM:
            if (!action.payload) return state;

            return {
                ...state,
                workExperience: [...state.workExperience, ...action.payload],
            };

        case actionTypes.ADD_NEW_EDUCATION:
            if (!action.payload) return state;

            return {
                ...state,
                education: [
                    ...state.education,
                    {
                        ...action.payload,
                    },
                ],
            };

        case actionTypes.UPDATE_EDUCATION:
            if (!action.payload) return state;

            return Object.assign({}, state, {
                education: action.payload,
            });

        case actionTypes.UPDATE_EDUCATION_DATA:
            if (!action.payload || !action.payloadId) return state;

            const neweducation = JSON.parse(JSON.stringify(state.education));
            const ejuIndex = state.education
                .map((itm) => {
                    return itm.id;
                })
                .indexOf(action.payloadId);
            if (ejuIndex > -1) {
                Object.keys(action.payload).forEach(function (key) {
                    neweducation[ejuIndex][key] = action.payload[key];
                });
            }
            return {
                ...state,
                education: [...neweducation],
            };

        case actionTypes.DELETE_EDUCATION_DATA:
            if (!action.payload) return state;

            let newE = JSON.parse(JSON.stringify(state.education));
            newE = state.education.filter(({ id }) => id !== action.payload);
            return {
                ...state,
                education: [...newE],
            };

        case actionTypes.ADD_DELETED_WORK_EDUCATION_ITEM:
            if (!action.payload) return state;

            return {
                ...state,
                education: [...state.education, ...action.payload],
            };

        case actionTypes.ADD_NEW_SKILL:
            if (!action.payload) return state;

            return {
                ...state,
                skills: [
                    ...state.skills,
                    {
                        ...action.payload,
                    },
                ],
            };

        case actionTypes.UPDATE_SKILL:
            if (!action.payload) return state;

            return Object.assign({}, state, {
                skills: action.payload,
            });

        case actionTypes.UPDATE_SKILL_DATA:
            if (!action.payload || !action.payloadId) return state;

            const newSkills = JSON.parse(JSON.stringify(state.skills));
            const skillsIndex = state.skills
                .map((itm) => {
                    return itm.id;
                })
                .indexOf(action.payloadId);
            if (skillsIndex > -1) {
                Object.keys(action.payload).forEach(function (key) {
                    newSkills[skillsIndex][key] = action.payload[key];
                });
            }
            return {
                ...state,
                skills: [...newSkills],
            };

        case actionTypes.DELETE_SKILL_DATA:
            if (!action.payload) return state;

            let newS = JSON.parse(JSON.stringify(state.skills));
            newS = state.skills.filter(({ id }) => id !== action.payload);
            return {
                ...state,
                skills: [...newS],
            };

        case actionTypes.ADD_DELETED_WORK_SKILL_ITEM:
            if (!action.payload) return state;

            return {
                ...state,
                skills: [...state.skills, ...action.payload],
            };

        default:
            return { ...state };
    }
}
