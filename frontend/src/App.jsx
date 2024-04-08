import './App.css'
import FilePreview from './components/FilePreview'
import Card from './components/card'  
import {BrowserRouter , Route,Routes} from  'react-router-dom'


function App() {
  return (      
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Card/>} />
            <Route path='/Filepreview/:vid' element={<FilePreview />} />
         </Routes>
      </BrowserRouter>
  )
}

export default App
