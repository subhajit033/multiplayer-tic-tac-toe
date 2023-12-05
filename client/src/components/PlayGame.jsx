// import { useEffect, useState } from 'react';
// import { gameOverTone, ting } from '../assets/assets';

// const PlayGame = () => {
//   const [isgameover, setIsgameover] = useState(false);
//   const [gameTurn, setGameTurn] = useState('X');
//   const turn = new Audio(ting);
//   const gameOver = new Audio(gameOverTone);

//   // function to change the turn
//   const changeTurn = () => {
//     gameTurn === 'X' ? setGameTurn('O') : setGameTurn('X');
//   };

//   //function to check win
//   const checkWin = () => {
//     const boxText = document.getElementsByClassName('boxtext');
//     console.log('boxtext');
//     console.log(boxText);
//     let wins = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     wins.forEach((e) => {
//       if (
//         boxText[e[0]].innerText === boxText[e[1]].innerText &&
//         boxText[e[1]].innerText === boxText[e[2]].innerText &&
//         boxText[e[0]].innerText !== '' &&
//         boxText[e[1]].innerText !== '' &&
//         boxText[e[2]].innerText !== ''
//       ) {
//         // document.querySelector('.info').innerHTML = `Player ${
//         //   boxText[e[0]].innerText
//         // } win`;
//         // imgBox.firstElementChild.style.width = '10rem';
//         setIsgameover(true);
//         gameOver.play();
//       } else if (
//         boxText[0].innerText !== '' &&
//         boxText[1].innerText !== '' &&
//         boxText[2].innerText !== '' &&
//         boxText[3].innerText !== '' &&
//         boxText[4].innerText !== '' &&
//         boxText[5].innerText !== '' &&
//         boxText[6].innerText !== '' &&
//         boxText[7].innerText !== '' &&
//         boxText[8].innerText !== ''
//       ) {
//         document.querySelector('.info').innerHTML = `Tie !!`;
//         gameOver.play();
//       }
//       // else if((boxText[e[0]].innerText !== boxText[e[1]].innerText) || (boxText[e[1]].innerText !== boxText[e[2]].innerText) && (boxText[e[0]].innerText !== '') && (boxText[e[1]].innerText !== '' && (boxText[e[2]].innerText !== ''))){

//       // }
//     });
//   };

//   Array.from(document.getElementsByClassName('box')).forEach((ele) => {
//     //query selector return the first element which has boxtext class
//     // ele.queryselector return tehe firts element matched with of taht div which was clicked

//     let boxText = ele.querySelector('.boxtext');
//     ele.addEventListener('click', () => {
//         console.log('clicked');
//       if (boxText.innerHTML === '') {
//         turn.currentTime = 0;
//         boxText.innerHTML = gameTurn;
//         changeTurn();
//         if (!isgameover) {
//           document.querySelector('.info').innerHTML = `Turn for ${gameTurn}`;
//         }
//         turn.play();
//         checkWin();
//       }
//     });
//   });

//   return (
//     <div className='container'>
//       {Array(9)
//         .fill('_')
//         .map((box, i) => {
//           return (
//             <div key={`box-${i + 1}`} className='box'>
//               <span className='boxtext'></span>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default PlayGame;

import React, { useEffect, useState } from 'react';
import { gameOverTone, ting } from '../assets/assets';

const PlayGame = () => {
  const [isGameover, setIsGameover] = useState(false);
  const [gameTurn, setGameTurn] = useState('X');

  const turn = new Audio(ting);
  const gameOver = new Audio(gameOverTone);

  // Move checkWin outside useEffect

  console.log('gameturn ' + gameTurn);
  console.log('gameover ' + isGameover);
  useEffect(() => {
    const handleBoxClick = (box) => {
      const boxText = box.querySelector('.boxtext');
      if (boxText.innerHTML === '' && !isGameover) {
        turn.currentTime = 0;
        // boxText.innerHTML = gameTurn;
        // setGameTurn((prevTurn) => (prevTurn === 'X' ? 'O' : 'X'));
        setGameTurn((prevTurn) => {
          boxText.innerHTML = prevTurn; // Set the boxText to the current value of gameTurn
          console.log(boxText);
          return prevTurn === 'X' ? 'O' : 'X'; // Return the updated value
        });

        // document.querySelector('.info').innerHTML = `Turn for ${gameTurn}`;
        turn.play();
        setTimeout(() => {
          checkWin();
        }, 300);
      }
    };

    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
      box.addEventListener('click', () => handleBoxClick(box));
    });

    return () => {
      // Clean up event listeners on component unmount
      boxes.forEach((box) => {
        box.removeEventListener('click', () => handleBoxClick(box));
      });
    };
  }, [gameTurn, isGameover]);

  const checkWin = () => {
    const boxText = Array.from(document.getElementsByClassName('boxtext'));
    console.log('boxtext', boxText);

    let wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    wins.forEach((e) => {
      console.log('1 ' + boxText[e[0]].innerText);
      console.log('2 ' + boxText[e[1]].innerText);
      console.log('3 ' + boxText[e[2]].innerText);
      if (
        boxText[e[0]].innerText === boxText[e[1]].innerText &&
        boxText[e[1]].innerText === boxText[e[2]].innerText &&
        boxText[e[0]].innerText !== '' &&
        boxText[e[1]].innerText !== '' &&
        boxText[e[2]].innerText !== ''
      ) {
        setIsGameover(true);
        console.log('game wined');
        gameOver.play();
      }
    });

    if (
      boxText[0].innerText !== '' &&
      boxText[1].innerText !== '' &&
      boxText[2].innerText !== '' &&
      boxText[3].innerText !== '' &&
      boxText[4].innerText !== '' &&
      boxText[5].innerText !== '' &&
      boxText[6].innerText !== '' &&
      boxText[7].innerText !== '' &&
      boxText[8].innerText !== ''
    ) {
      document.querySelector('.info').innerHTML = `Tie !!`;
      gameOver.play();
    }
  };

  return (
    <div className='container'>
      {Array(9)
        .fill('_')
        .map((_, i) => (
          <div key={`box-${i + 1}`} className='box'>
            <span className='boxtext'></span>
          </div>
        ))}
    </div>
  );
};

export default PlayGame;
