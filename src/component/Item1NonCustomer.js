import React, { useRef, useEffect, useState }  from "react";
import "../App.css";
import bg_test1 from "../assets/content1.webp";
// import bg_test2 from "../assets/content2.png";
import bg_test3 from "../assets/content3.webp";
import six from "../assets/phtest2.jpg";
import six1 from "../assets/b1.jpg";
import six2 from "../assets/b2.jpg";
import six3 from "../assets/b3.jpg";
import six4 from "../assets/b4.jpg";
import six5 from "../assets/b5.jpg";
import six6 from "../assets/b6.jpg";
import bravoimg from "../assets/bravoimg.webp";

function Item1NonCustomer() {
  // ▼ h1Ref : hello minsu
  const h1Ref = useRef(null); 
  // ▼ buttonRef : '자세히보기' 버튼
  const buttonRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const button3Ref = useRef(null);
  const button4Ref = useRef(null);
  const button5Ref = useRef(null);
  const button6Ref = useRef(null);
  const bravoimgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      if (value > 290) {
        h1Ref.current.style.animation = 'disappear 1s ease-out forwards';
        buttonRef.current.style.animation = 'disappear 1s ease-out forwards';
      } else {
        h1Ref.current.style.animation = 'slide 1s ease-out forwards';
        buttonRef.current.style.animation = 'slide 1s ease-out forwards';
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
  
    const bravoObserver = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 원하는 scrollY 값에 도달했을 때 확인되도록 정의하고 그 값을 버튼이 움직이는 상태로 지정
          entry.target.style.animation = "slide-left 1s ease-out forwards";
        } else {
          entry.target.style.animation = "none";
        }
      });
    };

    const buttonObserver = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 원하는 scrollY 값에 도달했을 때 확인되도록 정의하고 그 값을 버튼이 움직이는 상태로 지정
          entry.target.style.animation = "slide-up 1s ease-out forwards";
        } else {
          entry.target.style.animation = "none";
        }
      });
    };
  
    const observer = new IntersectionObserver(buttonObserver, options);
    const observer2 = new IntersectionObserver(bravoObserver, options);
  
    observer.observe(button1Ref.current);
    observer.observe(button2Ref.current);
    observer.observe(button3Ref.current);
    observer.observe(button4Ref.current);
    observer.observe(button5Ref.current);
    observer.observe(button6Ref.current);
    observer2.observe(bravoimgRef.current);
  
    return () => {
      observer.disconnect();
      observer2.disconnect();
    };
  }, []);




  return (
    <div
      className="board_wrap"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '562.27px',
          backgroundImage: `url('${bg_test3}')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderBottom: '1px solid #E0E0E0',
          backgroundAttachment: "fixed", // 배경은 고정 요소들만 움직이게
        }}
        >
        <h1
        ref={h1Ref}
        className='font7'
        style={{fontSize:'6em', width:'258px',color:'#F4F4F4',position:'relative',left:'400px',top:'80px',animation:'slide 1s ease-out'}}>
        hello minsoo
        </h1>
        <button ref={buttonRef} className="font7 seedetail" style={{animation:'slide 1s ease-out'}} >자세히 보기</button>
      </div> 
      <div
      className="six"
        style={{
          width: '1920px',
          height: '4000px',
          backgroundImage: `url('${six}')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
      <div>
        <button
          ref={button1Ref}
          className="sixs"
          style={{
            left: "19.7%",
            cursor:'default',
            top: "2007px",
            backgroundImage: `url('${six1}')`,
          }}
        />
        <button
          ref={button2Ref}
          className="sixs"
          style={{
            left: "24.7%",
            cursor:'default',
            top: "2007px",
            backgroundImage: `url('${six2}')`,
          }}
        />

        <button
         ref={button3Ref}
          className="sixs"
          style={{
            left: "29.7%",
            cursor:'default',
            top: "2007px",
            backgroundImage: `url('${six3}')`,
          }}
        />

      </div>
      <div>
        <button
          ref={button4Ref}
          className="sixs"
          style={{
            left: "19.7%",
            top: "2007px",
            cursor:'default',
            marginTop: "36px",
            backgroundImage: `url('${six4}')`,
          }}
        />

        <button
          ref={button5Ref}
          className="sixs"
          style={{
            left: "24.7%",
            top: "2007px",
            cursor:'default',
            marginTop: "36px",
            backgroundImage: `url('${six5}')`,
          }}
        />

        <button
          ref={button6Ref}
          className="sixs"
          style={{
            left: "29.7%",
            top: "2007px",
            cursor:'default',
            marginTop: "36px",
            backgroundImage: `url('${six6}')`,
          }}
        />

      </div>
      </div>
      <div
        className={'bg_test1'}
        style={{
          width: "100%",
          height: "59vh",
          backgroundImage: `url('${bg_test1}')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <button ref={bravoimgRef} className="bravoimg" style={{backgroundImage: `url('${bravoimg}')`}}/>
      </div>
    {/* <div
      className={'bg_test2'}
      style={{
        width: "100%",
        height: "59vh",
        backgroundImage: `url('${bg_test2}')`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />  */}
    </div>
  );
}

export default Item1NonCustomer;