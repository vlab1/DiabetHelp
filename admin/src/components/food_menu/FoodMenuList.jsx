import React from "react";
import { usePermissions } from "react-admin";
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  NumberField,
  SelectInput,
} from "react-admin";


const FoodMenuList = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Admin" ? (
    <List
      // queryOptions={{ refetchInterval: 5000 }}
      {...props}
      pagination={false}
    >
      <Datagrid 
      //bulkActionButtons={false}
      >
        <TextField sortable={false} source="id" />
        <TextField sortable={false} source="foodModel" />
        <NumberField sortable={false} source="count"></NumberField>
        <TextField sortable={false} source="equiv_type" />
        <TextField sortable={false} source="food_id" />
        <TextField sortable={false} source="menu_id" />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default FoodMenuList;
