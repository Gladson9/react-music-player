import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserDashboard from "./components/user/UserDashboard";
import UserRoute from "./components/user/UserRoute";
import SignIn from "./components/user/SignIn";
import { AuthProvider } from "./components/context/AuthContext";
import { ThemeState } from "./components/context/theme/ThemeState";
import SignUp from "./components/user/SignUp";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeState>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={App} />
            <UserRoute path="/dashboard" exact component={UserDashboard} />
            <Route path="/login" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
          </Switch>
        </AuthProvider>
      </ThemeState>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
