import './assets/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Manager from './pages/Manager';
import Market from './pages/Market';

function App() {
    
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/manager' element={<Manager/>} />
                <Route path='/market' element={<Market/>} />
            </Routes>
        </Router>
    )
}

export default App
