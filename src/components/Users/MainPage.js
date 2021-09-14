import React, { useState,useRef } from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const MainPage = (props) => {
  const [items,setItems] = useState(['+','-','*'])
  const ansInputRef = useRef()
  let [item1,setItems1] = useState(items[Math.floor(Math.random()*items.length)])
  let [item2,setItems2] = useState(items[Math.floor(Math.random()*items.length)])
  let [item3,setItems3] = useState(items[Math.floor(Math.random()*items.length)])
  let [item4,setItems4] = useState(items[Math.floor(Math.random()*items.length)])
  let [generateNumbers,setGenerateNumbers]=useState([getRandomIntBetween(1,9),getRandomIntBetween(1,9),getRandomIntBetween(1,9),getRandomIntBetween(1,9),getRandomIntBetween(1,9)])
  let [beforeAdded,setBeforeAdded] = useState(generateNumbers[0]+item1+generateNumbers[1]+item2+generateNumbers[2]+item3+generateNumbers[3]+item4+generateNumbers[4])
  let [added,setAdded] = useState(eval(beforeAdded))
  let [typedAnswer,setTypedAnswer]=useState('')
  let [broadcastCorrect,setBroadCastCorrect]=useState(undefined)
  let [score,setScore]=useState(10)
  let [end,setEnd]=useState(false)
  let [won,setWon]=useState(false)
  let [time,setTime]=useState(false)
  console.log(generateNumbers)
  console.log(beforeAdded)
  console.log(added)
  function getRandomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
const Completionist = () => <span>Time's Up!</span>;
const renderer = ({ seconds, completed }) => {
  if (completed) {
    setTime(true)
    return <Completionist />;
  } else {
    return <span>{seconds}</span>;
  }
};

  const createNum = ()=>{
    const items = ['+','-','*','/']
    const item1 = items[Math.floor(Math.random()*items.length)]
    const item2 = items[Math.floor(Math.random()*items.length)]
    const item3 = items[Math.floor(Math.random()*items.length)]
    const item4 = items[Math.floor(Math.random()*items.length)]
    let generateNum = [getRandomIntBetween(1,9),getRandomIntBetween(1,9),getRandomIntBetween(1,9),getRandomIntBetween(1,9),getRandomIntBetween(1,9)]
    let stringEval = (generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3]+item4+generateNum[4])
    let mathEval = eval(stringEval)
    while (mathEval%1 !== 0){
      generateNum = [getRandomIntBetween(1,9),getRandomIntBetween(1,9),getRandomIntBetween(1,9),getRandomIntBetween(1,9),getRandomIntBetween(1,9)]
      stringEval = (generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3]+item4+generateNum[4])
      mathEval = eval(stringEval)
    }
    setGenerateNumbers([...generateNum])
    setBeforeAdded(generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3]+item4+generateNum[4])
    setAdded(eval(generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3]+item4+generateNum[4]))
    console.log(generateNum)
    console.log(generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3]+item4+generateNum[4])
    console.log(eval(generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3]+item4+generateNum[4]))
    setTypedAnswer('')
    return
  }
  const errorHandler = () => {
    setEnd(false);
    setWon(false)
    setTime(false)
    window.location.reload(false)
    setScore(10)
    setBroadCastCorrect(undefined)
  };
  const submitHandler=(event)=>{
    event.preventDefault();
    for (let items of generateNumbers){
      if(!String(ansInputRef.current.value).includes(String(items))){
        console.log("wrong")
        setBroadCastCorrect(false)
        setScore(score-=5)
        if(score===0){
          setEnd(true)
        }
        createNum();
        ansInputRef.current.value = ''
        return
      }
    }
    if (ansInputRef.current.value.length===0){
      console.log("wrong")
      setBroadCastCorrect(false)
      setScore(score-=5)
      if(score===0){
        setEnd(true)
      }
      createNum();
      ansInputRef.current.value = ''
      return

    }
    if (String(ansInputRef.current.value)===String(added)){
      console.log("wrong")
      setBroadCastCorrect(false)
      setScore(score-=5)
      if(score===0){
        setEnd(true)
      }
      createNum();
      ansInputRef.current.value = ''
      return
    }
    if (eval(ansInputRef.current.value)===added){
      console.log("Correct")
      setBroadCastCorrect(true)
      setScore(score+=5)
      if(score===30){
        setWon(true)
      }
      createNum();
      ansInputRef.current.value = ''
    }
    else{
      console.log("wrong")
      setBroadCastCorrect(false)
      setScore(score-=5)
      if(score===0){
        setEnd(true)
      }
      createNum();
      ansInputRef.current.value = ''
    }
  }
  return (
    <Card className={classes.input4}>
            {time &&
        <ErrorModal
          title='Announcement'
          message='Your time is up!'
          onConfirm={errorHandler}
        />}
      {end &&
        <ErrorModal
          title='Announcement'
          message='Your score have reached 0 :( You have lost the game!'
          onConfirm={errorHandler}
        />}
      {won &&
        <ErrorModal
          title='Announcement'
          message='Congrats! ,You have won the game!'
          onConfirm={errorHandler}
        />}

      <Card className={classes.input3}>
      <Card className={classes.input2}>
      <h1 className={classes.titlee} style={{fontSize:'300%'}} >IQ 180 </h1>
        <h1 className={classes.titlee} style={{fontSize:'200%'}} >Time Remaining: <span>        <Countdown
    date={Date.now() + 59000}
    renderer={renderer}/></span></h1>
      </Card>
        <h3 style={{textAlign:'center'}}>{'Use the following numbers'}</h3>
        <h1 style={{textAlign:'center'}}>{generateNumbers.join(',')}</h1>
        <h1 style={{textAlign:'center'}}>{`+  -  x  ÷ `}</h1>
        <h3 style={{textAlign:'center'}}>{`Target Number: ${added}`}</h3><h1></h1>
        <form onSubmit={submitHandler} style={{textAlign:'center'}}>       
          <input
            ref={ansInputRef}
          />
          <h1></h1>
          <Button type="submit">Submit</Button>
        </form>
        <Card className={classes.input}>
        {broadcastCorrect===undefined?<h1 className={classes.titlee}>Status</h1>:<h1></h1>}
        {broadcastCorrect===true?<h1 style={{color: "green"}} className={classes.titlee}>Status: Correct</h1>:<h1></h1>}
        {broadcastCorrect===false?<h1 style={{color: "red"}} className={classes.titlee}>Status: Incorrect</h1>:<h1></h1>}
        </Card>
        <h4 style={{textAlign:'center'}}>{`Current Score: ${score} pts`}</h4>
      </Card>
    </Card>
  );
};
export default MainPage;
