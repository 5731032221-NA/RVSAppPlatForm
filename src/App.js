import "./assets/App.css"
import SignIn from "./pages/SignIn"
import Property from "./pages/Property"
import Dashboard from "./pages/DashboardPage"
import UserList from "./pages/TestUserListPage"
import ForgotPass from "./components/Forgotpass"
// import reducer from "./middleware/reducer";
import { createStore, applyMiddleware } from "redux"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
// import thunk from "redux-thunk";
import configureStore from "./middleware/store"
import React, { useState } from "react"
import useToken from "./middleware/useToken"
import useProperty from "./middleware/useProperty"
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

function App() {
  const { token, setToken } = useToken()
  const { property, setProperty } = useProperty()



  const [store, setStore] = useState(configureStore());

  return (
    <Provider store={store}>
      {" "}
      {!token ? (
        <SignIn setToken={setToken} store={store} />
      ) : !property ? (
        <Property setToken={setToken} setProperty={setProperty} />
      ) : (
        <BrowserRouter>
          {" "}
          {/* <Leftbar /> */}{" "}
          <Switch>
            <Route exact path="/signin" component={SignIn} />{" "}
            <Route exact path="/forgotpassword" component={ForgotPass} />{" "}
            <Route exact path="/userlist" component={UserList} />{" "}
            <Route
              exact
              path="/"
              component={Dashboard}
              style={{ backgroundColor: "black" }}
            />{" "}
            {/* <Route component={ErrorPage} /> */}{" "}
          </Switch>{" "}
          {/* <Header store={store} /> */}{" "}
        </BrowserRouter>
      )}
    </Provider>
  )
}

export default App
