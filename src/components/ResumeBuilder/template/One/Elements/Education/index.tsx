import { Text } from "components/ResumeBuilder/component";
import styles from "./education.module.scss";
import DndController from "../DndController";

function Education({ data }: any) {
  return (
    <DndController
      data={data}
      pathName={"educations.lists"}
      defaultNewValue={{
        major: "",
        score: "",
        status: "",
        learning_time: "",
        training_place: {
          name: "",
          link: "",
        },
        details: [{ id: "1", paragraph: "" }],
      }}
      renderItem={(item: any, index: number) => (
        <div style={{ background: "#fff" }}>
          <Text
            value={item.training_place.name}
            stateName={`educations.lists.${index}.training_place.name`}
            stateId={item.id}
            placeholder="University of Information Technology"
          />
          <Text
            value={item.training_place.link}
            stateName={`educations.lists.${index}.training_place.link`}
            stateId={item.id}
            customClass={styles.educationExplain}
            placeholder="https://www.uit.edu.vn"
          />
          <Text
            value={item.major}
            stateName={`educations.lists.${index}.major`}
            stateId={item.id}
            customClass={styles.educationExplain}
            placeholder="Software Engineer"
          />
          <Text
            value={item.learning_time}
            stateName={`educations.lists.${index}.learning_time`}
            stateId={item.id}
            customClass={styles.educationExplain}
            placeholder="2018 - 2022"
          />
          <Text
            value={item.status}
            stateName={`educations.lists.${index}.status`}
            stateId={item.id}
            customClass={styles.educationExplain}
            placeholder="Completed"
          />
          <Text
            value={item.score}
            stateName={`educations.lists.${index}.score`}
            stateId={item.id}
            customClass={styles.educationExplain}
            placeholder="3.8 GPA"
          />
          <DndController
            pathName={`educations.lists.${index}.details`}
            data={item.details}
            defaultNewValue={{
              paragraph: "",
            }}
            renderItem={(item: any, indexDetails: number) => (
              <Text
                value={item.paragraph}
                stateName={`educations.lists.${index}.details.${indexDetails}.paragraph`}
                stateId={item.id}
                customClass={styles.educationExplain}
                placeholder="I'm project leader in 4 years with learning groups have 6 members"
              />
            )}
          />
        </div>
      )}
    />
  );
}

export default Education;
