import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const DeleteTeacher = (props) => {
    const {deleteMode,setTeacherDetails,setDeleteMode,handleDelete} = props;
  return (
    <>
    <Modal
        isOpen={deleteMode}
        backdrop="static"
        className="md"
    >
        <ModalHeader>
         Delete Teacher Details
        </ModalHeader>
        <ModalBody>
          <span className="text-center text-danger">Are you sure you want to delete the Teacher details</span>
        </ModalBody>
        <ModalFooter>
            <Button
                color="primary"
                outline
                onClick={()=>{
                setDeleteMode(false);
                setTeacherDetails({
                  id:0,
                  name:"",
                  gender:{ label: 'Select', value: '', key: 1 },
                  maritalstatus:{ label: 'Select', value: '', key: 1 },
                  staff_Teacher:{ label: 'Select', value: '', key: 1 },
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
export default DeleteTeacher;