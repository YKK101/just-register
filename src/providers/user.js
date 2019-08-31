import axios from 'axios'

const register = async (userData, onSuccess = () => {}, onError = () => {}) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/register`, userData)
    onSuccess(data.data)
  } catch(err) {
    console.log(err)
    onError(err)
  }
}

export default {
  register,
}