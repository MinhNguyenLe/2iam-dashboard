import { Box, Button, Grid, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import LoadingScreen from "components/LoadingScreen";
import SearchInput from "components/SearchInput";
import TemplateItem from "components/Template/Item";
import useLoading from "hooks/useLoading";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import axios from "utils/axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";

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
  const { t } = useTranslation();

  useTitle("CHOOSE_THE_TEMPLATE_YOU_WANT");

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

  const [open, setOpen] = useState(false);
  const [targetTemplate, setTargetTemplate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder={t("FIND_TEMPLATE_YOU_WANT")} />
      </StyledFlexBox>

      <Grid container spacing={3}>
        {data?.templates?.map((template: any, index: number) => (
          <Grid item md={4} sm={6} xs={12} key={index}>
            <TemplateItem
              template={template}
              handleOpen={() => {
                setTargetTemplate(template._id);
                handleClickOpen();
              }}
            />
          </Grid>
        ))}
      </Grid>
      <PdfToJsonConverter />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ fontSize: "16px" }}>
          {t("YOU_HAVE_2_WAYS_TO_FILL_INFORMATION_INTO_YOUR_TEMPLATE")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#414141" }}>
            {t("ONE_YOU_CAN_UPLOAD_YOUR_RESUME_OR_CV")}
          </DialogContentText>
          <DialogContentText style={{ color: "#414141" }}>
            {t("TWO_YOU_CAN_FILL_MANUALLY")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
            autoFocus
          >
            {t("CHOOSE_FILE")}
          </Button>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            <Link to={`/resume-builder/${targetTemplate}`}>
              {t("FILL_MANUALLY")}
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
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
    <div style={{ marginTop: 16 }}>
      <p>Testing: Convert pdf into Raw string</p>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {isLoading ? "Loading ..." : <pre>{data?.data?.text}</pre>}
    </div>
  );
};

export default MyProducts;
