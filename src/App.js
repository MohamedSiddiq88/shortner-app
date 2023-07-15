import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UrlForm from './components/UrlForm';
import Signup from './components/Signup';
import Login from './components/Login';
import MailCheck from './components/Mailcheck'
import ResetPassword from './components/ResetPassword';


const App = () => {


  return (
    <div>

      <Routes>
        <Route path="/" element={<UrlForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mailcheck" element={<MailCheck />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        
      </Routes>
    </div>
  );
};

export default App;
