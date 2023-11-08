import { TitleContext } from "contexts/TitleContext";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

const useTitle = (text: string) => {
  const { t } = useTranslation();

  const { title, setTitle } = useContext(TitleContext);

  useEffect(() => setTitle(t(text)), [t, text, setTitle]);

  return title;
};

export default useTitle;
