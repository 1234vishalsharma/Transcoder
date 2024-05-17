import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player'
;
const FilePreview = () => {
  const [FileData, setFileData] = useState();
  const [play , setplay] = useState(false);
  const { vid } = useParams();
  const [videourl,setVideoUrl] = useState();
  const [path,setPath] = useState();

  // const response = (resp) => {
  //   resp.json().then(parsedresp);
  // };
  const fetchData = async () => {
    const parsedresp = (data) => {
      setFileData(data?.data);
      setVideoUrl(data?.data.main_url)
      console.log(data?.data);
      setPath(data?.data.path);
    };
    const response = (resp) => {
      resp.json().then(parsedresp);
    };
    // fetch(`https://transcoder-lwhp.onrender.com/backend/filepreview/${vid}`, {
    fetch(`http://localhost:4000/backend/filepreview/${vid}`, {
      method: "GET",
    })
      .then(response)
      .catch((err) => {
        console.log("Error occurred while fetching the data ", err);
      });
  };

  const viewFile = async(quality) => {
    let qualitys = quality;
    console.log("quality is ",qualitys);
    try {
      // Send a request to the backend to download the file
      // const response = await fetch(`https://transcoder-lwhp.onrender.com/backend/viewfile` , {
      const response = await fetch(`http://localhost:4000/backend/viewfile` , {
        method: "POST",
        headers: {
          "content-type": 'application/json',
        },
        body: JSON.stringify({
          "vid":path,
          "quality": qualitys,
        }),
      });
      // console.log(response);
      const file = await response.json();
      setVideoUrl(file?.url);
      setFileData(file);

      
    }catch (error) {
      console.error('Error downloading file:', error);
    }
  }
  
  const Downlaod1080p = async(quality) => {
   
    console.log("quality is ",quality);
    try {
      // Send a request to the backend to download the file
      // const response = await fetch(`https://transcoder-lwhp.onrender.com/backend/download` , {
      const response = await fetch(`http://localhost:4000/backend/download` , {
        method: "POST",
        headers: {
          "content-type": 'application/json',
        },
        body: JSON.stringify({
          "vid":vid,
          "quality": quality,
        }),
      });
      console.log(response);
      const blob = await response.blob();
      
      // Create a temporary link element to trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "1080p.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    }catch (error) {
      console.error('Error downloading file:', error);
    }
  }
  const Downlaod720p = async(quality) => {
   
    console.log("quality is ",quality);
    try {
      // Send a request to the backend to download the file
      // const response = await fetch(`https://transcoder-lwhp.onrender.com/backend/download` , {
      const response = await fetch(`http://localhost:4000/backend/download` , {
        method: "POST",
        headers: {
          "content-type": 'application/json',
        },
        body: JSON.stringify({
          "vid":vid,
          "quality": quality,
        }),
      });
      console.log(response);
      const blob = await response.blob();
      
      // Create a temporary link element to trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "720p.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    }catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  const Downlaod480p = async() => {
    const quality = "480";
    try {
      // Send a request to the backend to download the file
      // const response = await fetch(`https://transcoder-lwhp.onrender.com/backend/download`,{
      const response = await fetch(`http://localhost:4000/backend/download`,{
        method: "POST",
        headers: {
          "content-type": 'application/json',
        },
        body: JSON.stringify({
          "vid":vid,
          "quality": quality,
        }),
      });
      console.log(response);
      const blob = await response.blob();
      
      // Create a temporary link element to trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "480p.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);  
    }catch(e){
      console.log("Error occured in downlaoding file ", e);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [vid]);



  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="grid grid-cols-2 w-full h-full bg-slate-900 text-white text-center ">
        <div className="border-2 border-white overflow-hidden">
          <h2 className="text-2xl font-bold border-b-2 p-3">Inputed Video</h2>
          <div className="h-full justify-center ">
            <div className="flex flex-col gap-8 h-full justify-center">
              <div className="flex justify-center flex-col items-center gap-3 overflow-hidden">
              <ReactPlayer className="p-4" url={videourl} playing = {play} />             
                <label> Video Title: {FileData?.orignalname} </label>
              </div>
              <div>
                <label> Video Size: {Math.round(FileData?.size)} MB</label>
              </div>
              <button onClick={()=> setplay(!play)} className="p-2 bg-green-500 border-white w-32 flex justify-center items-center rounded-lg ml-auto mr-auto">
                {play === false ? "Play" : "Pause" } Video
              </button>
            </div>
          </div>
        </div>

        <div className="border-2 border-white">
          <h2 className="text-2xl font-bold border-b-2 p-3">
            Transcoded Video
          </h2>
          <div className="flex flex-col gap-4 h-full justify-center">
            First press the download button then press the show button.
            <div className="grid grid-rows-4">
              <div className="border-2 flex flex-col gap-4 p-4 items-center border-white">
                <span>Video with quality 1080p</span>
                <div className="flex justify-center gap-4 w-64 items-center">
                  <button onClick={()=>viewFile("1080")}  className="p-2 border-green bg-green-400 rounded-lg">
                    Show
                 </button>
                  <button onClick={()=>Downlaod1080p("1080")} className="p-2 border-green bg-blue-600 rounded-lg">
                    Downlaod Video 1080p
                  </button>
                </div>
              </div>

              <div className="border-2 flex flex-col gap-4 p-4 items-center border-white">
                <span>Video with quality 720p</span>
                <div className="flex justify-center gap-4 w-64 items-center">

                  <button onClick={()=>viewFile("720")}  className="p-2 border-green bg-green-400 rounded-lg">
                    Show
                   </button>
                  <button onClick={()=>Downlaod720p("720")} className="p-2 border-green bg-blue-600 rounded-lg">
                    Downlaod Video 720p
                  </button>
                </div>
              </div>

              <div className="border-2 flex flex-col gap-4 p-4 items-center border-white">
                <span>Video with quality 480p</span>
                <div className="flex justify-center gap-4 w-64 items-center">
                  <button onClick={()=>viewFile("480")} className="p-2 border-green bg-green-400 rounded-lg">
                    Show
                   </button>
                  
                  <button onClick={()=>Downlaod480p("480")} className="p-2 border-green bg-blue-600 rounded-lg">
                    Downlaod Video 480p
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilePreview;