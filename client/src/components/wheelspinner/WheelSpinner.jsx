import React, { useState , useEffect} from 'react'
import { Wheel } from 'react-custom-roulette'
import {shuffle} from './../../utils/shuffle';


const TOTAL_PIES = 30;
const WIN_COLOUR = '#ff6701';
const LOSE_COLOUR = '#fcecdd';


function createWinPie(option = 0) {
    return { option: option, style: { 
        backgroundColor: WIN_COLOUR,
        textColor: 'white',
        
     }}
}

function createLosePie(option = 0){
    return { option: option, style: { 
        backgroundColor: LOSE_COLOUR ,
        textColor: 'grey',

    }}
}

function generateSpinnerData(winRate){
    const data = [];
    
    const totalWinPies = Math.ceil(TOTAL_PIES * winRate);

    const totalLosePies = TOTAL_PIES - totalWinPies;

    for (let index = 0; index < totalWinPies; index++) {
        data.push(createWinPie(index)); 
    }

    for (let index = 0; index < totalLosePies; index++) {
        data.push(createLosePie(index + totalWinPies));
    }

    return shuffle(data);




}

export default (props) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [data, setData] = useState([])
  const [won, setWon] = useState(false)

  const ticketsBought = (props.ticket.no_tickets_bought/props.ticket.post.no_tickets);

  useEffect(() => {
    setWon(props.won)
    console.log(ticketsBought);
    setData(generateSpinnerData(ticketsBought));
  }, []);


  const handleSpinClick = () => {
    const riggedColour = won ? WIN_COLOUR : LOSE_COLOUR;  

    // find green pie index
    const riggedNumbers = data.map((item, index) => item.style.backgroundColor === riggedColour ? index : null).filter(x => x);
    console.log({riggedNumbers});
    const newPrizeNumber = riggedNumbers[ Math.floor(Math.random() * riggedNumbers.length )];
    console.log({newPrizeNumber});
   

    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        innerRadius ={40}
        innerBorderWidth={5}
        outerBorderWidth={5}
        radiusLineWidth={2}
        innerBorderColor='#ffc55c' //'#ffc894ff'
        outerBorderColor= '#ffc55c'
        radiusLineColor='#ffc55c'
        backgroundColors={['#3e3e3e', '#df3428']}
        textDistance={80}

        // onStopSpinning={() => {
        //   setMustSpin(false)
        // }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  )
}