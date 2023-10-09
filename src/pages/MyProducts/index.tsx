import { Box, Button, Grid, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import LoadingScreen from "components/LoadingScreen";
import SearchInput from "components/SearchInput";
import TemplateItem from "components/Template/Item";
import useLoading from "hooks/useLoading";
import useTitle from "hooks/useTitle";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "utils/axios";

const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const MyProducts: FC = () => {
  useTitle("My products");

  const { isLoading, fetch, data } = useLoading({
    onError: (err) => {
      toast.error(err);
    },
    onSuccess: (result) => {
      console.log(result);
    },
  });

  useEffect(() => {
    fetch(() =>
      axios("http://localhost:8080/api/templates/all", {
        withCredentials: true,
        method: "get",
      })
    );
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search user..." />
        <Button variant="contained">Add New User</Button>
      </StyledFlexBox>

      <Grid container spacing={3}>
        {data?.templates?.map((template: any, index: number) => (
          <Grid item md={4} sm={6} xs={12} key={index}>
            <TemplateItem template={template} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyProducts;
