import { React } from "react";
import { Admin } from "react-admin";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import { authProvider } from "./authProvider/authProvider";
import { Resource } from "react-admin";
import accounts from "./components/accounts";
import food from "./components/food";
import account_food from "./components/account_food";
import menu from "./components/menu";
import record from "./components/record";
import food_menu from "./components/food_menu";
import { dataProvider } from "./dataProvider/dataProvider";

import "./App.css";

const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={Login}
    >
      {(permissions) => (
        <>
          {permissions === "Admin" ? (
            <>
              <Resource name="account" {...accounts} />
              <Resource name="food" {...food} />
              <Resource name="account-food" {...account_food} />
              <Resource name="menu" {...menu} />
              <Resource name="record" {...record} />
              <Resource name="food-menu" {...food_menu} />
            </>
          ) : null}
        </>
      )}
    </Admin>
  );
};

export default App;
