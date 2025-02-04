import axios from "axios"

const getUserInfo = async ({ email, password }) => {
 
    const actualEmail = "randrianjafymahery@gmail.com"
    const actualPassword = "lesdapery"

    console.log('ilay vao halefa ao am axios', email, password)
    // const res = await axios.get(`http://localhost:3001/api/users?username=${username}&password=${password}`)
    // console.log(res.data)
    
    // localStorage.setItem('userName', "Mahery")
    // localStorage.setItem('userRole', "Admin")
    
    if(email === actualEmail && password === actualPassword){
      localStorage.setItem('isConnected', "true")
      console.log('true avy aty am getUserInfo')
      window.location.assign("/admin")

    }
    else{
      alert('email ou mot de passe incorrecte')
    }
}
export default getUserInfo;


