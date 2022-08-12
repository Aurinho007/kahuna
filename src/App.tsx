import './assets/App.css'
import Header from './components/Header'
import InvestmentList from './components/InvestimentList'
import UserContext from './contexts/UserContext'

function App() {
    

  return (
    <>
      <UserContext.Provider value={{}}>
        <Header/>
        <InvestmentList/>
      </UserContext.Provider>
    </>
  )
}

export default App
