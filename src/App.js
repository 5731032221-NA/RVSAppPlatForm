import "./assets/App.css";
import SignIn from "./pages/SignIn";
import Property from "./pages/Property";
import Main from "./pages/Main";
import UserList from "./pages/TestUserListPage";
import ForgotPass from "./components/Forgotpass";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./middleware/store";
import React, { useState } from "react";
import UseToken from "./middleware/useToken";
import UseProperty from "./middleware/useProperty";

import propertypermission from "./services/propertypermission.service";
import {
  EDIT_PROPERTY,
  EDIT_INDEXTAB,
  EDIT_PERMISSION,
} from "./middleware/action";

import FrontDesk from "./components/Dashboard/FrontDesk";
import Dashboard from "./components/Dashboard/Dashboard";

import Configuration from "./pages/configurations/Configuration";
import ReservationPage from "./pages/ReservationPage";

import RoleManagement from "./pages/configurations/RoleManagement";
import UserManagement from "./pages/configurations/UserManagement";
import DeviceManager from "./pages/configurations/DeviceManager";
import ComputerPrinter from "./pages/configurations/ComputerPrinter";
import RoomManagement from "./pages/configurations/RoomManagement";
import ProfilePage from "./pages/ProfilePage";
import ProfileTableCompany from "./components/Profiles/ProfileTableCompany";
import ProfileTableTravelAgent from "./components/Profiles/ProfileTableTravelAgent";
import ProfilePageTable from "./components/Profiles/ProfileTable";


function App() {
  const { token, setToken } = UseToken();
  const { property, setProperty } = UseProperty();
  const [store, setStore] = useState(configureStore());
  const [selectedProperty, setSelectedProperty] = useState(null);

  React.useEffect(async () => {
    setSelectedProperty(sessionStorage.getItem("property"));
    await fnrefresh();
  });

  const fnrefresh = async () => {
    if (selectedProperty) {
      const permission = await propertypermission(
        sessionStorage.getItem("auth"),
        selectedProperty,
        sessionStorage.getItem("username")
      );
      store.dispatch({
        type: EDIT_PERMISSION,
        payload: permission.content[permission.content.length - 1],
      });

      store.dispatch({
        type: EDIT_PROPERTY,
        payload: selectedProperty,
      });

      const comp = sessionStorage.getItem("curent_component");
      await handleComponentState(comp);
      setProperty(selectedProperty);
    }
  };

  function handleComponentState(comp) {
    let ind = { indextTab: null };

    if (comp == "FrontDesk") {
      ind = { indextTab: 0 };
    } else if (comp == "Cashier") {
      ind = { indextTab: 2 };
    } else if (comp == "Reservation") {
      ind = { indextTab: 1 };
    } else if (comp == "Night Auditor") {
      ind = { indextTab: 3 };
    }

    store.dispatch({
      type: EDIT_INDEXTAB,
      payload: ind,
    });
  }

  return (
    <Provider store={store}>
      {" "}
      {!token ? (
        <SignIn setToken={setToken} store={store} />
      ) : !selectedProperty ? (
        <Property setToken={setToken} setProperty={setProperty} />
      ) : (
        <BrowserRouter>
          {" "}
          <Switch>
            <Route exact path="/signin" component={SignIn} />{" "}
            <Route exact path="/forgotpassword" component={ForgotPass} />{" "}
            <Route exact path="/userlist" component={UserList} />{" "}
            <Main>
              <Route exact path={`/`} component={Dashboard} />{" "}
              <Route path={`/frontdesk`} component={FrontDesk} />{" "}
              <Route path={`/reservation`} component={ReservationPage} />{" "}
              <Route path={`/configuration`} component={Configuration} />{" "}
              <Route path={`/User-Management`} component={UserManagement} />{" "}
              <Route path={`/Role-Management`} component={RoleManagement} />{" "}
              <Route path={`/Device-Manager`} component={DeviceManager} />{" "}
              <Route path={`/Computer-printer`} component={ComputerPrinter} />{" "}
              <Route path={`/Room-Management`} component={RoomManagement} />{" "}
              <Route path={`/profile`} component={ProfilePage} />{" "}
              <Route path={`/profileindividual`} component={ProfilePageTable} />{" "}
              <Route
                path={`/profiletravelagent`}
                component={ProfileTableTravelAgent}
              />{" "}
              <Route
                path={`/profilepagecompany`}
                component={ProfileTableCompany}
              />{" "}
            </Main>
          </Switch>{" "}
        </BrowserRouter>
      )}
    </Provider>
  );
}

export default App;
