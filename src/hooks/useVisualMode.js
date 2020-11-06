import React, {useState} from "react"
import Show from "components/Appointment/Show"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = function(mode, replace = false){ 
    if(replace){
      history.splice(0,1)
    }
    setHistory(history => [mode, ...history ])
    setMode(mode)    
  }

  const back = function(){    
    if(history.length === 1){
      return
    }
    setHistory( prev => {
      prev.splice(0, 1);
      setMode(prev[0]);
      return [ ...prev]
    })
  }
  
  return { 
    mode,
    transition,
    back
  
  };
}
