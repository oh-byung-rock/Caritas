import React, { useState } from 'react';
import editPencil from '../assets/Edit.png';
import Button from '@mui/material/Button';

function Item1Customer({
  name,
  gender,
  age,
  height,
  weight,
  isEditingHeight,
  newHeight,
  setNewHeight,
  setIsEditingHeight,
  handleSubmitHeight,
  currentUser,
}) 
{
  console.log('마이페이지', currentUser);
  return (
    <div className='board_wrap font6' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10% 0 0 0'}}>
      <div className="board_title" style={{width:'70%'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          마이페이지
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>고객님의 최근정보입니다.</h2>
      </div>
      <div className='board_all font5' style={{ display: 'flex', width:'70%' }}>
        <div className='column-1' style={{ width: '20%' }}>
          <div style={{borderTop:'1px solid #242D34'}} ><strong>이름</strong></div>
          <div><strong>성별</strong></div>
          <div><strong>나이</strong></div>
          <div><strong>신장</strong></div>
          <div><strong>체중</strong></div>
        </div>
        <div className='column-2' style={{ width: '20%' }}>
          <div style={{borderTop:'1px solid #242D34'}}>
            {name === '이름없음' ? currentUser.name : name}
          </div>
          <div>{gender}</div>
          <div>{age}</div>
          <div>{height} cm</div>
          <div>{weight} kg</div>
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
                  onClick={handleSubmitHeight}>저장</Button>
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
          <div>&nbsp;</div>
        </div>
      </div>
    </div>
  );
}

export default Item1Customer;
