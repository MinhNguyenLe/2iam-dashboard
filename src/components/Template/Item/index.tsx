import { Box, Card, Divider, Grid, Button, styled } from "@mui/material";
import { H3, H4, Small } from "components/Typography";
import { Link } from "react-router-dom";

const ImageWrapper = styled(Box)(({ theme }) => ({
  height: 100,
  position: "relative",
  "&::before": {
    content: '""',
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    position: "absolute",
    opacity: 0.6,
    backgroundColor: theme.palette.primary[100],
  },
}));

interface TemplateItemProps {
  template: any;
}

const TemplateItem = ({ template }: TemplateItemProps) => {
  return (
    <Card>
      <ImageWrapper>
        <img
          src="/static/cover/cover-1.png"
          width="100%"
          height="100%"
          alt={template.name}
        />
      </ImageWrapper>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 3,
        }}
      >
        <H4>{template.name}</H4>
        <Grid marginTop={0.1} container spacing={3}>
          <Grid item xs={4} textAlign="center">
            <H3>user</H3>
            <Small color="text.disabled">345234</Small>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <H3>user</H3>
            <Small color="text.disabled">123124</Small>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <H3>user</H3>
            <Small color="text.disabled">11122</Small>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 2 }} />

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
            <Link to={template?.demo}>View demo</Link>
          </Button>
        </Grid>
        <Grid item textAlign="center">
          <Button
            type="button"
            size="small"
            variant="contained"
            style={{ padding: "4px 10px", borderRadius: "24px" }}
          >
            <Link to={`/dashboard/create-template/${template.name}`}>
              Start (FREE)
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TemplateItem;
