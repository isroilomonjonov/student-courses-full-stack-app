const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.item.token,
        user: action.item.user,
        isAuth: action.item.isAuth,
      };
    case "RESET":
      return {
        token: "",
        user: {},
        isAuth: false,
      };
    default:
      return state;
  }
};

export default appReducer;
