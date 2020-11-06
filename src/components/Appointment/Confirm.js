import React from "react"
import Button from "../Button"

// confirm of delete appoitment

export default function Confirm(props){
  return (
    <main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">Confirm delete?</h1>
  <section className="appointment__actions">
    <Button danger onClick={props.onCancel} alt="Cancel">Cancel</Button>
    <Button danger onClick={props.onDelete} alt="Confirm">Confirm</Button>
  </section>
</main>
  )
}