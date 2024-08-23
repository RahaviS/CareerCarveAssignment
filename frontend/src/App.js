import { BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from 'react';
import Home from './components/Home';
import Mentor from './components/Mentor';
import BookingForm from './components/BookingForm';
import Pricing from "./components/Pricing";
import Payment from "./components/Payment";
import NotFound from './components/NotFound';
import CareerCarveContext from "./components/context/CareerCarveContext";
import './App.css'

const App=()=> {
  const [studentName,setStdName]=useState('')
  const [sessionDate,setDate]=useState('')
  const [selectedMentor,setSelectedMentor]=useState([])
  const [sessionStart,setSessionStart]=useState(null)
  const [sessionEnd,setSessionEnd]=useState(null)
  const [duration,setTimeDuration]=useState('');
  const [amount,setAmt]=useState(0);

  const addMentor=(mentor_details)=>{
     setSelectedMentor(mentor_details);
  }
  const setStartTime=(time)=>{
     setSessionStart(time)
  }
  const setEndTime=(time)=>{
    setSessionEnd(time)
  }
  const setStudentName=(name)=>{
    setStdName(name)
  }
  const setSessionDate=(date)=>{
    setDate(date)
  }
  const setDuration=(time)=>{
    setTimeDuration(time)
  }
  const setAmount=(isPremium,timeDuration)=>{
    let cash_amt=0;
    if(timeDuration==="30"){
     cash_amt=2000;
    }else if(timeDuration==="45"){
      cash_amt=3000;
    }
    else{
      cash_amt=4000;
    }
    if (isPremium==="true"){
      cash_amt+=1000;
    }
  setAmt(cash_amt)
  }

  return (
    <CareerCarveContext.Provider
    value={{studentName,selectedMentor,sessionDate,sessionStart,sessionEnd,duration,amount,setAmount,addMentor,setStartTime,setEndTime,setSessionDate,setStudentName,setDuration}}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Home/>}/>
      <Route path="/form" element = {<BookingForm/>}/>
      <Route path="/mentors" element = {<Mentor/>}/>
      <Route path="/payment" element ={<Payment/>}/>
      <Route path="/pricing" element ={<Pricing/>}/>
      <Route path="/not-found" element ={<NotFound/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </CareerCarveContext.Provider>

  );
}

export default App;
