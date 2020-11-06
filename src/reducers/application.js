import React from "react"


 export default function reducer(state, action) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
 switch (action.type) {
    case SET_DAY:
      return { ...state,...action.value}
    case SET_APPLICATION_DATA:
      return {...state,...action.value}
    case SET_INTERVIEW: {
      return {...state,...action.value}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}