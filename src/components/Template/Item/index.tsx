import { Box, Card, Divider, Grid, Button, styled } from "@mui/material";
import { H3, H6, Small, Tiny } from "components/Typography";
import { FC } from "react";

interface UserCardProps {
  user: {
    cover: string;
    avatar: string;
    name: string;
    position: string;
    post: number;
    follower: number;
    following: number;
  };
}

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

const TemplateItem: FC<UserCardProps> = ({ user }) => {
  return (
    <Card>
      <ImageWrapper>
        <img src={user.cover} width="100%" height="200%" alt={user.name} />
      </ImageWrapper>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 5,
        }}
      >
        <H6>{user.name}</H6>
        <Tiny color="text.disabled" fontWeight={500}>
          {user.position}
        </Tiny>

        <Grid marginTop={1} container spacing={3}>
          <Grid item xs={4} textAlign="center">
            <H3>{user.post}</H3>
            <Small color="text.disabled">Pages</Small>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <H3>{user.follower}</H3>
            <Small color="text.disabled">Followers</Small>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <H3>{user.following}</H3>
            <Small color="text.disabled">Following</Small>
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
            View demo
          </Button>
        </Grid>
        <Grid item textAlign="center">
          <Button
            type="button"
            size="small"
            variant="contained"
            style={{ padding: "4px 10px", borderRadius: "24px" }}
          >
            Start (FREE)
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TemplateItem;
