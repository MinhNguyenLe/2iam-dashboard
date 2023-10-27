import {
  updateNestedValue,
  pushNestedValue,
  removeNestedValue,
} from "components/ResumeBuilder/lib/utils";
import { actionTypes } from "./actionTypes";

const initialState = {
  iam: {
    position: "",
    full_name: "",
    nickname: "",
    image: "images/nobody.jpg",
  },
  contact: {
    object_title: "Contact",
    email: "",
    phone: "",
    address: "",
    email_service: "",
    current_company: "",
    website: "",
    social_media: [
      {
        id: "1",
        name: "",
        icon: "",
        link: "",
      },
    ],
  },
  summary: {
    object_title: "Summary",
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
  },
  skills: {
    object_title: "Skills",
    lists: [{ id: "1", name: "", score: "" }],
  },
  educations: {
    object_title: "Educations",
    lists: [
      {
        id: "1",
        major: "",
        score: "",
        status: "",
        learning_time: "",
        training_place: {
          name: "",
          link: "",
        },
        details: [{ id: "1", paragraph: "" }],
      },
    ],
  },
  experiences: {
    object_title: "Experiences",
    lists: [
      {
        id: "1",
        position: "",
        period: "",
        company: {
          name: "",
          address: "",
          link: "",
        },
        skills: "",
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
      },
    ],
  },
  theme: {
    color: "#03A9F4",
    fontFamily: "Source Sans Pro",
  },
};

export default function core(
  state: any = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case actionTypes.UPDATE_BY_PATH_NAME: {
      if (!action.payload) return state;

      const newState = JSON.parse(JSON.stringify(state));
      const { newValue, pathName } = action.payload;

      updateNestedValue(
        newState,
        typeof pathName === "string" ? pathName.split(".") : pathName,
        newValue
      );

      return newState;
    }

    case actionTypes.ADD_BY_PATH_NAME: {
      if (!action.payload) return state;

      const newState = JSON.parse(JSON.stringify(state));
      const { newValue, pathName } = action.payload;

      pushNestedValue(
        newState,
        typeof pathName === "string" ? pathName.split(".") : pathName,
        newValue
      );

      return newState;
    }

    case actionTypes.DELETE_BY_PATH_NAME: {
      if (!action.payload) return state;

      const newState = JSON.parse(JSON.stringify(state));
      const { pathName } = action.payload;

      removeNestedValue(
        newState,
        typeof pathName === "string" ? pathName.split(".") : pathName
      );

      return newState;
    }

    default:
      return { ...state };
  }
}
