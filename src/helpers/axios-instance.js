import axios from 'axios'

export default () => {
  const baseURL = "https://pokeapi.co/api/v2/"

  const axiosInstance = axios.create({
    baseURL,
  })

  axiosInstance.interceptors.response.use(
    (response) => new Promise((resolve) => {
        resolve(response)
      }),
    (error) => {
      if (!error.response) {
        return new Promise((reject) => {
          reject(error)
        })
      }
        return null
    },
  )

  return axiosInstance
}
