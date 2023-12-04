import Header from './components/Header';
import GameInfo from './components/GameInfo';
import PlayGame from './components/PlayGame';

const Layout = () => {
  return (
    <>
      <Header />
      <div className='gameContainer'>
        <PlayGame />
        <GameInfo />
      </div>
    </>
  );
};

export default Layout;
