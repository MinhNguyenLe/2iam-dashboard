import { Text } from "components/ResumeBuilder/component";
import DndController from "../DndController";

import styles from "./styles.module.scss";

function Summary({ data }: any) {
  return (
    <DndController
      data={data}
      pathName="summary.details"
      defaultNewValue={{
        paragraph: "",
        lists: [
          {
            id: "1",
            content: "",
          },
        ],
      }}
      renderItem={(item: any, index: number) => (
        <div style={{ background: "#fff" }}>
          <Text
            value={item.paragraph}
            stateName={`summary.details.${index}.paragraph`}
            placeholder="I have 5 years experiences with Frontend"
          />
          <DndController
            data={item.lists}
            pathName={`summary.details.${index}.lists`}
            defaultNewValue={{ content: "" }}
            renderItem={(item: any, indexList: number) => (
              <Text
                className={styles.textListsItem}
                value={item.content}
                stateName={`summary.details.${index}.lists.${indexList}.content`}
                placeholder="First year at GogoJungle"
              />
            )}
          />
        </div>
      )}
    />
  );
}

export default Summary;
