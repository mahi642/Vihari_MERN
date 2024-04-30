import { useContext, useState } from 'react'
import '../components/CSS/Login.css'
import Navbar from '../components/UI/Navbar'
import Footer from '../components/UI/Footer'
import { useNavigate } from 'react-router-dom'
import userContext from '../context/User/userContext'

const Login = () => {
	const navigate = useNavigate()
	const { verifyUser, createUser } = useContext(userContext)
	const [loginCreds, setloginCreds] = useState({ email: '', password: '' })
	const onLoginInput = (e) => {
		setloginCreds({ ...loginCreds, [e.target.name]: e.target.value })
	}
	const HandleLogin = async (e) => {
		e.preventDefault()
		const response = await verifyUser(loginCreds.email, loginCreds.password)
		if (response.success) {
			localStorage.token = response.authToken
			if (response.user.email === 'vihari.t05@gmail.com') {
				navigate('/admindb/adminhome')
			}
			else {
				navigate('/')
			}
		}
		else {
			if (response.error) {
				alert(response.error)
			}
		}
		setloginCreds({ email: '', password: '' })
	}
	const [SignupCreds, setSignupCreds] = useState({ fname: '', lname: '', email: '',mobile:'', password: '', cpassword: '' })
	const onSignupInput = (e) => {
		setSignupCreds({ ...SignupCreds, [e.target.name]: e.target.value })
	}
	const HandleSignup = async (e) => {
		e.preventDefault()
		const { fname, lname, email, password, cpassword, mobile} = SignupCreds
		if (password !== cpassword) {
			alert('Password mismatch')
		}
		else {
			const response = await createUser(fname, lname, email, mobile, password)
			if (response.success) {
				localStorage.token = response.authToken
				navigate('/')
			}
			else {
				if (response.error) {
					alert(response.error)
				}
			}
			setSignupCreds({ fname: '', lname: '', email: '',mobile:'', password: '', cpassword: ''})
		}
	}
	return (
		<>
			<Navbar />
			<div className="login-body">
				<div className="main">
					<input className='login-input' type="checkbox" id="chk" aria-hidden="true" />
					<div className="signup">
						<form>
							<label htmlFor="chk" className='login-label' aria-hidden="true">Sign up</label>
							<input className='signup-input' type="text" name="fname" onChange={onSignupInput} value={SignupCreds.fname} placeholder="First name" required=""/>
							<input className='signup-input' type="text" name="lname" onChange={onSignupInput} value={SignupCreds.lname} placeholder="Last name" required="" />
							<input className='signup-input' type="text" name="mobile" onChange={onSignupInput} value={SignupCreds.mobile} placeholder="Phone" required="" minLength={10} maxLength={10}/>
							<input className='signup-input' type="email" name="email" onChange={onSignupInput} value={SignupCreds.email} placeholder="Email" required="" />
							<input className='signup-input' type="password" name="password" onChange={onSignupInput} value={SignupCreds.password} placeholder="Password" required="" />
							<input className='signup-input' type="password" name="cpassword" onChange={onSignupInput} value={SignupCreds.cpassword} placeholder="Confirm Password" required="" />
							<button className='login-submit' onClick={HandleSignup}>Sign up</button>
						</form>
					</div>
					<div className="login">
						<form>
							<label htmlFor="chk" className='login-label' aria-hidden="true">Login</label>
							<input className='login-input' type="email" name="email" onChange={onLoginInput} value={loginCreds.email} placeholder="Email" required />
							<input className='login-input' type="password" name="password" onChange={onLoginInput} value={loginCreds.password} placeholder="Password" required />
							<button className='login-submit' onClick={HandleLogin}>Login</button>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Login