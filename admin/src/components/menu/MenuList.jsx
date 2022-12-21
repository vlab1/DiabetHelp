import React from "react";
import { usePermissions } from "react-admin";
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  NumberField,
  SelectInput,
  ReferenceInput
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


const MenuList = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Admin" ? (
    <List   filters={postFilter}
      // queryOptions={{ refetchInterval: 5000 }}
      {...props}
      pagination={false}
    >
      <Datagrid 
      //bulkActionButtons={false}
      >
        <TextField sortable={false} source="id" />
        <TextField sortable={false} source="name" />
        <TextField sortable={false} source="account_id" />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default MenuList;
