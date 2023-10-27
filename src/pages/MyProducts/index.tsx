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
      axios(`${process.env.REACT_APP_API_URL}/templates/all`, {
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
      <PdfToJsonConverter />
    </Box>
  );
};

const PdfToJsonConverter = () => {
  const { isLoading, fetch, data } = useLoading({
    onError: (err) => {
      toast.error(err);
    },
    onSuccess: (result) => {
      console.log(result);
    },
  });

  const handleFileChange = async (event: any) => {
    const file = event?.target?.files[0]; // Get the uploaded PDF file

    if (file) {
      const formData = new FormData();
      formData.append("pdf", file);

      fetch(() =>
        axios.post(`${process.env.REACT_APP_API_URL}/convert-pdf`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      );
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {isLoading ? "Loading ..." : <pre>{data?.data?.text}</pre>}
    </div>
  );
};

export default MyProducts;
