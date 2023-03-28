import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAssignments } from "../../redux/slices/assignmentSlice";
import { assignCourse, deAssignCourse } from "../../redux/slices/assignmentSlice";
import ErrorBox from "../ErrorBox";
import Loader from "../Loader";
import styles from "./AssignCourseModal.module.scss";

function AssignCourseModal({ setOpenAssignModal, courseId }) {
  const dispatch = useDispatch();

  const assignments = useSelector((state) => state.assignment.assigmnents);
  const status = useSelector((state) => state.assignment.status);
  const error = useSelector((state) => state.course.error);

  console.log(assignments);

  useEffect(() => {
    dispatch(fetchAssignments());
  }, []);

  const handleAssignCourse = (userId) => {
    const assignment = {
      courseId,
      userId,
    };
    dispatch(assignCourse(assignment));
  };
  const handleDeAssignCourse = (userId) => {
    const assignment = {
      courseId,
      userId,
    };
    dispatch(deAssignCourse(assignment));
  };

  return (
    <>
      <div onClick={() => setOpenAssignModal(false)} className={styles.overlay}></div>
      <div className={styles.grid}>
        {status == "loading" ? (
          <Loader />
        ) : (
          <>
            <div className={styles.head}>Ученик</div>
            <div className={styles.head}>Действия</div>
            {assignments.map((assignment) => {
              return (
                <Fragment key={assignment.userId._id}>
                  <div className={styles.item}>{assignment.userId.firstName + " " + assignment.userId.lastName}</div>
                  <div className={styles.item}>
                    <button
                      disabled={assignment.courses && assignment.courses.includes(courseId)}
                      onClick={() => handleAssignCourse(assignment.userId._id)}
                    >
                      Назначить
                    </button>
                    <button
                      disabled={assignment.courses && !assignment.courses.includes(courseId)}
                      onClick={() => handleDeAssignCourse(assignment.userId._id)}
                    >
                      Снять с назначения
                    </button>
                  </div>
                </Fragment>
              );
            })}
          </>
        )}
      </div>
      {error && <ErrorBox message={error.message} />}
    </>
  );
}

export default AssignCourseModal;
