import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CreateTask } from "../CreateTask";
import { FilterTaskFeed } from "../FilterTaskFeed";
import { taskStore } from "../../stores/taskStore";
import "./TabsStyling.css";

export const TaskTabs = () => {
  const { fetchTasks } = taskStore();

  const handleReset = () => {
    fetchTasks(); // Fetch tasks from server
  };

  return (
    <Tabs>
      <TabList>
        <Tab tabIndex="0" onClick={handleReset}>
          {/* tabIndex="0" makes tab focusable */}
          Ask for help
        </Tab>
        <Tab>Lend a hand</Tab>
      </TabList>
      <TabPanel>
        <CreateTask />
      </TabPanel>
      <TabPanel>
        <FilterTaskFeed />
      </TabPanel>
    </Tabs>
  );
};
