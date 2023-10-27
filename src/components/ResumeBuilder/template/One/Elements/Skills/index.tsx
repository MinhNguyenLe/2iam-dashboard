import { Text } from "components/ResumeBuilder/component";
import DndController from "../DndController";
import styles from "./skills.module.scss";

function Skills({ data }: any) {
  return (
    <DndController
      data={data}
      pathName="skills.lists"
      defaultNewValue={{ name: "", score: "" }}
      renderItem={(item: any, index: number) => (
        <div style={{ background: "#fff" }}>
          <Text
            value={item.name}
            stateName={`skills.lists.${index}.name`}
            stateId={item.id}
            placeholder="React"
          />
          <Text
            className={styles.subTitle}
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
