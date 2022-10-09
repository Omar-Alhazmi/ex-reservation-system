import React, { Component } from 'react'
import * as Cards from '../Styles/cards'
import { getAllLabs } from '../ApiConfig/Api';
import BookingConformation from './BookingConformation'
export default class LabBooking extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      labId: null,
      toggle: false,
      from: "",
      to: ""
    }
  }
  componentDidMount() {
    getAllLabs()
      .then((response) => {
        this.setState({ data: response.data })
      })
      .catch((error) => {
      })
  }
  dateFormat = (date) => {
    let displayDate = new Date(date)
    displayDate = displayDate.toString().split(' ')
    return `${displayDate[0]} ${displayDate[1]} ${displayDate[2]} ${displayDate[3]}`
  }
  timeFormat = (date) => {
    let displayDate = new Date(date)
    displayDate = displayDate.toString().split(' ')
    displayDate = displayDate[4].split(':')
    return displayDate[0] + ':' + displayDate[1]
  }
  toggleHandler = e => {
    // e.preventDefault();
    this.setState({toggle: !this.state.toggle})
  }

  labHandler = (data,lab) => {
    this.setState({
      labId: lab.LabId,
      from:data.From,
      to:data.To })
  }
  render() {
    const { data, toggle, labId, from, to } = this.state
    let allLabs = <div class="spinner">Loading...</div>
    if (data.length > 0) {
      allLabs = data.map((lab, index) => {
        {
          return (
            lab.Available.map((available, aIndex) => {
              return (
                <div id={lab._id} key={index} onClick={this.labHandler(available,lab)}>
                  <Cards.SingleCard className={(available.isAvailable) ? "available" : 'isBooked'} onClick={e => this.toggleHandler(e)} >
                    <Cards.CardsH2>{lab.LabId}</Cards.CardsH2>
                    <Cards.CardsP>{lab.LabCapacity}</Cards.CardsP>
                    <Cards.CardsP key={aIndex}>{`${this.dateFormat(available.From)} `}</Cards.CardsP>
                    <Cards.CardsP key={aIndex}>{`${this.timeFormat(available.From)} - ${this.timeFormat(available.To)}`}</Cards.CardsP>
                  </Cards.SingleCard>
                </div>)
            })
          )
        }
      })
    }
    return (
      <div> {(!toggle) ?
        <Cards.TeamContainer>
          <Cards.CardsContainer id="Teams" >
            <Cards.CardsWrapper>
              {allLabs}
            </Cards.CardsWrapper>
          </Cards.CardsContainer>
        </Cards.TeamContainer>
        : <BookingConformation toggle={e => this.toggleHandler(e)} From={from} To={to} Lab={labId} />} </div>
    )
  }
}
