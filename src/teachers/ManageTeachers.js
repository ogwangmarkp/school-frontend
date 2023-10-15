import React, { useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from "axios";
import moment from "moment"
import {BASE_URL} from '../utils'
import RegisterTeacher from "./RegisterTeacher";
import DeleteTeacher from "./DeleteTeacher";
import ListTeachers from "./ListTeachers"

const ManageTeachers = () => {
    const [schoolList, setSchoolList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [isOpen, setIsOpen] = useState('');
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [teacherDetails, setTeacherDetails] = useState({
        id:0,
        name:"",
        gender:{ label: 'Select', value: '', key: 1 },
        maritalstatus:{ label: 'Select', value: '', key: 1 },
        staff_school:{ label: 'Select', value: '', key: 1 },
        dob:new Date(2002, 1, 1),
        phone:'',
        email:'',
        identity_type:{ label: 'National Identification No (recommended)', value: 'nin', key: 2 },
        identity_number:'',
        occupation:'',
        staff_number:'',
    });
    const allGnder = [
        { label: 'Male', value: 'M', key: 1 },
        { label: 'Female', value: 'F', key: 2 },
        { label: 'Other', value: 'O', key: 2 },
    ]
    
    const AllMaritalStatuses = [
        { label: 'Single', value: 'Single', key: 1 },
        { label: 'Married', value: 'Married', key: 2 }
    ]
    
    const identityTypes = [
        { label: 'Passport No', value: 'passport', key: 1 },
        { label: 'National Identification No (recommended)', value: 'nin', key: 2 },
        { label: 'Other', value: 'other', key: 3 }
    ]

    const fetchSchoolList = () => {
        axios
          .get(`${BASE_URL}/api/schools/`)
          .then((res) =>{
            const schools = [];
            res.data.forEach(sch => {
                schools.push({
                    label: sch.name,
                    value: sch.id,
                    key: sch.id
                });
            });
            setSchoolList(schools);
          })
          .catch((err) => console.log(err));
    };

    const fetchTeacherList = () => {
        axios
          .get(`${BASE_URL}/api/staff/`)
          .then((res) =>{
            setTeacherList(res.data);
          })
          .catch((err) => console.log(err));
    };

    const toggle = (value) => {
        if(value){
            setIsOpen(value);
        }else{
            setIsOpen(value);
            setTeacherDetails({
                id:0,
                name:"",
                gender:{ label: 'Select', value: '', key: 1 },
                maritalstatus:{ label: 'Select', value: '', key: 1 },
                staff_school:{ label: 'Select', value: '', key: 1 },
                dob:new Date(2002, 1, 1),
                phone:'',
                email:'',
                identity_type:{ label: 'National Identification No (recommended)', value: 'nin', key: 2 },
                identity_number:'',
                occupation:'',
                staff_number:'',
            });
        }
        
    };

    const handleDelete = () => {
        axios.delete(`${BASE_URL}/api/staff/${teacherDetails.id}/`)
        .then((res) => {
            setDeleteMode(false);
                setTeacherDetails({
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
                fetchTeacherList();
        });
    };

    const editTeacher = (teacher) => {
       let newGender = { label: 'Select', value: '', key: -1 }
       let maritalState = { label: 'Select', value: '', key: -1 }
       let ninType = { label: 'Select', value: '', key: -1 }
       let newSch = { label: 'Select', value: '', key: -1 }
       let nin = teacher.nin
       allGnder.forEach(gender => {
            if (gender.value === teacher.gender) {
                newGender = gender;
            }
        });

        AllMaritalStatuses.forEach(status => {
            if (status.value === teacher.marital_status) {
                maritalState = status;
            }
        });

        if(teacher.passport_number){
            nin = teacher.passport_number;
            ninType =  { label: 'Passport No', value: 'passport', key: 1 }
        }else{
            ninType = { label: 'National Identification No (recommended)', value: 'nin', key: 2 }
        }

        schoolList.forEach(sch => {
            if (sch.value === teacher.staff_school) {
                newSch = sch;
            }
        });

        setEditMode(true);
        setIsOpen('EDIT');
        setTeacherDetails({
            id:teacher.id,
            name:teacher.name,
            gender:newGender,
            maritalstatus:maritalState,
            staff_school:newSch,
            dob:new Date(moment(teacher.dob).format('YYYY-MM-DD')),
            phone:teacher.phone_number,
            email:teacher.email,
            identity_type:ninType,
            identity_number:nin,
            staff_number:teacher.staff_number,
        });
   };

    useEffect(() => {
        fetchSchoolList();
        fetchTeacherList();
    }, []);

    return <>
    <div className="mt-4">
        <button
            className="btn btn-primary"
            onClick={()=>{toggle('ADD');setEditMode(false)}}
        >
            Register Teacher
        </button>
    </div>
    <RegisterTeacher
        errors = {errors}
        setErrors = {setErrors}
        isOpen={isOpen}
        editMode={editMode}
        allGnder = {allGnder}
        schoolList = {schoolList}
        AllMaritalStatuses = {AllMaritalStatuses}
        identityTypes = {identityTypes}
        teacherDetails = {teacherDetails}
        fetchTeacherList = {fetchTeacherList}
        setTeacherDetails = {setTeacherDetails}
        toggle={toggle}
    />
     <DeleteTeacher
        handleDelete = {handleDelete}
        deleteMode={deleteMode}
        setTeacherDetails={setTeacherDetails}
        setDeleteMode={setDeleteMode} 
    />
    <ListTeachers  teacherList={teacherList} editTeacher = {editTeacher} setDeleteMode={setDeleteMode} setTeacherDetails={setTeacherDetails}/>
    </> 
};
export default  ManageTeachers