import './assets/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Manager from './pages/Manager';
import Market from './pages/Market';
import { Toaster } from 'react-hot-toast';

function App() {
    
    return (
        <>
            <Toaster
                toastOptions={{className: 'toaster'}}
                position="top-center"
                reverseOrder={false}
            />
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/manager' element={<Manager/>} />
                    <Route path='/market' element={<Market/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App
