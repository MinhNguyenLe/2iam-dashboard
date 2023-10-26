import { useDispatch } from "react-redux";

import { Toast, Util } from "components/ResumeBuilder/lib";
import { Dnd } from "components/ResumeBuilder/component";

import {
  addByPathName,
  updateByPathName,
  deleteByPathName,
} from "../../../../redux/core/actions";

function DndController({
  data,
  pathName,
  defaultNewValue,
  ...props
}: {
  data: any;
  renderItem: any;
  pathName: string;
  defaultNewValue: any;
}) {
  const dispatch = useDispatch();

  return (
    <Dnd
      data={data}
      reorder={(data: any) => {
        dispatch(updateByPathName({ pathName, newValue: data }));
      }}
      addItem={() => {
        dispatch(
          addByPathName({
            pathName,
            newValue: { ...defaultNewValue, id: Util.randomId() },
          })
        );
      }}
      removeItem={(index: number, item: any) => {
        Toast.showUndoMessage({ data, item, pathName });
        dispatch(
          deleteByPathName({
            pathName: `${pathName}.${index}`,
          })
        );
      }}
      {...props}
    />
  );
}

export default DndController;
