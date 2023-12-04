

const PlayGame = () => {
  return (
    <div className='container'>
      {Array(9)
        .fill('_')
        .map((box, i) => {
          return (
            <div key={`box-${i + 1}`} className='box'>
              <span className='boxtext'></span>
            </div>
          );
        })}
    </div>
  );
};

export default PlayGame;
