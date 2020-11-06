import {
    SET_USER,
    SET_AUTH,
    SET_UNAUTH,
    LOADING_USER,
    LIKE_POST,
    UNLIKE_POST,
    MARK_READ_NOTIFICATIONS
  } from '../actionTypes';
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTH:
        return {
          ...state,
          authenticated: true
        };
      case SET_UNAUTH:
        return initialState;
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
      case LOADING_USER:
        return {
          ...state,
          loading: true
        };
      case LIKE_POST:
        return {
          ...state,
          likes: [
            ...state.likes,
            {
              userHandle: state.credentials.handle,
              postId: action.payload.postId
            }
          ]
        };
      case UNLIKE_POST:
        return {
          ...state,
          likes: state.likes.filter(
            (like) => like.postId !== action.payload.postId
          )
        };
      case MARK_READ_NOTIFICATIONS:
        state.notifications.forEach((not) => (not.read = true));
        return {
          ...state
        };
      default:
        return state;
    }
  }
  