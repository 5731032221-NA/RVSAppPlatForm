import {
  GET_USER_LIST
} from "./action";
const initialState = {
  users: [{'id':"0",'name':'n'}],
};



const reducer = (state = initialState, action) => {
  console.log("action",action)
  const allUsers = [...state.users];
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        users: action.payload,
      };
    case "DEL_USER":
      const newState = {
        ...state,
        users: state.users.filter((item) => item.id !== action.payload),
      };
      return newState;
    case "ADD_USER":
      const addedState = {
        ...state,
        users: [action.payload, ...state.users],
      };
      return addedState;
    case "EDIT_USER":
      const indexForEdit = allUsers.findIndex((item) => {
        return item.id === action.payload.id;
      });
      console.log("index for editing", indexForEdit);
      allUsers[indexForEdit] = {
        id: action.id,
        name: action.name,
        email: action.email,
      };
      const editedState = {
        ...state,
        users: allUsers,
      };
      return editedState;
    default:
      break;
  }
  return state;
};
export default reducer;
