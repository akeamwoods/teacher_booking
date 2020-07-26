import React from "react";
import { render } from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { Route, HashRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AvailabilityHandler } from "./handlers/AvailabilityHandler";
import { SideMenu } from "./components/SideMenu";
import "./style.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <SideMenu />
      <Route exact path="/" component={AvailabilityHandler} />
    </div>
  );
};

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </HashRouter>
  </Provider>,
  rootElement
);
