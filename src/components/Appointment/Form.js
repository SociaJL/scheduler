import React, { useState } from "react"
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"


//Form to create an interview
export default function Form (props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null)
  }

  const cancel = () => {
    reset(props.onCancel())
  }

  //Checks to see if the name is empty or that an interviewer hasn't been selected, triggered
  // when you click save
  function validate() {
    if(name ==="" || interviewer === null) {
      setError("Please enter a student name and select an interviewer!")
      return;
    }
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
        className="appointment__create-input text--semi-bold"
         value={name}
         type="text"
         placeholder="Enter Student Name"
         onSubmit={event => event.preventDefault()}
         onChange={event => {
           setName(event.target.value);
         }}
         data-testid="student-name-input"
        />
      </form>

      <section className="appointment__validation">{error}</section>

      <InterviewerList 
      interviewers={props.interviewers} 
      value={props.interviewers} 
      onChange={setInterviewer} 
      interviewer={interviewer}/>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={validate} confirm>Save</Button>
      </section>
    </section>
  </main>
  )
}