import "./App.css";
import Header from "./layouts/header";
import Leftbar from "./layouts/Leftbar";

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
import useLang from "./middleware/useLang";
import useTheme from "./middleware/useTheme";
import en_lang from "./static/lang/en.json"
import th_lang from "./static/lang/th.json"

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function setHeader(tokenParsed) {
//   sessionStorage.setItem('Authorization', tokenParsed);
// }



function App() {
    const { token, setToken } = useToken();
    const store = configureStore();
    const [pathn, setpathn] = useState("/"+store.getState().reducer.lang);
    // const { theme, setTheme } = useTheme();
    // const { lang, setLang } = useLang();
    // const [locale, setLocale] = useState(en_lang);
    // var prevlang = "en"
    // if (lang == 'th') {
    //     setLocale(th_lang);
    // } else if (lang != prevlang && lang != undefined) {
    //     console.log("prevlang", prevlang, lang)
    //     prevlang = lang
    //     setLocale(en_lang);
    // }
    // // const store = createStore(reducer, applyMiddleware(thunk));
    // // const [token, setToken] = useState();
    
  
    console.log("store",store.getState().reducer.lang)
    // console.log("lang", lang);
    // console.log("theme", theme);
    // // const token = getToken();
    // console.log("token", token);
    if (!token) {
        console.log("tokentoken", token)
        return <SignIn setToken = { setToken }
        />
    }
    
    // let pathn = "/"+store.getState().reducer.lang;
    console.log(pathn);
    return ( <Provider store={store}>
      <div>

        <BrowserRouter>
        {/* <Leftbar /> */}
          {/* <Header store={store}/> */}
          
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forgotpassword" component={ForgotPass} />
            <Route exact path="/userlist" component={UserList} />
            
            <Route exact path="/" component={Dashboard}   />
            {/* <Route component={ErrorPage} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
    );
}

export default App;