import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'CUSTOMER_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CUSTOMER_FORM_FIND_STARTED',
      });

      axios.get(`/customer/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'CUSTOMER_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CUSTOMER_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/customer'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'CUSTOMER_FORM_CREATE_STARTED',
      });

      axios.post('/customer', { data: values }).then((res) => {
        dispatch({
          type: 'CUSTOMER_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Customer created' });
        dispatch(push('/admin/customer'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CUSTOMER_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CUSTOMER_FORM_UPDATE_STARTED',
      });

      await axios.put(`/customer/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'CUSTOMER_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Customer updated' });
        dispatch(push('/admin/customer'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CUSTOMER_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
