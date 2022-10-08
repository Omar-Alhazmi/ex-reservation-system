import React, { Component } from 'react'
import * as StyledTable from '../../Styles/styledTable'
import '../../Styles/spinner.css'
import '../../Styles/chart.css'

export default class InformationTable extends Component {
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
                        <StyledTable.TableTr key={index}>
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
                            <tr>
                                <StyledTable.TableTh className="tableHeader">رقم القاعة</StyledTable.TableTh>
                                <StyledTable.TableTh className="tableHeader">الطاقة الاستيعابية</StyledTable.TableTh>
                            </tr>
                        </StyledTable.TableHedContainer>
                        <StyledTable.TableBodyContainer>
                            <StyledTable.TableTd className="tableBody">{(LabId !== "")?LabId:<div class="spinner tableSp">Loading...</div>}</StyledTable.TableTd>
                            <StyledTable.TableTd className="tableBody">{(LabCapacity !== 0)?LabCapacity:<div class="spinner tableSp">Loading...</div>}</StyledTable.TableTd>
                        </StyledTable.TableBodyContainer>
                        <StyledTable.TableHedContainer>
                            <tr>
                                <StyledTable.TableTh className="tableHeader">بداية الفترة</StyledTable.TableTh>
                                <StyledTable.TableTh className="tableHeader">نهاية الفترة</StyledTable.TableTh>
                            </tr>
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
