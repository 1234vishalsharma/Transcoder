import React from "react";
import { useState } from "react";
import axios from 'axios';

function Card() {

  const [Video , setVideo] = useState();

  const UploadHandeler = async() => {

    if(Video)  console.log(Video.name);

    
    try{
      
      const formData = new FormData();
      formData.append('video', Video);
  
      const response = await axios.post('http://localhost:3000/backend/Upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    if(!response.ok){
      console.log("cannot uploaded file");
    }
    
  }
    catch{
      console.log("Error in Uploading the file")
    }
  }
  return (
    <div className="flex flex-col gap-4 items-center h-96 p-8 rounded-lg bg-slate-800">
      <h1 className="text-center text-2xl text-blue-600">Put your video here</h1>
      <div className="h-64 w-full rounded-lg overflow-hidden border-white border-2 border-dashed">
        <label>
          <div className="text-white bg-slate-500 h-full w-full flex justify-center items-center flex-col gap-3 cursor-pointer hover:bg-slate-700">
            <p className="text-4xl">Drag and Drop</p>
            <p>click to add the file</p>
          </div>
          <input
            className="hidden text-white gap-3"
            type="file"
            id="input_video"
            onChange = { (event) => { setVideo(event.target.files[0]) }}
          />
        </label>
      </div>
      <button className="text-white bg-slate-500 p-2 rounded-md border-2 border-white hover:bg-slate-700 mt-4"
      onClick={UploadHandeler}>
        Upload
      </button>
    </div>
  );
}

export default Card;
