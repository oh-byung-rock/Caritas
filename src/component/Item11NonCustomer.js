import React, { useState } from 'react';
import Button from '@mui/material/Button';
import editPencil from '../assets/Edit.png';
import phtest from "../assets/phtest2.jpg";

function Item11NonCustomer() {
  const [benchPressWeight, setBenchPressWeight] = useState('0');
  const [newBenchPressWeight, setNewBenchPressWeight] = useState("");
  const [benchPressTimes, setBenchPressTimes] = useState('0');
  const [newBenchPressTimes, setNewBenchPressTimes] = useState("");
  const [isEditingBenchPressWeight, setIsEditingBenchPressWeight] = useState(false);
  const [isEditingBenchPressTimes, setIsEditingBenchPressTimes] = useState(false);

  const calculate1RM = (weight, times) => {
    if (weight !== 0 && times !== 0)
      return weight * (1 + (0.0333 * times));
    else
      return 0;
  };

  const exp1rm = calculate1RM(benchPressWeight, benchPressTimes);

  return (
  <div className="board_wrap" 
    style={{
      width: '1920px',
      height: '4000px',
      backgroundImage: `url('${phtest}')`,
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderBottom: '1px solid #E0E0E0'
    }}>  
        <div className="board_title" style={{width:'50%', borderBottom:'1px solid #242D34'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          벤치프
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>벤치프레스 1RM을 가늠할수있습니다.</h2>
        </div>
        <div className='board_all font5' style={{ display: 'flex ',width:'50%'}}>
          <div className='column-1' style={{ width: '20%' }}>
            <div style={{borderTop:'1px solid #242D34'}}><strong>중량</strong></div>
            <div><strong>횟수</strong></div>
            <div><strong>예상 1RM</strong></div>
            <div><strong>나의 등급</strong></div>
          </div>
          <div className='column-2' style={{ width: '20%' }}>
            <div style={{borderTop:'1px solid #242D34'}}>{benchPressWeight}</div>
            <div>{benchPressTimes}</div>
            <div>{exp1rm}</div>
            <div>&nbsp;</div>
          </div>
          <div className='column-3' style={{ width: '60%'}}>
          <div>
              {isEditingBenchPressWeight ? (
                <div>
                  <input
                    type="text"
                    value={newBenchPressWeight}
                    onChange={(e) => setNewBenchPressWeight(e.target.value)}
                  />
                  <Button 
                    className='hidden2' 
                    style={{ backgroundColor: '#F5782A', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'15px', marginBottom: '5px'}}
                    onClick={() => {
                      setBenchPressWeight(newBenchPressWeight);
                      setIsEditingBenchPressWeight(false);
                    }}>저장
                  </Button>
                  <Button 
                    className='hidden2' 
                    style={{ backgroundColor: '#434343', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'20px', marginBottom: '5px'}} 
                    onClick={() => {
                      setIsEditingBenchPressWeight(false);
                    }}
                  >
                    취소
                  </Button>
                </div>
              ) : (
                <button onClick={() => setIsEditingBenchPressWeight(!isEditingBenchPressWeight)}
                  className="transparent-button">
                <img src={editPencil} alt="수정" className="edit-image" />
              </button>
              )}
            </div>
            <div>
            {isEditingBenchPressTimes ? (
                <div>
                  <input
                    type="text"
                    value={newBenchPressTimes}
                    onChange={(e) => setNewBenchPressTimes(e.target.value)}
                  />
                  <Button 
                    className='hidden2' 
                    style={{ backgroundColor: '#F5782A', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'15px', marginBottom: '5px'}}
                    onClick={() => {
                      setBenchPressTimes(newBenchPressTimes);
                      setIsEditingBenchPressTimes(false);
                    }}>저장
                  </Button>
                  <Button 
                    className='hidden2' 
                    style={{ backgroundColor: '#434343', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'20px', marginBottom: '5px'}} 
                     onClick={() => {
                      setIsEditingBenchPressTimes(false);
                    }}
                  >
                    취소
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingBenchPressTimes(!isEditingBenchPressTimes)}
                  className="transparent-button"
                >
                  <img src={editPencil} alt="수정" className="edit-image" />
                </button>
              )}
            </div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
          </div>
        </div>
      </div>
  );
}

export default Item11NonCustomer;
