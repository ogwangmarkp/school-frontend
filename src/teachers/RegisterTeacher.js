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

const RegisterTeacher = (props) => {
    const { isOpen,editMode,toggle,teacherDetails,setTeacherDetails,errors,setErrors,allGnder,AllMaritalStatuses,identityTypes,schoolList,fetchTeacherList} = props;
    const [maxDate] = useState(new Date().setFullYear(new Date().getFullYear() - 15));

    const validate = () => {

        setErrors({});

        let valid = true;
        const errorDetails = {};

        if (!teacherDetails.name) {
            errorDetails.name = 'Fullname  is required.';
            valid = false;
        }

        if (!teacherDetails.gender.value) {
            errorDetails.gender = 'Gender is required.';
            valid = false;
        }

        if (!teacherDetails.maritalstatus.value) {
            errorDetails.maritalstatus = 'Marital Status is required.';
            valid = false;
        }
        if (!teacherDetails.staff_school.value) {
            errorDetails.staff_school = 'School is required.';
            valid = false;
        }
        
        if (!teacherDetails.dob) {
            errorDetails.dob = 'Date of birth is required.';
            valid = false;
        }

        if (!teacherDetails.phone) {
            errorDetails.phone = 'Primary Telephone contact is required.';
            valid = false;
        }

        if (teacherDetails.phone && teacherDetails.phone.length !==10) {
            errorDetails.phone = 'Invalid telephone number.';
            valid = false;
        }

        if (teacherDetails.email && !validateEmail(teacherDetails.email)) {
            errorDetails.email = 'Invalid email address entered.';
            valid = false;
        }

        if (!teacherDetails.gender) {
            errorDetails.gender = 'Date Of Birth is required.';
            valid = false;
        }

        if (!teacherDetails.staff_number) {
            errorDetails.staff_number = 'Teacher Staff number is required.';
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
    setTeacherDetails({...teacherDetails,[id]:value});
  };
  const saveTeacherDetails = () => {
    if(validate()){
        const postData = {
            id:teacherDetails.id,
            name:teacherDetails.name,
            gender:teacherDetails.gender.value,
            marital_status:teacherDetails.maritalstatus.value,
            dob:moment(teacherDetails.dob).format('YYYY-MM-DD'),
            phone_number:teacherDetails.phone,
            other_phone:teacherDetails.other_phone,
            email:teacherDetails.email,
            identity_type:teacherDetails.identity_type.value,
            nin:teacherDetails.identity_type.value === 'nin'?teacherDetails.identity_number:null,
            passport_number:teacherDetails.identity_type.value !== 'nin'?teacherDetails.identity_number:null,
            occupation:'Teacher',
            staff_number:teacherDetails.staff_number.trim(),
            staff_school:teacherDetails.staff_school.value,
        }
      if (editMode) {
          axios.put(`${BASE_URL}/api/staff/${postData.id}/`, postData)
          .then(() => {
            fetchTeacherList();
            toggle('');
          });
      } else {
          axios
          .post(`${BASE_URL}/api/staff/`, postData)
          .then(() => {
            fetchTeacherList();
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
            {editMode ? 'Update Teacher Details' : 'Register Teacher Details'}
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
                        value={teacherDetails.name}
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
                            value={teacherDetails.gender}
                            onChange={(value) => {
                                setTeacherDetails({ ...teacherDetails, gender: value });
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
                            value={teacherDetails.maritalstatus}
                            onChange = {(value) => {
                                setTeacherDetails({ ...teacherDetails, maritalstatus: value });
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
                            selected={teacherDetails.dob}
                            maxDate={maxDate}
                            onChange={(value) => {
                                setTeacherDetails({ ...teacherDetails, dob: value });
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
                        value={teacherDetails.identity_type}
                        onChange={(value) => setTeacherDetails({ ...teacherDetails, identity_type: value })}
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
                    value={teacherDetails.identity_number}
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
                            <span>Staff Number</span>
                        </Label>
                        <Input
                        type="text"
                        name="staff_number"
                        id="staff_number"
                        value={teacherDetails.staff_number}
                        onInput={getInputValue} />
                        {errors.staff_number && (
                                <div className="invalid-feedback d-block">
                                    {errors.staff_number}
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
                        value={teacherDetails.email}
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
                        value={teacherDetails.phone}
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
                            <span>Teacher School</span>
                        </Label>
                        <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="staff_school"
                            id="staff_school"
                            value={teacherDetails.staff_school}
                            onChange = {(value) => {
                                setTeacherDetails({ ...teacherDetails, staff_school: value });
                                setErrors({
                                    ...errors,staff_school:undefined
                                });
                            }}
                            options = {schoolList}
                        />
                        {errors.staff_school && (
                                <div className="invalid-feedback d-block">
                                    {errors.staff_school}
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
                onClick={()=> saveTeacherDetails()}
            >
                {editMode ? 'Update Details' : 'Save Teacher'}
            </Button>{' '}
        </ModalFooter>
    </Modal>
  );
}
export default RegisterTeacher;