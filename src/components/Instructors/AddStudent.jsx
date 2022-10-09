import React, { Component } from 'react';
import StudentManagement from '../Moderator/StudentManagement';
import { getInfo } from '../helperMethods';

export default class AddStudent extends Component {
  render() {
    return (
      <>
      <StudentManagement  id={getInfo().data.InstructorId} />
      </>
    )
  }
}
