import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import OAuth from '../components/OAuth'
import {setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false) // Password toggle
    const [formData, setFormData] =useState({
        name: '',
        email: '',
        password: ''
    }) 
    
    const{ name, email, password } = formData
    
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = {...formData} // Making a copy of the form data state
            delete formDataCopy.password // Deleting password so as not to add to Database
            formDataCopy.timestamp = serverTimestamp() // getting the time stamp as to when the account was created


            await setDoc(doc(db, 'users', user.uid), formDataCopy) //returns a promise

            navigate('/')
        } catch (error) {
            toast.error('Something went wrong with your registration')
        }
    }


    return(
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome Back!</p>
                </header>
                <main>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="name" 
                            className='nameInput' 
                            placeholder='Name' 
                            id='name' 
                            value={name} 
                            onChange={onChange}
                        />

                        <input 
                            type="email" 
                            className='emailInput' 
                            placeholder='Email' 
                            id='email' 
                            value={email} 
                            onChange={onChange}
                        />

                            <div className="passwordInputDiv">
                                <input 
                                    type={showPassword 
                                    ? 'text' 
                                    : 'password'} 
                                    className='passwordInput' 
                                    placeholder='Password' 
                                    id='password' 
                                    value={password}
                                    onChange={onChange}
                                />  
                                <img 
                                    src={visibilityIcon} 
                                    alt="showPassword" 
                                    className="showPassword"
                                    onClick={() => setShowPassword((prevState) => !prevState)}
                                />
                            </div>
                            <Link to='/forgotpassword' className='forgotPasswordLink'>
                                Forgot Password
                            </Link>

                            <div className="signUpBar">
                                <p className="signUpText">Sign Up</p>
                                <button className="signUpButton">
                                    <ArrowRightIcon fill='#fff' width='34px' height='34px'/>
                                </button>
                            </div>
                    </form>

                    <OAuth className='openAuth'/>

                    <Link to='/signin' className='registerLink'>Sign In Instead</Link>
                </main>
            </div>
        </>
    )
}

export default SignUp