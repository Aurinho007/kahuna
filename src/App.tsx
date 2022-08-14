import './assets/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Manager from './pages/Manager';
import Help from './pages/Help';

function App() {
    
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/manager' element={<Manager/>} />
                <Route path='/help' element={<Help/>} />
            </Routes>
        </Router>
    )
}

export default App
