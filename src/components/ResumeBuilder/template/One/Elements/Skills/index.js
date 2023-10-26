import React from 'react';

import { useDispatch } from 'react-redux';

import { Toast, Util } from 'components/ResumeBuilder/lib';

import { Text, Dnd2Column } from 'components/ResumeBuilder/component';

import { addSkill, updateSkill, deleteSkillData } from '../../../../redux/core/actions';

// import styles from './skills.module.scss';

function Skills(props) {
    const dispatch = useDispatch();

    const _updateSkill = (data) => {
        const storeReorder = Util.mapOrder(props.data, data, 'id');
        dispatch(updateSkill(storeReorder));
    };

    const _addNewItem = () => {
        dispatch(addSkill());
    };

    const _removeItem = (id, data) => {
        Toast.showUndo(id, data, 'skills', 'Skills Item Removed');
        dispatch(deleteSkillData(id));
    };

    const { data } = props;
    return (
        <Dnd2Column
            data={data}
            reorder={(e) => _updateSkill(e)}
            addItem={_addNewItem}
            removeItem={(e) => _removeItem(e, data)}
            renderItem={(item) => (
                <div style={{ background: '#fff' }}>
                    <Text value={item.title} stateName="skills.title" stateId={item.id} placeholder="React Native" />
                </div>
            )}
        />
    );
}

/* Export Component =============================== */
export default Skills;
