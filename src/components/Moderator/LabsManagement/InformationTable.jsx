import React, { Component } from 'react'
import * as StyledTable from '../../Styles/styledTable'
import '../../Styles/spinner.css'
import '../../Styles/chart.css'

export default class InformationTable extends Component {

    handleAppointmentDeletion = (appointmentIndex) => {
        const { data, DeleteAppointments, updateIsActive } = this.props
        if (updateIsActive) {
            const index = DeleteAppointments.indexOf(data[appointmentIndex])
            DeleteAppointments.includes(data[appointmentIndex]) ? DeleteAppointments.splice(index, 1) : DeleteAppointments.push(data[appointmentIndex])
            this.props.onNameChange(DeleteAppointments)
            console.log(DeleteAppointments);
        }
    }
    render() {
        const { LabCapacity, LabId, data } = this.props
        let allTimes = (
            <StyledTable.TableTr>
                <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
                <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
            </StyledTable.TableTr>)
        if (data) {
            if (data.length > 0) {
                allTimes = data.map((data, index) => {
                    return (
                        <StyledTable.TableTr key={index} className={(this.props.DeleteAppointments.includes(this.props.data[index])) ? "delete-appointment-clicked" : "delete-appointment"}  onClick={(this.props.updateIsActive)? () => this.handleAppointmentDeletion(index): ""}>
                            <StyledTable.TableTd className="tableBody">{data.From}</StyledTable.TableTd>
                            <StyledTable.TableTd className="tableBody">{data.To}</StyledTable.TableTd>
                        </StyledTable.TableTr>
                    )
                })
            }
        }
        return (
            <>
                <StyledTable.TableWrapper>
                    <StyledTable.TableContainer>
                        <StyledTable.TableHedContainer>
                            <StyledTable.Tr>
                                <StyledTable.TableTh className="tableHeader">رقم القاعة</StyledTable.TableTh>
                                <StyledTable.TableTh className="tableHeader">الطاقة الاستيعابية</StyledTable.TableTh>
                            </StyledTable.Tr>
                        </StyledTable.TableHedContainer>
                        <StyledTable.TableBodyContainer>
                            <StyledTable.TableTd className="tableBody">{(LabId !== "") ? LabId : <div class="spinner tableSp">Loading...</div>}</StyledTable.TableTd>
                            <StyledTable.TableTd className="tableBody">{(LabCapacity !== 0) ? LabCapacity : <div class="spinner tableSp">Loading...</div>}</StyledTable.TableTd>
                        </StyledTable.TableBodyContainer>
                        <StyledTable.TableHedContainer>
                            <StyledTable.Tr>
                                <StyledTable.TableTh className="tableHeader">بداية الفترة</StyledTable.TableTh>
                                <StyledTable.TableTh className="tableHeader">نهاية الفترة</StyledTable.TableTh>
                            </StyledTable.Tr>
                        </StyledTable.TableHedContainer>
                        <StyledTable.TableBodyContainer>
                            {allTimes}
                        </StyledTable.TableBodyContainer>
                    </StyledTable.TableContainer>
                </StyledTable.TableWrapper>
            </>
        )
    }
}
