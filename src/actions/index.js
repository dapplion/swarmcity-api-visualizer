export const updateDb = db => ({
    type: 'UPDATE_DB',
    db
})
  ​
export const updateDbItem = item => ({
    type: 'UPDATE_DB_ITEM',
    key: item.key,
    val: item.val
})
  ​
