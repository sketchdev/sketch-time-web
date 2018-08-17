import React, { Component } from 'react';
import ApiHelper from '../services/ApiHelper'
import EntryForm from '../components/EntryForm'

class EnterTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      userProjects: (this.props.location && this.props.location.state) ? this.props.location.state.userProjects : [],
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

  //TODO: DRY up
  async componentDidMount() {
    let userProjects = this.state.userProjects;
    let entryProjects = [];

    let projects = await ApiHelper.get('/project')
      .then(response => {
        return response.data;
      }, (err) => {
        console.log(err);
      });
    let userEntries = await ApiHelper.get(`/entry?user_id=${this.state.userId}&week=${this.state.week}&year=${this.state.year}`)
      .then(response => {
        if (response) {
          if (response.errors) {
            console.log(response.errors);
          } else {
            return response.data
          }
        }
      }, (err) => {
        console.log(err);
      });
    if (userEntries) {
      entryProjects = userEntries.map(e => { return e.project_id; })
    }

    if (!userEntries || userEntries.length === 0) {
      await ApiHelper.get(`/entry?user_id=${this.state.userId}&${getPreviousWeekAndYear(this.state.week, this.state.year)}`)
        .then(response => {
          if (response) {
            if (response.errors) {
              console.log(response.errors);
            } else {
              let previousEntriesprojects = response.data.map(e => { return e.project_id; })
              userProjects = userProjects.concat(previousEntriesprojects)
            }
          }
        }, (err) => {
          console.log(err);
        });
    }

    let newEntries = [];
    userProjects.forEach(up => {
      if (!entryProjects.includes(up)) {
        let entry = {
          project_id: up,
          hours: ['', '', '', '', '', '', '']
        }
        newEntries.push(entry);
      }
    })

    console.log('projects', projects)
    this.setState({
      projects,
      entries: userEntries ? newEntries.concat(userEntries) : newEntries,
      userProjects: []
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    const week = this.props.match.params.week;
    const year = this.props.match.params.year;

    let userProjects = [];
    if (prevState.week !== week || prevState.year !== year) {
      let userEntries = await ApiHelper.get(`/entry?user_id=${this.state.userId}&week=${this.state.week}&year=${this.state.year}`)
        .then(response => {
          return response.data;
        }, (err) => {
          console.log(err);
        });

      if (!userEntries || userEntries.length === 0) {
        let previousEntries = await ApiHelper.get(`/entry?user_id=${this.state.userId}&${getPreviousWeekAndYear(this.state.week, this.state.year)}`)
          .then(response => {
            return response.data;
          }, (err) => {
            console.log(err);
          });
        userProjects = previousEntries.map(e => { return e.project_id; })
      }

      let entryProjects = userEntries.map(e => { return e.project_id; })

      let newEntries = [];
      userProjects.forEach(up => {
        if (!entryProjects.includes(up)) {
          let entry = {
            project_id: up,
            hours: ['', '', '', '', '', '', '']
          }
          newEntries.push(entry);
        }
      })

      this.setState({
        week, year,
        entries: userEntries.concat(newEntries)
      })
    }
  }

  //TODO: add notification saves was successful and handle errors
  handleSubmit(e) {
    e.preventDefault();
    this.state.entries.forEach(entry => {
      if (entry.id) {
        ApiHelper.put('/entry/' + entry.id, {
          user_id: this.state.userId,
          week: this.state.week,
          year: this.state.year,
          hours: entry.hours,
          project_id: entry.project_id
        })
      } else {
        ApiHelper.post('/entry', {
          user_id: this.state.userId,
          week: this.state.week,
          year: this.state.year,
          hours: entry.hours,
          project_id: entry.project_id
        })
      }
    })
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

  handleHourChange(e, entriesIndex, hoursIndex) {
    e.preventDefault();
    const value = e.target.value;
    this.setState((prevState, props) => {
      let hours = prevState.entries[entriesIndex].hours
      hours[hoursIndex] = value;

      return {
        entries: [
          ...prevState.entries.slice(0,entriesIndex),
          Object.assign({}, prevState.entries[entriesIndex], { hours }),
          ...prevState.entries.slice(entriesIndex+1)
        ]
      }
    });
  }

  handleHourBlur(e, entriesIndex, hoursIndex) {
    let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    this.setState((prevState) => {
      const currentTotal = prevState.entries.reduce((a, b) => {
        return Number(a) + Number(b.hours[hoursIndex]);
        }, 0);
      const weekTotal = prevState.entries.reduce((a, b) => {
        return Number(a) + b.hours.reduce((a, b) => {
          return Number(a) + Number(b)
        })
      }, 0);
      return {
        [`${days[hoursIndex]}Total`]: currentTotal,
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

function getPreviousWeekAndYear(week, year) {
  if (week === 1) {
    return `year=${Number(year)-1}&week=52`;
  } else {
    return `year=${year}&week=${Number(week)-1}`;
  }
}

export default EnterTime;