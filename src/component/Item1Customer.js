import editPencil from '../assets/Edit.png';
import Button from '@mui/material/Button';
import { GradeContext } from '../App';
import React, { useContext, useState, useEffect } from 'react';

function Item1Customer({
  name,
  gender,
  age,
  height,
  weight,
  isEditingHeight,
  isEditingWeight,
  newHeight,
  newWeight,
  setNewHeight,
  setNewWeight,
  setIsEditingHeight,
  setIsEditingWeight,
  currentUser,
  checkedweight,
  checkedheight,
  setCheckedheight,
  setCheckedweight
}) 
{
  let uid = '';
    if (currentUser.platform) {
      if (currentUser.platform == 'naver') {
        uid = currentUser.id;
      }
    } else {
      uid = currentUser._id;}
      console.log('fsdfsd',uid)       

// ▼ 신장(height)값 수정
    const handleChangeneight = async (field, value) => {
      try {
        const response = await fetch(`/api/info/edit/${uid}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field : field , value: value })
        });

        if (response.ok) {
          const updatedInfo = await response.json();
          console.log('Info updated', updatedInfo);
          setIsEditingHeight(false); 
          setIsEditingWeight(false); 
          setCheckedheight(null);
          setCheckedweight(null);
        } else {
          console.error('Failed to update the info');
        }
      } catch (error) {
        console.error('Error:', error);
        console.log(error)
      }
    };

  const createdtime = new Date().getTime();
  const mydate = new Date(createdtime);
  const year = mydate.getFullYear();
  if(currentUser.platform){
    if(currentUser.platform=='naver'){
      console.log('네이버임')
    }
  }else{
    console.log('일반로그인임')
  }
  return (
    <div className='board_wrap font6' style={{ width: '100%', display: 'flex', flexDirection: 'column', margin: '10% 0 0 0'}}>
      <div className="board_title" style={{width:'80%'}}>
        <h2 className="font6" style={{ fontSize: '36px', paddingLeft: '50px' }}>
          사용자 정보 수정
        </h2>
        {/* <h2 style={{ marginTop: '5px', fontSize: '24px',paddingLeft: '50px' }}>고객님의 최근정보입니다.</h2> */}
      </div>
      <div className='board_all font5' style={{ display: 'flex', width:'100%' }}>
        <div className='column-1' style={{ width: '20%' }}>
          <div style={{borderTop:'1px solid #242D34'}} ><strong>이름</strong></div>
          <div><strong>성별</strong></div>
          <div><strong>나이</strong></div>
          <div><strong>신장</strong></div>
          <div><strong>체중</strong></div>
        </div>
        <div className='column-2' style={{ width: '80%' }}>
          <div style={{borderTop:'1px solid #242D34',textAlign: 'left', paddingLeft: '20px'}}>
            {currentUser.platform && currentUser.platform === 'naver' 
              ? currentUser.name
              : name}
          </div>
          <div style={{textAlign: 'left', paddingLeft: '20px'}}>
            {currentUser.platform && currentUser.platform === 'naver' 
              ? (currentUser.gender === 'F' ? '여성' : '남성') 
              : gender}
          </div>
          <div style={{textAlign: 'left', paddingLeft: '20px'}}>
            {currentUser.platform && currentUser.platform === 'naver' 
              ? year - currentUser.birthyear
              : age}
          </div>
          <div style={{textAlign: 'left', paddingLeft: '20px'}}>{checkedheight} cm</div>
          <div style={{textAlign: 'left', paddingLeft: '20px'}}>{checkedweight} kg</div>
        </div>
        <div className='column-3' style={{ width: '60%'}}>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>
            {isEditingHeight ? (
              <div style={{marginBottom:'-10px'}}>
                <input
                  type="text item2"
                  value={newHeight}
                  onChange={(e) => setNewHeight(e.target.value)}
                />
                <div style={{ display: "inline-block" }}> {/* 이미지클릭시 textfield 와 버튼을 inline 정렬 */}
                  <Button 
                  className='hidden2' 
                  style={{ backgroundColor: '#434343', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'20px', marginBottom: '5px'}}
                  onClick={() => setIsEditingHeight(!isEditingHeight)}>
                    {isEditingHeight ? "취소" : "수정"}
                  </Button>
                  <Button 
                  className='hidden2' 
                  style={{ backgroundColor: '#F5782A', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'15px', marginBottom: '5px'}}
                  onClick={() => handleChangeneight('height',newHeight)}>저장</Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingHeight(!isEditingHeight)}
                className="transparent-button"
              >
                <img src={editPencil} alt="수정" className="edit-image" />
              </button>
            )}
          </div>
          <div>
            {isEditingWeight ? (
              <div style={{marginBottom:'-10px'}}>
                <input
                  type="text item2"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                />
                <div style={{ display: "inline-block" }}> {/* 이미지클릭시 textfield 와 버튼을 inline 정렬 */}
                  <Button 
                  className='hidden2' 
                  style={{ backgroundColor: '#434343', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'20px', marginBottom: '5px'}}
                  onClick={() => setIsEditingWeight(!isEditingHeight)}>
                    {isEditingHeight ? "취소" : "수정"}
                  </Button>
                  <Button 
                  className='hidden2' 
                  style={{ backgroundColor: '#F5782A', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'15px', marginBottom: '5px'}}
                  onClick={() => handleChangeneight('weight',newWeight)}>저장</Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingWeight(!isEditingWeight)}
                className="transparent-button"
              >
                <img src={editPencil} alt="수정" className="edit-image" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item1Customer;
