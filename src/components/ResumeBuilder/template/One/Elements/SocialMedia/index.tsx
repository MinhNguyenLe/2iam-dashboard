import { Text } from "components/ResumeBuilder/component";
import DndController from "../DndController";

function SocialMedia({ data }: any) {
  return (
    <DndController
      data={data}
      pathName="contact.social_media"
      defaultNewValue={{
        name: "",
        icon: "",
        link: "",
      }}
      renderItem={(item: any, index: number) => (
        <div style={{ background: "#fff" }}>
          <Text
            value={item.name}
            stateName={`contact.social_media.${index}.name`}
            placeholder="Linkedin"
          />
          <Text
            value={item.link}
            stateName={`contact.social_media.${index}.link`}
            placeholder="https://www.linkedin.com/in/minhlee2k"
          />
        </div>
      )}
    />
  );
}

export default SocialMedia;
