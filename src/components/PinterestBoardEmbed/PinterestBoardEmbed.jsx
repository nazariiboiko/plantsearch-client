import React from 'react';

const PinterestBoardEmbed = () => {
  const pinterestBoardURL = '991636411693355393';

  return (
    <div>
      <iframe
        src={`https://www.pinterest.com/pin/${pinterestBoardURL}/`}
        title="Pinterest Board"
        width="100%"
        height="600"
      />
    </div>
  );
};

export default PinterestBoardEmbed;
