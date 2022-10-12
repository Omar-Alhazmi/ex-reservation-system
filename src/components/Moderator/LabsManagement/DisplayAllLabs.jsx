import React, { Component } from 'react'
import { getAllLabs } from '../../ApiConfig/Api';
import * as StyledTable from '../../Styles/styledTable'
import { dateFormat, timeFormat } from '../../helperMethods';
import { MdOutlineEditCalendar, MdDeleteSweep } from 'react-icons/md';

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
    render() {
        const { data } = this.state
        let allLabs = (
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

        if (this.state.data.length > 0) {

            allLabs = data.map((lab, labIndex) => {
                return (
                    <StyledTable.TableWrapper key={labIndex}>
                        <StyledTable.TableContainer>
                            <StyledTable.TableHedContainer>
                                <tr>
                                    <StyledTable.TableTh className="tableHeader"> رقم القاعة</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> الطاقة الاستيعابية</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> ادارة القاعة</StyledTable.TableTh>

                                </tr>
                            </StyledTable.TableHedContainer>
                            <StyledTable.TableBodyContainer>
                                <StyledTable.TableTd className="tableBody">{lab.LabId}</StyledTable.TableTd>
                                <StyledTable.TableTd className="tableBody">{lab.LabCapacity}</StyledTable.TableTd>
                                <StyledTable.TableTd className="tableBody table--operation--container"><div><MdOutlineEditCalendar color='#00bcd4'/></div>  |  <div> <MdDeleteSweep color='#ff5722'/></div></StyledTable.TableTd>
                            </StyledTable.TableBodyContainer>
                            <StyledTable.TableHedContainer>
                                <tr>
                                    <StyledTable.TableTh className="tableHeader"> التاريخ</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> الوقت</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> الحالة</StyledTable.TableTh>

                                </tr>
                            </StyledTable.TableHedContainer>
                            <StyledTable.TableBodyContainer>
                                {lab.Available.map((available, AvailableIndex) => {
                                    return (
                                        <StyledTable.TableTr key={AvailableIndex}>
                                            <StyledTable.TableTd className="tableBody">{dateFormat(available.From)}</StyledTable.TableTd>
                                            <StyledTable.TableTd className="tableBody">{`${timeFormat(available.From)} - ${timeFormat(available.To)}`}</StyledTable.TableTd>
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
            <>
                {allLabs}
            </>
        )
    }
}
