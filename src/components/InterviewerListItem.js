import React from "react";
import classnames from 'classnames';
import "components/InterviewerListItem.scss"

export default function InterveiwerListItem (props) {
  let interviewerListClasses = classnames('interviwers__item',{
    'interviewers__item--selected' : props.selected,
    });

  return (
    <li className={interviewerListClasses} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}