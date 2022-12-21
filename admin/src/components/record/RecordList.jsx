import React from "react";
import { usePermissions } from "react-admin";
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  NumberField,
  DateField,
  ReferenceInput,
  SelectInput
} from "react-admin";

const postFilter = [
  <ReferenceInput
    label="account"
    source="_id"
    reference="account"
  >
    <SelectInput  label="account" optionText="email" />
  </ReferenceInput>,
];


const RecordList = (props) => {
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
        <NumberField sortable={false} source="glucose" />
        <DateField sortable={false} source="date" />
        <NumberField sortable={false} source="weight" />
        <TextField sortable={false} source="account_id" />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default RecordList;
