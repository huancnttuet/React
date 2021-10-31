
var initial =  {
  authenticate: localStorage.getItem("authenticate"),
  id : localStorage.getItem("id"),
  level: localStorage.getItem("level")
}

const rootReducer = (state = initial ,action ) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem("authenticate",true)
      localStorage.setItem("id", action.payload.id)
      localStorage.setItem("level", action.payload.level)
      return { authenticate: true , id: action.payload.id, level: action.payload.level}

    case 'LOGOUT':
      localStorage.clear()
     return { authenticate: false , id: 0, level: 0}
    default:
      return state
  }
}

export default rootReducer