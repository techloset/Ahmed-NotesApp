import React from 'react'
import StackNavigator from './src/navigation/StackNavigator'
import AuthContext from './src/auth/AuthContext'

const App = () => {
  return (
    <>
    <AuthContext>
       <StackNavigator/>
    </AuthContext>
    </>
  )
}

export default App
