import React, { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import "../assets/styles/main.scss";
import Select from 'react-select';
import { Spinner } from "react-bootstrap";
import { getProfile } from "../helpers/utils";
import { connect } from "react-redux";
import { getStudents } from "../redux/actions/studentsActions";
import { Link } from 'react-router-dom';


const Dashboard = (props) => {
  const [ student, setStudent ] = useState('');
  useEffect(() => {
    props.fetchUsers();
  }, []);

  const { members } = props;
  const allStudents = members.allMembers.length > 0 
  ? members.allMembers.filter(({ role }) => role === 'student').map(({ id, studentUniqueNumber, fullName}) => {
    const object = {
      value: id,
      label: `${fullName} (${studentUniqueNumber})`,
    }
    return object;
  })
  : [];
  return (
    <div className="wrapper">
      <TopHeader page='Dashboard' />
        <div className="main-panel">
          <div className="content">
            <div className="container-fluid">
              <div className="inline-search">
                <div className="search-select">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="sections"
                    value={student}
                    onChange={setStudent}
                    options={allStudents}
                    isSearchable={true}
                    isClearable={true}
                    isLoading= {members.isLoading ? true : false}
                  />
                </div>
                  {
                    student ?
                    <Link target="_blank" to={`/transcript?studentId=${student.value}`}>
                      <button type="button" className="btn-primary btn-sm">Generate</button>
                    </Link>
                    : null
                  }
              </div>
            </div>
          </div>
        </div>    
    </div>
  );
};

const mapState = ({ students }) => ({
  members: students,
})
export default connect(mapState, {
  fetchUsers: getStudents,
})(Dashboard);