import React, { Component } from 'react'
import '../Styles/chart.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getAllLabs, getInstructors, getAllDivision, RemoveCollections, DownloadExcel,expiredAppointment } from '../ApiConfig/Api'
import SummaryTable from './SummaryTable';
import Swal from "sweetalert2";
import { AcReButton, ButtonContainer } from '../Styles/styledTable'
import { saveAs } from 'file-saver';

import { LabelContainer, LabelCard, CardHeadLine, ChartContainer, LabelsContainer, DoughnutContainer, CardParagraph, DoughnutContainerLear2, DoughnutTitle } from '../Styles/StyledChart'
ChartJS.register(ArcElement, Tooltip, Legend);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AvailableLab: 0,
      BookedLab: 0,
      Labs: [],
      Instructors: [],
      StudentCount: 0,
      DivisionCount: [],
    }
  }
  componentDidMount() {
    this.getLabs();
    this.getAllInstructors();
    this.getDivisions();
    expiredAppointment()
  }

  getDivisions() {
    getAllDivision()
      .then((response) => {
        let StudentCount = 0;
        for (let currentDivision = 0; currentDivision < response.data.length; currentDivision++) {
          StudentCount += response.data[currentDivision].StudentCount;
        }
        this.setState({ DivisionCount: response.data, StudentCount: StudentCount, div: response.data });
      })
      .catch((error) => {
      })
  }
  getAllInstructors() {
    getInstructors()
      .then((response) => {
        this.setState({ Instructors: response.data });
      })
      .catch((error) => {
      })
  }
  getLabs() {
    getAllLabs()
      .then((response) => {
        let AvailableLab = 0, BookedLab = 0
        for (let labIndex = 0; labIndex < response.data.length; labIndex++) {
          for (let currentLab = 0; currentLab < response.data[labIndex].Available.length; currentLab++) {
            (response.data[labIndex].Available[currentLab].isAvailable) ? AvailableLab++ : BookedLab++
          }
        }
        this.setState({ AvailableLab, BookedLab, Labs: response.data });
      })
      .catch((error) => {
      })
  }
  newSemester = () => {
    RemoveCollections()
      .then(response => {
        if (response.status === 200) {
          Swal.fire({ icon: 'success', title: response.data.message });
          window.location.reload(false);
        }
        else Swal.fire({ icon: 'error', title: `حدث خطا` });
      })
      .catch(error => {
        Swal.fire({ icon: 'error', title: `حدث خطا` });
      })
  }
  DownloadData = async () => {
    const { Labs, Instructors, DivisionCount } = this.state
    if ((DivisionCount.length === 0 && Instructors.length === 0) || (Labs.length === 0 && DivisionCount.length === 0)) {
      Swal.fire({ icon: 'error', title: ` لا يوجد بينات لتحميلها` });
    } else {
      await DownloadExcel()
        .then(response => {
          const fileName = response.headers['content-disposition'].split('"')[1];
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, fileName);
        })
        .catch(error => {
          Swal.fire({ icon: 'error', title: `حدث خطا` });
        })
    }
  }
  semesterWorkHandle = () => {
    const { Labs, Instructors, DivisionCount } = this.state
    if ((DivisionCount.length === 0 && Instructors.length === 0) || (Labs.length === 0 && DivisionCount.length === 0)) {
      Swal.fire({ icon: 'error', title: ` لا يوجد بينات لحذفها` });
    }
    else Swal.fire({
      title: 'تحذير',
      text: " سيتم حذف جميع بيانات النظام نهائيا",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#d33',
      denyButtonColor: '#3085d6',
      confirmButtonText: 'نعم, تأكيد الحذف  ',
      denyButtonText: `رجوع`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.newSemester();
      }
    })
  }
  DownloadDataAndDelete = () => {
    const { Labs, Instructors, DivisionCount } = this.state
    if ((DivisionCount.length === 0 && Instructors.length === 0) || (Labs.length === 0 && DivisionCount.length === 0)) {
      Swal.fire({ icon: 'error', title: ` لا يوجد بينات لحذفها` });
    }
    else Swal.fire({
      title: 'تحذير',
      text: "سيتم تحيل قاعدة البيانات و حذف جميع بيانات النظام نهائيا",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#d33',
      denyButtonColor: '#3085d6',
      confirmButtonText: 'نعم, تأكيد الحذف  ',
      denyButtonText: `رجوع`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.DownloadData();
        this.newSemester();
      }
    })
  }
  render() {
    const { AvailableLab, BookedLab, Instructors, StudentCount, DivisionCount, Labs } = this.state

    const genderData = {
      labels: [`متاح ${AvailableLab}`
        , `محجوز ${BookedLab}`],
      datasets: [
        {
          data: [AvailableLab, BookedLab],
          backgroundColor: [
            '#528fa7',
            '#ff5722',

          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <div className="chartBar">
          <div className="chartDiscretion">
            احصائيات
          </div>
          <ChartContainer>
            <DoughnutContainer>
              {AvailableLab === 0 && BookedLab === 0 ? <div className="spinner">Loading...</div> :
                <DoughnutContainerLear2>
                  <DoughnutTitle>نسبة حجز القاعات</DoughnutTitle>
                  <Doughnut data={genderData} />
                </DoughnutContainerLear2>
              }
            </DoughnutContainer>
            <LabelsContainer>
              <LabelContainer>
                <LabelCard white colorIs green={true} yellowLine={true}>
                  <CardHeadLine white>
                    مجموع المدربين
                  </CardHeadLine>
                  <CardParagraph>
                    {Instructors.length === 0 ? <div className="spinner">Loading...</div> :
                      Instructors.length}
                  </CardParagraph>
                </LabelCard>
              </LabelContainer>
              <LabelContainer>
                <LabelCard white colorIs gray={true} blueLine={true}>
                  <CardHeadLine white>
                    مجموع المتدربين
                  </CardHeadLine>
                  <CardParagraph>
                    {StudentCount === 0 ? <div className="spinner">Loading...</div> :
                      StudentCount}
                  </CardParagraph>
                </LabelCard>
              </LabelContainer>
              <LabelContainer>
                <LabelCard white colorIs darkBlue={true} greenLine={true}>
                  <CardHeadLine white>
                    مجموع القاعات المسجلة
                  </CardHeadLine>
                  <CardParagraph>
                    {Labs.length === 0 ? <div className="spinner">Loading...</div> :
                      Labs.length}
                  </CardParagraph>
                </LabelCard>
              </LabelContainer>
              <LabelContainer>
                <LabelCard white colorIs darkGreen={true} orangeLine={true}>
                  <CardHeadLine white>
                    مجموع الشعب
                  </CardHeadLine>
                  <CardParagraph>
                    {DivisionCount.length === 0 ? <div className="spinner">Loading...</div> :
                      DivisionCount.length}
                  </CardParagraph>
                </LabelCard>
              </LabelContainer>
            </LabelsContainer>
          </ChartContainer>
        </div>
        <SummaryTable data={Instructors} />
        <ButtonContainer>
          <AcReButton Blue={true} onClick={() => this.DownloadData()}> تحميل الملفات  </AcReButton>
          <AcReButton halfBlue={true} onClick={() => this.DownloadDataAndDelete()}> تحميل الملفات وحذف البيانات </AcReButton>
          <AcReButton onClick={() => this.semesterWorkHandle()}>حذف جميع البيانات </AcReButton>
        </ButtonContainer>
      </div>
    )
  }
}
