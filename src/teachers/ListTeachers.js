import React  from "react";
import {
  Button
} from "reactstrap";

const  ListTeachers = (props) => {
  const {teacherList,editTeacher,setDeleteMode,setTeacherDetails} = props;
  return (
    <ul className="list-group list-group-flush border-top-0">
      {(!teacherList || teacherList) && teacherList.length < 1
      && (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div className="text-center align-items-center w-100"> No records found</div>
        </li>
      )}
      {teacherList && teacherList.length > 0 && (
        <>
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
          &nbsp;
          </li>
        <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              className={`todo-title mr-2  w-25`}
            >
            Teacher No
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
            Name
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
            Email
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
            Phone
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
            Gender
            </span>
            <span className={`todo-title mr-2 w-25`}>
            Action
            </span>
          </li>
        {teacherList && teacherList.map((school) => (
          <li
            key={school.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              className={`todo-title mr-2 w-25`}
            >
              {school.staff_number}
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
              {school.name}
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
              {school.email}
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
              {school.phone_number}
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
              {school.gender === 'M'?'Male':'Female'}
            </span>
            <span className={`todo-title mr-2 w-25`}>
              <Button
                size="sm"
                className="btn btn-secondary mr-2 "
                onClick={() => {editTeacher(school)}}
              >
                Edit
              </Button>
              <Button
                size="sm"
                className="btn btn-danger"
                onClick={() => {setDeleteMode(true);setTeacherDetails(school)}}
              >
                Delete
              </Button>
            </span>
          </li>
        ))}
        </>
      )}
       
    </ul>
  );
}
export default ListTeachers