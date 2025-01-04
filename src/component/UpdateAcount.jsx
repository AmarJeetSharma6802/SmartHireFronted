import React, { useRef, useState } from 'react'
import axios from 'axios';
import "./Update.css"
import { useNavigate } from 'react-router-dom'

function UpdateAcount() {
  const [name , setName] =useState("")
  const [email , setemail] =useState("")
  const [phone , setPhone] =useState("")
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [oldPassword ,setOldPassword] =useState("")
  const [newPassword ,setNewPassword] =useState("")

  const passFormRef = useRef(null)

  const changePass =()=>{
    passFormRef.current.classList.toggle("show")
  }
  const closePass =()=>{
    passFormRef.current.classList.remove("show")
  }

  const navigate = useNavigate()
  const BackBtn = () => {
    navigate(-1); 
  };

  const LogoutBtn = () => {
    
    localStorage.removeItem("accessToken"); 
    navigate("/"); 
  }
  const accountUpdate =async(e)=>{
    e.preventDefault();  

   try {
     const res = await axios.patch("https://smart-hire-backend.vercel.app/api/updateAccount",{
       name,
       phone,
       email
     },
     {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
       }
     }
   )
   setSuccess(alert(res.data.message))
   setName("");
   setPhone("");
   setemail("");
   setError("")
   navigate("/smartHire")
   } catch (error) {
    setError(alert(error.response?.data?.message || "An error occurred."));
    setSuccess('');  
   }

  }

  const ChangePassword = async (e)=>{
    e.preventDefault();

    try {
    const response = await axios.post("https://smart-hire-backend.vercel.app/api/changePassword",{
      oldPassword:oldPassword,
      newPassword:newPassword
    },{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
  )
  setSuccess(alert(response.data.message))
  setOldPassword("");
  setNewPassword("");
  setError("");
  navigate("/smartHire");
      
    } catch (error) {
      setError(alert(error.response?.data?.message || "An error occurred."));
      setSuccess('');  
    }
  }
  return (
    <>
        <div className="back-logout">
            <div className="back" onClick={BackBtn}>  Back</div>
            <div className="password-change" onClick={changePass}>Change password</div>
            <div className="Logout" onClick={LogoutBtn}>Logout</div>
        </div>

        <div className="updateAccount-center">
            <form action="" className="from" onSubmit={accountUpdate}>
          <div className="updateAccount-text">Account Update</div> 
          {error && <h3 style={{ color: 'red' }}>{registerError}</h3>}
           {success && <h3 style={{ color: 'green' }}>{registerSuccess}</h3>}
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input type="text" id='updateName' className='updatename' value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input type="email" id='updateEmail' className='updatename' value={email} onChange={(e)=>setemail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="">Phone</label>
                <input type="text" id='updatePhone' className='updatename' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
              </div>
              <button type='submit' id='update-account'>Update account</button>
            </form>
        </div>

      <div className="password-from" ref={passFormRef}>
        <div className="form">
        <div className="close-1" onClick={closePass}>close</div>
          <form action="" id="passwordForm" onSubmit={ChangePassword}>
            <div className="form-group">
              <label htmlFor="">Old Password</label>
              <input type="text" value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)} className='pass-input' />
              
            </div>
            <div className="form-group">
              <label htmlFor="">New Password</label>
              <input type="text" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}  className='pass-input' />
            </div>
            <button className='passBtn' type='submit' >Update Password</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateAcount