import React from 'react'
import './WindowControls.css'

const WindowControls = () => {
  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  const handleMaximize = () => {
    window.electron.ipcRenderer.send('maximize-window')
  }

  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }

  return (
    <div className="window-controls">
      <button className="control-btn close" onClick={handleClose}></button>
      <button className="control-btn minimize" onClick={handleMinimize}></button>
      <button className="control-btn maximize" onClick={handleMaximize}></button>
    </div>
  )
}

export default WindowControls
