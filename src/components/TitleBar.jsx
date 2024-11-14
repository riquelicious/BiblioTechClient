import React from "react";
import "./styles/TitleBar.css";
import iClose from "../assets/icons/Close.svg";
import iMaxRes from "../assets/icons/Maximize.svg";
import iMinimize from "../assets/icons/Minimize.svg";

export default function TitleBar() {
  return (
    <div className="Main-TitleBar">
      <div className="DragBar">
        <h6>BiblioTech</h6>
      </div>
      <ControlMenu />
    </div>
  );
}

function ControlMenu() {
  return (
    <div className="ControlMenu">
      <button className="ControlButton" id="maximize-btn" onClick={minimize}>
        <img className="ControlIcon" src={iMinimize} alt="" />
      </button>
      <button className="ControlButton" id="minimize-btn" onClick={maximize}>
        <img className="ControlIcon" src={iMaxRes} alt="" />
      </button>
      <button className="ControlButton" id="close-btn" onClick={close}>
        <img className="ControlIcon" src={iClose} alt="" />
      </button>
    </div>
  );
}

function close() {
  window.electronAPI.closeWindow();
}

function maximize() {
  window.electronAPI.toggleMaximize();
}

function minimize() {
  window.electronAPI.minimizeWindow();
}
