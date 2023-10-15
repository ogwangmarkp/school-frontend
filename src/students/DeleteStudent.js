import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const DeleteStudent = (props) => {
    const {deleteMode,setStudentDetails,setDeleteMode,handleDelete} = props;
  return (
    <>
    <Modal
        isOpen={deleteMode}
        backdrop="static"
        className="md"
    >
        <ModalHeader>
         Delete Student Details
        </ModalHeader>
        <ModalBody>
          <span className="text-center text-danger">Are you sure you want to delete the Student details</span>
        </ModalBody>
        <ModalFooter>
            <Button
                color="primary"
                outline
                onClick={()=>{
                setDeleteMode(false);
                setStudentDetails({
                  id:0,
                  name:"",
                  gender:{ label: 'Select', value: '', key: 1 },
                  maritalstatus:{ label: 'Select', value: '', key: 1 },
                  staff_Student:{ label: 'Select', value: '', key: 1 },
                  dob:new Date(2002, 1, 1),
                  phone:'',
                  email:'',
                  identity_type:{ label: 'National Identification No (recommended)', value: 'nin', key: 2 },
                  identity_number:'',
                  occupation:'',
                  staff_number:'',
              });}}
            >
                Cancel
            </Button>
            <Button
                color="primary"
                onClick={()=> handleDelete()}
            >
              Delete
            </Button>{' '}
        </ModalFooter>
    </Modal>
    </>
  );
}
export default DeleteStudent;