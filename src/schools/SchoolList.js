import React  from "react";
import {
  Button
} from "reactstrap";

const  SchoolList = (props) => {
  const {schoolList,editSchool,setDeleteMode,setOrgDetails} = props;
  return (
    <ul className="list-group list-group-flush border-top-0">
      {(!schoolList || schoolList) && schoolList.length < 1
      && (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div className="text-center align-items-center w-100"> No records found</div>
        </li>
      )}
      {schoolList && schoolList.length > 0 && (
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
            Reg No
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
            School Name
            </span>
            <span
              className={`todo-title mr-2 w-25`}
            >
              School Email
            </span>
            <span className={`todo-title mr-2 w-25`}>
            Action
            </span>
          </li>
        {schoolList && schoolList.map((school) => (
          <li
            key={school.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              className={`todo-title mr-2 w-25`}
            >
              {school.registration_no}
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
            <span className={`todo-title mr-2 w-25`}>
              <Button
                size="sm"
                className="btn btn-secondary mr-2 "
                onClick={() => {editSchool(school)}}
              >
                Edit
              </Button>
              <Button
                size="sm"
                className="btn btn-danger"
                onClick={() => {setDeleteMode(true);setOrgDetails(school)}}
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
export default SchoolList