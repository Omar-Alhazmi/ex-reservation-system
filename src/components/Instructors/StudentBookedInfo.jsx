import React, { Component } from 'react'
import * as StyledTable from '../Styles/styledTable'
import PrintStudentTable from './PrintStudentTable'
import { examDuration } from '../helperMethods';
import ReactToPrint from "react-to-print";
import '../Styles/printStyle.css'
import { FcPrint } from 'react-icons/fc';
export default class StudentBookedInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggle: false
        }
    }
    saveFileHandler = () => {
        this.setState({ toggle: !this.state.toggle })
    }

    render() {
        let allStudents = (
            <StyledTable.TableContainer>
                <StyledTable.TableBodyContainer>
                    <StyledTable.TableTr>
                        <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
                    </StyledTable.TableTr>
                </StyledTable.TableBodyContainer>
            </StyledTable.TableContainer>
        )
        if (this.props.data.Student.length > 0) {
            allStudents = this.props.data.Student.map((currentStudent, currentStudentIndex) => {
                return (
                    <StyledTable.TableTr key={currentStudentIndex}>
                        <StyledTable.TableTd className="tableBody">{currentStudentIndex + 1}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody">{currentStudent.StudentId}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody">{currentStudent.FullName}</StyledTable.TableTd>
                    </StyledTable.TableTr>
                )
            })
        }

        return (
            <>
                <div className='print--icon--container'>
                    <ReactToPrint
                        trigger={() => <FcPrint className='print--icon' />}
                        content={() => this.componentRef}
                    />
                    <PrintStudentTable ref={el => (this.componentRef = el)} student={this.props.data.Student} subject={this.props.data.For} duration={examDuration(this.props.data.From, this.props.data.To)} />
                </div>
                <StyledTable.TableWithTitleWrapper>
                <StyledTable.TableWrapper>
                    <StyledTable.TableContainer id='studentTable'>
                        <StyledTable.TableHedContainer>
                            <StyledTable.Tr>
                                <StyledTable.TableTh className="tableHeader">{" "}</StyledTable.TableTh>
                                <StyledTable.TableTh className="tableHeader">  الرقم الاكاديمي</StyledTable.TableTh>
                                <StyledTable.TableTh className="tableHeader"> اسم المتدرب</StyledTable.TableTh>
                            </StyledTable.Tr>
                        </StyledTable.TableHedContainer>
                        <StyledTable.TableBodyContainer>
                            {allStudents}
                        </StyledTable.TableBodyContainer>
                    </StyledTable.TableContainer>
                </StyledTable.TableWrapper >
                </StyledTable.TableWithTitleWrapper>
            </>
        )
    }
}