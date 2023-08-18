import React, {useState} from 'react';

function Servertest() {
  const [state, setState] = useState({ title: '', date: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
    .then(response => {
      if (response.status === 200) {
        console.log('status 200');
        return response.json();
      } else {
        throw new Error('서버에서 문제가 발생했습니다.');
      }
    })
    .then(data => {
      console.log(`Data from server: ${JSON.stringify(data)}`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  
  const handleValueChange = (e) => {
    let nextState = { ...state }; // 초기 state상태 사본(...) 사용
    nextState[e.target.name] = e.target.value;
    setState(nextState);
  }

  return (
    <div className="mt-3" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10% 0 0 0'}}>
      <form style={{ textAlign: 'left' }}>
        <div className="form-group">
          <label style={{marginBottom:'20px'}}>오늘의 할일</label>
          <input
            type="text"
            className="form-control"
            style={{ width: '100%' , marginBottom:'20px'}}
            name="title"
            onChange={handleValueChange}
          />
        </div>
        <div className="form-group">
          <label style={{marginBottom:'20px'}}>날짜</label>
          <input
            type="text"
            className="form-control"
            style={{ width: '100%' , marginBottom:'20px' }}
            name="date"
            onChange={handleValueChange}
          />
        </div>
        <button type="submit" className="btn btn-danger" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
  
}

export default Servertest;
