import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  DateInput,
  NumberInput,
} from "react-admin";
import { usePermissions } from "react-admin";

const AccountEdit = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Admin" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <SimpleForm>
        <TextInput fullWidth disabled source="id" />
        <TextInput fullWidth disabled source="email" />
        <SelectInput
          source="role"
          validate={required()}
          choices={[
            { id: "Admin", name: "Admin" },
            { id: "User", name: "User" },
          ]}
        />
        <DateInput disabled source="premiumExpires" />
        <DateInput disabled  source="birth_date" />
        <TextInput disabled source="sex" />
        <NumberInput disabled source="diabetes_type" />
        <TextInput disabled  source="localization" />
        <NumberInput disabled  source="high_sugar" />
        <NumberInput disabled  source="low_sugar" />
      </SimpleForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default AccountEdit;
