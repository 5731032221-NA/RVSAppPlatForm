import "./assets/App.css";
import SignIn from "./pages/SignIn";
import Property from "./pages/Property";
import Main from "./pages/Main";
import UserList from "./pages/TestUserListPage";
import ForgotPass from "./components/Forgotpass";
// import reducer from "./middleware/reducer";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import thunk from "redux-thunk";
import configureStore from "./middleware/store";
import React, { useState, useContext } from "react";
import useToken from "./middleware/useToken";
import useProperty from "./middleware/useProperty";

import propertypermission from "./services/propertypermission.service";
import {
  EDIT_PROPERTY,
  EDIT_COMPONENT,
  EDIT_INDEXTAB,
  EDIT_PERMISSION,
} from "./middleware/action";

import FrontDesk from "./components/Dashboard/FrontDesk";
import Dashboard from "./components/Dashboard/Dashboard";

import Configuration from "./components/Dashboard/Configuration";
import ReservationPage from "./pages/ReservationPage";

import RoleManagement from "./components/RoleManagement";
import UserManagement from "./components/UserManagement";
import DeviceManager from "./components/DeviceManager";
import ComputerPrinter from "./components/ComputerPrinter";
import RoomManagement from "./components/RoomManagement";
import GenericNotFound from "./pages/GenericNotFound";
import DashboardDetail from "./components/Dashboard/DashboardDetail";
import ProfilePage from "./pages/ProfilePage";
import ProfileTableCompany from "./components/ProfileTableCompany";
import ProfileTableTravelAgent from "./components/ProfileTableTravelAgent";
import ProfilePageTable from "./components/ProfileTable";

import ProfilePageIndividual from "./components/ProfileIndividual";
import ProfilePageTravelAgent from "./components/ProfileTravelAgent";
import ProfilePageCompany from "./components/ProfileCompany";
// import useAuthorization from "./middleware/useAuthorization";
// import useLang from "./middleware/useLang";
// import useTheme from "./middleware/useTheme";
// import en_lang from "./static/lang/en.json";
// import th_lang from "./static/lang/th.json";

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function setHeader(tokenParsed) {
//   sessionStorage.setItem('Authorization', tokenParsed);
// }

// import configureStore from "./middleware/configureStore"
// const { store } = configureStore();\

function App() {
  const { token, setToken } = useToken();
  const { property, setProperty } = useProperty();
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
    // store.dispatch({
    //     type: EDIT_COMPONENT,
    //     payload: comp
    // })
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
          {/* <Leftbar /> */}{" "}
          <Switch>
            <Route exact path="/signin" component={SignIn} />{" "}
            <Route exact path="/forgotpassword" component={ForgotPass} />{" "}
            <Route exact path="/userlist" component={UserList} />{" "}
            {/* <Route
              path="/"
              component={Main}
              style={{ backgroundColor: "black" }}
            />{" "} */}
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
              {/* <Route  component={GenericNotFound} /> */}
            </Main>
            {/* <Route component={ErrorPage} /> */}{" "}
          </Switch>{" "}
          {/* <Header store={store} /> */}{" "}
        </BrowserRouter>
      )}
    </Provider>
  );
}

export default App;
