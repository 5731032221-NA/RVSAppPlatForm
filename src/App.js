import "./assets/App.css";
import Property from "./pages/Property";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./middleware/store";
import React, { useState } from "react";
import UseToken from "./middleware/useToken";
import UseProperty from "./middleware/useProperty";
import {
  EDIT_PROPERTY,
  EDIT_INDEXTAB,
  EDIT_PERMISSION,
} from "./middleware/action";

import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import FrontDesk from "./components/Dashboard/FrontDesk";
import Dashboard from "./components/Dashboard/Dashboard";
import Configuration from "./pages/configurations/Configuration";
import ReservationPage from "./pages/ReservationPage";
import RoleManagement from "./pages/configurations/RoleManagement";
import UserManagement from "./pages/configurations/UserManagement";
import DeviceManager from "./pages/configurations/DeviceManager";
import ComputerPrinter from "./pages/configurations/ComputerPrinter";
import RoomManagement from "./pages/configurations/RoomManagement";
import ProfileTableCompany from "./components/Profiles/ProfileTableCompany";
import ProfileTableTravelAgent from "./components/Profiles/ProfileTableTravelAgent";
import ProfileTableIndividual from "./components/Profiles/ProfileTableIndividual";
import Reports from "./pages/Reports";
import propertyPermission from "./services/propertypermission.service";

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
      const permission = await propertyPermission(
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
      {!token ? (
        <SignIn setToken={setToken} store={store} />
      ) : !selectedProperty ? (
        <Property setToken={setToken} setProperty={setProperty} />
      ) : (
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Main>
              <Route exact path={`/`} component={Dashboard} />
              <Route path={`/frontdesk`} component={FrontDesk} />
              <Route path={`/reservation`} component={ReservationPage} />
              <Route path={`/configuration`} component={Configuration} />
              <Route path={`/User-Management`} component={UserManagement} />
              <Route path={`/Role-Management`} component={RoleManagement} />
              <Route path={`/Device-Manager`} component={DeviceManager} />
              <Route path={`/Computer-printer`} component={ComputerPrinter} />
              <Route path={`/Room-Management`} component={RoomManagement} />
              <Route
                path={`/profileindividual`}
                component={ProfileTableIndividual}
              />
              <Route
                path={`/profiletravelagent`}
                component={ProfileTableTravelAgent}
              />
              <Route
                path={`/profilepagecompany`}
                component={ProfileTableCompany}
              />
              <Route path={`/reports`} component={Reports} />
            </Main>
          </Switch>
        </BrowserRouter>
      )}
    </Provider>
  );
}

export default App;
