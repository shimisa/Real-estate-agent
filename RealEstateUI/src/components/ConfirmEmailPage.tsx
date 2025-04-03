import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ConfirmEmailPage() {
  const [message, setMessage] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/register/confirm-email?token=' + token);
        setMessage('Your email has been successfully confirmed!');
      } catch (err) {
        setMessage('Invalid or expired confirmation link.');
      }
    };

    if (token) {
      confirmEmail();
    }
  }, [token]);

  return (
    <div className="confirmation-container">
      <h1>Email Confirmation</h1>
      <p>{message}</p>
    </div>
  );
}

export default ConfirmEmailPage;