const db = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_DB':
      return action.db
    case 'UPDATE_DB_ITEM':
      return {
          ...state,
          [action.key]: action.val
      }
    default:
      return state
  }
}
export default db