import './App.css'
import FilePreview from './components/FilePreview'
import Card from './components/card'  
import {BrowserRouter , Route,Routes} from  'react-router-dom'


function App() {
  return (
    
      
      <BrowserRouter>
         <h2> This is a header file</h2>
         <Routes>
            <Route path='/' element={<Card/>} />
            <Route path='/FileSection' element={<FilePreview />} />
         </Routes>
      </BrowserRouter>
  )
}

export default App
