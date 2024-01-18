import { useEffect } from "react";
import { taskStore } from "../stores/taskStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { FeedTaskCard } from "../components/TaskCards/FeedTaskCard";
import { TaskTabs } from "../components/Tabs/TaskTabs";
import styled from "styled-components";
import { GoTopButton } from "../components/Buttons/GoTop";

const StyledTaskPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;

  h1 {
    margin: 0;
  }

  @media screen and (min-width: 855px) {
    flex-direction: column;
    justify-content: flex-start;
    border-right: 5px solid var(--lighttext);
    width: 30%;
  }
`;

const StyledTaskText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-bottom: 40px;

  @media screen and (min-width: 855px) {
    flex-direction: row;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);

    p {
      grid-column: 1 / 3;
      text-align: center;
    }
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);

    p {
      grid-column: 1 / 5;
    }
  }

  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// Define the 'Tasks' functional component.
export const Tasks = () => {
  // Text content for the heading and paragraphs.
  const text = {
    intro: "Do you need a helping hand? Or do you want to help someone?",
    p: "Then Deed Hub is the place to be!",
    deeds: "Help requested",
  };

  // Access the 'tasks' and 'fetchTasks' functions from the 'taskStore'.
  const { tasks, fetchTasks } = taskStore();
  // Access the 'accessToken' and 'isLoggedIn' from the 'userStore'.
  const { accessToken, isLoggedIn } = userStore();
  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Use the 'useEffect' hook to fetch tasks when 'tasks' or 'accessToken' change.
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, accessToken]);

  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedIn) {
      // If the user is not logged in, show an alert and navigate to the login route.
      alert("You need to log in to see all the content");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Render the component content.
  return (
    <StyledTaskPage>
      <StyledTaskText>
        {/* Display the heading and paragraphs. */}
        <HeadingWrapper>
          <h1>
            In Need,
            <br />
            In Deed
          </h1>
        </HeadingWrapper>
        <TextWrapper>
          <p>{text.intro}</p>
          <p>{text.p}</p>
        </TextWrapper>
      </StyledTaskText>
      <TaskTabs />
      <h2>{text.deeds}</h2>
      <CardWrapper>
        {/* Conditional rendering based on the number of tasks. */}
        {tasks.length === 0 ? (
          <p>Nothing to volunteer for yet!</p>
        ) : (
          // Map through 'tasks' and render task items.
          tasks.map((task) => <FeedTaskCard key={task._id} task={task} />)
        )}
      </CardWrapper>
      <GoTopButton />
    </StyledTaskPage>
  );
};
