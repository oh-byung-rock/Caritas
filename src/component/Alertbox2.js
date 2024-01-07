import React, { useState, useEffect } from 'react';

function AlertBox2({ message, duration = 5000 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => setShow(false), duration);
    }
  }, [message, duration]);

  if (!show) return null;

  return (
    <div className="alert-box">
      {message}
    </div>
  );
}

export default AlertBox2;
