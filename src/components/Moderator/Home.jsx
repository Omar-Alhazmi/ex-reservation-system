import React, { Component } from 'react'
import '../Styles/chart.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getAllLabs, getInstructors, getAllDivision } from '../ApiConfig/Api'
import SummaryTable from './SummaryTable';
import { LabelContainer, LabelCard, CardHeadLine, ChartContainer, LabelsContainer, DoughnutContainer, CardParagraph } from '../Styles/StyledChart'
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
  }

  getDivisions() {
    getAllDivision()
      .then((response) => {
        let StudentCount = 0;
        for (let currentDivision = 0; currentDivision < response.data.length; currentDivision++) {
          StudentCount += response.data[currentDivision].Students.length
        }
        this.setState({ DivisionCount: response.data ,StudentCount: StudentCount });
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

  render() {
    const { AvailableLab, BookedLab, Instructors, StudentCount, DivisionCount, Labs } = this.state

    const genderData = {
      labels: [`متاح ${AvailableLab}`
        , `محجوز ${BookedLab}`],
      datasets: [
        {
          data: [AvailableLab, BookedLab],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',

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
                <Doughnut data={genderData} />}
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
      </div>
    )
  }
}
