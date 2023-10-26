import React from 'react';

import { appStore } from '../../redux/store';
import { updateUserData, updateWorkExperienceData, updateEducationData, updateSkillData } from '../../redux/core/actions';

import { Util } from 'components/ResumeBuilder/lib';

import styles from './text.module.scss';

class Text extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editable: true,
        };
    }

    componentDidMount() {
        if (Util.editable()) {
            this.setState({ editable: true });
            return;
        }
        this.setState({ editable: false });
    }

    _onChange = (e) => {
        console.log(e);
    };

    _onBlur = (e) => {
        const { stateName, stateId } = this.props;
        const storeComponents = stateName.split('.');

        const data = {
            [storeComponents[1]]: e.textContent ? e.innerHTML : '',
        };

        if (storeComponents[0] === 'userData') {
            appStore.dispatch(updateUserData(data));
        } else if (storeComponents[0] === 'workExperience') {
            appStore.dispatch(updateWorkExperienceData(stateId, data));
        } else if (storeComponents[0] === 'education') {
            appStore.dispatch(updateEducationData(stateId, data));
        } else if (storeComponents[0] === 'skills') {
            appStore.dispatch(updateSkillData(stateId, data));
        }
    };

    _findLink(str) {
        const regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi;
        return str.replace(regex, "<a href='$1'>$1</a>");
    }

    render() {
        const { value, customClass, tag } = this.props;
        const TagName = tag ? tag : 'p';
        return (
            <>
                <TagName
                    contentEditable={this.state.editable}
                    suppressContentEditableWarning="true"
                    // onInput={(e) => this._onChange(e.currentTarget.textContent)}
                    onBlur={(e) => this._onBlur(e.currentTarget)}
                    dangerouslySetInnerHTML={{ __html: value }}
                    // className={"contentEditableContainer " + customClass}
                    className={styles.contentEditableContainer + ' ' + customClass}
                    {...this.props}
                    // placeholder=""
                />
            </>
            //     {this.props.value}
            // </p>
        );
    }
}

/* Export Component =============================== */
export default Text;
