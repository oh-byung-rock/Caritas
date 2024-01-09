import React, { useState, useEffect } from 'react';
import bell from '../assets/bell.png';

function AlertBox2({ message,change, duration = 5000 }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => setShow(false), duration);
    }
  }, [change]);

  if (!show) return null;

  return (
    <div className="alert-box">
      <div className="title">
        {/* margin : abcd -> a(상)b(우)c(하)d(좌) */}
        <img style={{width:'20px', height:'20px', margin:'20px'}} src={bell} alt="bell" /> {/* 벨 아이콘 추가 */}
        <span>알림</span> {/* 제목 '알림' 추가 */}
      </div>
      <div className="content" >
        {message} {/* 내용 부분에 메시지를 표시 */}
      </div>
    </div>
  );
}

export default AlertBox2;
