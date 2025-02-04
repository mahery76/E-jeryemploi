import React, { useEffect, useRef, useState } from 'react'
import getUserInfo from '../Api/getUserInfo'
import { Navigate } from 'react-router-dom'
import logoEjeryemploi from '../Assets/logo.png'


function Connexion() {
  //put into this all infos from form
  const [userInfo, setUserInfo] = useState({})
  //username from form
  const email = useRef()
  // password from form
  const password = useRef()
  // put here the response from get request
  const [resData, setResData] = useState({})
  // for checking if infos from form are ready to be shown
  const [showFormData, setShowFormData] = useState(false);

  // const isConnected = localStorage.getItem("isConnected")

  const onSubmit = (e) => {
    e.preventDefault()
    setUserInfo({
      email: email.current.value,
      password: password.current.value
    })
    // get the infos from form ready to be shown
    setShowFormData(true)
  }

  useEffect(() => {
    if (showFormData) {
      console.log("ireto ilay avy am forme", userInfo.email, userInfo.password)
      getUserInfo(userInfo)
    }
  }, [userInfo])



  // if (isConnected === "false") {
    return (
      <div className=' flex flex-col justify-center items-center h-screen '>
        <div className='bg-slate-50 border-2 border-gray-200 p-4 flex flex-col items-center rounded-xl'>
          <img src={logoEjeryemploi} className='mt-2 w-36' alt="" />

          <form className="p-8 flex flex-col justify-center items-center" onSubmit={onSubmit} >

            <input
              placeholder='Email'
              className="mb-8 text-center bg-white border border-sky-700 rounded-lg h-10 pl-2 w-64"
              type="text"
              ref={email}
            />
            <input
              placeholder='Mot de passe'
              className="mb-4 text-center bg-white border border-sky-700 rounded-lg h-10 pl-2 w-64"
              type="password"
              ref={password}
            />

            {/* buttons submit and reset */}
            <div className="w-full flex justify-between">
              <input
                className="cursor-pointer mt-2 mb-4 text-center border border-1  border-sky-700 rounded-lg h-10 px-2 hover:bg-sky-200 bg-sky-100   cursor-type"
                type="submit"
                value="Se connecter" />
              <input
                className="cursor-pointer mt-2 mb-4 text-center border border-1 border-pink-700 rounded-lg h-10 px-2 hover:bg-pink-200 bg-pink-100 cursor-type"
                type="reset"
                value="Effacer" />
            </div>

          </form>
        </div>
      </div>
    )
  // }
  // else if (isConnected === "true")  {
  //   return <Navigate replace to="/admin" />
  // }


}

export default Connexion