import React, { useState, useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import ProfileForm from "../../layout/profile-form/ProfileForm";
import ChangePasswordForm from "../../layout/profile-form/ChangePasswordForm";
import PhysicalParametersForm from "../../layout/profile-form/PhysicalParametersForm";
import {
  Box,
  Tab,
  Tabs,
  Container,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import Loader from "../../layout/loader/Loader";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackBar, setSnackBar] = useState({
    open: null,
    severity: null,
    content: null,
  });

  const fetchAccount = useCallback(async () => {
    try {
      await request("/api/account", "GET", null, null, {
        Authorization: `Bearer ${auth.token}`,
      }).then((res) => {
        setAccount({
          ...res.data,
          _id: res.data._id,
          name: res.data.name ? res.data.name : "",
          phone: res.data.phone ? res.data.phone : "",
          // localization: res.data.localization ? res.data.localization : "",
          birth_date: res.data.birth_date ? res.data.birth_date : "",
          sex: res.data.sex ? res.data.sex : "",
          diabetes_type: res.data.diabetes_type ? res.data.diabetes_type : "",
          high_sugar: res.data.high_sugar ? res.data.high_sugar : "",
          low_sugar: res.data.low_sugar ? res.data.low_sugar : "",
          password: "",
          repeat_password: "",
          new_password: "",
        });
        setIsLoading(false);
      });
    } catch (e) {}
  }, [request, auth]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const profileHandler = async () => {
    try {
      await request(
        "/api/account/update",
        "PUT",
        {
          name: account.name,
          // phone: account.phone.slice(3, account.phone.length).replace(/\s/g, ''),
          phone: account.phone,
          // localization: account.localization,
        },
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      ).then((res) => {
        setSnackBar({
          ...snackBar,
          open: true,
          severity: "success",
          content: `${t("changed_profile")}`,
        });
      });
    } catch (e) {
      setSnackBar({
        ...snackBar,
        open: true,
        severity: "error",
        content: `${t("something_went_wrong")}`,
      });
    }
  };

  const physicalParametersHandler = async () => {
    try {
      await request(
        "/api/account/update",
        "PUT",
        {
          birth_date: account.birth_date,
          sex: account.sex,
          diabetes_type: account.diabetes_type,
          high_sugar: account.high_sugar,
          low_sugar: account.low_sugar,
        },
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      ).then((res) => {
        setSnackBar({
          ...snackBar,
          open: true,
          severity: "success",
          content: `${t("changed_physical_params")}`,
        });
      });
    } catch (e) {
      setSnackBar({
        ...snackBar,
        open: true,
        severity: "error",
        content: `${t("something_went_wrong")}`,
      });
    }
  };

  const changePasswordHandler = async () => {
    try {
      if (account.password !== account.new_password) {
        throw new Error();
      }
      await request(
        "/api/account/update/password",
        "PUT",
        {
          password: account.password,
          new_password: account.new_password,
        },
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      ).then((res) => {
        setAccount({
          ...res.data,
          password: "",
          repeat_password: "",
          new_password: "",
        });
        setSnackBar({
          ...snackBar,
          open: true,
          severity: "success",
          content: `${t("changed_password")}`,
        });
      });
    } catch (e) {
      setSnackBar({
        ...snackBar,
        open: true,
        severity: "error",
        content: `${t("something_went_wrong")}`,
      });
    }
  };

  const changeHandlerAccount = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleClose = (event) => {
    setSnackBar({ ...snackBar, open: false });
  };

  return !isLoading ? (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          position: "relative",
          width: 1,
          minHeight: "40rem",
          overflow: "hidden",
          borderRadius: "1.5em",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ width: "100%", p: 5 }}>
          <Box
            // sx={{ borderBottom: 1, borderColor: "divider" }}
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "60vh",
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              // centered

              orientation="vertical"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label={`${t("acc2")}`} />
              <Tab label={`${t("phys_params")}`}/>
              {!account.passwordGoogle && <Tab label={`${t("change_password")}`} />}
            </Tabs>
            <Box sx={{ padding: 2 }}>
              {selectedTab === 0 && (
                <Box>
                  <ProfileForm
                    changeHandlerAccount={changeHandlerAccount}
                    setAccount={setAccount}
                    account={account}
                    profileHandler={profileHandler}
                  />
                </Box>
              )}
              {selectedTab === 1 && (
                <Box>
                  <PhysicalParametersForm
                    changeHandlerAccount={changeHandlerAccount}
                    setAccount={setAccount}
                    account={account}
                    physicalParametersHandler={physicalParametersHandler}
                  />
                </Box>
              )}
              {selectedTab === 2 && !account.passwordGoogle && (
                <Box>
                  <ChangePasswordForm
                    changeHandlerAccount={changeHandlerAccount}
                    account={account}
                    changePasswordHandler={changePasswordHandler}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.content}
        </Alert>
      </Snackbar>
    </Container>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Profile;
