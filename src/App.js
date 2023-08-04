import logo from './logo.svg';
import './App.css';
import { UploadModel } from './UploadModel';
import { GetModel } from './GetModel';
import React, { useState } from 'react';
import { LoadModel } from './LoadModel';
import { GetModel2 } from './GetModel2';
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
        Scrappy Demo
        <br />
        <br />
        Each step below indicates a "module" that will be linked by the drag-and-drop GUI. Output from one becomes input to another.
        <br />
        <br />
        We will link to a custom pretrained model from Huggingface using ml-commons Model-serving framework and populate a vector DB to enable neural search.
        <br />
        <br />
        All the copy/paste will eventually be automated in the AI workflow.
        <hr />
        <br />
        <br />
        {/* <input type="button" className='button' value="Upload Model" onClick={()=>{setisrendered(true)}} />
    {isrendered&&<UploadModel/>} */}
        <UploadModel/>
        <GetModel />
        <LoadModel />
        <GetModel2 />
        <CreatePipeline />
        <CreateIndex />
        <ReindexModel />
        <SearchModel />
      </div>

    </div>
    
  );
}

export default App;
