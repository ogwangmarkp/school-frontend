import React from "react";
import {
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
import CustomSelectInput from '../components/CustomSelectInput'

const RegisterSchool = (props) => {
    const { isOpen,editMode,toggle,orgDetails,setOrgDetails,errors,setErrors,regions,fetchSchoolList} = props;
    
    const validate = () => {
      let valid = true;
      const errorDetails = {};
      setErrors({});
      if (!orgDetails.name) {
          errorDetails.name = 'School name is required.';
          valid = false;
      }

      if (!orgDetails.short_name) {
          errorDetails.short_name = 'School short name is required.';
          valid = false;
      }

      if (!orgDetails.registration_no) {
          errorDetails.registration_no = 'School registration no. is required.';
          valid = false;
      }

      if (!orgDetails.city) {
          errorDetails.city = 'School city is required.';
          valid = false;
      }
      if (!orgDetails.address) {
          errorDetails.address = 'Address is required.';
          valid = false;
      }
      if (!orgDetails.email) {
        errorDetails.email = 'Email Address is required.';
        valid = false;
      }
      if (orgDetails.email && !validateEmail(orgDetails.email)) {
        errorDetails.email = 'Invalid email address entered.';
        valid = false;
    }
      if (!orgDetails.region.value) {
          errorDetails.region = 'Region is required.';
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
    setOrgDetails({...orgDetails,[id]:value});
  };

  const saveSchoolDetails = () => {
    if(validate()){
      if (editMode) {
          orgDetails.region = orgDetails.region.value;
          orgDetails.status = 'active';
          axios.put(`${BASE_URL}/api/schools/${orgDetails.id}/`, orgDetails)
          .then(() => {
            fetchSchoolList();
            toggle('');
          });
      } else {
          orgDetails.region = orgDetails.region.value;
          orgDetails.status = 'active';
          axios
          .post(`${BASE_URL}/api/schools/`, orgDetails)
          .then(() => {
            fetchSchoolList();
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
            {editMode ? 'Update School Details' : 'Register School Details'}
        </ModalHeader>
        <ModalBody>
            <FormGroup>
                <Label for="school_name">
                    <span>school Name</span>
                </Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    value={orgDetails.name}
                    onInput={getInputValue}
                />
                {errors.name && (
                    <div className="invalid-feedback d-block">
                        {errors.name}
                    </div>
                )}
            </FormGroup>
            <FormGroup>
                <Label for="short_name">
                    <span>Short Name</span>
                </Label>
                <Input
                    type="text"
                    name="short_name"
                    id="short_name"
                    value={orgDetails.short_name}
                    onInput={getInputValue}
                />
                {errors.short_name && (
                    <div className="invalid-feedback d-block">
                        {errors.short_name}
                    </div>
                )}
            </FormGroup>
            <FormGroup>
                <Label for="registration_no">
                    <span>Registration No.</span>
                </Label>
                <Input
                    type="text"
                    name="registration_no"
                    id="registration_no"
                    value={orgDetails.registration_no}
                    onInput={getInputValue}
                />
                {errors.registration_no && (
                    <div className="invalid-feedback d-block">
                        {errors.registration_no}
                    </div>
                )}
            </FormGroup>
            <FormGroup>
                <Label for="city">
                    <span>City</span>
                </Label>
                <Input
                    type="text"
                    name="city"
                    id="city"
                    value={orgDetails.city}
                    onInput={getInputValue}
                />
                {errors.city && (
                    <div className="invalid-feedback d-block">
                        {errors.city}
                    </div>
                )}
            </FormGroup>
            <FormGroup>
                <Label for="address">
                    <span>Address</span>
                </Label>
                <Input
                    type="textarea"
                    name="address"
                    id="address"
                    rows="5"
                    value={orgDetails.address}
                    onInput={getInputValue}
                />
                {errors.address && (
                    <div className="invalid-feedback d-block">
                        {errors.address}
                    </div>
                )}
            </FormGroup>
            <FormGroup>
                <Label for="Email">
                    <span>Email</span>
                </Label>
                <Input
                    type="text"
                    name="email"
                    id="email"
                    value={orgDetails.email}
                    onInput={getInputValue}
                />
                {errors.email && (
                    <div className="invalid-feedback d-block">
                        {errors.email}
                    </div>
                )}
            </FormGroup>
            <FormGroup>
                <Label for="Phone Number">
                    <span>Phone Number</span>
                </Label>
                <Input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    value={orgDetails.phone_number}
                    onInput={getInputValue}
                />
                {errors.phone_number && (
                    <div className="invalid-feedback d-block">
                        {errors.phone_number}
                    </div>
                )}
            </FormGroup>
            <FormGroup>
                <Label className="mt-4" for="region">
                    <span>Region</span>
                </Label>
                <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="region"
                    id="region"
                    options={regions}
                    value={orgDetails.region}
                    onChange={(value) => {setOrgDetails({ ...orgDetails, region: value });  setErrors({...errors,region:undefined})}}
                />
                {errors.region && (
                    <div className="invalid-feedback d-block">
                        {errors.region}
                    </div>
                )}
            </FormGroup>
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
                onClick={()=> saveSchoolDetails()}
            >
                {editMode ? 'Update Details' : 'Save school'}
            </Button>{' '}
        </ModalFooter>
    </Modal>
  );
}
export default RegisterSchool;