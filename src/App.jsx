import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Letter} from "./components/index.js";

function App() {

  return (
    <div id={"main"}>
        <div id={"top-box"}>
            <div id={"top-left"} className={"top left"}><div className={"item"}>top left</div></div>
            <div id={"top-centre"} className={"top centre"}><div className={"item"}>top centre</div></div>
            <div id={"top-right"} className={"top right"}><div className={"item"}>top right</div></div>
        </div>
        <div id={"centre-box"}>
            <div>
                <Letter></Letter>
            </div>
            <div>
                <Letter></Letter>
            </div>
            <div>
                <Letter></Letter>
            </div>
        </div>
        <div id={"bottom-box"}>
            <div id={"bottom-left"} className={"bottom left"}><div className={"item"}>bottom left</div></div>
            <div id={"bottom-centre"} className={"bottom centre"}><div className={"item"}>bottom centre</div></div>
            <div id={"bottom-right"} className={"bottom right"}><div className={"item"}>bottom right</div></div>
        </div>
    </div>
  )
}

export default App
