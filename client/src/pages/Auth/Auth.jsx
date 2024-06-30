import React, { useState, useEffect } from 'react';
import './AuthStyled.css';
import { Input } from '../../components/Input/Input'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod'
import { signinSchema } from '../../schemas/signinSchema';
import { signupSchema } from '../../schemas/signupSchema';
import { ErrorSpan } from './ErrorSpanStyled';
import { signup } from '../../services/userServices';
import { signin } from '../../services/userServices';
import Cookies from "js-cookie";
import { useAuth } from '../../Context/AuthContext';

const Auth = () => {
  const { login } = useAuth()

  const [visible, setVisible] = useState(false)

  const {
    register: registerSignup, 
    handleSubmit: handleSubmitSignup,
    reset: resetSignup,
    formState: {errors: errorsSignup}
  } = useForm({resolver: zodResolver(signupSchema)})
  
  const {
    register: registerSignin, 
    handleSubmit: handleSubmitSignin,
    reset: resetSignin,
    formState: {errors: errorsSignin}
  } = useForm({resolver: zodResolver(signinSchema)})
  
  const navigate = useNavigate()

  async function signinHandleSubmit(data){
    try {
      const response = await signin(data)
      Cookies.set("token", response.data, { expires: 1 })
      login()
      navigate('/home')
    } catch (error){
      setVisible(true)
    }
  }

  async function signupHandleSubmit(data){
    try {
      const response = await signup(data)
      Cookies.set("token", response.data, { expires: 1 })
      login()
      navigate('/home')
    } catch (error){
      setVisible(true)
    }
  }

  const [isRegistro, setIsRegistro] = useState(true);

  const handleRegistroClick = () => {
    setIsRegistro(true);
    setVisible(false)
    resetSignup()
  };

  const handleLoginClick = () => {
    setIsRegistro(false);
    setVisible(false)
    resetSignin()
  };

  return (
    <div className="container">
      <div className={`form-container ${isRegistro ? 'registro' : 'login'}`}>
        <div className="toggle">
          <button 
            id="registro-btn" 
            className={isRegistro ? 'active' : ''} 
            onClick={handleRegistroClick}
          >
            Registro
          </button>
          <button 
            id="login-btn" 
            className={!isRegistro ? 'active' : ''} 
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
        <form id="form-content" onSubmit={isRegistro ?  handleSubmitSignup(signupHandleSubmit): handleSubmitSignin(signinHandleSubmit)}>
          {isRegistro ? (
            <>
              <Input type="text" name="name" placeholder="Nome" register={registerSignup}/>
              {errorsSignup.name && <ErrorSpan> {errorsSignup.name.message} </ ErrorSpan>}
              <Input type="email" name="email" placeholder="E-mail" register={registerSignup}/>
              {errorsSignup.email && (<ErrorSpan> {errorsSignup.email.message} </ ErrorSpan>)}
              <Input type="password" name="password" placeholder="Senha" register={registerSignup}/>
              {errorsSignup.password && <ErrorSpan> {errorsSignup.password.message} </ ErrorSpan>}
              <Input type="password" name="confirmPassword" placeholder="Confirmação de senha" register={registerSignup}/>
              {errorsSignup.confirmPassword && <ErrorSpan> {errorsSignup.confirmPassword.message} </ ErrorSpan>}
              {visible && <ErrorSpan> Email já cadastrado </ ErrorSpan>}
            </>
          ) : (
            <>
              <Input type="email" name="email" placeholder="E-mail" register={registerSignin}/>
              {errorsSignin.email && (<ErrorSpan> {errorsSignin.email.message} </ ErrorSpan>)}
              <Input type="password" name="password" placeholder="Senha" register={registerSignin}/>
              {errorsSignin.password && <ErrorSpan> {errorsSignin.password.message} </ ErrorSpan>}
              {visible && <ErrorSpan> Email ou senha incorretos </ ErrorSpan>}
            </>
          )}
          <div className="entrar-checkbox-container">
            <button className="entrar-container" type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;