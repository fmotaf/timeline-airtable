import React from "react";
import ReactDOM from "react-dom/client";
import Timeline from "./components/Timeline.js";
import timelineItems from "./timelineItems.js";

function App() {
  return (
    <div>
      <Timeline items={timelineItems} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);