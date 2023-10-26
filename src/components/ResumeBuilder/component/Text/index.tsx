import React, { useEffect, useState } from "react";

import { appStore } from "../../redux/store";
import {
  updateUserData,
  updateWorkExperienceData,
  updateEducationData,
  updateSkillData,
  updateIam,
  updateContact,
  updateByPathName,
} from "../../redux/core/actions";

import { Util } from "components/ResumeBuilder/lib";

import styles from "./text.module.scss";

type DivProps = JSX.IntrinsicElements["p"];

interface TProps extends DivProps {
  stateName: string;
  stateId: number;
  value: any;
  customClass: any;
  tag: any;
}

const defaultProps: TProps = {
  stateName: "",
  stateId: 1,
  value: "",
  customClass: "",
  tag: "p",
};

function Text(props: TProps) {
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (Util.editable()) {
      setEditable(true);
      return;
    }
    setEditable(false);
  }, []);

  const _onBlur = (e: any) => {
    const { stateName, stateId } = props;
    const storeComponents = stateName.split(".");

    const data = {
      [storeComponents[1]]: e.textContent ? e.innerHTML : "",
    };

    if (storeComponents[0] === "iam") {
      return appStore.dispatch(updateIam(data));
    }
    if (storeComponents[0] === "contact") {
      return appStore.dispatch(
        updateByPathName({
          pathName: stateName,
          newValue: e.textContent ? e.innerHTML : "",
        })
      );
    }

    if (storeComponents[0] === "userData") {
      appStore.dispatch(updateUserData(data));
    } else if (storeComponents[0] === "workExperience") {
      appStore.dispatch(updateWorkExperienceData(stateId, data));
    } else if (storeComponents[0] === "education") {
      appStore.dispatch(updateEducationData(stateId, data));
    } else if (storeComponents[0] === "skills") {
      appStore.dispatch(updateSkillData(stateId, data));
    }
  };

  const { value, customClass, tag } = props;
  const TagName = tag ? tag : "p";
  return (
    <TagName
      contentEditable={editable}
      suppressContentEditableWarning="true"
      onBlur={(e: any) => _onBlur(e.currentTarget)}
      dangerouslySetInnerHTML={{ __html: value }}
      className={styles.contentEditableContainer + " " + customClass}
      {...(props as any)}
    />
  );
}

Text.defaultProps = defaultProps;

export default Text;
