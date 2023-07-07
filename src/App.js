import logo from './logo.svg';
import './App.css';
import { UploadModel } from './UploadModel';
import { GetModel } from './GetModel';
import React, { useState } from 'react';
import { LoadModel } from './LoadModel';
import { CreatePipeline } from './CreatePipeline';
import { CreateIndex } from './CreateIndex';
import { ReindexModel } from './ReindexModel';
import { SearchModel } from './SearchModel';

function handleClick() {
    
    // Send data to the backend via POST
    fetch('http://127.0.0.1:5000/', {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors'

    })
    
  }

function App() {
  const [isrendered,setisrendered]=useState(false);
  return (
    <div className="container">
      <div className="center">
        {/* <input type="button" className='button' value="Upload Model" onClick={()=>{setisrendered(true)}} />
    {isrendered&&<UploadModel/>} */}
       <UploadModel/>
        <GetModel />
        <LoadModel />
        <CreatePipeline />
        <CreateIndex />
        <ReindexModel />
        <SearchModel />
      </div>

    </div>
    
  );
}

export default App;
