import React, { createContext, useState } from 'react'


export const ContextAuth = createContext() 
export default function AuthContext({children}) {
      const [userInfo, setuserInfo] = useState()
    const  AuthData = (userdata) =>{
         setuserInfo(userdata);
    }
      //  console.log("Userifoooooo",userInfo)
  return (
    <>
     <ContextAuth.Provider value={{userInfo, AuthData}}>
        {children}
     </ContextAuth.Provider>
    </>
  )
}
