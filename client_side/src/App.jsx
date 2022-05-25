import {Footer,Navigation,TransactionCreation,TransactionHistory} from './componenets';

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg">
        <Navigation/>
        <TransactionCreation/>
      </div>
      <TransactionHistory/>
      <Footer/>
    </div>
  )
}

export default App;
