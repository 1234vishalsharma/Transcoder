import React from "react";
import { useState } from "react";
import axios from 'axios';
import toast , {Toaster} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

function Card() {
  const router = useNavigate();
  const [Video , setVideo] = useState();
  const [progress , setProgress] = useState(0);
  const [bar ,setbar] = useState(false);
  const [disable , setdisable] = useState(false);

  const UploadHandeler = async() => {
    if(!Video){
      toast.error("No Video Selected");
      return;
    }

    const toastId = toast.loading('Uploading...');

    setdisable(true);
    setProgress(0);
    setbar(true);
    console.log(Video)
    const formData = new FormData();
    formData.append('video', Video);
   
    try{
      // const response = await axios.post('https://transcoder-lwhp.onrender.com/backend/Upload', formData,{
        const response = await axios.post("http://localhost:4000/backend/Upload" , formData , {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        setProgress( Math.round((progressEvent.loaded / progressEvent.total)*100) + '%');
      },
    });
    if(response.data.status){
      toast.success("Video Uploaded Successfully")
      setdisable(false);
      toast.dismiss(toastId);
      console.log(response.data);
      setTimeout(() => {
        router(`/Filepreview/${response.data.vid}`);
      }, 3000);  
      return;
    }
  }
    catch(error){
      toast.dismiss(toastId);
      toast.error("Failed to Upload")
      console.log("Error in Uploading the file")
      console.log(error)
      setdisable(false);
    }
  }
  return (
    <div className="flex flex-col gap-4 w-full pt-8 items-center h-screen bg-slate-800">
      <Toaster/>
      <h1 className="text-center text-2xl text-blue-600">Select a video</h1>
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
            onChange = { (event) => {if(event.target.files[0].size < 104857600) setVideo(event.target.files[0]) }}
          />
        </label>

      </div>
      {Video && <div className="text-red-700 w-32 h-20 border-white ">
          Name: {Video.name}
          <br />
          Size: {Video.size}
      </div>}

      {disable ? <button disabled className={`text-white bg-slate-500 p-2 rounded-md border-2 border-white hover:bg-slate-700 ${disable ? "cursor-not-allowed":null}`}
      onClick={UploadHandeler}>
        Upload Video
      </button> : <button className={`text-white bg-slate-500 p-2 rounded-md border-2 border-white hover:bg-slate-700`}
      onClick={UploadHandeler}>
        Upload Video
      </button>}


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
