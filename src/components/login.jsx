import React, { useState } from 'react'
import { Input } from '../ui'
import { logo } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../slice/auth'
import AuthService from '../services/auth'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.auth)
    const loginHandler = async (e) => {
        e.preventDefault()
        dispatch(signUserStart())
        const user = { email, password }
        try {
            const response = await AuthService.userLogin(user)
            dispatch(signUserSuccess(response.user))
        } catch (error) {
            dispatch(signUserFailure(error.response.data.errors))
        }

    }
    return (
        <div className='text-center mt-5'>
            <main className="form-signin w-25 m-auto">
                <form>
                    <img className="mb-4" src={logo} alt="" width="92" />
                    <h1 className="h3 mb-3 fw-normal">Please login</h1>
                    <Input label={'Email Address'} state={email} setState={setEmail} />
                    <Input label={'Password'} state={password} setState={setPassword} type={'password'} />

                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit" onClick={loginHandler} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </main>
        </div>
    )
}

export default Login