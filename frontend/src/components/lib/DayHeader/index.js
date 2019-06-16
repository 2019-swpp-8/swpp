import React from 'react';

function DayHeader() {
  return (
    <thead>
      <tr>
        <th />
        <th>
          <span className="long">월요일</span>
          <span className="short">월</span>
        </th>
        <th>
          <span className="long">화요일</span>
          <span className="short">화</span>
        </th>
        <th>
          <span className="long">수요일</span>
          <span className="short">수</span>
        </th>
        <th>
          <span className="long">목요일</span>
          <span className="short">목</span>
        </th>
        <th>
          <span className="long">금요일</span>
          <span className="short">금</span>
        </th>
        <th>
          <span className="long">토요일</span>
          <span className="short">토</span>
        </th>
        <th>
          <span className="long">일요일</span>
          <span className="short">일</span>
        </th>
      </tr>
    </thead>
  );
}

export default DayHeader;
