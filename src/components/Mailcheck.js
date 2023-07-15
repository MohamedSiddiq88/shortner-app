import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MailCheck() {
  const [email, setEmail] = useState('');
  const [string, setString] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const handleEmailCheck = async () => {
    const response = await fetch('https://forgot-password-express.vercel.app/users/checkmail', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.data !== 'invalid') {
      setIsEmailValid(true);
      alert(
        'The string sent to the mail. Please go to https://ethereal.email/ and login with the following credentials:\nUser: blake.mills@ethereal.email\nPassword: QDm1tFYXuPewf3d3Cs'
      );
    } else {
      setIsEmailValid(false);
      alert('Invalid email');
    }
  };

  const handlePasswordReset = async () => {
    const response = await fetch(`https://forgot-password-express.vercel.app/users/checkstring?token=${string}`, {
      method: 'POST',
      body: JSON.stringify({ randomString: string }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setResult(data.data);
    if (data.data !== 'invalid token') {
      console.log(data.data);
      navigate(`/resetpassword?token=${string}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Mail Check</h5>
              <div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleEmailCheck}>
                  Next
                </button>
                {isEmailValid && (
                  <div>
                    <label>String</label>
                    <input
                      type="text"
                      id="string"
                      className="form-control"
                      name="string"
                      required
                      value={string}
                      onChange={(e) => setString(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handlePasswordReset}>
                      Reset Password
                    </button>
                    <p>{result}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MailCheck;
