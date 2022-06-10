import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App" onContextMenu={(e) => {
      e.preventDefault()
      console.log("Main mouse left click");
    }}  onClick={(e) => {
      console.log("dsds");
      console.log(e.type);
      
      if(e.type === "contextmenu"){
      console.log("Mouse Rigth click");
      } else if (e.type === "clicl"){
        console.log("mouse left click");
      }
    }}>
      <header className="App-header">
        <h1>hello</h1>        
      </header>
    </div>
  );
}

export default App;
