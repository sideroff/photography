import React, { useEffect } from 'react'

import requestDispatcher from 'services/requestDispatcher'

export default function Home() {

  useEffect(() => {
    console.log('calling request')
    requestDispatcher.requestToServer('GET', '/users/1').then(response => {
      console.log('received response')
    }).catch(error => { })
  }, [])

  return (
    <div>home page</div>
  )
}