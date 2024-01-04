import React, { useContext, useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import editPencil from '../assets/Edit.png';
import rmone from "../assets/rmone.jpg";
import rmtwo from "../assets/rmtwo.jpg";
import six1 from "../assets/b1.jpg";
import six2 from "../assets/b2.jpg";
import six3 from "../assets/b3.jpg";
import rm2six1 from "../assets/r1.webp";
import rm2six2 from "../assets/r2.webp";
import rm2six3 from "../assets/r3.webp";
import rm2six4 from "../assets/r4.webp";
import rm2six5 from "../assets/r5.webp";
import sbzero from "../assets/sbzero.jpg";
import { getGrade } from './Getgrade';
import { GradeContext } from '../App';

function Item11Customer({
    // 벤치프레스
    isEditingBenchPressWeight,
    isEditingBenchPressTimes,
    isEditingBenchPressreal1rm,
    BenchPressWeight,
    newBenchPressWeight,
    newBenchPressTimes,
    newBenchPressreal1rm,
    setIsEditingBenchPressWeight,
    setIsEditingBenchPressTimes,
    setIsEditingBenchPressreal1rm,
    handleSubmitBenchPressWeight,
    handleSubmitBenchPressTimes,
    BenchPressTimes,
    exp1rm,
    setNewBenchPressWeight,
    setNewBenchPressTimes,
    setNewBenchPressreal1rm,
    currentUser,
    indirectbench,
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
    setNewSquatTimes,
    //데드
    isEditingDeadWeight,
    setIsEditingDeadWeight, 
    isEditingDeadTimes,
    setIsEditingDeadTimes,
    newDeadWeight,
    setNewDeadWeight,
    newDeadTimes,
    setNewDeadTimes,
    DeadWeight,
    DeadTimes
}) {
  // ▼ 버튼 scroll 관련

  const rmbutton1Ref = useRef(null);
  const rmbutton2Ref = useRef(null);
  const rmbutton3Ref = useRef(null);

  // ▼ rm2 관련 버튼 5개
  const rm2button1Ref = useRef(null);
  const rm2button2Ref = useRef(null);
  const rm2button3Ref = useRef(null);
  const rm2button4Ref = useRef(null);
  const rm2button5Ref = useRef(null);

  // ▼ 1RM 등급 관련
  const [resultgrade, setResultgrade] = useState('');

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
  
    const buttonObserver = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "slide-up 1s ease-out forwards";
        } else {
          entry.target.style.animation = "none";
        }
      });
    };

    const observer = new IntersectionObserver(buttonObserver, options);

    observer.observe(rmbutton1Ref.current);
    observer.observe(rmbutton2Ref.current);
    observer.observe(rmbutton3Ref.current);

  // ▼ rm2 관련 버튼 5개
    observer.observe(rm2button1Ref.current);
    observer.observe(rm2button2Ref.current);
    observer.observe(rm2button3Ref.current);
    observer.observe(rm2button4Ref.current);
    observer.observe(rm2button5Ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  // ▲ 버튼 scroll 관련

  const [svbpwt, setSvbpwt] = useState("");

  useEffect(() => {
    var uid = '';
    if (currentUser.platform) {
      if (currentUser.platform === 'naver') {
        uid = currentUser.id;
      }
    } else {
      uid = currentUser._id;
    }
  
    console.log('잘받아옴2', currentUser)

    const fetchData = async () => {
      try {
        const response = await fetch(`/gethealth/${uid}`, {
          method: 'GET',
          headers: {}
        });
        const healthData = await response.json();
        console.log('잘받아옴', healthData); // 받아온 데이터 확인
        setSvbpwt(healthData);
        setPublicDirectweight(healthData.real1rm)
      } catch (error) {
        console.error('에러1', error);
      }
    };
  
    fetchData();
  }, [currentUser]);
  
  // ▼ 1RM 등급 관련
  useEffect(() => {
    // const result = getGrade('female', 25, 60, 0, 40); 
    // setGrade(result);
  }, []);

  const [indirectbp, setIndirectbp] = useState("");
  const [indirectbp1, setIndirectbp1] = useState("");
  const [indirectbp2, setIndirectbp2] = useState("");

  useEffect(() => {
    const hardname1 = '벤치'
    const hardname2 = '스쿼트'
    const hardname3 = '데드'
    if (svbpwt.benchcount !== undefined && svbpwt.benchweight !== undefined) {
      const indirectresult = indirectbench(hardname1, svbpwt.benchcount, svbpwt.benchweight);
      setIndirectbp(indirectresult);
    }
    if (svbpwt.squatcount !== undefined && svbpwt.squatweight !== undefined) {
      const indirectresult1 = indirectbench(hardname2, svbpwt.squatcount, svbpwt.squatweight);
      setIndirectbp1(indirectresult1);
    }
    if (svbpwt.deadcount !== undefined && svbpwt.deadweight !== undefined) {
      const indirectresult2 = indirectbench(hardname3, svbpwt.deadcount, svbpwt.deadweight);
      setIndirectbp2(indirectresult2);
    }
  }, [svbpwt]);

  const benchsubmit = async(inputType, inputValue) => {

    if (inputType === '횟수' && inputValue >= 11) {
      alert('10 이하의 숫자만 입력하실 수 있습니다.');
      return;
    } else if ((inputType === '횟수1' && inputValue >= 11)){
      alert('10 이하의 숫자만 입력하실 수 있습니다.');
      return;
    } else if ((inputType === '횟수2' && inputValue >= 11)){
      alert('10 이하의 숫자만 입력하실 수 있습니다.');
      return;
    }

    var uid=''

    if(currentUser.platform){
      if(currentUser.platform=='naver'){
        uid=currentUser.id
      }
    }else{
      uid=currentUser._id
    }

    const data = {
      uid: uid,
      benchweight: inputType === '중량' ? Number(inputValue) : svbpwt.benchweight,
      benchcount: inputType === '횟수' ? Number(inputValue) : svbpwt.benchcount,
      squatweight: inputType === '중량1' ? Number(inputValue) : svbpwt.squatweight,
      squatcount: inputType === '횟수1' ? Number(inputValue) : svbpwt.squatcount,
      deadweight: inputType === '중량2' ? Number(inputValue) : svbpwt.deadweight,
      deadcount: inputType === '횟수2' ? Number(inputValue) : svbpwt.deadcount,
      real1rm : inputType === '직접' ? Number(inputValue) : svbpwt.real1rm
    };
    console.log(data)
    try {
      // 서버에 데이터 전송
      const response = await fetch('/addhealth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      // 응답 확인
      if (response.ok) {
        console.log('데이터가 성공적으로 추가되었습니다.');
      } else {
        console.log('데이터 추가에 실패했습니다.');
      }
    } catch (error) {
      console.log('데이터 추가 중 오류가 발생했습니다.', error);
    }
  }

  const CommonButton = ({ isEditing, inputType, inputValue, setInputValue, setIsEditing }) => {
    const inputRef = useRef();

    useEffect(() => {
      if (isEditing) {
        inputRef.current.focus();
      }
    }, [isEditing]);
  
    const handleChange = (e) => {
      setInputValue(e.target.value);

    };
  
    const handleSaveClick = () => {
      benchsubmit(inputType, inputValue);
    };
  
    return isEditing ? (
      <div style={{ marginBottom: '-10px' }}>
        <input
          ref={inputRef}
          type="text item2"
          value={inputValue}
          onChange={handleChange}
        />
  
        <div style={{ display: 'inline-block' }}>
          <Button className="hidden2" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? '취소' : '수정'}
          </Button>
          <Button className="hidden2" onClick={handleSaveClick}>
            저장
          </Button>
        </div>
      </div>
    ) : (
      <button onClick={() => setIsEditing(!isEditing)} className="transparent-button">
        <img src={editPencil} alt="수정" className="edit-image" />
      </button>
    );
  };  

  const { setPublicDirectweight , publicGender,publicAge,publicBodyweight,publicDirectweight,publicIndirectweight } = useContext(GradeContext);
  
  // ▼ 비동기라서 한꺼번에 값이 전달되지않아, 모든 값을 받은뒤에 getGrade가 실행되게끔
  useEffect(() => {
    console.log('gender11', publicGender);
    console.log('gender22', publicAge);
    if (publicGender && publicAge && publicBodyweight && publicDirectweight) {
      const resultgrade = getGrade(publicGender, publicAge, publicBodyweight, publicDirectweight);
      setResultgrade(resultgrade);
      console.log('결과창', resultgrade)
    }
  }, [publicGender, publicAge, publicBodyweight, publicDirectweight, currentUser]);
  

  return (
      <div>
        <div
          style={{
            width: '1920px',
            height: '680px',
            backgroundImage: `url('${sbzero}')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          style={{
            width: '1920px',
            height: '886px',
            backgroundImage: `url('${rmone}')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderBottom: '1px solid #E0E0E0'
          }}
        >
          <button
            ref={rmbutton1Ref}
            className="sixs"
            style={{
              left: "-5.4%",
              cursor:'default',
              top: "56%",
              backgroundImage: `url('${six1}')`,
            }}
          />
          <button
            ref={rmbutton2Ref}
            className="sixs"
            style={{
              left: "-0.4%",
              cursor:'default',
              top: "56%",
              backgroundImage: `url('${six2}')`,
            }}
          />

          <button
          ref={rmbutton3Ref}
            className="sixs"
            style={{
              left: "4.6%",
              cursor:'default',
              top: "56%",
              backgroundImage: `url('${six3}')`,
            }}
          />
        </div> 
        <div
          style={{
            width: "100%",
            height: "1080px",
            backgroundImage: `url('${rmtwo}')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderBottom: '1px solid #E0E0E0'
          }}
        >
          <button
            ref={rm2button1Ref}
              className="sixs"
              style={{
                left: "-95px",
                cursor:'default',
                top: "482px",
                backgroundImage: `url('${rm2six1}')`,
              }}
            />

          <button
            ref={rm2button2Ref}
              className="sixs"
              style={{
                left: "0px",
                cursor:'default',
                top: "482px",
                backgroundImage: `url('${rm2six2}')`,
              }}
            />

          <button
            ref={rm2button3Ref}
              className="sixs"
              style={{
                left: "95px",
                cursor:'default',
                top: "482px",
                backgroundImage: `url('${rm2six3}')`,
              }}
            />
          <div>
          <button
            alt='4번째 세트'
            ref={rm2button4Ref}
              className="sixs"
              style={{
                left: "-47.5px",
                cursor:'default',
                top: "526px",
                backgroundImage: `url('${rm2six4}')`,
              }}
            />

          <button
            ref={rm2button5Ref}
              className="sixs"
              style={{
                left: "47.5px",
                cursor:'default',
                top: "526px",
                backgroundImage: `url('${rm2six5}')`,
              }}
            />
          </div> 
        </div>
      <div className="board_wrap" style={{ width: "1000px", marginTop: "3.6vh" , marginLeft:"13.2%"}}>
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
              <div><strong>간접 1RM</strong></div>
              <div><strong>직접 1RM</strong></div>
              <div><strong>나의 등급</strong></div>
            </div>
            <div className='column-2' style={{ width: '20%' }}> 
              <div style={{borderTop:'1px solid #242D34'}}>{svbpwt.benchweight ? svbpwt.benchweight : <>&nbsp;</>}</div>
              <div>{svbpwt.benchcount ? svbpwt.benchcount : <>&nbsp;</>}</div>
              <div>{indirectbp ? indirectbp : <>&nbsp;</>}</div>
              <div>{svbpwt.real1rm ? svbpwt.real1rm : <>&nbsp;</>}</div>
              <div>{resultgrade ? resultgrade : <>&nbsp;</>}</div>
            </div>
            <div className='column-3' style={{ width: '60%'}}>
              <div>
                <CommonButton
                  isEditing={isEditingBenchPressWeight}
                  setIsEditing={setIsEditingBenchPressWeight}
                  inputValue={newBenchPressWeight}
                  setInputValue={setNewBenchPressWeight}
                  inputType={'중량'}
                />
              </div>
              <div>
                <CommonButton
                  isEditing={isEditingBenchPressTimes}
                  inputValue={newBenchPressTimes}
                  setInputValue={setNewBenchPressTimes}
                  setIsEditing={setIsEditingBenchPressTimes}
                  inputType={'횟수'}

                />
              </div>
              <div>&nbsp;</div>
              <div>
                <CommonButton
                  isEditing={isEditingBenchPressreal1rm}
                  inputValue={newBenchPressreal1rm}
                  setInputValue={setNewBenchPressreal1rm}
                  setIsEditing={setIsEditingBenchPressreal1rm}
                  inputType={'직접'}

                />
              </div>
              <div>&nbsp;</div>
            </div>
          </div>

      <div className="board_title" style={{paddingTop:'30px'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          스쿼트
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>스쿼트 1RM을 가늠할수있습니다.</h2>
        </div>

        <div className="board_all font5" style={{ display: "flex" }}>
            <div className="column-1" style={{ width: "20%" }}>
                <div style={{ borderTop: "1px solid #242D34" }}><strong>중량</strong></div>
                <div><strong>횟수</strong></div>
                <div><strong>간접 1RM</strong></div>
                <div><strong>직접 1RM</strong></div>
                <div><strong>나의 등급</strong></div>
            </div>
            <div className="column-2" style={{ width: "20%" }}> 
                <div style={{ borderTop: "1px solid #242D34" }}>{svbpwt.squatweight ? svbpwt.squatweight : <>&nbsp;</>}</div>
                <div>{svbpwt.squatcount ? svbpwt.squatcount : <>&nbsp;</>}</div>
                <div>{indirectbp1 ? indirectbp1 : <>&nbsp;</>}</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
            </div>
            <div className="column-3" style={{ width: "60%" }}>
                <div>
                    <CommonButton
                        isEditing={isEditingSquatWeight }
                        setIsEditing={setIsEditingSquatWeight }
                        inputValue={newSquatWeight}
                        setInputValue={setNewSquatWeight}
                        inputType={'중량1'}

                    />
                </div>
                <div>
                    <CommonButton
                        isEditing={isEditingSquatTimes }
                        setIsEditing={setIsEditingSquatTimes }
                        inputValue={newSquatTimes}
                        setInputValue={setNewSquatTimes}
                        inputType={'횟수1'}
 
                    />
                </div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
            </div>
        </div>


        <div className="board_title" style={{paddingTop:'30px'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          데드리프트
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>데드리프트 1RM을 가늠할수있습니다.</h2>
        </div>
        <div className='board_all font5' style={{ display: 'flex' ,paddingBottom:'150px'}}>
            <div className='column-1' style={{ width: '20%' }}>
              <div style={{borderTop:'1px solid #242D34'}}><strong>중량</strong></div>
              <div><strong>횟수</strong></div>
              <div><strong>간접 1RM</strong></div>
              <div><strong>직접 1RM</strong></div>
              <div><strong>나의 등급</strong></div>
            </div>
            <div className='column-2' style={{ width: '20%' }}> 
              <div style={{borderTop:'1px solid #242D34'}}>{svbpwt.deadweight ? svbpwt.deadweight : <>&nbsp;</>}</div>
              <div>{svbpwt.deadcount ? svbpwt.deadcount : <>&nbsp;</>}</div>
              <div>{indirectbp2 ? indirectbp2 : <>&nbsp;</>}</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </div>
            <div className='column-3' style={{ width: '60%'}}>
            <div>
                    <CommonButton
                        isEditing={isEditingDeadWeight  }
                        setIsEditing={setIsEditingDeadWeight  }
                        inputValue={newDeadWeight}
                        setInputValue={setNewDeadWeight}
                        inputType={'중량2'}

                    />
                </div>
                <div>
                    <CommonButton
                        isEditing={isEditingDeadTimes  }
                        setIsEditing={setIsEditingDeadTimes  }
                        inputValue={newDeadTimes}
                        setInputValue={setNewDeadTimes}
                        inputType={'횟수2'}

                    />
                </div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
            </div>
          </div>
      </div>
      </div>
  );  
}

export default Item11Customer;
