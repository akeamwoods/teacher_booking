import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "./store/actions";

function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <button onClick={() => dispatch(actions.exampleAction("hi"))}>
        dispatch action
      </button>
    </div>
  );
}

export default App;
