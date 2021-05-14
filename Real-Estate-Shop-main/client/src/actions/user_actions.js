import {
  LOGIN_USER,
  GET_USER,
  FETCH_USER,
  REGISTER_USER,
  LOGOUT_USER,
  DELETE_USER,
  UPDATE_USER,
  RESET_USER,
  FETCH_NEWS,
  FETCH_HOUSE,
  DELETE_HOUSE,
  FILTER_HOUSE,
  FILTER_HOUSE_BY_PRICE,
  CREATE_HOUSE,
  UPDATE_HOUSE,
  ADD_SCHEDULE,
  REJECT_SCHEDULE,
  DELETE_SCHEDULE,
  ACCEPT_SCHEDULE,
  GET_SCHEDULE,
  FETCH_CATEGORY,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  SET_NOTIFICATION,
  SHOW_USER_INFO,
  IS_LOADING
} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const login = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.login(userInfo);
    localStorage.setItem('user', JSON.stringify(data));
    await dispatch({ type: LOGIN_USER, payload: data});
    await dispatch(setNotification("Đăng nhập thành công"));
    await dispatch(fetchSchedule());
    await dispatch(fetchUser());
    await dispatch(fetchHouse());
    await dispatch(fetchNews());
    await dispatch(fetchCategory());
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Đăng nhập thất bại"));
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    // await dispatch(setIsLoading(true));
    const { data } = await api.fetchUser();
    dispatch({ type: FETCH_USER, payload: data});
    // await dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteUser = (userName) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteUser(userName);
    await dispatch({ type: DELETE_USER, payload: data});
    await dispatch(fetchUser());
    await dispatch(setNotification("Xóa hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Xóa thất bại"));
  }
};

export const updateUser = (userName, userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateUser(userName, userInfo);
    await dispatch({ type: UPDATE_USER, payload: data});
    await dispatch(fetchUser());
    await dispatch(setNotification("Cập nhật hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Cập nhật thất bại"));
  }
};

export const setNewPassword = (userName, newUserInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.setNewPassword(userName, newUserInfo);
    await dispatch({ type: RESET_USER, payload: data});
    await dispatch(fetchUser());
    await dispatch(setNotification("Cập nhật hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Sai câu trả lời!"));
  }
};

export const getUser = (userName) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.getUser(userName);
    dispatch({ type: GET_USER, payload: data});
    await dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    localStorage.clear();
    const { data } = await api.logout(userInfo);
    await dispatch({ type: LOGOUT_USER, payload: data});
    await dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};

export const register = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createUser(userInfo);
    await dispatch(fetchUser());
    await dispatch({ type: REGISTER_USER, payload: data});
    await dispatch(setNotification(`Đăng ký thành công`));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Đăng ký thất bại"));
  }
};

export const filterHouse = (categoryName) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    await dispatch(fetchHouse());
    await dispatch({ type: FILTER_HOUSE, payload: categoryName});
    await dispatch(setNotification(`Duyệt theo ${categoryName} `));
    await dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};

export const filterHouseByPrice = (price) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    await dispatch(fetchHouse());
    await dispatch({ type: FILTER_HOUSE_BY_PRICE, payload: price});
    await dispatch(setNotification(`Duyệt theo giá: ${price} `));
    await dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchHouse = () => async (dispatch) => {
  try {
    // await dispatch(setIsLoading(true));
    const { data } = await api.fetchHouse();
    dispatch({ type: FETCH_HOUSE, payload: data});
    // await dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchNews = () => async (dispatch) => {
  try {
    // await dispatch(setIsLoading(true));
    const { data } = await api.fetchNews();
    dispatch({ type: FETCH_NEWS, payload: data});
    // await dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteHouse = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteHouse(id);
    await dispatch({ type: DELETE_HOUSE, payload: data});
    await dispatch(fetchHouse());
    await dispatch(setNotification("Xóa hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Xóa thất bại"));
  }
};

export const updateHouse = (id, houseInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateHouse(id, houseInfo);
    await dispatch({ type: UPDATE_HOUSE, payload: data});
    await dispatch(fetchHouse());
    await dispatch(setNotification("Cập nhật hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Cập nhật thất bại"));
  }
};

export const createHouse = (houseInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createHouse(houseInfo);
    await dispatch({ type: CREATE_HOUSE, payload: data});
    await dispatch(fetchHouse());
    await dispatch(setNotification("Thêm hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Thêm thất bại"));
  }
};

//category action
export const fetchCategory = () => async (dispatch) => {
  try {
    // await dispatch(setIsLoading(true));
    const { data } = await api.fetchCategory();
    dispatch({ type: FETCH_CATEGORY, payload: data});
    // await dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCategory = (name) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteCategory(name);
    await dispatch({ type: DELETE_CATEGORY, payload: data});
    await dispatch(fetchCategory());
    await dispatch(setNotification("Xóa hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Xóa thất bại"));
  }
};

export const createCategory = (categoryInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createCategory(categoryInfo);
    await dispatch({ type: CREATE_CATEGORY, payload: data});
    await dispatch(fetchCategory());
    await dispatch(setNotification("Thêm hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Thêm thất bại"));
  }
};

export const updateCategory = (name, categoryInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateCategory(name, categoryInfo);
    await dispatch({ type: UPDATE_CATEGORY, payload: data});
    await dispatch(fetchCategory());
    await dispatch(setNotification("Cập nhật hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Cập nhật thất bại"));
  }
};



export const setNotification = (notification) => async (dispatch) => {
  try {
    dispatch({ type: SET_NOTIFICATION, payload: notification});
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchSchedule = () => async (dispatch) => {
  try {
    // await dispatch(setIsLoading(true));
    const { data } = await api.fetchSchedule();
    dispatch({ type: GET_SCHEDULE, payload: data});
    // await dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSchedule = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteSchedule(id);
    await dispatch({ type: DELETE_SCHEDULE, payload: data});
    await dispatch(fetchSchedule());
    await dispatch(setNotification("Xóa hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Xóa thất bại"));
  }
};

export const removeSchedule = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.removeSchedule(id);
    await dispatch({ type: DELETE_SCHEDULE, payload: data});
    await dispatch(fetchSchedule());
    await dispatch(setNotification("Xóa hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Xóa thất bại"));
  }
};

export const markSchedule = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.acceptSchedule(id);
    await dispatch({ type: ACCEPT_SCHEDULE, payload: data});
    await dispatch(fetchSchedule());
    await dispatch(setNotification("Duyệt lịch hẹn thành công"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Duyệt lịch hẹn thất bại"));
  }
};
export const rejectSchedule = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.rejectSchedule(id);
    await dispatch({ type: REJECT_SCHEDULE, payload: data});
    await dispatch(fetchSchedule());
    await dispatch(setNotification("Từ chối lịch hẹn thành công"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Từ chối lịch hẹn thất bại"));
  }
};

export const addSchedule = (scheduleInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.addSchedule(scheduleInfo);
    await dispatch({ type: ADD_SCHEDULE, payload: data});
    await dispatch(fetchSchedule());
    await dispatch(setNotification("Đặt lịch hoàn tất"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Đã có người đặt lịch với người này!"));
  }
};


export const showMenu = (isShow) => async (dispatch) => {
  try {
    await dispatch({ type: SHOW_USER_INFO, payload: isShow});
  } catch (error) {
    console.log(error.message);
  }
};

export const setIsLoading = (isLoading) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: isLoading});
  } catch (error) {
    console.log(error.message);
  }
};
