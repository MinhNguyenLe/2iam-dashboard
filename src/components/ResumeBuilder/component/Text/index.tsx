import { useEffect, useState } from "react";

import { appStore } from "../../redux/store";
import { updateByPathName } from "../../redux/core/actions";

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

function Text({ stateName, value, customClass, tag, ...props }: TProps) {
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (Util.editable()) {
      setEditable(true);
      return;
    }
    setEditable(false);
  }, []);

  const _onBlur = (e: any) => {
    appStore.dispatch(
      updateByPathName({
        pathName: stateName,
        newValue: e.textContent ? e.innerHTML : "",
      })
    );
  };

  const TagName = tag ? tag : "p";

  return (
    <TagName
      contentEditable={editable}
      suppressContentEditableWarning="true"
      onBlur={(e: any) => _onBlur(e.currentTarget)}
      dangerouslySetInnerHTML={{ __html: value }}
      className={styles.contentEditableContainer + " " + customClass}
      {...props}
    />
  );
}

Text.defaultProps = defaultProps;

export default Text;
