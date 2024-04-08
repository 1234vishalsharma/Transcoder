// eslint-disable-next-line no-unused-vars
import React , {useState , useEffect} from 'react'
import {useParams} from 'react-router-dom';

function FilePreview() {
  const [FileData,setFileData] = useState();
  const {vid} = useParams();

  const parsedresp = (data) => {
    setFileData(data);
    console.log(data);
  }

  const fetchData = async() => {
    const response = (resp) => {
      resp.json().then(parsedresp);
    }
    fetch(`http://localhost:4000/backend/filepreview/${vid}` , {
      method: "GET",
    }).then(response).catch((err)=>{
        console.log("Error occured while fetching the data ", )
    })
  }

  setTimeout(() => {
    fetchData();
  }, 2000);

  return (
    <div className='w-full h-screen bg-slate-900 text-white text-center '>
        { FileData &&
        
        <div className= "text-2xl text-white">
          {FileData.dummyname}
          <br/>
          {FileData.orignalname}
        </div>

        }
    </div>
  )
}

export default FilePreview