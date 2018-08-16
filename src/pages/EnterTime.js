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
    let userEntries = await ApiHelper.get(`/entries?user_id=${this.state.userId}&week=${this.state.week}&year=${this.state.year}`)
      .then(response => {
        return response.data;
      }, (err) => {
        console.log(err);
      });
    let userProjects = await ApiHelper.get('/user_projects?user_id=test')
      .then(response => {
        return response.data;
      }, (err) => {
        console.log(err);
      });

    let entryProjects = userEntries.map(e => { return e.project_id; })

    let newEntries = [];
    userProjects[0].projects.forEach(up => {
      if (!entryProjects.includes(up)) {
        let entry = {
          project_id: up,
          hours: ['', '', '', '', '', '', '']
        }
        newEntries.push(entry);
      }
    })

    this.setState({
      projects,
      userProjects: userProjects[0].projects,
      entries: userEntries.concat(newEntries)
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    const week = this.props.match.params.week;
    const year = this.props.match.params.year;
    if (prevState.week !== week || prevState.year !== year) {
      let userEntries = await ApiHelper.get(`/entries?user_id=${this.state.userId}&week=${this.state.week}&year=${this.state.year}`)
        .then(response => {
          return response.data;
        }, (err) => {
          console.log(err);
        });
      let userProjects = await ApiHelper.get('/user_projects?user_id=test')
        .then(response => {
          return response.data;
        }, (err) => {
          console.log(err);
        });

      let entryProjects = userEntries.map(e => { return e.project_id; })

      let newEntries = [];
      userProjects[0].projects.forEach(up => {
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
        userProjects: userProjects[0].projects,
        entries: userEntries.concat(newEntries)
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.entries.forEach(entry => {
      if (entry.id) {
        ApiHelper.put('/entries/' + entry.id, {
          user_id: this.state.userId,
          week: this.state.week,
          year: this.state.year,
          hours: entry.hours,
          project_id: entry.project_id
        })
      } else {
        ApiHelper.post('/entries', {
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

export default EnterTime;