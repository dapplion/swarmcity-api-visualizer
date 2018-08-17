const rooms = (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_ROOMS':
        return action.rooms
      default:
        return state
    }
  }
  export default rooms