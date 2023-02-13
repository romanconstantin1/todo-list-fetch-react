const apiUrl =
  'https://assets.breatheco.de/apis/fake/todos/user/romanconstantin1'

const initialState = {
  items: [],
  input: '',
  loading: true
}

const fetchData = async options => {
  const response = await fetch(apiUrl, options ? options : {})
  if (!response.ok) return false
  return await response.json()
}

const clearItems = async () => {
  const options = {
    method: 'DELETE'
  }
  await fetchData(options)
  await createList()
}

const updateItems = todo => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return todo.length === 0 ? clearItems() : fetchData(options)
}

const createList = () => {
  const options = {
    method: 'POST',
    body: JSON.stringify([]),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetchData(options)
}

const getItems = async () => {
  const options = {
    method: 'GET'
  }
  return await fetchData(options)
}

export { getItems, updateItems, clearItems, createList, initialState }
