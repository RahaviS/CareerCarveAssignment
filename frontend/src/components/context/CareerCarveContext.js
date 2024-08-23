import { createContext } from "react";

const CareerCarveContext = createContext({
    studentName:'',
    selectedMentor:[],
    sessionDate:'',
    sessionStart:'',
    sessionEnd:'',
    duration:'',
    amount:'',
    setAmount:()=>{},
    addMentor:()=>{},
    setStartTime:()=>{},
    setEndTime:()=>{},
    setStudentName:()=>{},
    setSessionDate:()=>{},
    setDuration:()=>{},
})
export default CareerCarveContext