import axios from 'axios';

// const userUrl = 'https://real-estate-shop.herokuapp.com/users';
// const houseUrl = 'https://real-estate-shop.herokuapp.com/houses';
// const categoryUrl = 'https://real-estate-shop.herokuapp.com/categories';
// const scheduleUrl = 'https://real-estate-shop.herokuapp.com/schedules';

const userUrl = 'http://localhost:8000/users';
const houseUrl = 'http://localhost:8000/houses';
const categoryUrl = 'http://localhost:8000/categories';
const scheduleUrl = 'http://localhost:8000/schedules';
const newsUrl = 'http://localhost:8000/news';


// user routes
export const createUser = (newUser) => axios.post(`${userUrl}/register`, newUser);
export const getUser = (userName) => axios.get(`${userUrl}/${userName}`);
export const fetchUser = () => axios.get(userUrl);
export const deleteUser = (userName) => axios.delete(`${userUrl}/${userName}`);
export const updateUser = (userName, toUpdateUser) => axios.post(`${userUrl}/updateUser/${userName}`, toUpdateUser);
export const setNewPassword = (userName, newUserInfo) => axios.post(`${userUrl}/setNewPassword/${userName}`, newUserInfo);
export const login = (userInfo) => axios.post(`${userUrl}/${userInfo}`, userInfo);
export const logout = (userInfo) => axios.post(`${userUrl}/logout/${userInfo}`, userInfo);

// house
export const fetchHouse = () => axios.get(houseUrl);
export const createHouse = (newHouse) => axios.post(houseUrl, newHouse);
export const deleteHouse = (id) => axios.delete(`${houseUrl}/${id}`);
export const updateHouse = (id, toUpdateHouse) => axios.post(`${houseUrl}/updateHouse/${id}`, toUpdateHouse);
// category
export const createCategory = (newCategory) => axios.post(categoryUrl, newCategory);
export const fetchCategory = () => axios.get(categoryUrl);
export const deleteCategory = (name) => axios.delete(`${categoryUrl}/${name}`);
export const updateCategory = (name, toUpdateCategory) => axios.post(`${categoryUrl}/updateCategory/${name}`, toUpdateCategory);
// schedule
export const fetchSchedule = () => axios.get(scheduleUrl);
export const addSchedule = (scheduleInfo) => axios.post(scheduleUrl, scheduleInfo);
export const rejectSchedule = (id) => axios.post(`${scheduleUrl}/rejectSchedule/${id}`);
export const acceptSchedule = (id) => axios.post(`${scheduleUrl}/markSchedule/${id}`);
export const deleteSchedule = (id) => axios.delete(`${scheduleUrl}/${id}`);    
export const removeSchedule = (id) => axios.delete(`${scheduleUrl}/removeSchedule/${id}`);    
//news
export const fetchNews = () => axios.get(newsUrl);