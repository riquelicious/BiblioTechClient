import React from "react";
import './TitleBar.css';
import iClose from '../assets/icons/Close.svg'
import iMaxRes from '../assets/icons/Maximize.svg'
import iMinimize from '../assets/icons/Minimize.svg'

//const path = require('path')
//const iClose = path.join(__dirname, 'assets/icons', 'Close.png')
//console.log(iClose)
export default function TitleBar() {
	return (
		<div className='Main-TitleBar'>
			<div className="DragBar">
				<h6>BiblioTech</h6>
			</div>
			<ControlMenu/>
		</div>
	);
}

function ControlMenu(params) {
	return (
			<div  className="ControlMenu" >
			<button className="ControlButton" id='maximize-btn' onClick={minimize}>
				<img className="ControlIcon" src={iMinimize} alt="" />
			</button>
			<button className="ControlButton" id='minimize-btn' onClick={maximize}>
				<img className="ControlIcon" src={iMaxRes} alt="" />
			</button>
			<button className="ControlButton" id='close-btn' onClick={close}>
				<img className="ControlIcon" src={iClose} alt="" />
			</button>
			</div>
	);
}

function close() {
	console.log("Closing Window")
	window.electronAPI.closeWindow();
}

function maximize() {
	console.log("Maximizing Window")
	window.electronAPI.toggleMaximize();
}

function minimize() {
	console.log("Minimizing Window")
	window.electronAPI.minimizeWindow();
}
