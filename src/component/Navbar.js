import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import reallogo from '../assets/reallogo.png';
import logo from '../assets/logo.png';
import menuimg from '../assets/navmenu.png'
import backimg from '../assets/backimg.png'


function Navbar({windowWidth, setSelectedItem}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const menuItems = [
    { id: 'item-1-3', label: '공지사항', href: '#scrollspyHeading3' },
    { id: 'item-1-4', label: '문의하기', href: '#scrollspyHeading4' },
  ];

  return (
    <div
      id="navbar-example2 "
      className="navbar"
      style={{
        borderBottom: '1px solid #E0E0E0'
      }}>
      {/* 최상위 : zIndex // zIndex의 숫자가 클수록 맨위로 올라가진다.*/}
      <div style={{ position: 'relative', zIndex: 1 ,paddingLeft: '30vh' }}> 
        <button className="transparent-button" onClick={() => window.location.reload()}>
          <img src={logo} style={{ height: '68px' }}/>
        </button>
      </div>

      <div className="nav" style={{ paddingRight: '30vh' }}>
        {windowWidth < 1400 ? (
          <button className="transparent-button" onClick={() => setShowSidebar(!showSidebar)}>
            <img src={menuimg} height={'38px'} />
          </button>
        ) : (
          <div className="dropdown">
            <h2
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              style={{ fontSize: '17px', color: '#242D34', paddingRight: '4rem' }}
            >
              커뮤니티
            </h2>
            <div className="dropdown-menu">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  className="dropdown-item"
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedItem(item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <hr className="dropdown-divider" />
              <a className="dropdown-item" href="#scrollspyHeading5">
                세번째 목록
              </a>
            </div>
          </div>
        )}

        <div className="dropdown">
          <h2
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            role="button"
            style={{ fontSize: '17px', color: '#242D34', paddingRight: '5rem' }}
          >
            비어있음
          </h2>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#scrollspyHeading3">
              첫번째 목록
            </a>
            <a className="dropdown-item" href="#scrollspyHeading4">
              두번째 목록
            </a>
            <hr className="dropdown-divider" />
            <a className="dropdown-item" href="#scrollspyHeading5">
              세번째 목록
            </a>
          </div>
        </div>

        {showSidebar && windowWidth < 1400 && (
          <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
            <h2 className="font6" style={{ fontSize: '20px', color: '#242D34', textAlign: 'left' }}>
              안녕
            </h2>
            {menuItems.map((item) => (
              <a
                key={item.id}
                className="dropdown-item"
                href={item.href}
                style={{ fontSize: '20px', color: '#242D34', textAlign: 'left', paddingLeft: '1.5rem', padding: '10px' }}
                onClick={() => setSelectedItem(item.id)}
              >
                {item.label}
              </a>
            ))}
            <button className="transparent-button backimg" style={{ textAlign: 'left' }} onClick={() => setShowSidebar(false)}>
              <img src={backimg} height={'50px'} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
