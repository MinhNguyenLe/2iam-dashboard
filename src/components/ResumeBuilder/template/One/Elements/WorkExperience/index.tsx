import { Text } from "components/ResumeBuilder/component";
import styles from "./experience.module.scss";
import DndController from "../DndController";

function WorkExperience({ data, color }: any) {
  return (
    <DndController
      data={data}
      pathName="experiences.lists"
      defaultNewValue={{
        position: "",
        period: "",
        company: {
          name: "",
          address: "",
          link: "",
        },
        skills: [
          {
            id: "1",
            name: "",
          },
        ],
        details: [
          {
            id: "1",
            paragraph: "",
            lists: [
              {
                id: "1",
                content: "",
              },
            ],
          },
        ],
      }}
      renderItem={(item: any, index: number) => (
        <div className={styles.workBox}>
          <div className={styles.leftWork}>
            <Text
              value={item.period}
              stateName={`experiences.lists.${index}.period`}
              placeholder="Dec 2022 – Present"
              customClass={styles.workDate}
              tag="div"
            />
          </div>
          <div className={styles.RightWork}>
            <div
              className={styles.workDot}
              // @ts-ignore
              style={{ "--circle-color": color }}
            />
            <Text
              value={item.position}
              stateName={`experiences.lists.${index}.position`}
              placeholder="Software Engineer"
              customClass={styles.workTitle}
              tag="div"
            />
            <Text
              value={item.company.name}
              stateName={`experiences.lists.${index}.company.name`}
              placeholder="bTaskee"
              customClass={styles.workCompany}
              tag="div"
            />
            <Text
              value={item.company.address}
              stateName={`experiences.lists.${index}.company.address`}
              customClass={styles.companyExplain}
              placeholder="Ho Chi Minh - Vietnam"
              tag="div"
            />
            <Text
              value={item.company.link}
              stateName={`experiences.lists.${index}.company.link`}
              customClass={styles.companyExplain}
              placeholder="https://www.btaskee.com/"
              tag="div"
            />
            <Text
              value={item.company.skills}
              stateName={`experiences.lists.${index}.skills`}
              customClass={styles.companyExplain}
              placeholder="C++, Java (separated by commas when fill multiple skills)"
              tag="div"
            />
            <DndController
              pathName={`experiences.lists.${index}.details`}
              data={item.details}
              defaultNewValue={{
                paragraph: "",
                lists: [
                  {
                    id: "1",
                    content: "",
                  },
                ],
              }}
              renderItem={(item: any, indexDetails: number) => (
                <>
                  <Text
                    value={item.paragraph}
                    stateName={`experiences.lists.${index}.details.${indexDetails}.paragraph`}
                    customClass={styles.companyExplain}
                    placeholder="I work as leader or BE teams and design architecture, clean architecture for legacy source code, cover all of workload in my teams"
                  />
                  <DndController
                    pathName={`experiences.lists.${index}.details.${indexDetails}.lists`}
                    data={item.lists}
                    defaultNewValue={{
                      content: "",
                    }}
                    renderItem={(item: any, indexLists: number) => (
                      <div className={styles.experienceText}>
                        <Text
                          value={item.content}
                          stateName={`experiences.lists.${index}.details.${indexDetails}.lists.${indexLists}.content`}
                          customClass={styles.companyExplain}
                          placeholder="Write proxy when launch for multiple arias"
                        />
                      </div>
                    )}
                  />
                </>
              )}
            />
          </div>
        </div>
      )}
    />
  );
}

export default WorkExperience;
