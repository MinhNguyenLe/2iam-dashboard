import { useDispatch } from "react-redux";
import { Toast, Util } from "components/ResumeBuilder/lib";
import { Text, Dnd2Column } from "components/ResumeBuilder/component";
import {
  addByPathName,
  updateByPathName,
  deleteByPathName,
} from "../../../../redux/core/actions";

function Skills({ data }: any) {
  const dispatch = useDispatch();

  return (
    <Dnd2Column
      data={data}
      reorder={(data: any) => {
        dispatch(
          updateByPathName({ pathName: "skills.lists", newValue: data })
        );
      }}
      addItem={() => {
        dispatch(
          addByPathName({
            pathName: "skills.lists",
            newValue: { name: "", score: "", id: Util.randomId() },
          })
        );
      }}
      removeItem={(item: any, index: number) => {
        Toast.showUndoMessage({ data, item, pathName: "skills.lists" });
        dispatch(deleteByPathName({ pathName: `skills.lists.${index}` }));
      }}
      renderItem={(item: any, index: number) => (
        <div style={{ background: "#fff" }}>
          <Text
            value={item.name}
            stateName={`skills.lists.${index}.name`}
            stateId={item.id}
            placeholder="React Native"
          />
          <Text
            value={item.score}
            stateName={`skills.lists.${index}.score`}
            stateId={item.id}
            placeholder="5.0"
          />
        </div>
      )}
    />
  );
}

export default Skills;
