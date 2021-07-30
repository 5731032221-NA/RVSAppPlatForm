import "./App.css";
import Header from "./layouts/header";
import SignIn from "./components/SignIn";
import Dashboard from "./pages/DashboardPage";
import UserList from "./pages/TestUserListPage";
import ForgotPass from "./components/Forgotpass";
import reducer from "./middleware/reducer";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "./middleware/store";
import React, { useState } from "react";
import useToken from "./middleware/useToken";

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function setHeader(tokenParsed) {
//   sessionStorage.setItem('Authorization', tokenParsed);
// }

function App() {
  const { token, setToken } = useToken();
  // const store = createStore(reducer, applyMiddleware(thunk));
  // const [token, setToken] = useState();
  const store = configureStore();
  // const token = getToken();
  console.log("token", token);
  // if (!token) {
  //   console.log("tokentoken",token)
  //   return <SignIn setToken={setToken} />
  // }
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forgotpassword" component={ForgotPass} />
            <Route exact path="/userlist" component={UserList} />
            
            <Route exact path="/" component={Dashboard} />
            {/* <Route component={ErrorPage} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
