import React from "react";
import { usePermissions } from "react-admin";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  NumberField,
  SearchInput,
  SelectInput,
  TextInput,

} from "react-admin";


const postFilter = [

  <SelectInput
          source="type"
          choices={[
            {
              id: "takeaways and eating out",
              name: "takeaways and eating out",
            },
            { id: "confectionery", name: "confectionery" },
            { id: "cakes", name: "cakes" },
            { id: "fruit", name: "fruit" },
            { id: "vegatables", name: "vegatables" },
            { id: "bread", name: "bread" },
            { id: "breakfast cereals", name: "breakfast cereals" },
            { id: "alcoholic drinks", name: "alcoholic drinks" },
            { id: "dairy and desserts", name: "dairy and desserts" },
            { id: "rice, pasta, grains", name: "rice, pasta, grains" },
            { id: "biscuits", name: "biscuits" },
            { id: "snacks", name: "snacks" },
            { id: "meat and fish product", name: "meat and fish product" },
            { id: "sugars and preserves", name: "sugars and preserves" },
            { id: "home baking", name: "home baking" },
          ]}
        />,
];

const ClothesList = (props) => {
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
        <TextField sortable={false} source="name" />
        <NumberField sortable={false} source="presize_equiv" />
        <TextField sortable={false} source="presize_equiv_unit" />
        <NumberField sortable={false} label="presize_equiv_gCHO" source="presize_equiv_gCHO" />
        <NumberField sortable={false} source="relative_equiv" />
        <TextField sortable={false} source="relative_equiv_unit" />
        <NumberField sortable={false} label="relative_equiv_gCHO" source="relative_equiv_gCHO" />
        <TextField sortable={false} source="type" />
        <EditButton />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default ClothesList;
