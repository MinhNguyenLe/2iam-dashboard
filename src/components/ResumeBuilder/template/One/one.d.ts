export interface TProps {
  theme: {
    color: string;
    fontFamily: string;
  };
  userData: {
    name: string;
    infoTitle: string;
    address: string;
    email: string;
    mobile: string;
    userData: string;
    profileTitle: string;
    profile: string;
    workExperienceTitle: string;
    educationTitle: string;
    skillsTitle: string;
  };
  workExperience: [];
  education: [];
  skills: {
    object_title: String;
    lists: Array<{ id: String; name: string; score: string }>;
  };
  itemStatus: {
    [key: string]: boolean;
  };
  iam: {
    full_name: string;
    nickname: string;
    position: string;
  };
  contact: {
    object_title: string;
    email: string;
    phone_number: string;
    address: string;
    email_service: string;
    current_company: string;
    website: string;
    social_media: Array<{
      id: string;
      name: string;
      icon: string;
      link: string;
    }>;
  };
  summary: {
    details: Array<{
      id: string;
      paragraph: string;
      lists: Array<{ content: string; id: string }>;
    }>;
    object_title: string;
  };
}
