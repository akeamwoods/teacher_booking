import React from "react";
import { SideMenu } from "./components/SideMenu";
import { AvailabilityHandler } from "./handlers/AvailabilityHandler";
import "./style.css";
import { UserBar } from "./components/UserBar";

function App() {
  return (
    <div className="App">
      <SideMenu />
      <AvailabilityHandler />
      <UserBar />
    </div>
  );
}

export default App;
