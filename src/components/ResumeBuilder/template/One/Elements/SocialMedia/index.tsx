import { useDispatch } from "react-redux";

import { Toast, Util } from "components/ResumeBuilder/lib";
import { Text, Dnd } from "components/ResumeBuilder/component";

import {
  addByPathName,
  updateByPathName,
  deleteByPathName,
} from "../../../../redux/core/actions";

function SocialMedia({ data }: any) {
  const dispatch = useDispatch();

  const _updateEducation = (data: any) => {
    dispatch(
      updateByPathName({ pathName: "contact.social_media", newValue: data })
    );
  };

  const _addItem = () => {
    dispatch(
      addByPathName({
        pathName: "contact.social_media",
        newValue: {
          id: Util.randomId(),
          name: "",
          icon: "",
          link: "",
        },
      })
    );
  };

  const _removeItem = (id, data, index, item) => {
    Toast.showUndo(
      id,
      data,
      "contact",
      "Social Media Item Removed",
      item,
      `contact.social_media`
    );
    dispatch(
      deleteByPathName({
        pathName: `contact.social_media.${index}`,
      })
    );
  };

  return (
    <Dnd
      data={data}
      reorder={(e) => _updateEducation(e)}
      addItem={_addItem}
      removeItem={(e, index, item) => _removeItem(e, data, index, item)}
      renderItem={(item: any, index: number) => (
        <div style={{ background: "#fff" }}>
          <Text
            value={item.name}
            stateName={`contact.social_media.${index}.name`}
            stateId={item.id}
            placeholder="Linkedin"
          />
          <Text
            value={item.link}
            stateName={`contact.social_media.${index}.link`}
            stateId={item.id}
            placeholder="https://www.linkedin.com/in/minhlee2k"
          />
        </div>
      )}
    />
  );
}

export default SocialMedia;
