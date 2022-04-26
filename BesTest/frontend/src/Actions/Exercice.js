import axios from 'axios';
import { SetAlert } from './Alert';
import {
  GET_EXERCICES,
  GET_EXERCICE,
  GET_LESSONS,
  EXERCICE_ERROR,
  DELETE_EXERCICE,
  ADD_EXERCICE,

} from './Types';

// Get posts
export const GetExercices = () => async (dispatch) => {
  try {
    const res = await axios.get('/exercice/list');

    dispatch({
      type: GET_EXERCICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXERCICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const GetAllLessons = () => async (dispatch) => {
  try {
    const res = await axios.get('/exercice/lesson');

    dispatch({
      type: GET_LESSONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXERCICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// // Delete post
// export const DeleteExercice = (id,idLesson) => async (dispatch) => {
//   try {
//     await axios.delete(/exercice/list/${id}/${idLesson});

//     dispatch({
//       type: DELETE_EXERCICE,
//       payload: id,
//     });

//     dispatch(SetAlert('Exercice Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: EXERCICE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// Add post
export const AddExercices = ({formData,user}) => async (dispatch) => {

  try {
    const res = await axios.post(`/exercice/addExercice/${user}`, formData);

    dispatch({
      type: ADD_EXERCICE,
      payload: res.data,
    });

    dispatch(SetAlert('Exercice Created', 'success'));
  } catch (err) {
    dispatch({
      type: EXERCICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};