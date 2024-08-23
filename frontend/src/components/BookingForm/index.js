import {useContext, useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
import CareerCarveContext from '../context/CareerCarveContext';
import './index.css'

const specializations = [
  {id:'Business_Economics',displayText:'Business Economics'}, 
  {id:'Business_Ethics', displayText:'Business Ethics'},
  {id:'Infrastructure',displayText:'Infrastructure'},
  {id:'NGO_Management' ,displayText:'NGO Management'},
  {id:'Project_Management',displayText:'Project Management'},
  {id:'E_Commerce', displayText:'E-Commerce'},
  {id:'FMCG_Sales',displayText:'FMCG Sales'},
  {id:'Digital_Marketing',displayText:'Digital Marketing'},
  {id:'Equity_Research',displayText:'Equity Research'}
];

const duration=[
  {id:'30',displayText:'30 Mins'},
  {id:'45',displayText:'45 Mins'},
  {id:'60',displayText:'60 Mins'}
]

const BookingForm = () => {
  const [stdname,setStdName]=useState('');
  const [selectedDate,setSelectedDate]=useState('');
  const [timeDuration,setTimeDuration]=useState(duration[0].id);
  const [course,setCourse]=useState(specializations[0].id)
  const [minDate, setMinDate] = useState('');
  const [mentorList,setMentorList]=useState([])
  const [selectedMentorID,setSelectedMentorID]=useState(null);
  const [searchDone,setSearchDone]=useState(0);

  const {addMentor,setStartTime,setEndTime,setAmount,setStudentName,setSessionDate,setDuration}=useContext(CareerCarveContext)
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const getUpdatedData=(item)=>({
      areaOfExpertise:item.area_of_expertise,
      availability:item.availability,
      date:item.date,
      startTime:item.start_time,
      endTime:item.end_time,
      isPremium:item.is_premium,
      mentorId:item.mentor_id,
      name:item.name,
    })
  

  const getMentors=async()=>{
    const url=`https://career-carve-assignment-frontend.vercel.app/form/?course=${course}&date=${selectedDate}&duration=${timeDuration}`
    const options={method:"GET"}
    const response = await fetch (url,options)
    const data= await response.json()
    const updatedData = data.map(each=>getUpdatedData(each));
    setMentorList(updatedData);
    setSearchDone(1);
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    getMentors()
  }

  const calculateDuration=(start)=>{
    let [hours, minutes,seconds] = start.split(':').map(Number);
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMinutes(date.getMinutes() + timeDuration);
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();  
    return `${hours}:${minutes}:0${seconds}`
  }

  const handleClick=()=>{
    const selectedMentorDetails = mentorList.filter(each=>each.mentorId===selectedMentorID);
    const {startTime,isPremium}=selectedMentorDetails[0]
    const sessionEndTime = calculateDuration(startTime)

    addMentor(selectedMentorDetails)
    setStudentName(stdname)
    setSessionDate(selectedDate)
    setStartTime(startTime)
    setEndTime(sessionEndTime)
    setDuration(timeDuration) 
    setAmount(isPremium,timeDuration)
    navigate('/payment')
  }

  return (
    <>
    <Navbar/>
    <div className="form-container">
     <p className='form-text'>Join millions of other customers on CareerCarve</p>
     <form className='booking-form' onSubmit={handleSubmit}>
       <label htmlFor="name" className='label-text'>Enter Your Name</label>
       <input type="text" placeholder="Enter Name" value={stdname} onChange={e=>setStdName(e.target.value)}className='input-box' id="name"/>
       <label htmlFor="areaOfInterest" className='label-text'>Area of Interest</label>
       <select className='input-box' id="areaOfInterest" value={course} onChange={e=>setCourse(e.target.value)}>
        {specializations.map((eachOption)=>(
          <option key={eachOption.id} 
            value={eachOption.id}>
              {eachOption.displayText}
          </option>
        ))}
       </select>
       <label htmlFor="date" className='label-text'>Date</label>
       <input type='date' className='input-box' id="date" min={minDate} value={selectedDate} onChange={e=>setSelectedDate(e.target.value)}/> 
       <label htmlFor="duration" className='label-text'>Duration</label>
       <select className='input-box' id="duration" value={timeDuration} onChange={e=>setTimeDuration(e.target.value)}>
        {duration.map((eachItem)=>(
          <option key={eachItem.id} 
            value={eachItem.id}>
              {eachItem.displayText}
          </option>
        ))}
       </select>
       <button type="submit" className='view-btn'>View Available Mentors</button>
     </form>
    </div>
   {Object.keys(mentorList).length !== 0 ?
     (<div className='available-mentor-list-container'>
      <hr className='styling-line'/>
      <ul className='available-mentor-list'>
        {mentorList.map(eachMentor=>(
          <li className='available-mentor-item' key={eachMentor.mentorId}>
            <div className={eachMentor.mentorId===selectedMentorID?'mentor-details selected':'mentor-details'} onClick={e=>setSelectedMentorID(eachMentor.mentorId)}>
              <div className='name-section'>
                <p className='mentor-name'>{eachMentor.name}</p>
                {eachMentor.isPremium==="true" && <p className='premium-text'>premium</p>}
              </div>
              <p className='mentor-course'>{eachMentor.areaOfExpertise.split("_").join(" ")}</p>
              <p className='mentor-time'>{`Available Time : ${eachMentor.startTime} to ${eachMentor.endTime}`}</p>
            </div>
          </li>))}
      </ul>
     <button type="button" className='make-booking-btn' onClick={handleClick}>Book Now</button>
      </div>): 
    searchDone!==0 && (
      <div className='no-available-mentors-container'>
      <h1 className='not-available-text'>Sorry! No mentors available at this time. Try Different Slot or Date.</h1>
    </div>)}   
    </>
  )
}

export default BookingForm
