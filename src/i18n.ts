import i18n from "i18next";
import { useState } from "react";
import { useTranslation, initReactI18next } from "react-i18next";

const defaultLanguage = "vi";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        CHOOSE_THE_TEMPLATE_YOU_WANT: "Choose the template you want",
        ENGLISH: "English",
        VIETNAMESE: "Vietnamese",
        CHOOSE_TEMPLATES: "Choose templates",
        MY_TEMPLATES: "My templates",
        FIND_TEMPLATE_YOU_WANT: "Find template you want",
        CHOOSE: "Choose",
        VIEW_DEMO: "View demo",
        YOU_HAVE_2_WAYS_TO_FILL_INFORMATION_INTO_YOUR_TEMPLATE:
          "You have 2 ưays to fill your information into your tempalte (your website)",
        ONE_YOU_CAN_UPLOAD_YOUR_RESUME_OR_CV:
          "1. You can upload your resume or CV (just waiting few seconds)",
        TWO_YOU_CAN_FILL_MANUALLY:
          "2. You can fill manually (maybe take more time)",
        CHOOSE_FILE: "Choose file (CV / resume)",
        FILL_MANUALLY: "Fill manually",
      },
    },
    vi: {
      translation: {
        CHOOSE_THE_TEMPLATE_YOU_WANT: "Chọn trang mẫu bạn muốn",
        ENGLISH: "Tiếng Anh",
        VIETNAMESE: "Tiếng Việt",
        CHOOSE_TEMPLATES: "Chọn mẫu",
        MY_TEMPLATES: "Các mẫu của tôi",
        FIND_TEMPLATE_YOU_WANT: "Tìm mẫu bạn muốn",
        CHOOSE: "Chọn",
        VIEW_DEMO: "Xem thử",
        YOU_HAVE_2_WAYS_TO_FILL_INFORMATION_INTO_YOUR_TEMPLATE:
          "Bạn có 2 cách điền thông tin vào mẫu (website) của mình",
        ONE_YOU_CAN_UPLOAD_YOUR_RESUME_OR_CV:
          "1. Bạn có thể tải lên tóm tắt cá nhân hoặc CV (chỉ đợi vài giây sau khi tải lên)",
        TWO_YOU_CAN_FILL_MANUALLY:
          "2. Bạn có thể điền thông tin thủ công (sẽ tốn thời gian)",
        CHOOSE_FILE: "Chọn tệp (CV / resume)",
        FILL_MANUALLY: "Điền thủ công",
      },
    },
  },
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,

  interpolation: {
    escapeValue: false,
  },
});

const useLanguage = () => {
  const [language, setLanguage] = useState(defaultLanguage);
  const { i18n } = useTranslation();

  const changeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return { language, changeLanguage };
};

export default useLanguage;
