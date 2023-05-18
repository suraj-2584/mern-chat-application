import React ,{useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import signInImage from '../assets/signup.png'

const cookies = new Cookies()
const initialiState = {
    'fullName':'',
    'userName':'',
    'phoneNumber': '',
    'password':'',
    'avatarUrl':'',
    'confirmPassword':'',

}
const Auth = () => {
  const [isSignIn,setIsSignIn] = useState(false)
  
  const [form,setForm]=useState(initialiState)
  const handleChange=(event)=>{
    setForm({...form,[event.target.name]:event.target.value})
  }
  const switchMode=()=>{
    setIsSignIn((prevIsSignIn)=>{
        return !prevIsSignIn
    })
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const {avatarUrl,userName,phoneNumber, password} = form

    const URL = 'https://chat-application-api.onrender.com/auth';

    const {data} = await axios.post(`${URL}/${isSignIn?'login':'signup'}`,{
        userName,password,avatarUrl,fullName:form.fullName,phoneNumber
    })

    const {token,hashedPassword,userId,fullName} = data

    cookies.set('token',token)

    cookies.set('userId',userId)

    cookies.set('fullName',fullName)

    cookies.set('userName',userName)
    
    if(!isSignIn){
        cookies.set('phoneNumber',phoneNumber)
        cookies.set('avatarUrl',avatarUrl)
        cookies.set('hashedPassword',hashedPassword)
    }
    window.location.reload()
  }
  return (
    <div className='auth__form-container'>
        <div className='auth__form-container_fields'>
            <div className='auth__form-container_fields-content'>
                <p>{isSignIn?'Sign In':'Sign Up'}</p>

                <form onSubmit={handleSubmit}>
                    {!isSignIn && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Full Name</label>
                            <input 
                            name='fullName' 
                            placeholder='Full Name' 
                            type='text'
                            onChange={handleChange} required
                            />
                        </div>
                    )}

                    
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='userName'>User Name</label>
                        <input 
                        name='userName' 
                        placeholder='User Name' 
                        type='text'
                        onChange={handleChange} required
                        />
                    </div>
                    
                    {!isSignIn && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input 
                            name='phoneNumber' 
                            placeholder='Phone Name' 
                            type='number'
                            onChange={handleChange} required
                            />
                        </div>
                    )}

                    {!isSignIn && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='avatarUrl'>Avatar URL</label>
                            <input 
                            name='avatarUrl' 
                            placeholder='Avatar URL' 
                            type='text'
                            onChange={handleChange} required
                            />
                        </div>
                    )}

                   
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='password'>Password</label>
                        <input 
                        name='password' 
                        placeholder='Password' 
                        type='password'
                        onChange={handleChange} required
                        />
                    </div>
                 

                    {!isSignIn && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input 
                            name='confirmPassword' 
                            placeholder='Confirm Password' 
                            type='password'
                            onChange={handleChange} required
                            />
                        </div>
                    )}

                    <div className='auth__form-container_fields-content_button'>
                        <button type='submit'>
                            {isSignIn?"Login":"Sign Up"}
                        </button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                    <p>
                        {isSignIn ?`Don't have an account? `:'Already Have an account? '}
                        <span onClick={switchMode}>
                            {isSignIn?' Sign Up':' Sign In'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Auth
