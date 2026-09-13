import React from 'react'
import './style.scss'
import { RouterProvider } from 'react-router-dom'
import router from './App.routes.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'

function App() {

    
  return (
     <AuthProvider>
      <RouterProvider router={router}/>
     </AuthProvider> 
  )
  
}

export default App
