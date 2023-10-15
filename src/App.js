import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ManageSchool from './schools/ManageSchool'
import ManageTeachers from './teachers/ManageTeachers'
import ManageStudents from './students/ManageStudents'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section:'students',
      modal:'',
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }
  displaySection = (status) => {
    return this.setState({ section:status});
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displaySection('students')}
          className={this.state.section  === 'students'? "nav-link active":"nav-link"}
        >
          Students
        </span>
        <span
          onClick={() => this.displaySection('teachers')}
          className={this.state.section  === 'teachers'? "nav-link active":"nav-link"}
        >
          Teachers
        </span>
        <span
          onClick={() => this.displaySection('schools')}
          className={this.state.section  === 'schools'? "nav-link active":"nav-link"}
        >
          Schools
        </span>
      </div>
    );
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">School System</h1>
        <div className="row">
          <div className="col-md-12 col-sm-12 mx-auto p-0">
            <div className="card p-3 tab-content">
              {this.renderTabList()}
              {this.state.section === 'schools' && <ManageSchool {...this.props}/>}
              {this.state.section === 'teachers' && <ManageTeachers {...this.props}/>}
              {this.state.section === 'students' && <ManageStudents {...this.props}/>}
              
            </div>
          </div>
        </div>
       
      </main>
    );
  }
}

export default App;