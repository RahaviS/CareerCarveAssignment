import { useContext,useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';
import { GoClock } from "react-icons/go";
import { BsSuitcaseLg } from "react-icons/bs";
import { MdPerson3 } from "react-icons/md";
import {CgClose} from 'react-icons/cg'; 
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
import './index.css'
import CareerCarveContext from '../context/CareerCarveContext'
Modal.setAppElement('#root');


const Payment=()=>{
  const [showModal,setShowModal]=useState(false);
  const [bookingsList,setBookingsList]=useState([]);
  const [isBookingExists,setBookingsExists]=useState(false);
  const [isSlotPresent,setSlotPresent]=useState(true)
  const {studentName,selectedMentor,sessionStart,sessionEnd,amount,sessionDate,duration,setStartTime,setEndTime}=useContext(CareerCarveContext)
  const {isPremium,name,areaOfExpertise,endTime}=selectedMentor[0]
  const total_amt = isPremium==="true"?amount-1000:amount
  const premium_charge = isPremium==="true"?1000:0

  const navigate = useNavigate();

  const getUpdatedData=(item)=>({
    bookingId:item.booking_id,
    duration:item.duration,
    mentor:item.mentor,
    sessionDate:item.session_date,
    sessionEnd:item.session_end,
    sessionStart:item.session_start,
    specialization:item.specialization,
    student:item.student
  })

  const getBookingsList=async()=>{
    const url='http://localhost:5000/bookings/';
    const response=await fetch(url);
    const data = await response.json();
    const updatedData= data.map(each=>getUpdatedData(each));
    setBookingsList(updatedData);
  }
//eslint-disable-next-line
  useEffect(()=>{getBookingsList()},[])

  const makeBooking=async()=>{
    const bookingDetails={
      bookingId:uuidv4(),
      mentor:name,
      student:studentName,
      date:sessionDate,
      sessionStart:sessionStart,
      sessionEnd:sessionEnd,
      duration:duration,
      specialization:areaOfExpertise
    }
    const url = 'http://localhost:5000/bookings/'
    const options={
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(bookingDetails)
    }
    const response = await fetch(url,options)
     // eslint-disable-next-line
    const data = await response.json();
    if(response.ok){
      // console.log("Data Added Successfully");
      setShowModal(true);
     }
  }

  const handleClick=async ()=>{   
    const isBookingAlreadyPresent = 
    bookingsList.filter(each=>each.mentor===name && each.sessionDate===sessionDate&& each.sessionStart===sessionStart)
    if(isBookingAlreadyPresent.length!==0){
      const {sessionEnd}=isBookingAlreadyPresent[0];
      const [hrs,mins] = sessionEnd.split(':').map(Number)
      const newEnd = hrs*60+mins+Number(duration)
      const newStart = hrs*60+mins
      const [hours,minutes]=endTime.split(':').map(Number)
      const end = hours*60+minutes
      
      const isSlotavailable = newEnd<end
      console.log(isSlotavailable)
      if(!isSlotavailable){
        setSlotPresent(false)
        setBookingsExists(true)
      }else{
        const newEndhrs =Math.floor(newEnd/60)
        let newEndMins = newEnd%60
        const newStartHrs = Math.floor(newStart/60)
        let newStartMins = newStart%60
        if (newEndMins===0){
          newEndMins='00'
        }
        if(newStartMins===0){
          newStartMins='00'
        }
        setStartTime(`${newStartHrs}:${newStartMins}:00`)
        setEndTime(`${newEndhrs}:${newEndMins}:00`)
        console.log(`new Start ${newStartHrs}:0${newStartMins}:00`)
        console.log(`new End ${newEndhrs}:0${newEndMins}:00`)
          makeBooking();
        }
      }else{
       makeBooking();
    }
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  }

   return(
    <>
    <Navbar/>
    <h1 className='page-title'>Let's make your checkout smooth!</h1>
    <hr className='styling-line'/>
    <div className='payments-page-container'>
      <div className='events-container'>
        <h1 className='event-heading'>Your Event Details</h1>
        <div className='event-details'><GoClock size={30} color="#2b7bc2"/> <p className='event-text'>{`${sessionStart} - ${sessionEnd}`}</p></div>
        <div className='event-details'><BsSuitcaseLg size={30} color="#2b7bc2"/><p className='event-text'>{areaOfExpertise}</p></div>
        <div className='event-details'><MdPerson3 size={30} color="#2b7bc2"/><p className='event-text'>{name}</p></div>
      </div>
     
      <div className='payments-container'>
        <h1 className='event-heading'>Your Order Details</h1>
        <div className='payment-details'><p className='payments-text'>Item Total </p> <p className='amt-text'>{total_amt}</p></div>
        <div className='payment-details'><p className='payments-text'>Premium Charge </p> <p className='amt-text premium-amt'>{premium_charge}</p></div>
        <div className='payment-details'><p className='payments-text grand'>Grand Total </p> <p className='amt-text'>{amount}</p></div>
        <button type="button" className='checkout-btn' onClick={handleClick}>Checkout</button>
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel="Booking Successful Modal"
          className="booking-modal" 
        >
          
          <div className='modal-container'>
          <button onClick={closeModal} className='close-btn'><CgClose size={15}/></button>
          {!isBookingExists&&isSlotPresent?
          (<>
          <h2 className='slot-text'>Your Slot has been Booked!</h2>
          <p className="text">Further Details will be notified to you shortly!</p>
          </>):(<p className='slot-text'>Selected Mentor is not available at that time!. Try Another Date or Slot!</p>)}
        </div>
      </Modal>
      </div>
      </div>
    </>
   )
}

export default Payment