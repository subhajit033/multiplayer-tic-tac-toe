import { dancingDoll } from '../assets/assets';
const GameInfo = () => {
  return (
    <div className='gameInfo'>
      <h1>Lets play</h1>
      <div className='info-container'>
        <span className='info'>Turn for X</span>
        <br />
        <button id='reset'>Reset</button>
      </div>

      <div className='imgBox'>
        <img src={dancingDoll} alt='image' />
      </div>
    </div>
  );
};

export default GameInfo;
