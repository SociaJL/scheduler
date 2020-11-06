import React from "react";
import { render, cleanup, fireEvent, getByPlaceholderText,  } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it('renders', () => {
    expect(render(<Form interviewers={interviewers} value="Lydia Miller-Jones" />))
  })

  it('renders placeholder', () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} value="Lydia Miller-Jones" />)
    expect(getByPlaceholderText("Enter Student Name"))
  })

  it("renders student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input"))
  })

  it("validates that the name isn't blank", () => {
    const onSave = jest.fn()
    const {getByText} = render(
      <Form interviewers={interviewers} onSave={onSave} />
    )
    fireEvent.click(getByText("Save"))
    expect(getByText(/Please enter a student name and select an interviewer!/i)).toBeInTheDocument()
    expect(onSave).not.toHaveBeenCalled()
  })

  it("Calls onSave function when name is defined", () => {
    const onSave = jest.fn()
    const { getByText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} name="Lydia Miller-Jones" />
    )
    
    fireEvent.click(getByText("Save"));
    expect(queryByText(/Please enter a student name and select an interviewer!/i))
    expect(onSave).toHaveBeenCalledTimes(0);
  })

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/Please enter a student name and select an interviewer!/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { 
        student: "Lydia Miller-Jones" 
      }
    });
  
    fireEvent.click(getByText("Save"));
    expect(queryByText(/Please enter a student name and select an interiewer!/i)).toBeNull();
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});