export default {
  requestToServer: (method, url, data) => {
    return new Promise((resolve, reject) => {

      let request = new Request(
        '/api' + url,
        {
          method,
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify(data)
        })

      fetch(request).then(fetchResponse => {
        if (!fetchResponse.ok) {
          return reject(fetchResponse.statusText)
        }

        return fetchResponse.json()
      }).then(resolve).catch(error => {
        console.error('requestDispatcher rejected ', error)
        reject(error)
      })
    })
  }
}