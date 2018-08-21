import appRoute from '../components/AppRoute';
import MemberLayout from '../layouts/MemberLayout';
import React, { Component } from 'react';
import ApiHelper from '../services/ApiHelper'
import EntryForm from '../components/EntryForm'
import { uniq } from 'lodash';
import validator from 'validator';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Moment from 'react-moment';
import moment from 'moment';

class EnterTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      userProjects: (this.props.location && this.props.location.state) ? this.props.location.state.userProjects : [],
      id: '',
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
      errors: {},
      submitSaved: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWeekChange = this.handleWeekChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDayBlur = this.handleDayBlur.bind(this);
    this.validate = this.validate.bind(this);
  }

  async componentDidMount() {
    let userProjects = this.state.userProjects;
    let entryProjects = [];

    let projects = await ApiHelper.get('/project')
      .then(response => {
        return response.data;
      }, (err) => {
        console.error(err);
      });
    let userEntries = await this.getUserEntries();
    let weekTotal, sunTotal, monTotal, tueTotal, wedTotal, thuTotal, friTotal, satTotal = '0.0';
    if (userEntries) {
      entryProjects = this.getEntryProjects(userEntries);
      weekTotal = this.getWeekTotal(userEntries);
      sunTotal = this.getCurrentTotal(userEntries, 0);
      monTotal = this.getCurrentTotal(userEntries, 1);
      tueTotal = this.getCurrentTotal(userEntries, 2);
      wedTotal = this.getCurrentTotal(userEntries, 3);
      thuTotal = this.getCurrentTotal(userEntries, 4);
      friTotal = this.getCurrentTotal(userEntries, 5);
      satTotal = this.getCurrentTotal(userEntries, 6);
    }

    if (!userEntries || userEntries.length === 0) {
      let previousEntries = await this.getPreviousEntries();
      if (previousEntries) {
        let previousEntriesprojects = previousEntries.map(e => { return e.project_id; });
        userProjects = userProjects.concat(previousEntriesprojects);
        userProjects = uniq(userProjects)
      }
    }

    let newEntries = this.getNewEntries(userProjects, entryProjects);
    this.setState({
      projects, weekTotal, sunTotal, monTotal, tueTotal, wedTotal, thuTotal, friTotal, satTotal,
      entries: userEntries ? newEntries.concat(userEntries) : newEntries,
      userProjects: []
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    const week = this.props.match.params.week;
    const year = this.props.match.params.year;

    let userProjects = [];
    let entryProjects = [];
    if (prevState.week !== week || prevState.year !== year) {
      let userEntries = await this.getUserEntries();
      let weekTotal, sunTotal, monTotal, tueTotal, wedTotal, thuTotal, friTotal, satTotal = '0.0';
      if (userEntries) {
        entryProjects = this.getEntryProjects(userEntries);
        weekTotal = this.getWeekTotal(userEntries);
        sunTotal = this.getCurrentTotal(userEntries, 0);
        monTotal = this.getCurrentTotal(userEntries, 1);
        tueTotal = this.getCurrentTotal(userEntries, 2);
        wedTotal = this.getCurrentTotal(userEntries, 3);
        thuTotal = this.getCurrentTotal(userEntries, 4);
        friTotal = this.getCurrentTotal(userEntries, 5);
        satTotal = this.getCurrentTotal(userEntries, 6);
      }

      if (!userEntries || userEntries.length === 0) {
        let previousEntries = await this.getPreviousEntries();
        if (previousEntries) {
          userProjects = previousEntries.map(e => { return e.project_id; })
        }
      }

      let newEntries = this.getNewEntries(userProjects, entryProjects);

      this.setState({
        week, year, weekTotal, sunTotal, monTotal, tueTotal, wedTotal, thuTotal, friTotal, satTotal,
        entries: userEntries.concat(newEntries),
        submitSaved: ''
      })
    }
  }

  getEntryProjects(userEntries) {
    return userEntries.map(e => {
      return e.project_id;
    })
  }

  async getPreviousEntries() {
    return await ApiHelper.get(`/entry?${getPreviousWeekAndYear(this.state.week, this.state.year)}`)
      .then(response => {
        return response.data;
      }, (err) => {
        console.error(err);
      })
  }

  async getUserEntries() {
    return await ApiHelper.get(`/entry?week=${this.state.week}&year=${this.state.year}`)
      .then(response => {
        return response.data;
      }, (err) => {
        console.error(err);
      })
  }

  getNewEntries(userProjects, entryProjects) {
    let newEntries = [];
    userProjects.forEach(up => {
      if (!entryProjects.includes(up)) {
        let entry = {
          project_id: up,
          days: ['', '', '', '', '', '', '']
        };
        newEntries.push(entry);
      }
    });
    return newEntries;
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(this.state.errors).length === 0) {
      let entryErrors = {};
      let entryIndex = 0;
      for (let entry of this.state.entries) {
        let response;
        if (entry.id) {
          response = await ApiHelper.put('/entry/' + entry.id, this.getEntry(entry))
        } else {
          response = await ApiHelper.post('/entry', this.getEntry(entry))
        }

        if (response.errors) {
          entryErrors[`entry${entryIndex}`] = 'Invalid Request';
          console.error(response.errors)
        }
        entryIndex++;
      }

      if (Object.keys(entryErrors).length === 0) {
        this.setState({submitSaved: true})
      } else {
        this.setState(prevState => {
          let errors = Object.assign({}, prevState.errors, entryErrors);
          return { errors, submitSaved: false };
        });
      }
    }
  }

  getEntry(entry) {
    return {
      week: this.state.week,
      year: this.state.year,
      days: entry.days,
      project_id: entry.project_id
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

  handleDayChange(e, entriesIndex, dayIndex) {
    e.preventDefault();
    const value = e.target.value;
    this.setState((prevState, props) => {
      let days = prevState.entries[entriesIndex].days;
      days[dayIndex] = value;

      return {
        entries: [
          ...prevState.entries.slice(0,entriesIndex),
          Object.assign({}, prevState.entries[entriesIndex], { days }),
          ...prevState.entries.slice(entriesIndex+1)
        ],
        submitSaved: ''
      }
    });
  }

  handleDayBlur(e, entryIndex, dayIndex) {
    let value = e.target.value;

    if (value) {
      if (!validator.isDecimal(value)) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [`entry${entryIndex}-${dayIndex}`]: 'Invalid Value'
          },
          submitSaved: ''
        }));
      } else {
        let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        this.setState((prevState) => {
          const currentTotal = this.getCurrentTotal(prevState.entries, dayIndex);
          const weekTotal = this.getWeekTotal(prevState.entries);

          let errors = prevState.errors;
          delete errors[`entry${entryIndex}-${dayIndex}`];
          return {
            [`${days[dayIndex]}Total`]: currentTotal,
            weekTotal: weekTotal,
            errors,
            submitSaved: ''
          }
        });
      }
    }
  }

  getWeekTotal(entries) {
    return entries.reduce((a, b) => {
      return Number(a) + b.days.reduce((a, b) => {
        return Number(a) + Number(b)
      })
    }, 0);
  }

  getCurrentTotal(entries, dayIndex) {
    return entries.reduce((a, b) => {
      return Number(a) + Number(b.days[dayIndex]);
    }, 0);
  }

  validate() {
    return Object.keys(this.state.errors).length === 0;
  }

  render() {
    const startDate = moment().year(this.state.year).week(this.state.week).day(0);
    const endDate = moment().year(this.state.year).week(this.state.week).day(6);
    return (

      <div>
        <Container>
          <div>
            <Link to={getNextWeekLink(this.state.week, this.state.year, -1)}><button><FaChevronLeft/></button></Link>
          </div>
          <h2 className={'week'}>
            <Moment format={'MMMM DD'}>{startDate}</Moment> - <Moment format={'MMMM DD, YYYY'}>{endDate}</Moment>
          </h2>
          <div>
            <Link to={getNextWeekLink(this.state.week, this.state.year, 1)}>
              <button><FaChevronRight/></button>
            </Link>
          </div>
        </Container>
          {this.state.submitSaved === true && <p className={'success'}>Save Successful!</p> }
          {this.state.submitSaved === false && <p className={'error'}>Saved Failed.  Please try again later.</p>}
        <EntryForm
          data={this.state}
          handleWeekChange={this.handleWeekChange}
          handleSubmit={this.handleSubmit}
          handleDayChange={this.handleDayChange}
          handleDayBlur={this.handleDayBlur}
        />
      </div>
    );
  }
}

const Container = styled.div`
  display: flex;
  margin-top: 20px;

  & .week {
    flex-grow: 1;
    margin-top: .2rem;
    text-align: center;
    align-self: center;
  }

  & button {
    padding: .5rem .5rem .3rem .5rem;
  }
`;

function getPreviousWeekAndYear(week, year) {
  if (week === 1) {
    return `year=${Number(year)-1}&week=52`;
  } else {
    return `year=${year}&week=${Number(week)-1}`;
  }
}

function getNextWeekLink(week, year, value) {
  if (week === '52' && value === 1) {
    return `/enter-time/${Number(year)+1}/1`;
  } else if (week === '1' && value === -1) {
    return `/enter-time/${Number(year)-1}/52`;
  } else {
    return `/enter-time/${year}/${Number(week)+value}`;
  }
}

export default appRoute(MemberLayout, true)(EnterTime);