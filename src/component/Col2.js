import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import chimg from '../assets/changeimg.png';
import ProfileChange from "./ProfileChange";
import openwhite from '../assets/openwhite.png';
import openblack from '../assets/openblack.png';
import close from '../assets/close.png';

function Col2({ photoURL, setPhotoURL, currentUser, navigate, selectedItem, setSelectedItem, handleLogout, name , setColWidth, setLeftMargin  }) {
  const [openProfileChange, setOpenProfileChange] = useState(false);
  const [collapsed, setCollapsed] = useState(true); 
  const [pic, setPic] = useState(openwhite);

  const handleProfileChangeDialog = () => {
    setOpenProfileChange(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, []); 

  const handleScroll = () => {
  const value = window.scrollY;
    if (value > 508.2) {
      setPic(openblack);
    } else {
      setPic(openwhite);
    }
  }; 

  useEffect(() => {
    if (collapsed) {
      setColWidth('100%');
      setLeftMargin('0');
    } else {
      setColWidth('85%');
      setLeftMargin('15%');
    }
  }, [collapsed]);

  return (
    <div className="col-2 nav-container" style={{minWidth:'330px'}}>
      {collapsed ? <button className="small-thumbnail" style={{ bottom:'83%', left:'12%', backgroundImage: `url('${pic}')` }} onClick={() => setCollapsed(false)}/> : (
          <div id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end basebackground">
            <div className="nav nav-pills nav-left flex-column font6">
              
              <div className="thumbnail" style={{ backgroundImage: `url('${photoURL}')` }}></div>
              <div><button className="small-thumbnail" style={{ bottom:'83%', left:'72%', backgroundImage: `url('${close}')` }} onClick={() => setCollapsed(true)} /></div>
              {currentUser ? (
                <div className="small-thumbnail" 
                  style={{ backgroundImage: `url('${chimg}')` }} 
                  onClick={handleProfileChangeDialog} /> ) : (<div>&nbsp;</div>)}

              <div>
                {currentUser ? (
                  <h2 className="wordname">'{currentUser.name}'님, 환영합니다!</h2>
                ) : (
                  <Button
                  className="item2"
                  type="button"
                  variant="contained"
                  style={{ backgroundColor: '#F5782A', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginTop: "40px"}}
                  onClick={() => navigate('/login')}>
                  로그인</Button>
                )}
              </div>

              {currentUser ? (
                <>
                  <h2 className='wordmenu1'>마이페이지</h2>
                  <h2
                    className={`wordmenu2 ${selectedItem === "item-1" ? "selected-item" : ""}`}
                    href="#item-1"
                    onClick={() => setSelectedItem("item-1")}> 회원정보 </h2>
                  <h2
                    className={`wordmenu2 ${selectedItem === "item-1-1" ? "selected-item" : ""}`}
                    href="#item-1-1"
                    onClick={() => setSelectedItem("item-1-1")}
                  >
                    나의 운동 레벨
                  </h2>
                  <h2
                    className={`wordmenu2 ${selectedItem === "item-1-2" ? "selected-item" : ""}`}
                    href="#item-1-2"
                    onClick={() => setSelectedItem("item-1-2")}
                  >
                    RM 전환하기
                  </h2>
                  <h2 className="wordmenu1" style={{ marginTop: "20px" ,borderTop: "1px solid #E0E0E0" ,paddingTop: "20px"}} onClick={handleLogout}>로그아웃</h2>
                </>
              ) : (
                <>  
                  <h2 className='wordmenu1'
                  style={{marginTop: "50px"}}
                  >마이페이지</h2>
                  <h2
                    className={`wordmenu2 ${selectedItem === "item-1-1" ? "selected-item" : ""}`}
                    href="#item-1-1"
                    onClick={() => setSelectedItem("item-1-1")}
                  >
                    나의 운동 레벨
                  </h2>
                  <h2
                    className={`wordmenu2 ${selectedItem === "item-1-2" ? "selected-item" : ""}`}
                    href="#item-1-2"
                    onClick={() => setSelectedItem("item-1-2")}
                  >
                    RM 전환하기
                  </h2>
                 
                </>
              )}
             
            </div>
          </div>
      )}

        { openProfileChange ? ( <ProfileChange
          userId={currentUser.uid}
          setOpenProfileChange={setOpenProfileChange}
          openProfileChange={openProfileChange}
          setPhotoURL={setPhotoURL}
        /> ) : (<div>&nbsp;</div>)}
        {/* 자바스크립트 if문 : { aa ? ( aa가 true일때 ) : (aa가 false일때) } */}
      </div>
  );
}

export default Col2;