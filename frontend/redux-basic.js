const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  counter: 0
};

//reducer
const rootReducer = (state = initialState, action) => {
  if (action.type === "INC_COUNTER") {
    return {
      ...state,
      counter: state.counter + 1
    };
  }
  if (action.type === "DIC_COUNTER") {
    return {
      ...state,
      counter: state.counter + action.value
    };
  }

  return state;
};

// store
const store = createStore(rootReducer);
console.log(store.getState());

//Subscription

store.subscribe(() => {
  console.log("[Subscription]", store.getState());
});

//Dispatching Action
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "DIC_COUNTER", value: 10 });
console.log(store.getState());
