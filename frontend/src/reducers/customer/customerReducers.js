import list from 'reducers/customer/customerListReducers';
import form from 'reducers/customer/customerFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
