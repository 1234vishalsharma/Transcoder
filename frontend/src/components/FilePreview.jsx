import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player'
;
function FilePreview() {
  const [FileData, setFileData] = useState();
  const [play , setplay] = useState(false);
  const { vid } = useParams();

  const response = (resp) => {
    resp.json().then(parsedresp);
  };
  const fetchData = async () => {
    const parsedresp = (data) => {
      setFileData(data?.data);

      console.log(data?.data);
    };
    const response = (resp) => {
      resp.json().then(parsedresp);
    };
    fetch(`http://localhost:4000/backend/filepreview/${vid}`, {
      method: "GET",
    })
      .then(response)
      .catch((err) => {
        console.log("Error occurred while fetching the data ", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [vid]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="grid grid-cols-2 w-full h-full bg-slate-900 text-white text-center ">
        <div className="border-2 border-white">
          <h2 className="text-2xl font-bold border-b-2 p-3">Inputed Video</h2>
          <div className="h-full justify-center ">
            <div className="flex flex-col gap-8 h-full justify-center">
              <div className="flex justify-center flex-col items-center gap-3">
              <ReactPlayer url={FileData?.main_url} playing = {play} />
              
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
            <div className="grid grid-rows-4">
              <div className="border-2 flex flex-col gap-4 p-4 items-center border-white">
                <span>Video with quality 1080p</span>
                <div className="flex gap-4 w-64 items-center">
                  <button className="p-2 border-green bg-green-600 rounded-lg">
                    Share Video
                  </button>
                  <button className="p-2 border-green bg-blue-600 rounded-lg">
                    Downlaod Video
                  </button>
                </div>
              </div>

              <div className="border-2 flex flex-col gap-4 p-4 items-center border-white">
                <span>Video with quality 720p</span>
                <div className="flex gap-4 w-64 items-center">
                  <button className="p-2 border-green bg-green-600 rounded-lg">
                    Share Video
                  </button>
                  <button className="p-2 border-green bg-blue-600 rounded-lg">
                    Downlaod Video
                  </button>
                </div>
              </div>

              <div className="border-2 flex flex-col gap-4 p-4 items-center border-white">
                <span>Video with quality 480p</span>
                <div className="flex gap-4 w-64 items-center">
                  <button className="p-2 border-green bg-green-600 rounded-lg">
                    Share Video
                  </button>
                  <button className="p-2 border-green bg-blue-600 rounded-lg">
                    Downlaod Video
                  </button>
                </div>
              </div>

              <div className="border-2 flex flex-col gap-4 p-4 items-center border-white">
                <span>Video with quality 360p</span>
                <div className="flex gap-4 w-64 items-center">
                  <button className="p-2 border-green bg-green-600 rounded-lg">
                    Share Video
                  </button>
                  <button className="p-2 border-green bg-blue-600 rounded-lg">
                    Downlaod Video
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
