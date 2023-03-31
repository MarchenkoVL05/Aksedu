import Header from "../components/Header";
import AssignedCoursesList from "../components/AssignedCoursesList";
import WelcomeAdmin from "../components/WelcomeAdmin";

function HomePage({ userInfo }) {
  return (
    <>
      <Header />
      {userInfo.role === "ADMIN" ? <WelcomeAdmin /> : <AssignedCoursesList />}
    </>
  );
}

export default HomePage;
