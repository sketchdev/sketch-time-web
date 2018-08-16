import React, { Component } from 'react';
import ApiHelper from '../services/ApiHelper'
import EntryForm from '../components/EntryForm'

class EnterTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      userProjects: [],
      id: '',
      userId: 'test',
      year: this.props.match.params.year,
      week: this.props.match.params.week,
      entries: [],
      newProject: '',
      sunTotal: '0.0',
      monTotal: '0.0',
      tueTotal: '0.0',
      wedTotal: '0.0',
      thuTotal: '0.0',
      friTotal: '0.0',
      satTotal: '0.0',
      weekTotal: '0.0',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWeekChange = this.handleWeekChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleHourBlur = this.handleHourBlur.bind(this);
  }

  async componentDidMount() {
    let projects = await ApiHelper.get('/projects')
      .then(response => {
        return response.data;
      }, (err) => {
        console.log(err);
      });
    let entries = await ApiHelper.get(`/entries?user_id=${this.state.userId}&week=${this.state.week}&year=${this.state.year}`)
      .then(response => {
        console.log(response.data)
        return response.data;
      }, (err) => {
        console.log(err);
      });
    let userProjects = await ApiHelper.get('/user_projects?user_id=test')
      .then(response => {
        console.log(response.data)
        return response.data;
      }, (err) => {
        console.log(err);
      });

    this.setState({
      projects,
      userProjects: userProjects[0].projects,
      entries
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    const week = this.props.match.params.week;
    const year = this.props.match.params.year;
    if (prevState.week !== week || prevState.year !== year) {
      let userProjects = await ApiHelper.get('/user_projects?user_id=test')
        .then(response => {
          return response.data;
        }, (err) => {
          console.log(err);
        });

      this.setState({
        week, year, userProjects: userProjects[0].projects
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.id) {
      ApiHelper.put('/week/' + this.state.id, {
        userId: this.state.userId,
        week: this.state.week,
        year: this.state.year,
        hours: this.state.hours
      })
    } else {
      ApiHelper.post('/week', {
        userId: this.state.userId,
        week: this.state.week,
        year: this.state.year,
        hours: this.state.hours
      })
    }
  }

  handleWeekChange(e, value) {
    e.preventDefault();
    if (this.state.week === 52 && value === 1) {
      this.props.history.push(`/enter-time/${this.state.year+1}/1`)
    } else if (this.state.week === 1 && value === -1) {
      this.props.history.push(`/enter-time/${this.state.year-1}/52`)
    } else {
      this.props.history.push(`/enter-time/${this.state.year}/${Number(this.state.week)+value}`)
    }
  }

  handleHourChange(e, day, index) {
    e.preventDefault();
    const value = e.target.value;
    this.setState((prevState, props) => ({
      hours: [
        ...prevState.hours.slice(0,index),
        Object.assign({}, prevState.hours[index], {[day]: value}),
        ...prevState.hours.slice(index+1)
      ]
    }));
  }

  handleHourBlur(e, day, index) {
    this.setState((prevState) => {
      const currentTotal = prevState.hours.reduce((a, b) => {
        console.log('a', a)
        console.log('b', b)
        return Number(a) + Number(b[day]);
        }, 0);
      const weekTotal = prevState.hours.reduce((a, b) => {
        return a + Number(b.sun) + Number(b.mon) + Number(b.tue) + Number(b.wed) + Number(b.thu) + Number(b.fri) + Number(b.sat);
      }, 0);
      return {
        [`${day}Total`]: currentTotal,
        weekTotal: weekTotal
      }
    });
  }

  render() {
    return (
      <EntryForm
        data={this.state}
        handleWeekChange={this.handleWeekChange}
        handleSubmit={this.handleSubmit}
        handleHourChange={this.handleHourChange}
        handleHourBlur={this.handleHourBlur}
      />
    );
  }
}

export default EnterTime;