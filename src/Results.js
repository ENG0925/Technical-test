import React, { useState, useEffect } from 'react';

const Results = ({ fileDataArray }) => {
  const [userWordCount, setUserWordCount] = useState({});

  useEffect(() => {
    const newUserWordCount = {};

    fileDataArray.forEach(({ content }) => {
      const userRegex = /<([^<>]+)>\s*([^<>]*)/g;

      let match;
      while ((match = userRegex.exec(content))) {
        const user = match[1];
        const text = match[2];
        const wordCount = text.trim().split(/\s+/).length;

        if (newUserWordCount[user]) {
          newUserWordCount[user] += wordCount;
        } else {
          newUserWordCount[user] = wordCount;
        }
      }
    });

    setUserWordCount(newUserWordCount);
  }, [fileDataArray]);

  return (
    <div>
      <h2>Results:</h2>
      <div 
        style={{
          border: '2px solid orange', 
          width: '200px',
          height: '140px',
          padding: '10px'
        }}
      >
        {Object.entries(userWordCount)
          .sort(([, countA], [, countB]) => countB - countA)
          .map(([user, wordCount], index) => (
            <div 
              key={index} 
              style={{
                fontStyle: 'italic'
              }}
            >
              {index + 1}. {user} - {wordCount} words
            </div>
          ))}
      </div>
    </div>
  );
};

export default Results;