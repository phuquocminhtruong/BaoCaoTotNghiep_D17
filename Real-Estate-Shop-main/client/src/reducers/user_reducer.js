import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
  FETCH_USER,
  LOGOUT_USER,
  FETCH_NEWS,
  FETCH_HOUSE,
  DELETE_HOUSE,
  CREATE_HOUSE,
  FILTER_HOUSE,
  UPDATE_HOUSE,
  FILTER_HOUSE_BY_PRICE,
  CREATE_CATEGORY,
  FETCH_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  SET_NOTIFICATION,
  SHOW_USER_INFO,
  ADD_SCHEDULE,
  ACCEPT_SCHEDULE,
  REJECT_SCHEDULE,
  DELETE_SCHEDULE,
  GET_SCHEDULE,
  DELETE_USER,
  UPDATE_USER,
  RESET_USER,
  IS_LOADING
} from '../constants/actionTypes';

const loggedInUser = JSON.parse(localStorage.getItem('user'));
export default (state = { loggedInUser }, action) => {
  switch (action.type) {
    case REGISTER_USER:
        return { ...state, register: action.payload }
    case LOGIN_USER:
        return { ...state, loggedInUser: action.payload}
    case GET_USER:
        return { ...state, currentUser: action.payload }        
    case FETCH_USER:
        return { ...state, userList: action.payload }        
    case DELETE_USER:
        return {...state, 
                userList: state.userList.filter((user) => user.userName != action.payload )
            }
    case UPDATE_USER:
        return { ...state, updatedUser: action.payload}            
    case RESET_USER:
        return { ...state, resetUser: action.payload}            
    case LOGOUT_USER:
        return { ...state, loggedInUser: action.payload}  
    case GET_SCHEDULE:
        return { ...state, scheduleList: action.payload }
    case ADD_SCHEDULE:
        return { ...state, schedule: action.payload }
    case DELETE_SCHEDULE:
        return {...state, 
            scheduleList: state.scheduleList.filter((schedule) => schedule.id != action.payload )
    }
    case FETCH_NEWS:
        return { ...state, newslist: action.payload }
    case ACCEPT_SCHEDULE:
        return { ...state, acceptedSchedule: action.payload }
    case REJECT_SCHEDULE:
        return { ...state, rejectedSchedule: action.payload }
    case FETCH_HOUSE:
        return { ...state, houseList: action.payload }
    case DELETE_HOUSE:
        return {...state, 
                houseList: state.houseList.filter((house) => house.id != action.payload )
            }
    case CREATE_HOUSE:
        return {
            ...state, 
                houseList:[...state.houseList, action.payload]
            }
    case UPDATE_HOUSE:
        return { ...state, updatedHouse: action.payload}            
    case FILTER_HOUSE:
        return { 
            ...state, 
                houseList: state.houseList.filter((house) => house.category === action.payload)
        }
    case FILTER_HOUSE_BY_PRICE:
        return { 
            ...state, 
                houseList: state.houseList.filter((house) => house.price >= action.payload && house.price < action.payload + 1)
        }
    case FETCH_CATEGORY:
        return { ...state, categoryList: action.payload}
    case DELETE_CATEGORY:
        return { ...state, deleteCategory: action.payload }
    case CREATE_CATEGORY:
        return { ...state, createdCategory: action.payload }
    case UPDATE_CATEGORY:
        return { ...state, updatedCategory: action.payload}                    
    case SET_NOTIFICATION:
        return { ...state, notif: action.payload}
    case SHOW_USER_INFO:
        return { ...state, isShowUserInfo: action.payload}
    case IS_LOADING:
        return { ...state, isLoading: action.payload}
    default:
        return state;
  }
};

