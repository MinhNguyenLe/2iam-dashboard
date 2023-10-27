export interface TProps {
  iam: {
    full_name: string;
    nickname: string;
    position: string;
    image: string;
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
  skills: {
    object_title: string;
    lists: Array<{ id: string; name: string; score: string }>;
  };
  educations: {
    object_title: string;
    lists: Array<{
      id: string;
      major: string;
      training_place: {
        name: string;
        logo: string;
        link: string;
        image: string;
      };
      learning_time: string;
      score: string;
      status: string;
      details: Array<{ id: string; paragraph: string }>;
    }>;
  };
  experiences: {
    object_title: string;
    lists: Array<{
      id: string;
      position: string;
      company: {
        name: string;
        address: string;
        link: string;
      };
      period: string;
      skills: string;
      details: Array<{
        id: string;
        paragraph: string;
        lists: Array<{ content: string; id: string }>;
      }>;
    }>;
  };
}
