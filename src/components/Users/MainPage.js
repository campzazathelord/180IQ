import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const MainPage = (props) => {
  const items = ['+','-','*','/']
  let item1 = items[Math.floor(Math.random()*items.length)];
  let item2 = items[Math.floor(Math.random()*items.length)];
  let item3 = items[Math.floor(Math.random()*items.length)];
  let [generateNumbers,setGenerateNumbers]=useState([String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10))])
  let [added,setAdded] = useState(eval(generateNumbers[0]+item1+generateNumbers[1]+item2+generateNumbers[2]+item3+generateNumbers[3]))
  let [solution,setSolution]=useState(generateNumbers[0]+item1+generateNumbers[1]+item2+generateNumbers[2]+item3+generateNumbers[3])
  let [typedAnswer,setTypedAnswer]=useState('')
  let [broadcastCorrect,setBroadCastCorrect]=useState(undefined)
  let [score,setScore]=useState(10)
  let [end,setEnd]=useState(false)
  let [won,setWon]=useState(false)
  console.log(solution)
  const errorHandler = () => {
    setEnd(false);
    setWon(false)
    setScore(10)
    setBroadCastCorrect(undefined)
  };
  const submitHandler=(event)=>{
    event.preventDefault();
    for (let items of generateNumbers){
      if(!String(typedAnswer).includes(String(items))){
        setBroadCastCorrect(false)
        setGenerateNumbers([String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10))])
        setAdded(eval(generateNumbers[0]+item1+generateNumbers[1]+item2+generateNumbers[2]+item3+generateNumbers[3]))
        setTypedAnswer('')
        setScore(score-=5)
        if(score===0){
          setEnd(true)
        }
        return
      }
    }
    if (typedAnswer.length===0){
      setBroadCastCorrect(false)
      return
    }
    if (String(typedAnswer)===String(added)){
      setBroadCastCorrect(false)
      return
    }
    if (eval(typedAnswer)===added){
      console.log("Correct")
      setBroadCastCorrect(true)
      setScore(score+=5)
      if(score===30){
        setWon(true)
      }
      setGenerateNumbers([String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10))])
      setAdded(eval(generateNumbers[0]+item1+generateNumbers[1]+item2+generateNumbers[2]+item3+generateNumbers[3]))
      setTypedAnswer('')
    }
    else{
      console.log("wrong")
      setBroadCastCorrect(false)
      setScore(score-=5)
      if(score===0){
        setEnd(true)
      }
      setGenerateNumbers([String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10))])
      setAdded(eval(generateNumbers[0]+item1+generateNumbers[1]+item2+generateNumbers[2]+item3+generateNumbers[3]))
      setTypedAnswer('')
    }
  }
  const typedAnswerHandler=(event)=>{
    setTypedAnswer(event.target.value)
  }
  return (
    <Card className={classes.input4}>
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
      </Card>
        <h3 style={{textAlign:'center'}}>{'Use the following numbers'}</h3>
        <h1 style={{textAlign:'center'}}>{generateNumbers.join(',')}</h1>
        <h1 style={{textAlign:'center'}}>{`+  -  x  ÷ `}</h1>
        <h3 style={{textAlign:'center'}}>{`Target Number: ${added}`}</h3><h1></h1>
        <form onSubmit={submitHandler} style={{textAlign:'center'}}>       
          <input
            onChange={typedAnswerHandler}
            value={typedAnswer}
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
