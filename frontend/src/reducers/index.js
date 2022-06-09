import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import cars from 'reducers/cars/carsReducers';

import customer from 'reducers/customer/customerReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    cars,

    customer,
  });
