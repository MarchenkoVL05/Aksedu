import Header from "../components/Header";
import UsersList from "../components/UsersList";
import TestResults from "../components/TestResults";
import ProgressTable from "../components/ProgressTable";

function UsersPage() {
  return (
    <>
      <Header />
      <UsersList />
      <TestResults />
      <ProgressTable />
    </>
  );
}

export default UsersPage;
