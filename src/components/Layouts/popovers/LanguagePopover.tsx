import { Box, IconButton, MenuItem, Popover, styled } from "@mui/material";
import { H6 } from "components/Typography";
import { FC, useRef, useState } from "react";
import useLanguage from "../../../i18n";
import { useTranslation } from "react-i18next";

// custom styled components
const IconWrapper = styled(Box)(() => ({
  display: "flex",
  height: 20,
  width: 20,
  "& img": {
    width: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
}));

const ItemWrapper = styled(Box)(() => ({
  display: "flex",
  "& img": { width: "100%" },
}));

const LanguagePopover: FC = () => {
  const {t} = useTranslation();

  const languageOptions: {
    [key: string]: { icon: any; label: string };
  } = {
    en: {
      icon: "/static/flags/uk.png",
      label: t("ENGLISH"),
    },
    vi: {
      icon: "/static/flags/vn.png",
      label: t("VIETNAMESE"),
    },
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { language, changeLanguage } = useLanguage();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeLanguage = (language: string) => {
    changeLanguage(language);
    setOpen(false);
  };

  const selectedLanguage = languageOptions[language];

  return (
    <>
      <IconButton onClick={handleOpen} ref={anchorRef}>
        <IconWrapper>
          <img alt={selectedLanguage.label} src={selectedLanguage.icon} />
        </IconWrapper>
      </IconButton>
      <Popover
        keepMounted
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        PaperProps={{ sx: { width: 150, padding: "0.5rem 0" } }}
      >
        {Object.keys(languageOptions).map((language: string) => (
          <MenuItem
            key={languageOptions[language].label}
            onClick={() => handleChangeLanguage(language)}
          >
            <ItemWrapper>
              <H6 fontWeight={600} ml={1}>
                {languageOptions[language].label}
              </H6>
            </ItemWrapper>
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

export default LanguagePopover;
