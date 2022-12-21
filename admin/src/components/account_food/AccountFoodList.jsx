import React from "react";
import { usePermissions } from "react-admin";
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  NumberField,
  SelectInput,
  ReferenceInput,
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

const AccountFoodList = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Admin" ? (
    <List filters={postFilter}
      // queryOptions={{ refetchInterval: 5000 }}
      {...props}
      pagination={false}
    >
      <Datagrid 
      //bulkActionButtons={false}
      >
        <TextField sortable={false} source="id" />
        <TextField sortable={false} source="name" />
        <NumberField sortable={false} source="presize_equiv" />
        <TextField sortable={false} source="presize_equiv_unit" />
        <NumberField
          sortable={false}
          label="presize_equiv_gCHO"
          source="presize_equiv_gCHO"
        />
        <NumberField sortable={false} source="relative_equiv" />
        <TextField sortable={false} source="relative_equiv_unit" />
        <NumberField
          sortable={false}
          label="relative_equiv_gCHO"
          source="relative_equiv_gCHO"
        />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default AccountFoodList;
