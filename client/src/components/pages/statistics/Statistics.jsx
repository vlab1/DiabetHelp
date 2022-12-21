import React, { useState, useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Box, Tab, Tabs, Paper, Snackbar, Alert } from "@mui/material";
import Loader from "../../layout/loader/Loader";
import RecordsList from "../../layout/records/RecordsList";
import Stats from "../../layout/stats/Stats";
import { useTranslation } from 'react-i18next'

const Statisctics = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [records, setRecords] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecords = useCallback(async () => {
    try {
      await request("/api/record", "GET", null, null, {
        Authorization: `Bearer ${auth.token}`,
      }).then((res) => {
        setRecords(res.data);
        setIsLoading(false);
      });
    } catch (e) {}
  }, [request, auth]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [openCreateRecord, setOpenCreateRecord] = useState(false);
  const [openEditRecord, setOpenEditRecord] = useState(false);
  const [rows, setRows] = useState(records);
  const [createRecordForm, setCreateRecordForm] = useState({
    date: "",
    glucose: "",
    weight: "",
    comment: "",
  });
  const [editRecordForm, setEditRecordForm] = useState({
    date: "",
    glucose: "",
    weight: "",
    comment: "",
  });
  const [snackBar, setSnackBar] = useState({
    open: null,
    severity: null,
    content: null,
  });

  const recordCreateFormToDefault = () => {
    setCreateRecordForm({
      date: "",
      glucose: "",
      weight: "",
      comment: "",
    });
  };

  const recordEditFormToDefault = () => {
    setEditRecordForm({
      date: "",
      glucose: "",
      weight: "",
      comment: "",
    });
  };

  const handleClickOpenCreateRecord = () => {
    setOpenCreateRecord(true);
  };

  const handleCloseCreateRecord = () => {
    setOpenCreateRecord(false);
  };

  const handleClickOpenEditRecord = () => {
    setOpenEditRecord(true);
  };

  const handleCloseEditRecord = () => {
    setOpenEditRecord(false);
  };

  const handleClose = (event) => {
    setSnackBar({ ...snackBar, open: false });
  };

  const changeHandlerCreateRecordForm = (event) => {
    setCreateRecordForm({
      ...createRecordForm,
      [event.target.name]: event.target.value,
    });
  };

  const changeHandlerEditRecordForm = (event) => {
    setEditRecordForm({
      ...editRecordForm,
      [event.target.name]: event.target.value,
    });
  };

  const createRecordHandler = async () => {
    try {
      await request(
        "/api/record/create",
        "POST",
        {
          ...createRecordForm,
        },
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      ).then(async (res) => {
        await request("/api/record", "GET", null, null, {
          Authorization: `Bearer ${auth.token}`,
        }).then((res) => {
          setRecords(res.data);
        });
        setSnackBar({
          ...snackBar,
          open: true,
          severity: "success",
          content: `${t("create_new_record")}`,
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

  const editRecordHandler = async () => {
    try {
      await request(
        "/api/record/update",
        "PUT",
        {
          ...editRecordForm,
        },
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      ).then(async (res) => {
        await request("/api/record", "GET", null, null, {
          Authorization: `Bearer ${auth.token}`,
        }).then((res) => {
          setRecords(res.data);
        });
        setSnackBar({
          ...snackBar,
          open: true,
          severity: "success",
          content: `${t("edit_record_1")}`,
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

  const deleteRecordHandler = async (deleteRecordForm) => {
    try {
      await request(
        "/api/record/delete",
        "DELETE",
        {
          ...deleteRecordForm,
        },
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      ).then(async (res) => {
        await request("/api/record", "GET", null, null, {
          Authorization: `Bearer ${auth.token}`,
        }).then((res) => {
          setRecords(res.data);
        });
        setSnackBar({
          ...snackBar,
          open: true,
          severity: "success",
          content: `${t("deleted_record_1")}`,
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

  const formatDate = (fullDate) => {
    let year = new Date(fullDate).getUTCFullYear() + "";
    let month = new Date(fullDate).getUTCMonth() + "";
    if (month.length < 2) {
      month = "0" + month;
    }
    let date = new Date(fullDate).getUTCDate() + "";
    if (date.length < 2) {
      date = "0" + date;
    }
    let hours = new Date(fullDate).getUTCHours() + "";
    if (hours.length < 2) {
      hours = "0" + hours;
    }
    let minutes = new Date(fullDate).getUTCMinutes() + "";
    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }
    let seconds = new Date(fullDate).getUTCSeconds() + "";
    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }
    return (
      year +
      "." +
      month +
      "." +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  return !isLoading ? (
    <div>
      <Box sx={{ margin: 5 }}>
        <Paper
          elevation={8}
          sx={{
            position: "relative",
            width: 1,
            minHeight: "45rem",
            overflow: "hidden",
            borderRadius: "1.5em",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            // overflow: 'auto'
          }}
        >
          <Box sx={{ width: "100%", p: 5 }}>
            <Box
              // sx={{ borderBottom: 1, borderColor: "divider" }}
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
              }}
            >
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                // centered

                orientation="vertical"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab label={t("records")}/>
                <Tab label={t("statisticss")} />
              </Tabs>
              <Box sx={{ padding: 2 }}>
                {selectedTab === 0 && (
                  <Box>
                    <RecordsList
                      records={records}
                      handleClickOpenCreateRecord={handleClickOpenCreateRecord}
                      handleCloseCreateRecord={handleCloseCreateRecord}
                      openCreateRecord={openCreateRecord}
                      handleCloseEditRecord={handleCloseEditRecord}
                      openEditRecord={openEditRecord}
                      handleClickOpenEditRecord={handleClickOpenEditRecord}
                      recordCreateFormToDefault={recordCreateFormToDefault}
                      changeHandlerCreateRecordForm={
                        changeHandlerCreateRecordForm
                      }
                      createRecordHandler={createRecordHandler}
                      recordEditFormToDefault={recordEditFormToDefault}
                      changeHandlerEditRecordForm={changeHandlerEditRecordForm}
                      editRecordHandler={editRecordHandler}
                      createRecordForm={createRecordForm}
                      editRecordForm={editRecordForm}
                      setEditRecordForm={setEditRecordForm}
                      setCreateRecordForm={setCreateRecordForm}
                      deleteRecordHandler={deleteRecordHandler}
                    ></RecordsList>
                  </Box>
                )}
                {selectedTab === 1 && (
                  <Box>
                    <Stats formatDate={formatDate} records={records}></Stats>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
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
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Statisctics;
