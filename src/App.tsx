import React from "react"
import logo from "./logo.svg"
import "./App.css"
import { Popover } from "./components/popover";
import { Button } from "./components/button";

const popoverContent = (<div>
  <p>Some content for a popover</p>
  <p>Another paragraph</p>
</div>);

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      <br />

      <Popover trigger="click" placement="left" title="Left side" content={popoverContent}>
        <Button>Click to open left</Button>
      </Popover>

      <br />

      <Popover trigger="click" placement="right" title="Right side" content={popoverContent}>
        <Button>Click to open right</Button>
      </Popover>

      <br />

      <Popover trigger="hover" placement="left" title="Left side" content={popoverContent}>
        <Button>Hover to open left</Button>
      </Popover>

      <br />

      <Popover trigger="hover" placement="right" title="Right side" content={popoverContent}>
        <Button>Hover to open right</Button>
      </Popover>
    </div>
  )
}

export default App
