// Import necessary dependencies and the 'taskStore' from the store.
import { useState } from "react";
import { taskStore } from "../stores/taskStore";
import { Button } from "../components/Buttons/Button";
import styled from "styled-components";

const StyledCreateTask = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTaskTitleInput = styled.input`
  border: 1px solid #64899b;
  border-radius: 20px;
  width: 250px;
  padding: 5px 5px 5px 10px;
`;

const CreateTaskSelects = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledSelects = styled.select`
  display: flex;
  width: 120px;
  border: 1px solid #64899b;
  border-radius: 20px;
  gap: 10px;
  padding: 5px;
`;

const StyledTaskInput = styled.textarea`
  border: 1px solid #64899b;
  border-radius: 20px 0 20px 20px;
  width: 250px;
  height: 150px;
  padding: 10px;
  resize: none; /* Prevent resizing */
  overflow-y: auto; /* Enable vertical scrollbar when content exceeds height */

  &::placeholder {
    word-wrap: break-word; /* Wrap long words */
    text-align: left; /* Align text to the left */
    vertical-align: top; /* Align text to the top */
  }
`;

// Define the 'CreateTask' functional component.
export const CreateTask = () => {
  // Initialize state variable 'task' using 'useState' to store the task input.
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");

  // Access the 'addTaskToServer' function from the 'taskStore'.
  const { addTaskToServer } = taskStore();

  // Function to update the 'task' state with the value entered in the input field.
  const taskTitle = (e) => {
    setTask(e.target.value); // Update the 'task' state with the value entered in the input field.
  };
  const taskCategory = (e) => {
    setCategory(e.target.value); // Update the 'task' state with the value entered in the input field.
  };
  const taskArea = (e) => {
    setArea(e.target.value); // Update the 'task' state with the value entered in the input field.
  };
  const taskDescription = (e) => {
    setDescription(e.target.value); // Update the 'task' state with the value entered in the input field.
  };

  // Function to add a new task both locally and to the server.
  const addTaskLocal = async () => {
    if (
      task.trim() !== "" &&
      category !== "" &&
      area !== "" &&
      description !== ""
    ) {
      // Check if all fields are not empty or only whitespace.
      const newTask = {
        task: task,
        category: category, // Include the selected category value
        area: area, // Include the selected area value
        description: description,
      }; // Create an object with task details
      await addTaskToServer(newTask); // Add the task to the server.
      setTask(""); // Clear the input field after the task is added.
      setCategory("");
      setArea("");
      setDescription("");
    } else {
      alert("Please fill in all fields"); // Alert the user if any of the fields are empty.
    }
  };

  // Render the component content.
  return (
    <StyledCreateTask>
      {/* Create an input field for entering the task description. */}
      <StyledTaskTitleInput
        className="task-input"
        type="text"
        placeholder="Enter descriptive title"
        onChange={taskTitle}
        value={task}
      />
      <CreateTaskSelects>
        <StyledSelects
          className="task-select"
          type="select"
          onChange={taskCategory}
          value={category}
        >
          <option disabled default value="">
            Category
          </option>
          <option value="Garden">Garden</option>
          <option value="Pets">Pets</option>
          <option value="Shopping">Shopping</option>
          <option value="Repairs">Repairs</option>
          <option value="Other">Other</option>
        </StyledSelects>
        <StyledSelects
          className="task-select"
          type="select"
          onChange={taskArea}
          value={area}
        >
          <option disabled default value="">
            Area
          </option>
          <option value="Varberg City">Varberg City</option>
          <option value="Himle">Himle</option>
          <option value="Kungsäter">Kungsäter</option>
          <option value="Rolfstorp">Rolfstorp</option>
          <option value="Tvååker">Tvååker</option>
          <option value="Veddige">Veddige</option>
        </StyledSelects>
      </CreateTaskSelects>
      <StyledTaskInput
        className="task-input"
        type="text"
        placeholder="Give a clear and detailed description of the help you need"
        onChange={taskDescription}
        value={description}
      />
      {/* Create a button to trigger the 'addTaskLocal' function for adding the task. */}
      <Button
        onClick={addTaskLocal}
        className="add-task-btn"
        buttonName="Ask for help"
      />
    </StyledCreateTask>
  );
};
