import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { getSubmissionsByStudentId, getAssignments } from "../redux/actions/assignmentActions";
import _ from 'lodash';

const TableRow = (props) => {
  const { userProfile, members, SUN, studentId, assignments, term, sections, onHandleTotalCredits, onTotalPoints } = props;
  useEffect(() => {
    props.getSubmissionsByStudentId(studentId)
    props.getAssignments();
  }, []);

  useFirestoreConnect({
    collection: `courses`,
  });

  const autoCapFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }

  const courses = useSelector(({firestore}) => firestore.data.courses);
  const allCourses = [];
  const allCoursesKeys = [];
  let totalCredits = 0;
  let studentTotalMax = 0;
  let assTotalMax = 0;
  let totalGradesPoints = 0;

  const handleTotalCredits = () => {
    onHandleTotalCredits(totalCredits)
  }
  
  const setTotalPoints = (tot) => {
    onTotalPoints({
      ...term,
      point: tot,
    });
  }
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
  const acceptedCourses = members.length > 0 ? members.filter(({studentUniqueNumber, status }) => studentUniqueNumber === SUN && status === 'accepted'): [];
  const enrolledIn = acceptedCourses.length > 0 ? acceptedCourses.map((obj) => {
    const crs = allCourses.length > 0 ? allCourses.find((value) => value.id === obj.courseId) : [];
    return crs;
  }) : [];

  const courseByTerm = enrolledIn.length > 0 ? enrolledIn.map((obj) => {
    const crs = sections.length > 0 ? sections.find((value) => value.courseId === obj.id) : [];
    const val = {
      ...obj,
      ...crs,
    }
    totalCredits = totalCredits + parseInt(val.credit);
    return val;
  }) : [];

  const courseMarks = (courseId) => {
    const studentsSubmissions = assignments.submissions.length > 0 ? assignments.submissions.filter((value) => value.courseId === courseId && value.studentId === studentId) : [];
    const max = studentsSubmissions.length > 0 ? studentsSubmissions.map(({grade}) => {
      return +grade;
      }) : [];

    const sum = max.reduce( (a, b) => {
    return a + b;
    }, 0);
    studentTotalMax = studentTotalMax + sum;
    return sum;
  };

  const findAssignmentMax = (courseId) => {
    const ass = assignments.values.length > 0 ? assignments.values.filter((value) => value.courseId === courseId) : [];
    const max = ass.length > 0 ? ass.map(({points}) => {
      return +points;
      }) : [];

    const sum = max.reduce( (a, b) => {
    return a + b;
    }, 0);
    assTotalMax = assTotalMax + sum;
    return sum;
  };

  const gradePoints = (credit, grade) => {
    const gradePoints = credit * grade;
    totalGradesPoints = totalGradesPoints + gradePoints;
    return gradePoints;
  }

  const publishedCourses = courseByTerm.filter(({isPublished, academicYear, semOrTrim, calendarSystem}) => isPublished && academicYear === term.academicYear && semOrTrim === term.semOrTrim && calendarSystem === term.calendarSystem);
  const findTotCreditByTerm = () => {
    const max = publishedCourses.length > 0 ? publishedCourses.map(({credit}) => {
      return +credit;
      }) : [];
    handleTotalCredits();
    const sum = max.reduce( (a, b) => {
    return a + b;
    }, 0);
    return +sum;
  };
  return (
    <>
      <tr>
        <th className="left-col" colSpan={6}>{autoCapFirstLetter(term.calendarSystem)} {term.semOrTrim} - {term.academicYear}</th>
      </tr>
      {
        publishedCourses.length > 0 ? publishedCourses.map((course, idx) =>
          <tr key={idx}>
            <td>{course.code}</td>
            <td className="description-column">{course.name}</td>
            <td className="numbers-cell">{course.credit}</td>
            <td className="numbers-cell"> {(courseMarks(course.courseId) / findAssignmentMax(course.courseId) * 100).toFixed(2) }</td>
            <td className="numbers-cell">
              {
                (courseMarks(course.courseId) / findAssignmentMax(course.courseId) * 100).toFixed(2) > 89 ? 'A' :
                (courseMarks(course.courseId) / findAssignmentMax(course.courseId) * 100).toFixed(2) > 79 ? 'B' :
                (courseMarks(course.courseId) / findAssignmentMax(course.courseId) * 100).toFixed(2) > 69 ? 'C' :
                (courseMarks(course.courseId) / findAssignmentMax(course.courseId) * 100).toFixed(2) > 59 ? 'D' :
                'F'
              }
            </td>
            <td className="numbers-cell">
              {
                (courseMarks(course.courseId) / findAssignmentMax(course.courseId) * 100).toFixed(2) > 89 ? gradePoints(course.credit, 4) :
                (courseMarks(course.courseId) / findAssignmentMax(course.courseId) * 100).toFixed(2) > 79 ? gradePoints(course.credit, 3) :
                (courseMarks(course.courseId) / findAssignmentMax(course.courseId) * 100).toFixed(2) > 69 ? gradePoints(course.credit, 2) :
                (courseMarks(course.courseId) / findAssignmentMax(course.courseId) * 100).toFixed(2) > 59 ? gradePoints(course.credit, 1)  :
                gradePoints(course.credit, 0)
              }
            </td>
          </tr>
          )
        : <tr></tr>
      }

      <tr id={totalGradesPoints} className="tableRow">
        <td colSpan={2}>
          <strong>Totals {setTotalPoints(totalGradesPoints)}</strong> 
        </td>
        <td className="numbers-cell">{findTotCreditByTerm()}</td>
        <td className="numbers-cell">{(studentTotalMax / assTotalMax * 100).toFixed(2) }</td>
        <td className="numbers-cell"></td>
        <td className="numbers-cell">{totalGradesPoints.toFixed(2)}</td>
        <td className="numbers-cell">{(totalGradesPoints / totalCredits).toFixed(2)}</td>
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
  getAssignments: getAssignments,
})(TableRow);
