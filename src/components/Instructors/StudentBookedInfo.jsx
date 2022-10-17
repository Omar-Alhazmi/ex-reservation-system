import React, { Component } from 'react'
import * as StyledTable from '../Styles/styledTable'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import font from './Amiri-Regular-normal.js';
export default class StudentBookedInfo extends Component {
    saveFileHandler = () => {
        const doc = new jsPDF()
        doc.getFontList();
        doc.addFileToVFS('Amiri-Regular-normal.ttf', font);
        doc.addFont('Amiri-Regular-normal.ttf', 'Amiri-Regular', 'normal');
        doc.setFont('Amiri-Regular')
        autoTable(doc, {
            head: [['تسيسيتن', 'طذنتظطذنت', 'نتظذنتظ']],
            body: [
                ['ذظط', 'سشيشسيشس', 'طظذظطذ'],
                ['Castille', 'castille@example.com', 'Spain'],
                // ...
            ],
        })
        doc.save('table.pdf')

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
                        <StyledTable.TableTd className="tableBody">{"  \t\t\t \t "}</StyledTable.TableTd>
                    </StyledTable.TableTr>
                )
            })
        }

        return (
            <StyledTable.TableWrapper>
                <button onClick={() => this.saveFileHandler()}> click me</button>
                <StyledTable.TableContainer id='studentTable'>
                    <StyledTable.TableHedContainer>
                    </StyledTable.TableHedContainer>
                    <StyledTable.TableHedContainer>
                        <tr>
                            <StyledTable.TableTh className="tableHeader">{" "}</StyledTable.TableTh>
                            <StyledTable.TableTh className="tableHeader">  الرقم الاكاديمي</StyledTable.TableTh>
                            <StyledTable.TableTh className="tableHeader"> اسم المتدرب</StyledTable.TableTh>
                            <StyledTable.TableTh className="tableHeader">{"\t التوقيع"}</StyledTable.TableTh>

                        </tr>
                    </StyledTable.TableHedContainer>
                    <StyledTable.TableBodyContainer>
                        {allStudents}
                    </StyledTable.TableBodyContainer>
                </StyledTable.TableContainer>
            </StyledTable.TableWrapper >
        )
    }
}