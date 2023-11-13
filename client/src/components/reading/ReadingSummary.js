import React from "react";

import "./reading.css";

export const ReadingSum = ({ readingData, clearData }) => {
  if (!readingData) {
    return <div>No reading data to display.</div>;
  }

  return (
    <div className="reading-summary">
      <h2>Reading Summary</h2>
      <button onClick={clearData}>Clear Data</button>
      <ul>
        <li>Book Title: {readingData.bookTitle}</li>
        <li>Start Page: {readingData.startPage}</li>
        <li>End Page: {readingData.endPage}</li>
        <li>Notes: {readingData.notes}</li>
      </ul>
    </div>
  );
};
