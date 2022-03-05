export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    if (process.env.QIITA_TOKEN) {
      config.headers.common['Authorization'] = "Bearer " + process.env.QIITA_TOKEN
    }
    return config
  })

  $axios.onError(error => {
    if(error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
