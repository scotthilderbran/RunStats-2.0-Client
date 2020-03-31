import { createStore } from 'redux';
import {reducer} from './reducer';

const initialState = {
    user: {
      id: 'test',
      is_authenticated: false
    },
    runs: [
        {runid: 1, distance: 3.1, time: 30.1, userid: 991},
        {runid: 2, distance: 4.1, time: 35.1, userid: 991},
        {runid: 3, distance: 8, time: 45.1, userid: 991}
    ]
  };
  

const store = createStore(reducer, initialState,
    window.devToolsExtension && window.devToolsExtension());

export default store;