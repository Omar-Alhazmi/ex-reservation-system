import React, { Component } from 'react'
import { getAllLabs, RemoveLabById } from '../../ApiConfig/Api';
import * as StyledTable from '../../Styles/styledTable'
import { dateFormat, timeFormat,DayIs } from '../../helperMethods';
import { MdOutlineEditCalendar, MdDeleteSweep } from 'react-icons/md';
import Swal from "sweetalert2";

export default class DisplayAllLabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        getAllLabs()
            .then((response) => {
                this.setState({ data: response.data })
            })
            .catch(error => {
                console.log(error);
                // Swal.fire({ icon: 'error', title: error });
            });
    };
    updateToggleHandler = (labIndex) => {
        const { data } = this.state
        const CurrentLab = data[labIndex]

        for (let dataTimeIndex = 0; dataTimeIndex < CurrentLab.Available.length; dataTimeIndex++) {
            let from = new Date(CurrentLab.Available[dataTimeIndex].From)
            let to = new Date(CurrentLab.Available[dataTimeIndex].To)
            from = (from.getFullYear()) + '-' + (from.getMonth() + 1) + '-' + from.getDate() + " : " + from.toString().split(" ")[4]
            to = (to.getFullYear()) + '-' + (to.getMonth() + 1) + '-' + to.getDate() + " : " + to.toString().split(" ")[4]
            CurrentLab.Available[dataTimeIndex].From = from
            CurrentLab.Available[dataTimeIndex].To = to
        }
        this.props.onNameChange(CurrentLab.LabCapacity, CurrentLab.LabId, CurrentLab.Available, CurrentLab._id)
        this.props.handelUpdate()
    }
    RemoveLab = (lab_id) => {
        RemoveLabById(lab_id)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({ icon: 'success', title: response.data.message });
                    window.location.reload(false);
                }
                else Swal.fire({ icon: 'error', title: `حدث خطا` });
            });
    };

    DeleteHandel = (labIndex) => {
        const { data } = this.state
        Swal.fire({
            title: 'تأكيد الحذف',
            text: "سيتم حذف القاعة  وجميع المواعيد المتعلقة بها نهائيا",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonColor: '#d33',
            denyButtonColor: '#3085d6',
            confirmButtonText: 'نعم, تأكيد الحذف  ',
            denyButtonText: `رجوع`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.RemoveLab(data[labIndex]._id);
            }
        })
    }

    render() {
        const { data } = this.state
        let allLabs = (
            <StyledTable.TableContainer>
                <StyledTable.TableBodyContainer>
                    <StyledTable.TableTr>
                        <StyledTable.TableTd className="tableBody"><div className="spinner tableSp">Loading...</div></StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody"><div className="spinner tableSp">Loading...</div></StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody"><div className="spinner tableSp">Loading...</div></StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody"><div className="spinner tableSp">Loading...</div></StyledTable.TableTd>
                    </StyledTable.TableTr>
                </StyledTable.TableBodyContainer>
            </StyledTable.TableContainer>
        )

        if (this.state.data.length > 0) {
            allLabs = data.map((lab, labIndex) => {
                return (
                    <StyledTable.TableWrapper key={labIndex} >
                        <StyledTable.TableContainer>
                            <StyledTable.TableHedContainer>
                                <tr>
                                    <StyledTable.TableTh className="tableHeader"> رقم القاعة</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> الطاقة الاستيعابية</StyledTable.TableTh>
                                    <StyledTable.TableTh colSpan={2}  className="tableHeader"> ادارة القاعة</StyledTable.TableTh>

                                </tr>
                            </StyledTable.TableHedContainer>
                            <StyledTable.TableBodyContainer>
                                <StyledTable.TableTd className="tableBody">{lab.LabId}</StyledTable.TableTd>
                                <StyledTable.TableTd className="tableBody">{lab.LabCapacity}</StyledTable.TableTd>
                                <StyledTable.TableTd className="tableBody table--operation--container"><div onClick={() => this.updateToggleHandler(labIndex)} className='single--icon' ><MdOutlineEditCalendar color='#00bcd4' /></div>  </StyledTable.TableTd>
                               <StyledTable.TableTd> <div onClick={() => this.DeleteHandel(labIndex)} className='single--icon'> <MdDeleteSweep color='#ff5722' /> </div></StyledTable.TableTd>
                            </StyledTable.TableBodyContainer>
                            <StyledTable.TableHedContainer>
                                <tr>
                                    <StyledTable.TableTh className="tableHeader"> اليوم</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> التاريخ</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> الوقت</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> الحالة</StyledTable.TableTh>
                                </tr>
                            </StyledTable.TableHedContainer>
                            <StyledTable.TableBodyContainer>
                                {lab.Available.map((available, AvailableIndex) => {
                                    return (
                                        <StyledTable.TableTr key={AvailableIndex}>
                                           <StyledTable.TableTd className="tableBody">{DayIs(available.From)}</StyledTable.TableTd>
                                            <StyledTable.TableTd className="tableBody date-cell">{dateFormat(available.From)}</StyledTable.TableTd>
                                            <StyledTable.TableTd className="tableBody date-cell">{`${timeFormat(available.From)} - ${timeFormat(available.To)}`}</StyledTable.TableTd>
                                            <StyledTable.TableTd className="tableBody">{(available.isAvailable) ? "متاح" : "محجوزة"}</StyledTable.TableTd>
                                        </StyledTable.TableTr>
                                    )
                                }
                                )}
                            </StyledTable.TableBodyContainer>
                        </StyledTable.TableContainer>
                    </StyledTable.TableWrapper>
                )
            }
            )
        }
        return (
            <div>
                {allLabs}
            </div>
        )
    }
}
