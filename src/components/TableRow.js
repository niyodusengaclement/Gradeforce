import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { getSubmissionsByStudentId, getAssignments } from "../redux/actions/assignmentActions";
import _ from 'lodash';

const TableRow = (props) => {
  const { userProfile, members, SUN, studentId, assignments } = props;
  useEffect(() => {
    props.getSubmissionsByStudentId(studentId)
    props.getAssignments();
  }, []);

  useFirestoreConnect({
    collection: `courses`,
  });

  const courses = useSelector(({firestore}) => firestore.data.courses);
  const allCourses = [];
  const allCoursesKeys = [];
  let totalCredits = 0;
  let studentTotalMax = 0;

  if(courses) {
    Object.entries(courses).map((values) => allCoursesKeys.push(values));
    const array = allCoursesKeys.length > 0 ? allCoursesKeys.map((arr) => {
      const value = {
        id: arr[0],
        ...arr[1]
      }
      return allCourses.push(value);
    }) : [];
  }
  console.log(assignments)
  const acceptedCourses = members.length > 0 ? members.filter(({studentUniqueNumber, status}) => studentUniqueNumber === SUN && status === 'accepted'): [];
  const enrolledIn = acceptedCourses.length > 0 ? acceptedCourses.map((obj) => {
    const crs = allCourses.length > 0 ? allCourses.find((value) => value.id === obj.courseId) : [];
    totalCredits = totalCredits + parseInt(crs.credit);
    return crs;
  }) : [];

  const courseMarks = (courseId) => {
    const studentsSubmissions = assignments.submissions.length > 0 ? assignments.submissions.filter((value) => value.courseId === courseId && value.studentId === studentId) : [];
    const max = studentsSubmissions.length > 0 ? studentsSubmissions.map(({grade, assignmentId}) => {
      console.log('asss', findAssignmentMax(assignmentId));
      return +grade;
      }) : [];

    const sum = max.reduce( (a, b) => {
    return a + b;
    }, 0);
    studentTotalMax = studentTotalMax + sum;
    return sum;
  };

  const findAssignmentMax = (assId) => {
    const ass = assignments.values.length > 0 ? assignments.values.find((value) => value.id === assId) : {};
    const max = ass ? ass.points : 0;
    return max;
  };

  const publishedCourses = enrolledIn.filter(({isPublished}) => isPublished);
  return (
    <>
      <tr>
        <th colSpan={6}>Trimestre 1 - 2019/2020</th>
      </tr>
      {
        publishedCourses.length > 0 ? publishedCourses.map((course, idx) =>
          <tr key={idx}>
            <td>{course.code}</td>
            <td className="description-column">{course.name}</td>
            <td>{course.credit}</td>
            <td>{courseMarks(course.id)}</td>
            <td>D+</td>
            <td>81</td>
          </tr>
          )
        : <tr></tr>
      }

      <tr>
        <td colSpan={2}>
          <strong>Totals</strong> 
        </td>
        <td>{totalCredits}</td>
        <td>{studentTotalMax}</td>
        <td></td>
        <td>81</td>
      </tr>
      <tr>
        <td colSpan={2}>
          <strong>GPA</strong> 
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>3.1</td>
      </tr>
    </>
  );
};

const mapStateToProps = ({ firebase, assignments }) => ({
	userProfile: firebase.profile,
  assignments,
})

export default connect(mapStateToProps, {
  getSubmissionsByStudentId: getSubmissionsByStudentId,
  getAssignments: getAssignments
})(TableRow);
