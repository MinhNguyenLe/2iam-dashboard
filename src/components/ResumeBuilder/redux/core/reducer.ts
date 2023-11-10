import {
  updateNestedValue,
  pushNestedValue,
  removeNestedValue,
} from "components/ResumeBuilder/lib/utils";
import { actionTypes } from "./actionTypes";

const initialState = {
  iam: {
    position: "Senior Software Engineer",
    full_name: "Nguyen Le Minh",
    nickname: "MinhLee",
    image: "images/nobody.jpg",
  },
  contact: {
    object_title: "Contact",
    email: "minh.nguyenle1809@gmail.com",
    phone_number: "0706667411",
    address: "District 8 Ho Chi Minh city",
    email_service: "minh.nguyenle1809@gmail.com",
    current_company: "bTaskee",
    website: "https://btaskee.com",
    social_media: [
      {
        id: "1",
        name: "Linkedin",
        icon: "",
        link: "https://www.linkedin.com/in/minhlee2k/",
      },
      {
        id: "2",
        name: "Github",
        icon: "",
        link: "https://github.com/MinhLeeBtaskee",
      },
    ],
  },
  summary: {
    object_title: "Summary",
    details: [
      {
        id: "1",
        paragraph: "I have 5 years as Software Engineer",
        lists: [
          {
            id: "1",
            content: "3 years Frontend Engineer",
          },
          {
            id: "2",
            content: "2 years Fullstack Engineer",
          },
        ],
      },
    ],
  },
  skills: {
    object_title: "Skills",
    lists: [
      { id: "1", name: "React", score: "Master" },
      { id: "2", name: "Javascript/Typescript", score: "Master" },
    ],
  },
  educations: {
    object_title: "Educations",
    lists: [
      {
        id: "1",
        major: "Software Engineer",
        score: "---",
        status: "Completed",
        learning_time: "2018 - 2022",
        training_place: {
          name: "University Of Information Technology (UIT)",
          link: "https://www.uit.edu.vn/",
        },
        details: [{ id: "1", paragraph: "I have 4 years as Project leader" }],
      },
    ],
  },
  experiences: {
    object_title: "Experiences",
    lists: [
      {
        id: "1",
        position: "Software Engineer",
        period: "Dec 2022 - Present",
        company: {
          name: "bTaskee",
          address: "Ho Chi Minh",
          link: "https://btaskee.com",
        },
        skills: "Meteorjs, Mongo, Typescript",
        details: [
          {
            id: "1",
            paragraph: "I have team leaders of Back office team",
            lists: [
              {
                id: "1",
                content: "Create dashboard website to support operations",
              },
            ],
          },
        ],
      },
    ],
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

    case actionTypes.CLEAR_PERSIST: {
      return initialState;
    }

    default:
      return { ...state };
  }
}
