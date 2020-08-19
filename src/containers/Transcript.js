import React, { useState, useEffect } from "react";
import qs from 'qs';
import '../assets/styles/transcript.scss';
import '../assets/styles/print.scss';
import schoolImg from '../assets/images/skul.png';
import {connect, useSelector} from 'react-redux';
import TableRow from '../components/TableRow';
import { getStudents } from "../redux/actions/studentsActions";
import { useFirestoreConnect } from "react-redux-firebase";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";
import { getAllSections } from "../redux/actions/coursesActions";
import _ from "lodash";
import { Spinner } from "react-bootstrap";

const Transcript = (props) => {
  const [ totCredits, setTotCredits ] = useState(0);
  const [ totPoints, setTotPoints ] = useState(0);
  const [gradingPoints, setGradingPoints] = useState(0);
  const trElements = [];
  
  const { userProfile, students, courses } = props;
   const { studentId } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  useEffect(() => {
    props.fetchUsers();
    props.getAllSections();
  }, []);

  //Members
    useFirestoreConnect({
    collection: `members`,
  });
  const members = useSelector(({firestore}) => firestore.data.members);
  const registeredMembers = [];
  const allMembersKeys = [];

  if(members) {
    Object.entries(members).map((values) => allMembersKeys.push(values));
    const array = allMembersKeys.length > 0 ? allMembersKeys.map((arr) => {
      const value = {
        id: arr[0],
        ...arr[1]
      }
      return registeredMembers.push(value);
    }) : [];
  }
  //End Mbrs
    const elements = document.getElementsByClassName('tableRow')
    const points = [];
  useEffect(() => {
    
    for(var x=0; x < elements.length; x++)
      {
        trElements.push(elements[x]);
      }
  
      const uniqEl = _.uniqWith(trElements, _.isEqual);
  
      for(var x=0; x < uniqEl.length; x++)
      {
        points.push(+(uniqEl[x].id));
        console.log(points);
      }
    }, [totPoints]);
  const exportPdf = () => window.print();

  const trick = () => setTotPoints(11);

  const user = students.allMembers.length > 0 ? students.allMembers.find(({id}) => id === studentId) : {};
  if(!user) {
    toast.error('Student not found');
    return (
      <Dashboard />
    )
  }
  const terms = courses.sections.length > 0 ? courses.sections.map(({ semOrTrim, calendarSystem, academicYear }) => {
    const val = {
      semOrTrim,
      calendarSystem,
      academicYear,
    }
    return val; 
  }) : [];
  
  const uniqueArray = _.uniqWith(terms, _.isEqual);

  const Loading = courses.isLoading ? <Spinner
    animation="border"
    variant="primary"
    className={courses.isLoading ? 'spinner--position__center' : 'hide'}
  />
  : "No Data found";
  const handleTotal = (credits) => {
    setTotCredits(credits); 
  }
  const totalPoints = (pts) => {
  }

  const setPoints = (pts) => setGradingPoints(pts);

  const saveMe = () => {
    setPoints(_.sum(points));
    console.log(points);
    console.log(_.sum(points));
    console.log(gradingPoints);
  }

  return (
    <div className="content transcript-panel">
      <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
            <button type="button" onClick={() => trick() }>
              
            </button>
            </div>
            <div className="col-md-6 transcript" >
              <table className="table table-borderless transcript-table table-sm mt-5">
                <tr>
                  <td colSpan={2}>
                    <img alt="" className="avatar pl-5" src={userProfile.schoolLogo ? userProfile.schoolLogo : schoolImg}/>
                    <br/>
                    <strong>{userProfile.school}</strong>  <br/>
                    <strong>P.O Box: </strong>  098 Kigali, Rwanda <br/>
                    <strong>E-mail: </strong> info@kist.ac.rw <br/>
                  </td>
                  <td colSpan={5}>
                    <strong>Name:</strong> {user.fullName}<br/>
                    <strong>Diploma: </strong>Advanced Diploma <br/>
                    <strong>Student Unique Number: </strong> {user.studentUniqueNumber}
                  </td>
                </tr>
                <tr>
                  <th className="transcript-title" colSpan={7}>Student Transcript</th>
                </tr>
                <tr>
                    <th className="left-col">Course</th>
                    <th className="description-column">Description</th>
                    <th>Credits</th>
                    <th>Score</th>
                    <th>Grade</th>
                    <th>Points</th>
                    <th>GPA</th>
                </tr>
                <tbody>
                  {
                    uniqueArray.length > 0 ? uniqueArray.map((term, idx) => 
                    <TableRow key={idx} onTotalPoints={totalPoints} onHandleTotalCredits={handleTotal} sections={courses.sections} term={term} members={registeredMembers} studentId={studentId} SUN={user.studentUniqueNumber} />
                    )
                    : Loading

                  }
                  <tr>
                    <td colSpan={2}>
                      <strong>Cumulative</strong> 
                    </td>
                    <td className="numbers-cell">{totCredits}</td>
                    <td className="numbers-cell"></td>
                    <td className="numbers-cell"></td>
                    <td className="numbers-cell">{gradingPoints}</td>
                    <td className="numbers-cell">{(gradingPoints / totCredits).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-5" >
                Authorized Signature: ____________________________________________
              </p>
              <p className="footer">Powered by <strong>RWANDA EDUCATION MANAGEMENT SYSTEM</strong></p>
            </div>
            <div className="col-md-3">
            <button type="button" onClick={() => exportPdf() } className="btn-primary btn-sm mt-5">
              Print
            </button>
            <button type="button" onClick={() => saveMe() }>
              
            </button>
            </div>
          </div>
      </div>      
    </div>
  );
};

const mapStateToProps = ({ firebase, students, courses }) => ({
	userProfile: firebase.profile,
  students,
  courses,
})

export default connect(mapStateToProps,{
  fetchUsers: getStudents,
  getAllSections: getAllSections,
})(Transcript);
