import React from 'react';

function DayHeader() {
  return (
    <thead>
      <tr>
        <th />
        <th>
          <span className="long">월</span>
          <span className="short">월</span>
        </th>
        <th>
          <span className="long">화</span>
          <span className="short">화</span>
        </th>
        <th>
          <span className="long">수</span>
          <span className="short">수</span>
        </th>
        <th>
          <span className="long">목</span>
          <span className="short">목</span>
        </th>
        <th>
          <span className="long">금</span>
          <span className="short">금</span>
        </th>
        <th>
          <span className="long">토</span>
          <span className="short">토</span>
        </th>
        <th>
          <span className="long">일</span>
          <span className="short">일</span>
        </th>
      </tr>
    </thead>
  );
}

export default DayHeader;
