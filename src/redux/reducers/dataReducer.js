import {
    SET_CHAT_ROOM_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    LOADING_DATA,
    DELETE_POST,
    CREATE_POST,
    SET_POST,
    SUBMIT_COMMENT
  } from '../actionTypes';
  
  const initialState = {
    chatRoomPosts: [],
    post: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_CHAT_ROOM_POSTS:
        return {
          ...state,
          chatRoomPosts: action.payload,
          loading: false
        };
      case SET_POST:
        return {
          ...state,
          post: action.payload
        };
      case LIKE_POST:
      case UNLIKE_POST:
        let index = state.chatRoomPosts.findIndex(
          (post) => post.postId === action.payload.postId
        );
        state.chatRoomPosts[index] = action.payload;
        if (state.post.postId === action.payload.postId) {
          state.post = action.payload;
        }
        return {
          ...state
        };
      case DELETE_POST:
        index = state.chatRoomPosts.findIndex(
          (post) => post.postId === action.payload
        );
        state.chatRoomPosts.splice(index, 1);
        return {
          ...state
        };
      case CREATE_POST:
        return {
          ...state,
          chatRoomPosts: [action.payload, ...state.chatRoomPosts]
        };
      case SUBMIT_COMMENT:
        return {
          ...state,
          post: {
            ...state.post,
            comments: [action.payload, ...state.post.comments]
          }
        };
      default:
        return state;
    }
  }
  