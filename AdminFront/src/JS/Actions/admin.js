import axios from "axios";

import {
  LOAD_ADMIN,
  FAIL_ADMIN,
  GET_PARENTS,
  GET_TEACHERS,
  GET_TEACHERS_V,
  GET_PARENTS_V,
  GET_KIDS,
  GET_KIDS_VALIDER,
} from "../Constants/admin";

export const get_parents_requests = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const result = await axios.get("/admin/listrequestP"); //parents
    // console.log(result)
    dispatch({ type: GET_PARENTS, payload: result.data.parents });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_ADMIN, payload: error.response });
  }
};

export const get_teachers_requests = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const result = await axios.get("/admin/listrequestTeachers"); //teachers
    dispatch({ type: GET_TEACHERS, payload: result.data.teachers });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const get_teachers_valider = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const result = await axios.get("/admin/listTV"); //myList
    console.log(result);
    dispatch({ type: GET_TEACHERS_V, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const get_parents_valider = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const result = await axios.get("/admin/listPV/valider"); //myList
    // console.log(result)
    dispatch({ type: GET_PARENTS_V, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const get_kid_requests = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const result = await axios.get("/admin//listk"); //myList

    dispatch({ type: GET_KIDS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const get_kid_valider = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const result = await axios.get("/admin/listKV"); //myList

    dispatch({ type: GET_KIDS_VALIDER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const validate_teacher = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    await axios.get(`/admin/validateT/${id}`); //myList
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const validate_parent = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    await axios.get(`/admin/validateP/${id}`);
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const deny_parent = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    await axios.delete(`/admin/deleteP/${id}`);
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const deny_teacher = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    await axios.delete(`/admin/deleteT/${id}`);
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};
