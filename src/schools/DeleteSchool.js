import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const DeleteSchool = (props) => {
    const {deleteMode,setOrgDetails,setDeleteMode,handleDelete} = props;
  return (
    <>
    <Modal
        isOpen={deleteMode}
        backdrop="static"
        className="md"
    >
        <ModalHeader>
         Delete School Details
        </ModalHeader>
        <ModalBody>
          <span className="text-center text-danger">Are you sure you want to delete the school details</span>
        </ModalBody>
        <ModalFooter>
            <Button
                color="primary"
                outline
                onClick={()=>{
                setDeleteMode(false);
                setOrgDetails({
                    id: 0,
                    name: '',
                    short_name: '',
                    city: '',
                    address: '',
                    email: '',
                    phone_number: '',
                    registration_no: '',
                    region: { label: 'Select', value: '', key: -1 },
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
export default DeleteSchool;