import React, { useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from "axios";
import moment from "moment"
import {BASE_URL} from '../utils'
import RegisterStudent from "./RegisterStudent";
import DeleteStudent from "./DeleteStudent";
import ListStudents from "./ListStudents"

const ManageStudents = () => {
    const [schoolList, setSchoolList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [isOpen, setIsOpen] = useState('');
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [studentDetails, setStudentDetails] = useState({
        id:0,
        name:"",
        gender:{ label: 'Select', value: '', key: 1 },
        maritalstatus:{ label: 'Select', value: '', key: 1 },
        student_school:{ label: 'Select', value: '', key: 1 },
        dob:new Date(2002, 1, 1),
        phone:'',
        email:'',
        identity_type:{ label: 'National Identification No (recommended)', value: 'nin', key: 2 },
        identity_number:'',
        occupation:'',
        student_number:'',
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

    const fetchStudentList = () => {
        axios
          .get(`${BASE_URL}/api/student/`)
          .then((res) =>{
            setStudentList(res.data);
          })
          .catch((err) => console.log(err));
    };

    const toggle = (value) => {
        if(value){
            setIsOpen(value);
        }else{
            setIsOpen(value);
            setStudentDetails({
                id:0,
                name:"",
                gender:{ label: 'Select', value: '', key: 1 },
                maritalstatus:{ label: 'Select', value: '', key: 1 },
                student_school:{ label: 'Select', value: '', key: 1 },
                dob:new Date(2002, 1, 1),
                phone:'',
                email:'',
                identity_type:{ label: 'National Identification No (recommended)', value: 'nin', key: 2 },
                identity_number:'',
                occupation:'',
                student_number:'',
            });
        }
        
    };

    const handleDelete = () => {
        axios.delete(`${BASE_URL}/api/student/${studentDetails.id}/`)
        .then((res) => {
            setDeleteMode(false);
                setStudentDetails({
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
                fetchStudentList();
        });
    };

    const editStudent = (student) => {
       let newGender = { label: 'Select', value: '', key: -1 }
       let maritalState = { label: 'Select', value: '', key: -1 }
       let ninType = { label: 'Select', value: '', key: -1 }
       let newSch = { label: 'Select', value: '', key: -1 }
       let nin = student.nin
       allGnder.forEach(gender => {
            if (gender.value === student.gender) {
                newGender = gender;
            }
        });

        AllMaritalStatuses.forEach(status => {
            if (status.value === student.marital_status) {
                maritalState = status;
            }
        });

        if(student.passport_number){
            nin = student.passport_number;
            ninType =  { label: 'Passport No', value: 'passport', key: 1 }
        }else{
            ninType = { label: 'National Identification No (recommended)', value: 'nin', key: 2 }
        }

        schoolList.forEach(sch => {
            if (sch.value === student.student_school) {
                newSch = sch;
            }
        });

        setEditMode(true);
        setIsOpen('EDIT');
        setStudentDetails({
            id:student.id,
            name:student.name,
            gender:newGender,
            maritalstatus:maritalState,
            student_school:newSch,
            dob:new Date(moment(student.dob).format('YYYY-MM-DD')),
            phone:student.phone_number,
            email:student.email,
            identity_type:ninType,
            identity_number:nin,
            student_number:student.student_number,
        });
   };

    useEffect(() => {
        fetchSchoolList();
        fetchStudentList();
    }, []);

    return <>
    <div className="mt-4">
        <button
            className="btn btn-primary"
            onClick={()=>{toggle('ADD');setEditMode(false)}}
        >
            Register Student
        </button>
    </div>
    <RegisterStudent
        errors = {errors}
        setErrors = {setErrors}
        isOpen={isOpen}
        editMode={editMode}
        allGnder = {allGnder}
        schoolList = {schoolList}
        AllMaritalStatuses = {AllMaritalStatuses}
        identityTypes = {identityTypes}
        studentDetails = {studentDetails}
        fetchStudentList = {fetchStudentList}
        setStudentDetails = {setStudentDetails}
        toggle={toggle}
    />
     <DeleteStudent
        handleDelete = {handleDelete}
        deleteMode={deleteMode}
        setStudentDetails={setStudentDetails}
        setDeleteMode={setDeleteMode} 
    />
    <ListStudents  studentList={studentList} editStudent = {editStudent} setDeleteMode={setDeleteMode} setStudentDetails={setStudentDetails}/>
    </> 
};
export default  ManageStudents