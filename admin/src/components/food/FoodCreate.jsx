import * as React from "react";
import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  NumberInput,
  required,
  SelectInput,
} from "react-admin";

const ClothesCreate = () => {
  return (
    <Create>
      <TabbedForm>
        <FormTab label="food create" sx={{ maxWidth: "40em" }}>
        <TextInput sortable={false} source="name" />
        <NumberInput sortable={false} source="presize_equiv" />
        <NumberInput sortable={false} source="relative_equiv" />
        <TextInput sortable={false} source="presize_equiv_unit" />
        <TextInput sortable={false} source="relative_equiv_unit" />
        <NumberInput sortable={false} source="presize_equiv_gCHO" />
        <NumberInput sortable={false} source="relative_equiv_gCHO" />
        <SelectInput
          source="type"
          validate={required()}
          choices={[
            { id: "takeaways and eating out", name: "takeaways and eating out" },
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
        />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default ClothesCreate;
