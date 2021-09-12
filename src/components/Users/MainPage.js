import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const MainPage = (props) => {
  const items = ['+','-','*','/']
  let [item1,setItems1] = useState(items[Math.floor(Math.random()*items.length)])
  let [item2,setItems2] = useState(items[Math.floor(Math.random()*items.length)])
  let [item3,setItems3] = useState(items[Math.floor(Math.random()*items.length)])
  let [generateNumbers,setGenerateNumbers]=useState([String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10))])
  let [beforeAdded,setBeforeAdded] = useState(generateNumbers[0]+item1+generateNumbers[1]+item2+generateNumbers[2]+item3+generateNumbers[3])
  let [added,setAdded] = useState(eval(beforeAdded))
  let [typedAnswer,setTypedAnswer]=useState('')
  let [broadcastCorrect,setBroadCastCorrect]=useState(undefined)
  let [score,setScore]=useState(10)
  let [end,setEnd]=useState(false)
  let [won,setWon]=useState(false)
  console.log(generateNumbers)
  console.log(beforeAdded)
  console.log(added)

  const createNum = ()=>{
    const item1 = items[Math.floor(Math.random()*items.length)]
    const item2 = items[Math.floor(Math.random()*items.length)]
    const item3 = items[Math.floor(Math.random()*items.length)]
    const generateNum = [String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10)),String(Math.floor(Math.random() * 10))]
    setGenerateNumbers([...generateNum])
    setBeforeAdded(generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3])
    setAdded(eval(generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3]))
    console.log(generateNum)
    console.log(generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3])
    console.log(eval(generateNum[0]+item1+generateNum[1]+item2+generateNum[2]+item3+generateNum[3]))
    setTypedAnswer('')
    return
  }
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
        console.log("wrong")
        setBroadCastCorrect(false)
        setScore(score-=5)
        if(score===0){
          setEnd(true)
        }
        createNum();
        return
      }
    }
    if (typedAnswer.length===0){
      console.log("wrong")
      setBroadCastCorrect(false)
      setScore(score-=5)
      if(score===0){
        setEnd(true)
      }
      createNum();
      return

    }
    if (String(typedAnswer)===String(added)){
      console.log("wrong")
      setBroadCastCorrect(false)
      setScore(score-=5)
      if(score===0){
        setEnd(true)
      }
      createNum();
      return
    }
    if (eval(typedAnswer)===added){
      console.log("Correct")
      setBroadCastCorrect(true)
      setScore(score+=5)
      if(score===30){
        setWon(true)
      }
      createNum();
    }
    else{
      console.log("wrong")
      setBroadCastCorrect(false)
      setScore(score-=5)
      if(score===0){
        setEnd(true)
      }
      createNum();
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
