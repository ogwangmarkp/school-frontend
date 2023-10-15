import React, { useState } from "react";
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
import {BASE_URL,validateEmail} from '../utils'
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomSelectInput from '../components/CustomSelectInput'
import { Colxx} from '../components/CustomBootstrap';
import moment from 'moment';

const RegisterStudent = (props) => {
    const { isOpen,editMode,toggle,studentDetails,setStudentDetails,errors,setErrors,allGnder,AllMaritalStatuses,identityTypes,schoolList,fetchStudentList} = props;
    const [maxDate] = useState(new Date().setFullYear(new Date().getFullYear() - 15));

    const validate = () => {

        setErrors({});

        let valid = true;
        const errorDetails = {};

        if (!studentDetails.name) {
            errorDetails.name = 'Fullname  is required.';
            valid = false;
        }

        if (!studentDetails.gender.value) {
            errorDetails.gender = 'Gender is required.';
            valid = false;
        }

        if (!studentDetails.maritalstatus.value) {
            errorDetails.maritalstatus = 'Marital Status is required.';
            valid = false;
        }
        if (!studentDetails.student_school.value) {
            errorDetails.student_school = 'School is required.';
            valid = false;
        }
        
        if (!studentDetails.dob) {
            errorDetails.dob = 'Date of birth is required.';
            valid = false;
        }

        if (!studentDetails.phone) {
            errorDetails.phone = 'Primary Telephone contact is required.';
            valid = false;
        }

        if (studentDetails.phone && studentDetails.phone.length !==10) {
            errorDetails.phone = 'Invalid telephone number.';
            valid = false;
        }

        if (studentDetails.email && !validateEmail(studentDetails.email)) {
            errorDetails.email = 'Invalid email address entered.';
            valid = false;
        }

        if (!studentDetails.gender) {
            errorDetails.gender = 'Date Of Birth is required.';
            valid = false;
        }

        if (!studentDetails.student_number) {
            errorDetails.student_number = 'Student number is required.';
            valid = false;
        }
        
        setErrors(errorDetails);
        return valid;
    };


  const getInputValue = (e) => {
    // eslint-disable-next-line
    const {id,value}  = e.target;
    if (value.length > 0) {
        setErrors({...errors,[id]:undefined});
    }
    setStudentDetails({...studentDetails,[id]:value});
  };
  const saveStudentDetails = () => {
    if(validate()){
        const postData = {
            id:studentDetails.id,
            name:studentDetails.name,
            gender:studentDetails.gender.value,
            marital_status:studentDetails.maritalstatus.value,
            dob:moment(studentDetails.dob).format('YYYY-MM-DD'),
            phone_number:studentDetails.phone,
            other_phone:studentDetails.other_phone,
            email:studentDetails.email,
            identity_type:studentDetails.identity_type.value,
            nin:studentDetails.identity_type.value === 'nin'?studentDetails.identity_number:null,
            passport_number:studentDetails.identity_type.value !== 'nin'?studentDetails.identity_number:null,
            occupation:'Student',
            student_number:studentDetails.student_number.trim(),
            student_school:studentDetails.student_school.value,
        }
      if (editMode) {
          axios.put(`${BASE_URL}/api/student/${postData.id}/`, postData)
          .then(() => {
            fetchStudentList();
            toggle('');
          });
      } else {
          axios
          .post(`${BASE_URL}/api/student/`, postData)
          .then(() => {
            fetchStudentList();
            toggle('');
          });
      } 
    }
  }
  return (
     <Modal
        isOpen={isOpen==='ADD' || isOpen==='EDIT'}
        backdrop="static"
        className="modal-lg"
    >
        <ModalHeader>
            {editMode ? 'Update Student Details' : 'Register Student Details'}
        </ModalHeader>
        <ModalBody>
            <Row>
            <Colxx xxs="12" lg="6">
                <div className = "mt-2 mb-2">
                    <FormGroup>
                        <Label>
                            <span>Full Name</span>
                        </Label>
                        <Input 
                        type="text"
                        name="name"
                        id="name"
                        value={studentDetails.name}
                        onInput={getInputValue}
                        />
                        {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name}
                                </div>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <span>Gender</span>
                        </Label>
                        <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="gender"
                            id="gender"
                            value={studentDetails.gender}
                            onChange={(value) => {
                                setStudentDetails({ ...studentDetails, gender: value });
                                setErrors({
                                    ...errors,gender:undefined
                                });
                            }
                            }
                            options={allGnder}
                        />
                        {errors.gender && (
                                <div className="invalid-feedback d-block">
                                    {errors.gender}
                                </div>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <span>Marital Status</span>
                        </Label>
                        <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="gender"
                            id="gender"
                            value={studentDetails.maritalstatus}
                            onChange = {(value) => {
                                setStudentDetails({ ...studentDetails, maritalstatus: value });
                                setErrors({
                                    ...errors,maritalstatus:undefined
                                });
                            }}
                            options = {AllMaritalStatuses}
                        />
                        {errors.maritalstatus && (
                                <div className="invalid-feedback d-block">
                                    {errors.maritalstatus}
                                </div>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <span>Date of Birth</span>
                        </Label>
                        <DatePicker
                            name="dob"
                            id="dob"
                            dateFormat="yyyy-MM-dd"
                            showYearDropdown='true'
                            showMonthDropdown='true'
                            selected={studentDetails.dob}
                            maxDate={maxDate}
                            onChange={(value) => {
                                setStudentDetails({ ...studentDetails, dob: value });
                                setErrors({
                                    ...errors,dob:undefined
                                });
                            }}
                            placeholderText="Select Birthday"
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                        {errors.dob && (
                                <div className="invalid-feedback d-block">
                                    {errors.dob}
                                </div>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                    <Label>
                        <span>Identity Type</span>
                    </Label>
                    <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={studentDetails.identity_type}
                        onChange={(value) => setStudentDetails({ ...studentDetails, identity_type: value })}
                        options={identityTypes}
                    />
                    {errors.identity_type && (
                            <div className="invalid-feedback d-block">
                                {errors.identity_type}
                            </div>
                        )
                    }
                </FormGroup>
                <FormGroup>
                    <Label>
                        <span>Identity Number&nbsp;<small className='text-danger'>optional</small></span>
                    </Label>
                    <Input
                    type="text"
                    name="identity_number"
                    id="identity_number"
                    value={studentDetails.identity_number}
                    onInput={getInputValue}  />
                    {errors.identity_number && (
                            <div className="invalid-feedback d-block">
                                {errors.identity_number}
                            </div>
                        )
                    }
                </FormGroup>
                </div>
            </Colxx>
            <Colxx xxs="12" lg="6">
                <div className = "mt-2 mb-2">
                    <FormGroup>
                        <Label>
                            <span>Student Number</span>
                        </Label>
                        <Input
                        type="text"
                        name="student_number"
                        id="student_number"
                        value={studentDetails.student_number}
                        onInput={getInputValue} />
                        {errors.student_number && (
                                <div className="invalid-feedback d-block">
                                    {errors.student_number}
                                </div>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <span>Email&nbsp;<small className='text-danger'>optional</small></span>
                        </Label>
                        <Input 
                        type="text"
                        name="email"
                        id="email"
                        value={studentDetails.email}
                        onInput={getInputValue}
                        />
                        {errors.email && (
                                <div className="invalid-feedback d-block">
                                    {errors.email}
                                </div>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <span>Primary Telephone contact</span>
                        </Label>
                        <Input 
                        type="text"
                        name="phone"
                        id="phone"
                        value={studentDetails.phone}
                        onInput={getInputValue}
                        />
                        {errors.phone && (
                                <div className="invalid-feedback d-block">
                                    {errors.phone}
                                </div>
                            )
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <span>Student School</span>
                        </Label>
                        <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="student_school"
                            id="student_school"
                            value={studentDetails.student_school}
                            onChange = {(value) => {
                                setStudentDetails({ ...studentDetails, student_school: value });
                                setErrors({
                                    ...errors,student_school:undefined
                                });
                            }}
                            options = {schoolList}
                        />
                        {errors.student_school && (
                                <div className="invalid-feedback d-block">
                                    {errors.student_school}
                                </div>
                            )
                        }
                    </FormGroup>
                </div>
            </Colxx>
            </Row>
           
        </ModalBody>
        <ModalFooter>
            <Button
                color="primary"
                outline
                onClick={()=>toggle('')}
            >
                Cancel
            </Button>
            <Button
                color="primary"
                onClick={()=> saveStudentDetails()}
            >
                {editMode ? 'Update Details' : 'Save Student'}
            </Button>{' '}
        </ModalFooter>
    </Modal>
  );
}
export default RegisterStudent;