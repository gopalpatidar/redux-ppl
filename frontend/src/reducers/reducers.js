import { ADD_ITEM, P_HOME } from "../actions/actions";

const Istate = {
  Category: "All",
  profile:'home'
};

export const reducer = (state = Istate, action) => {
  console.log("reducer", action.data);
  switch (action.type) {
    case ADD_ITEM:
      let newState = {
        ...state,
        Category: action.data
      };
      return newState;
    case P_HOME:
      let profileH = {
        ...state,
        profile: action.data
      };
      return profileH;
    default:
      return state;
  }
};
