import { Box } from "@mui/material";
import UserListColumnShape from "components/userManagement/columnShape";
import CustomTable from "components/userManagement/CustomTable";
import { userListFakeData } from "components/userManagement/fakeData";
import useTitle from "hooks/useTitle";
import { FC } from "react";

const UserList: FC = () => {
  useTitle("MY_TEMPLATES");

  return (
    <Box pt={2} pb={4}>
      <CustomTable columnShape={UserListColumnShape} data={userListFakeData} />
    </Box>
  );
};

export default UserList;
