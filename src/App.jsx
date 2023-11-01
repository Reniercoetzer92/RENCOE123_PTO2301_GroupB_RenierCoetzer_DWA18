import {Signup, Login, Homepage, Landingzone} from "./Helpers/Index_Pages";
import {Routes, Route} from "react-router-dom";
import {useState, useEffect} from "react"

export default function App() {
  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect (() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  return (
    <div>
      <Routes>
        <Route path={'/'} element={ <Landingzone /> }/>  
        {token?<Route path={'/Homepage'} element={ <Homepage token ={token}/> }/> :""}
        <Route path={'/signup'} element={ <Signup /> }/>
        <Route path={'/login'} element={<Login setToken={setToken} />}/>
      </Routes>
  </div>
  )
}