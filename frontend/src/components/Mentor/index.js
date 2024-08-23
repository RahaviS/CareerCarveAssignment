import {useState,useEffect} from 'react';
import Navbar from '../Navbar';
import './index.css'

const Mentor = () => {
  const [mentorList,setMentorList]=useState([]);

  const getUpdatedData=(item)=>({name:item.name,
    availability:item.availability,
    mentorId:item.mentor_id,
    isPremium:item.is_premium,
    areaOfExpertise:item.area_of_expertise
  });

  const getAllMentors=async ()=>{
    const url = "http://localhost:5000/mentors/"
    const response = await fetch(url);
    const data= await response.json();
    const updatedData= data.map(each=>getUpdatedData(each));
    console.log(updatedData);
    setMentorList(updatedData);
  }
  // eslint-disable-next-line
  useEffect(()=>{getAllMentors()},[])
  return (
    <>
    <Navbar />
    <div className='all-mentors-container'>
      <h1 className='page-title'>Top Active Mentors</h1>
      <hr className='styling-line'/>
      <ul className='all-mentor-list'>
        {mentorList.map(each=>(
          <li className="all-mentor-item" key={each.mentorId}>
            <div className='premium-section'>
              <h1 className='mentor'>{each.name}</h1>
              {each.isPremium==="true"&& <p className='premium'>Premium</p>}
            </div>
            <p className='course'>{each.areaOfExpertise.split("_").join(" ")}</p>
          </li>))}
      </ul>
    </div>
    </>
  )
}

export default Mentor