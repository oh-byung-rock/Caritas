import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import editPencil from '../assets/Edit.png';

function Item11Customer({
    // 벤치프레스
    isEditingBenchPressWeight,
    isEditingBenchPressTimes,
    BenchPressWeight,
    newBenchPressWeight,
    newBenchPressTimes,
    setIsEditingBenchPressWeight,
    setIsEditingBenchPressTimes,
    handleSubmitBenchPressWeight,
    handleSubmitBenchPressTimes,
    BenchPressTimes,
    exp1rm,
    setNewBenchPressWeight,
    setNewBenchPressTimes,

    // 스쿼트
    isEditingSquatWeight,
    isEditingSquatTimes,
    SquatWeight,
    newSquatWeight,
    newSquatTimes,
    setIsEditingSquatWeight,
    setIsEditingSquatTimes,
    handleSubmitSquatWeight,
    handleSubmitSquatTimes,
    SquatTimes,
    squatExp1rm,
    setNewSquatWeight,
    setNewSquatTimes
}) {
  
  const CommonButton = ({ isEditing, value, setValue, setIsEditing, handleSubmit }) => {
    // CommonButton 내 return 안 input의 value가 onchange에 의해 값이 바뀌면 CommonButton의 인자값이 바뀌니 CommonButton이 리렌더링되서 input focus가 해제되서 useRef 사용
    const inputRef = useRef();

    useEffect(() => {
      if (isEditing) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    return isEditing ? (
      <div style={{ marginBottom: '-10px' }}>
        <input
          ref={inputRef}
          type="text item2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div style={{ display: 'inline-block' }}>
          <Button
            className="hidden2"
            style={{
              backgroundColor: '#434343',
              color: '#F4F4F4',
              border: 'none',
              fontFamily: '노토6',
              fontSize: 16,
              marginLeft: '20px',
              marginBottom: '5px',
            }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '취소' : '수정'}
          </Button>
          <Button
            className="hidden2"
            style={{
              backgroundColor: '#F5782A',
              color: '#F4F4F4',
              border: 'none',
              fontFamily: '노토6',
              fontSize: 16,
              marginLeft: '15px',
              marginBottom: '5px',
            }}
            onClick={handleSubmit}
          >
            저장
          </Button>
        </div>
      </div>
    ) : (
      <button onClick={() => setIsEditing(!isEditing)} className="transparent-button">
        <img src={editPencil} alt="수정" className="edit-image" />
      </button>
    );
  }

  return (
      <div className="board_wrap" style={{ width: "1000px" }}>
        <div className="board_title">
        <h2 className="font6" style={{ fontSize: '36px' }}>
          벤치프레스
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>벤치프레스 1RM을 가늠할수있습니다.</h2>
        </div>
          {/* 벤치프레스 표 내용 */}
          <div className='board_all font5' style={{ display: 'flex' }}>
            <div className='column-1' style={{ width: '20%' }}>
              <div style={{borderTop:'1px solid #242D34'}}><strong>중량</strong></div>
              <div><strong>횟수</strong></div>
              <div><strong>예상 1RM</strong></div>
              <div><strong>나의 등급</strong></div>
            </div>
            <div className='column-2' style={{ width: '20%' }}> 
              <div style={{borderTop:'1px solid #242D34'}}>{BenchPressWeight ? BenchPressWeight : <>&nbsp;</>}</div>
              <div>{BenchPressTimes ? BenchPressTimes : <>&nbsp;</>}</div>
              <div>{exp1rm ? exp1rm : <>&nbsp;</>}</div>
              <div>&nbsp;</div>
            </div>
            <div className='column-3' style={{ width: '60%'}}>
              <div>
                <CommonButton
                  isEditing={isEditingBenchPressWeight}
                  value={newBenchPressWeight}
                  setValue={setNewBenchPressWeight}
                  setIsEditing={setIsEditingBenchPressWeight}
                  handleSubmit={handleSubmitBenchPressWeight}
                />
              </div>
              <div>
                <CommonButton
                  isEditing={isEditingBenchPressTimes}
                  value={newBenchPressTimes}
                  setValue={setNewBenchPressTimes}
                  setIsEditing={setIsEditingBenchPressTimes}
                  handleSubmit={handleSubmitBenchPressTimes}
                />
              </div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </div>
          </div>
        {/* 벤치프레스 표 내용 */}
        <div className="board_title" style={{paddingTop:'30px'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          스쿼트
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>스쿼트 1RM을 가늠할수있습니다.</h2>
        </div>
        {/* 스쿼트 표 내용 */}
        <div className="board_all font5" style={{ display: "flex" }}>
            <div className="column-1" style={{ width: "20%" }}>
                <div style={{ borderTop: "1px solid #242D34" }}><strong>중량</strong></div>
                <div><strong>횟수</strong></div>
                <div><strong>예상 1RM</strong></div>
                <div><strong>나의 등급</strong></div>
            </div>
            <div className="column-2" style={{ width: "20%" }}> 
                <div style={{ borderTop: "1px solid #242D34" }}>{SquatWeight ? SquatWeight : <>&nbsp;</>}</div>
                <div>{SquatTimes ? SquatTimes : <>&nbsp;</>}</div>
                <div>{squatExp1rm ? squatExp1rm : <>&nbsp;</>}</div>
                <div>&nbsp;</div>
            </div>
            <div className="column-3" style={{ width: "60%" }}>
                <div>
                    <CommonButton
                        isEditing={isEditingSquatWeight}
                        value={newSquatWeight}
                        setValue={setNewSquatWeight}
                        setIsEditing={setIsEditingSquatWeight}
                        handleSubmit={handleSubmitSquatWeight}
                    />
                </div>
                <div>
                    <CommonButton
                        isEditing={isEditingSquatTimes}
                        value={newSquatTimes}
                        setValue={setNewSquatTimes}
                        setIsEditing={setIsEditingSquatTimes}
                        handleSubmit={handleSubmitSquatTimes}
                    />
                </div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
            </div>
        </div>
        {/* 스쿼트 표 내용 */}

        <div className="board_title" style={{paddingTop:'30px'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          데드리프트
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>데드리프트 1RM을 가늠할수있습니다.</h2>
        </div>
        {/* 데드리프트 표 내용 */}
        <div className='board_all font5' style={{ display: 'flex' ,paddingBottom:'150px'}}>
            <div className='column-1' style={{ width: '20%' }}>
              <div style={{borderTop:'1px solid #242D34'}}><strong>중량</strong></div>
              <div><strong>횟수</strong></div>
              <div><strong>예상 1RM</strong></div>
              <div><strong>나의 등급</strong></div>
            </div>
            <div className='column-2' style={{ width: '20%' }}> 
              <div style={{borderTop:'1px solid #242D34'}}>{BenchPressWeight ? BenchPressWeight : <>&nbsp;</>}</div>
              <div>{BenchPressTimes ? BenchPressTimes : <>&nbsp;</>}</div>
              <div>{exp1rm ? exp1rm : <>&nbsp;</>}</div>
              <div>&nbsp;</div>
            </div>
            <div className='column-3' style={{ width: '60%'}}>
              <div>
              &nbsp;
              </div>
              <div>
              &nbsp;
              </div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </div>
          </div>
        {/* 데드리프트 표 내용 */}
      </div>
  );  
}

export default Item11Customer;
