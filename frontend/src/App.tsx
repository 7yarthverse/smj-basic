import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Button from './components/Button';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Navigate to="/SignIn" />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Button" element={<Button/>}/>
        
    
      </Routes>
    </Router>
  );
}

export default App;
