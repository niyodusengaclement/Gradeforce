import React, { useState, useEffect } from "react";
import qs from 'qs';
import '../assets/styles/transcript.scss';
import schoolImg from '../assets/images/skul.png';
import {connect, useSelector} from 'react-redux';
import TableRow from '../components/TableRow';
import PdfExport from '../components/PdfExport';
import { getStudents } from "../redux/actions/studentsActions";
import { useFirestoreConnect } from "react-redux-firebase";

const Transcript = (props) => {
  const [isLoading, setIsLoading] = useState('');

  const { userProfile, students } = props;
   const { studentId } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  useEffect(() => {
    props.fetchUsers();
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

  const user = students.allMembers.length > 0 ? students.allMembers.find(({id}) => id === studentId) : {};

  return (
    <div className="content transcript-panel">
      <div className="container-fluid">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 transcript">
              <table className="table table-borderless transcript-table" id="transcript">
                <tr>
                  <td colSpan={2}>
                    <img alt="" className="avatar pl-5" src={userProfile.schoolLogo ? userProfile.schoolLogo : schoolImg}/>
                    <br/>
                    <strong>{userProfile.school}</strong>  <br/>
                    <strong>P.O Box: </strong>  098 Kigali, Rwanda <br/>
                    <strong>E-mail: </strong> info@kist.com <br/>
                  </td>
                  <td colSpan={4}>
                    <strong>Name:</strong> {user.fullName}<br/>
                    <strong>Diploma: </strong>Advanced Diploma <br/>
                    <strong>Student Unique Number: </strong> {user.studentUniqueNumber}
                  </td>
                </tr>
                <tr>
                  <th className="transcript-title" colSpan={6}>Student Transcript</th>
                </tr>
                <tr>
                    <th>Course</th>
                    <th className="description-column">Description</th>
                    <th>Credit</th>
                    <th>Score</th>
                    <th>Grade</th>
                    <th>Points</th>
                </tr>
                <tbody>
                  <TableRow members={registeredMembers} studentId={studentId} SUN={user.studentUniqueNumber} />
                  <tr>
                    <td colSpan={5}>
                      {/* Authorized Signature: ____________________________________________ */}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-5" id="transcript">
                Authorized Signature: ____________________________________________
              </p>
            </div>
            <div className="col-md-2">
              <PdfExport />
            </div>
          </div>
      </div>      
    </div>
  );
};

const mapStateToProps = ({ firebase, students }) => ({
	userProfile: firebase.profile,
  students,
})

export default connect(mapStateToProps,{
  fetchUsers: getStudents,
})(Transcript);
