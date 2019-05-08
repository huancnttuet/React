const initialState = {
  count : 43
}

const session = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":

      break;
    case "SIGNOUT":

      break;
    default:
      return state
  }
}

export default session
