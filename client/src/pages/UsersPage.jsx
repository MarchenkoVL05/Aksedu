import Header from "../components/Header";
import UsersList from "../components/UsersList";
import TestResults from "../components/TestResults";
import ProgressTable from "../components/ProgressTable";
import TaskAnswersTable from "../components/TaskAnswersTable";

function UsersPage() {
  return (
    <>
      <Header />
      <UsersList />
      <TestResults />
      <ProgressTable />
      <TaskAnswersTable />
    </>
  );
}

export default UsersPage;
