import React, { useState, useContext } from "react";
import { Button, Stack, Snackbar, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CreateRecordDialog from "./CreateRecordDialog";
import EditRecordDialog from "./EditRecordDialog";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { useTranslation } from "react-i18next";

const CardFAQ = ({
  records,
  handleClickOpenCreateRecord,
  handleCloseCreateRecord,
  openCreateRecord,
  handleCloseEditRecord,
  openEditRecord,
  handleClickOpenEditRecord,
  recordCreateFormToDefault,
  changeHandlerCreateRecordForm,
  createRecordHandler,
  createRecordForm,
  recordEditFormToDefault,
  changeHandlerEditRecordForm,
  editRecordHandler,
  editRecordForm,
  setEditRecordForm,
  setCreateRecordForm,
  deleteRecordHandler,
}) => {
  const { t } = useTranslation();
  const columns = [
    { field: "_id", headerName: "ID", width: 225 },
    { field: "glucose", headerName: `${t("glucose")}`, type: "number", width: 100 },
    { field: "weight", headerName: `${t("weight")}`, type: "number", width: 100 },
    {
      field: "date",
      headerName: `${t("date")}`,
      type: "Date",
      width: 225,
      renderCell: (params) => <div>{params.value}</div>,
    },
    {
      field: "comment",
      headerName: `${t("comment")}`,
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 500,
      resizable: true,
    },
    {
      width: 250,
      renderCell: (params) => {
        const onClickUpdate = (e) => {
          const currentRow = params.row;
          setEditRecordForm({
            ...currentRow,
            account_id: params.row.account_id._id,
          });
          handleClickOpenEditRecord();
        };

        const onClickDelete = (e) => {
          const currentRow = params.row;
          deleteRecordHandler({ _id: currentRow._id });
        };

        return (
          <div>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                style={{ width: "12vh" }}
                color="secondary"
                size="small"
                onClick={onClickUpdate}
              >
                {t("edit")}
              </Button>
              <Button
                variant="contained"
                style={{ width: "10vh" }}
                color="error"
                size="small"
                onClick={onClickDelete}
              >
                {t("delete")}
              </Button>
            </Stack>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div
        style={{
          height: "66vh",
          width: "150vh",
          marginLeft: "10vh",
          marginBottom: "5vh",
        }}
      >
        <DataGrid
          getRowId={(records) => records._id}
          rows={records}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
        <Button
          onClick={handleClickOpenCreateRecord}
          sx={{ mt: 2 }}
          variant="contained"
          style={{ width: "10vh" }}
          color="secondary"
          size="small"
        >
          {t("create")}
        </Button>
        <CreateRecordDialog
          handleClose={handleCloseCreateRecord}
          open={openCreateRecord}
          recordCreateFormToDefault={recordCreateFormToDefault}
          changeHandlerCreateRecordForm={changeHandlerCreateRecordForm}
          createRecordHandler={createRecordHandler}
          createRecordForm={createRecordForm}
          setCreateRecordForm={setCreateRecordForm}
        ></CreateRecordDialog>

        <EditRecordDialog
          handleClose={handleCloseEditRecord}
          open={openEditRecord}
          recordEditFormToDefault={recordEditFormToDefault}
          changeHandlerEditRecordForm={changeHandlerEditRecordForm}
          editRecordHandler={editRecordHandler}
          editRecordForm={editRecordForm}
          setEditRecordForm={setEditRecordForm}
        ></EditRecordDialog>
      </div>
    </div>
  );
};

export default CardFAQ;
