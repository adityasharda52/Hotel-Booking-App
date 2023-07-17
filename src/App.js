import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreeen from './screens/Registerscreeen';
import Loginscreen from './screens/Loginscreen'
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/home' exact Component={Homescreen}></Route>
          <Route path='/book/:roomid/:fromdate/:todate' exact Component={Bookingscreen}></Route>
          <Route path='/register' exact Component={Registerscreeen}></Route>
          <Route path='/login' exact Component={Loginscreen}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
