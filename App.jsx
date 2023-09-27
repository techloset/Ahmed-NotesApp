import React from 'react'
import StackNavigator from './src/navigation/StackNavigator'
import AuthContext from './src/auth/AuthContext'
import ToastManager, { Toast } from 'toastify-react-native'

const App = () => {
  return (
    <>
     <ToastManager />
    <AuthContext>
       <StackNavigator/>
    </AuthContext>
    {/* <Toast /> */}
    </>
  )
}

export default App
