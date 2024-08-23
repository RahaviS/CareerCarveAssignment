const express = require('express');
const {open}=require('sqlite');
const sqlite3=require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app=express();

let db=null;

const dbPath = path.join(__dirname,'careercarve.db');

const initializeDB=async()=>{
  try{
    db = await open({
        filename:dbPath,
        driver:sqlite3.Database
    })
    app.listen(5000,()=>console.log("Server is up and running on port 5000"));
  }
  catch(err){
    console.log(`Database Error Caught: ${err}`)
    process.exit(1);
  }
}

initializeDB();

app.use(cors());
app.use(express.json());

app.get("/form/",async (request,response)=>{
  const {course,date,duration}=request.query;
  const sqlcmd = `SELECT * FROM mentors INNER JOIN availability ON mentors.availability=availability.id WHERE date='${date}' AND area_of_expertise = '${course}' AND (strftime('%s',end_time)-strftime('%s',start_time))/60.0 >= ${duration}`;
  const dbResponse = await db.all(sqlcmd);
  response.send(dbResponse);
})

app.get("/mentors",async (request,response)=>{
  const sqlcmd = `SELECT * FROM mentors`;
  const dbResponse = await db.all(sqlcmd);
  response.send(dbResponse);
})

app.get("/bookings/",async (request,response)=>{
  const getquery=`SELECT * FROM bookings`;
  const dbRes=await db.all(getquery);
  response.send(dbRes);
})

app.post("/bookings/",async (request,response)=>{
  const {bookingId,mentor,student,date,sessionStart,sessionEnd,duration,specialization}=request.body;
  const insertQuery= `INSERT INTO bookings (booking_id,mentor,student,session_date,duration,specialization,session_start,session_end) VALUES 
 ('${bookingId}','${mentor}','${student}','${date}','${duration}','${specialization}','${sessionStart}','${sessionEnd}')`;
  const dbResponse = await db.run(insertQuery);
  response.send(dbResponse);
})