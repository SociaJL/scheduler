import React, { useReducer, useEffect } from "react";
import axios from "axios"
import {getAppointmentsForDay, } from "helpers/selectors"
import reducers from "../reducers/application"

let daysURL = "http://localhost:8001/api/days"
  let appointmentsURL = "http://localhost:8001/api/appointments"
  let interviewersURL = "http://localhost:8001/api/interviewers"


export default function useApplicationData() {

  const initialState = {
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const [state, dispatcher] = useReducer(reducers, initialState)

  function bookInterview(id, interview) {
    return axios.put("http://localhost:8001/api/appointments/"+id, {interview}).then( data => {
      const days = state.days.map(day => {
        day.appointments.includes(id) 
        if(day.appointments.includes(id)){
          return {
            ...day,
            spots: day.spots -1
          }
        } else {
          return day
        }
      })
        dispatcher({
          type: SET_INTERVIEW,
          value: {
            appointments: {
              ...state.appointments,
              [id]: {
                ...state.appointments[id], 
                interview:interview
              }
            },
            days
          }
        }
      )
    })
  }

function deleteInterview(id){
  return axios.delete("http://localhost:8001/api/appointments/"+id).then( data => {
    const days = state.days.map(day => {
      day.appointments.includes(id) 
      if(day.appointments.includes(id)){
        return {
          ...day,
          spots: day.spots +1
        }
      } else {
        return day
      }
    }) 
  
  dispatcher({
      type: SET_INTERVIEW,
      value: {
        appointments: {
          ...state.appointments,
          [id]: {
            ...state.appointments[id], interview:null
          }
        },
        days
      }
    }
  )
})
}

function setDay(string) {
dispatcher({type:SET_DAY, value:{...state, day:string}})
}


  useEffect(() => {
    const promise1 = axios.get(daysURL);
    const promise2 = axios.get(appointmentsURL);
    const promise3 = axios.get(interviewersURL);
  
    Promise.all([promise1, promise2, promise3])
      .then((all) => {
        dispatcher({type: SET_APPLICATION_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data }});
    });
  },[])

  return {
 state,
 dispatcher,
 bookInterview,
 deleteInterview,
 setDay,
  }
}