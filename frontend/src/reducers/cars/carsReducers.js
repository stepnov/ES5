import list from 'reducers/cars/carsListReducers';
import form from 'reducers/cars/carsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
