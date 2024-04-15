import React from "react";
import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Card() {
  const router = useNavigate();
  const [Video , setVideo] = useState();
  const [progress , setProgress] = useState(0);
  const [bar ,setbar] = useState(false);
  // const [videoSource ,setVideoSource] = useState();

  const UploadHandeler = async() => {
    setbar(true);
    console.log(Video)
    const formData = new FormData();
    formData.append('video', Video);
   
    try{
      const response = await axios.post('http://localhost:4000/backend/Upload', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        setProgress( Math.round((progressEvent.loaded / progressEvent.total)*100) + '%');
      },
    });
    if(response.data.status){
      console.log(response.data);
      router(`/Filepreview/${response.data.vid}`);  
      return;
    }
  }
    catch(error){
      console.log("Error in Uploading the file")
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col gap-4 w-full pt-8 items-center h-screen bg-slate-800">
      <h1 className="text-center text-2xl text-blue-600">Put your video here</h1>
      <div className="h-64 w-3/4 rounded-lg overflow-hidden border-white border-2 border-dashed">
        <label>
          <div className="text-white bg-slate-500 h-full w-full flex justify-center items-center flex-col gap-3 cursor-pointer hover:bg-slate-700">
            <p className="text-4xl text-center">Drag and Drop</p>
            <p className="text-center">click to add the file</p>
          </div>
          <input
            className="hidden text-white gap-3"
            type="file"
            id="input_video"
            onChange = { (event) => { setVideo(event.target.files[0]) }}
          />
        </label>

      </div>
      {Video && <div className="text-white w-32 h-20 border-white ">
          {Video.name}
          <br />
          {Video.size}
      </div>}

      <button className="text-white bg-slate-500 p-2 rounded-md border-2 border-white hover:bg-slate-700"
      onClick={UploadHandeler}>
        Upload Video
      </button>


      {bar && <div className='w-3/4  mt-8'>
            <span id="ProgressLabel" className="sr-only">Loading</span>
            <span
                role="progressbar"
                aria-labelledby="ProgressLabel"
                aria-valuenow={progress}
                className="relative block rounded-full bg-gray-200"
            >
                <span className="absolute inset-0 flex items-center justify-center text-[15px]/4">
                <span className="font-semibold text-black"> {progress} successful</span>
                </span>

                <span className="block h-4 rounded-full bg-indigo-600 text-center" style={{width: `${progress}`}}>  </span>
            </span>
        </div>}


    </div>
  );
}

export default Card;
