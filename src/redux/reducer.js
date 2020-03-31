import {
    ADD_RUN,
    DELETE_RUN
} from './constants';

const initialState = {
  user: {
    id: 'arone',
    is_authenticated: false
  },
  runs: [
      {runid: 1, distance: 3.1, time: 30.1, userid: 991},
      {runid: 2, distance: 4.1, time: 35.1, userid: 991},
      {runid: 3, distance: 8, time: 45.1, userid: 991}
  ]
};

export function reducer(state = [], action){
    switch(action.type){
        case ADD_RUN: 
        console.log(action);
            return {
                ...state,
                runs: [...state.runs,action.payload]
                
            }
        case DELETE_RUN: 
            return {
                ...state,
                runs: state.runs.filter(runs => runs.runid !== action.payload)
            }
        default: return state;
    }   
}
