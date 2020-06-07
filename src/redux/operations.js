import { userSlice } from './reducers/userReducer';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';
import easydate from 'easydate';
import moment from 'moment';
import * as selectors from './selectors';
import { dashboardSlice } from './reducers/dashboardReducer';

// const loginURL = 'https://develop-questify.goit.co.ua/api/auth';
const loginURL = 'https://questify.goit.co.ua/api/login';

const filterDataDone = data => {
  const filtredData = data.filter(item => item.done);

  return filtredData;
};

export const filterDataTime = (data) => {
  let today = [];
  let tomorrow = [];
  let allTheRest = [];
  let doneNew = [];
  console.log('data', data);
  const filtredData = data.reduce((acc, itemNew) => {
    const item = { ...itemNew, isEdit: false };
    const formatData = easydate('YMd', {
      setDate: `${item.dueDate}`,
      timeZone: 'utc',
    });
    const data = moment().calendar(`${formatData}`).slice(0, 6);
    switch (data) {
      case 'Today ':
        if (!item.done) {
          today.push(item);
        }
        return (acc = { ...acc, today: today });
      case 'Tomorr':
        if (!item.done) {
          doneNew.push(item);
        }
        return (acc = { ...acc, doneNew: doneNew });
      case 'Yester':
        if (!item.done) {
          tomorrow.push(item);
        }
        return (acc = { ...acc, tomorrow: tomorrow });
      default:
        if (!item.done) {
          allTheRest.push(item);
        }
        return (acc = { ...acc, allTheRest: allTheRest });
    }
  }, {});

  return filtredData;
};

export const getUser = nickname => (dispatch, getState) => {
  console.log('nickname getUser', nickname);
  axios
    .post(loginURL, nickname)
    .then(response => {
      console.log('response get User = ', response.data.data.tasks);
      dispatch(userSlice.actions.loginUser(response.data.data.user));
      const filterDone = filterDataDone(response.data.data.tasks);
      const filterTime = filterDataTime(response.data.data.tasks);
      console.log('filterTime :>> ', filterTime);
      dispatch(dashboardSlice.actions.filterCardReducer(filterDone));
      dispatch(dashboardSlice.actions.filterCardReducerTodayTemp(filterTime));
    })
    .catch(err => console.log('error25 = ', err));
};

export const postUser = nickname => (dispatch, getState) => {
  // const name = selectors.getUser(getState());
  // console.log(typeof nickname);
  axios
    .post(loginURL, { nickname: `${nickname}` })
    .then(response => {
      console.log(response);
      dispatch(userSlice.actions.loginUser(response.data.data.user));
      const filterDone = filterDataDone(response.data.data.tasks);
      const filterTime = filterDataTime(response.data.data.tasks);
      console.log('filterTime :>> ', filterTime);
      dispatch(dashboardSlice.actions.filterCardReducer(filterDone));
      dispatch(dashboardSlice.actions.filterCardReducerToday(filterTime));
    })
    .catch(err => console.log('error = ', err));
};
