import React, { useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from "axios";
import {BASE_URL} from '../utils'
import RegisterSchool from "./RegisterSchool";
import DeleteSchool from "./DeleteSchool";
import SchoolList from "./SchoolList"
const ManageSchool = () => {
    const [schoolList, setSchoolList] = useState([]);
    const [isOpen, setIsOpen] = useState('');
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    
    const [orgDetails, setOrgDetails] = useState({
        id: 0,
        name: '',
        short_name: '',
        city: '',
        address: '',
        email: '',
        phone_number: '',
        registration_no: '',
        region: { label: 'Select', value: '', key: -1 },
    });

    const regions = [
        {
            label: 'Central',
            value: 'Central',
            key: 0
        },
        {
            label: 'Eastern',
            value: 'Eastern',
            key: 1
        },
        {
            label: 'Western',
            value: 'Western',
            key: 2
        },
        {
            label: 'Northern',
            value: 'Northern',
            key: 3
        }
    ];
    const fetchSchoolList = () => {
        axios
          .get(`${BASE_URL}/api/schools/`)
          .then((res) => setSchoolList(res.data))
          .catch((err) => console.log(err));
    };

    const toggle = (value) => {
        if(value){
            setIsOpen(value);
        }else{
            setIsOpen(value);
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
            });
        }
        
    };

    const handleDelete = () => {
        axios.delete(`${BASE_URL}/api/schools/${orgDetails.id}/`)
        .then((res) => {
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
                });
                fetchSchoolList();
        });
    };

    const editSchool = (school) => {
       let newRegion = { label: 'Select', value: '', key: -1 }
        regions.forEach(region => {
            if (region.value === school.region) {
                newRegion = region;
            }
        });
        setEditMode(true);
        setIsOpen('EDIT');
        setOrgDetails({
            id: school.id,
            name: school.name,
            short_name: school.short_name,
            city: school.city,
            address: school.address,
            registration_no: school.registration_no,
            status:'active',
            region: newRegion,
            email: school.email,
            phone_number: school.phone_number,
        });
   };

    useEffect(() => {
        fetchSchoolList();
    }, []);

    return <>
    <div className="mt-4">
        <button
            className="btn btn-primary"
            onClick={()=>{toggle('ADD');setEditMode(false)}}
        >
            Register School
        </button>
    </div>
    <RegisterSchool
        errors = {errors}
        setErrors = {setErrors}
        isOpen={isOpen}
        editMode={editMode}
        regions = {regions}
        orgDetails = {orgDetails}
        fetchSchoolList = {fetchSchoolList}
        setOrgDetails = {setOrgDetails}
        toggle={toggle}
    />
     <DeleteSchool
        handleDelete = {handleDelete}
        deleteMode={deleteMode}
        setOrgDetails={setOrgDetails}
        setDeleteMode={setDeleteMode} 
    />
    <SchoolList  schoolList={schoolList} editSchool = {editSchool} setDeleteMode={setDeleteMode} setOrgDetails={setOrgDetails}/>
    </> 
};
export default  ManageSchool