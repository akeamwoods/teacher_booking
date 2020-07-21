import React from "react";
import { render } from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { Route, HashRouter } from "react-router-dom";
import { AvailabilityHandler } from "./handlers/AvailabilityHandler";
import { SideMenu } from "./components/SideMenu";
import { UserBar } from "./components/UserBar";
import "./style.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <SideMenu />
      <Route exact path="/" component={AvailabilityHandler} />
      <UserBar />
    </div>
  );
};

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  </Provider>,
  rootElement
);
