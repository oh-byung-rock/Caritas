import React from 'react';
import { useSelector } from 'react-redux';

// 상태의 전체 타입을 정의
interface RootState {
  all_record: string[];  // all_record는 문자열 배열
}

function Userrecord() {
  const allRecord = useSelector((state: RootState) => state.all_record);

  return (
    <div>
        <h3>사용 이력89765</h3>
        <ul>
            {allRecord.map((record, index) => (
                <li key={index}>{record}</li>
            ))}
        </ul>
    </div>
  );
}

export default Userrecord;
