import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  DateField,
  NumberField,
  SearchInput,
} from "react-admin";
import { usePermissions } from "react-admin";

const postFilter = [<SearchInput source="email" />];

const AccountList = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Admin" ? (
    <List
      filters={postFilter}
      // queryOptions={{ refetchInterval: 5000 }}
      {...props}
      pagination={false}
    >
      <Datagrid
      //bulkActionButtons={false}
      >
        <TextField sortable={false} source="id" />
        <TextField sortable={false} source="email" />
        <TextField sortable={false} source="role" />
        <DateField sortable={false} source="premiumExpires" />
        <DateField sortable={false} source="birth_date" />
        <TextField sortable={false} source="sex" />
        <NumberField sortable={false} source="diabetes_type" />
        <TextField sortable={false} source="localization" />
        <NumberField sortable={false} source="high_sugar" />
        <NumberField sortable={false} source="low_sugar" />
        <EditButton />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default AccountList;
