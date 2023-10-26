import React from 'react';

import { Toast, Util } from 'components/ResumeBuilder/lib';
import { Text, Dnd } from 'components/ResumeBuilder/component';

import { useDispatch } from 'react-redux';

import { addNewWorkExperience, updateWorkExperience, deleteWorkExperienceData } from '../../../../redux/core/actions';

import styles from './experience.module.scss';

function WorkExperience(props) {
    const dispatch = useDispatch();

    const _updateWorkExperience = (data) => {
        const storeReorder = Util.mapOrder(props.data, data, 'id');
        dispatch(updateWorkExperience(storeReorder));
    };

    const _addNewItem = () => {
        dispatch(addNewWorkExperience());
    };

    const _removeItem = (id, data) => {
        Toast.showUndo(id, data, 'workExperience', 'Work Item Removed');
        dispatch(deleteWorkExperienceData(id));
    };

    const { data, color } = props;
    return (
        <Dnd
            data={data}
            reorder={(e) => _updateWorkExperience(e)}
            addItem={_addNewItem}
            removeItem={(e) => _removeItem(e, data)}
            renderItem={(item) => (
                <div className={styles.workBox}>
                    <div className={styles.leftWork}>
                        <Text
                            value={item.date}
                            stateName="workExperience.date"
                            stateId={item.id}
                            placeholder="May 2018 – May 2019"
                            customClass={styles.workDate}
                            tag="div"
                        />
                    </div>
                    <div className={styles.RightWork}>
                        <div className={styles.workDot} style={{ '--circle-color': color }} />
                        <Text
                            value={item.jobTitle}
                            stateName="workExperience.jobTitle"
                            stateId={item.id}
                            placeholder="React Native Developer"
                            customClass={styles.workTitle}
                            tag="div"
                        />
                        <Text
                            value={item.companyName}
                            stateName="workExperience.companyName"
                            stateId={item.id}
                            placeholder="Facebook"
                            customClass={styles.workCompany}
                            tag="div"
                        />
                        <Text
                            value={item.companyText}
                            stateName="workExperience.companyText"
                            stateId={item.id}
                            customClass={styles.companyExplain}
                            placeholder="Facebook, Inc. is an American social media and technology company based in Menlo Park, California."
                        />
                        <div className={styles.experienceText}>
                            <Text
                                value={item.experienceText}
                                stateName="workExperience.experienceText"
                                stateId={item.id}
                                customClass={styles.companyExplain}
                                placeholder="- your experience..."
                            />
                        </div>
                    </div>
                </div>
            )}
        />
    );
}

export default WorkExperience;
