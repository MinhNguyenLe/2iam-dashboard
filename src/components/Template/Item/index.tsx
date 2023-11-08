import { Box, Card, Divider, Grid, Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ImageWrapper = styled(Box)(({ theme }) => ({
  height: 400,
  position: "relative",
  "&::before": {
    content: '""',
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    position: "absolute",
  },
}));

interface TemplateItemProps {
  template: any;
  handleOpen: any;
}

const TemplateItem = ({ template, handleOpen }: TemplateItemProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <ImageWrapper>
        <img
          src="/static/cover/baker.png"
          width="100%"
          height="100%"
          alt={template.name}
        />
      </ImageWrapper>
      <Divider sx={{ mb: 2 }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        mb={2}
      >
        <Grid item textAlign="center">
          <Button
            type="button"
            size="small"
            variant="outlined"
            style={{ padding: "4px 10px", borderRadius: "24px" }}
          >
            <Link to={template?.demo}>{t("VIEW_DEMO")}</Link>
          </Button>
        </Grid>
        <Grid item textAlign="center">
          <Button
            type="button"
            size="small"
            variant="contained"
            style={{ padding: "4px 10px", borderRadius: "24px" }}
            onClick={handleOpen}
          >
            {/* <Link to={`/dashboard/create-template/${template.name}`}> */}
              {t("CHOOSE")}
            {/* </Link> */}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TemplateItem;
