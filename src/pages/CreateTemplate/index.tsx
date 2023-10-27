import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Grid } from "@mui/material";
import LightTextField from "components/LightTextField";
import LoadingScreen from "components/LoadingScreen";
import { FormikProvider, useFormik, FieldArray } from "formik";
import useLoading from "hooks/useLoading";
import useTitle from "hooks/useTitle";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "utils/axios";
import * as Yup from "yup";

const CreateTemplate: FC = () => {
  useTitle("Create Template");
  const navigate = useNavigate();

  const { fetch: verify, isLoading: isVerifying } = useLoading({
    onError: (error) => {
      navigate("/dashboard");
      toast.error(error.message);
    },
  });

  useEffect(() => {
    verify(() =>
      axios(`${process.env.REACT_APP_API_URL}/erfjs/verify-duplicate`, {
        withCredentials: true,
        method: "get",
      })
    );
  }, []);

  const initialValues = {
    about_me: {
      say_hi: "",
      about_1: "",
      about_2: "",
      social_link: {
        github: "",
        linkedin: "",
        twitter: "",
        instagram: "",
      },
    },
    experience: [
      {
        title: "",
        date: "",
        details: [""],
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    about_me: Yup.object().shape({
      say_hi: Yup.string().required("say_hi is required!"),
      about_1: Yup.string().required("about_1 is required!"),
      about_2: Yup.string(),
      social_link: Yup.object().shape({
        github: Yup.string().required("github is required!"),
        linkedin: Yup.string().required("linkedin is required!"),
        twitter: Yup.string().required("twitter is required!"),
        instagram: Yup.string().required("instagram is required!"),
      }),
    }),
    experience: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required!"),
        date: Yup.string().required("Date is required!"),
        details: Yup.array().of(Yup.string().required("Details required")),
      })
    ),
  });

  const { fetch, isLoading } = useLoading({
    onError: (error) => {
      toast.error(error);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      return fetch(() =>
        axios(`${process.env.REACT_APP_API_URL}/erfjs/insert`, {
          withCredentials: true,
          method: "post",
          data: values,
        })
      );
    },
  });
  const { values, errors, handleChange, handleSubmit, touched } = formik;

  if (isVerifying) {
    return <LoadingScreen />;
  }

  return (
    <Box pt={2} pb={4}>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <Card sx={{ padding: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <LightTextField
                  fullWidth
                  name="about_me.say_hi"
                  value={values.about_me.say_hi}
                  onChange={handleChange}
                  error={Boolean(
                    touched?.about_me?.say_hi && errors?.about_me?.say_hi
                  )}
                  helperText={
                    touched?.about_me?.say_hi && errors?.about_me?.say_hi
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <LightTextField
                  fullWidth
                  name="about_me.about_1"
                  value={values.about_me.about_1}
                  onChange={handleChange}
                  error={Boolean(
                    touched?.about_me?.about_1 && errors?.about_me?.about_1
                  )}
                  helperText={
                    touched?.about_me?.about_1 && errors?.about_me?.about_1
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <LightTextField
                  fullWidth
                  name="about_me.about_2"
                  value={values.about_me.about_2}
                  onChange={handleChange}
                  error={Boolean(
                    touched?.about_me?.about_2 && errors?.about_me?.about_2
                  )}
                  helperText={
                    touched?.about_me?.about_2 && errors?.about_me?.about_2
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <LightTextField
                  fullWidth
                  name="about_me.social_link.github"
                  value={values.about_me.social_link.github}
                  onChange={handleChange}
                  error={Boolean(
                    touched?.about_me?.social_link?.github &&
                      errors?.about_me?.social_link?.github
                  )}
                  helperText={
                    touched?.about_me?.social_link?.github &&
                    errors?.about_me?.social_link?.github
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <LightTextField
                  fullWidth
                  name="about_me.social_link.linkedin"
                  value={values.about_me.social_link.linkedin}
                  onChange={handleChange}
                  error={Boolean(
                    touched?.about_me?.social_link?.linkedin &&
                      errors?.about_me?.social_link?.linkedin
                  )}
                  helperText={
                    touched?.about_me?.social_link?.linkedin &&
                    errors?.about_me?.social_link?.linkedin
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <LightTextField
                  fullWidth
                  name="about_me.social_link.twitter"
                  value={values.about_me.social_link.twitter}
                  onChange={handleChange}
                  error={Boolean(
                    touched?.about_me?.social_link?.twitter &&
                      errors?.about_me?.social_link?.twitter
                  )}
                  helperText={
                    touched?.about_me?.social_link?.twitter &&
                    errors?.about_me?.social_link?.twitter
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <LightTextField
                  fullWidth
                  name="about_me.social_link.instagram"
                  value={values.about_me.social_link.instagram}
                  onChange={handleChange}
                  error={Boolean(
                    touched?.about_me?.social_link?.instagram &&
                      errors?.about_me?.social_link?.instagram
                  )}
                  helperText={
                    touched?.about_me?.social_link?.instagram &&
                    errors?.about_me?.social_link?.instagram
                  }
                />
              </Grid>
              <FieldArray
                name="experience"
                render={(arrayHelpersEx) => (
                  <>
                    <Box pb={2}>
                      <Button
                        variant="outlined"
                        sx={{ padding: "0px 4px" }}
                        onClick={() =>
                          arrayHelpersEx.push({
                            title: "",
                            date: "",
                            details: [""],
                          })
                        }
                      >
                        Thêm kinh nghiệm làm việc
                      </Button>
                    </Box>
                    {formik.values.experience?.map((_, experienceIndex) => (
                      <Grid item xs={6}>
                        <Card sx={{ padding: 3, boxShadow: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              <LightTextField
                                fullWidth
                                name={`experience[${experienceIndex}].title`}
                                placeholder="Vị trí"
                                value={values.experience[experienceIndex].title}
                                onChange={handleChange}
                                error={Boolean(
                                  touched?.experience?.[experienceIndex]
                                    ?.title &&
                                    errors?.experience?.[experienceIndex]?.title
                                )}
                                helperText={
                                  touched?.experience?.[experienceIndex]
                                    ?.title &&
                                  errors?.experience?.[experienceIndex]?.title
                                }
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <LightTextField
                                fullWidth
                                placeholder="Thời gian làm việc"
                                name={`experience[${experienceIndex}].date`}
                                value={values.experience[experienceIndex].date}
                                onChange={handleChange}
                                error={Boolean(
                                  touched?.experience?.[experienceIndex]
                                    ?.date &&
                                    errors?.experience?.[experienceIndex]?.date
                                )}
                                helperText={
                                  touched?.experience?.[experienceIndex]
                                    ?.date &&
                                  errors?.experience?.[experienceIndex]?.date
                                }
                              />
                            </Grid>
                            <FieldArray
                              name={`experience[${experienceIndex}].details`}
                              render={(arrayHelpers) => (
                                <>
                                  <Grid item xs={12}>
                                    <Button
                                      variant="outlined"
                                      sx={{ padding: "0px 4px" }}
                                      onClick={() => arrayHelpers.push("")}
                                    >
                                      Thêm thông tin công việc
                                    </Button>
                                  </Grid>
                                  {formik.values.experience[
                                    experienceIndex
                                  ].details?.map((details, detailIndex) => (
                                    <Grid item xs={12}>
                                      <Box
                                        key={detailIndex}
                                        sx={{ display: "flex" }}
                                      >
                                        <Grid item xs={10}>
                                          <LightTextField
                                            fullWidth
                                            name={`experience[${experienceIndex}].details[${detailIndex}]`}
                                            placeholder="Mô tả công việc"
                                            value={
                                              formik.values.experience[
                                                experienceIndex
                                              ].details[detailIndex]
                                            }
                                            onChange={handleChange}
                                            error={Boolean(
                                              touched?.experience?.[
                                                experienceIndex
                                              ]?.details?.[detailIndex] &&
                                                errors?.experience?.[
                                                  experienceIndex
                                                ]?.details?.[detailIndex]
                                            )}
                                            helperText={
                                              touched?.experience?.[
                                                experienceIndex
                                              ]?.details?.[detailIndex] &&
                                              errors?.experience?.[
                                                experienceIndex
                                              ]?.details?.[detailIndex]
                                            }
                                            sx={{
                                              "& .MuiOutlinedInput-root textarea":
                                                {
                                                  padding: 0,
                                                },
                                            }}
                                          />
                                        </Grid>
                                        <Grid item xs={2}>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.remove(detailIndex)
                                            }
                                          >
                                            -
                                          </button>
                                        </Grid>
                                      </Box>
                                    </Grid>
                                  ))}
                                </>
                              )}
                            />
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                  </>
                )}
              ></FieldArray>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
              >
                Tạo
              </LoadingButton>
            </Grid>
          </Card>
        </form>
      </FormikProvider>
    </Box>
  );
};

export default CreateTemplate;
