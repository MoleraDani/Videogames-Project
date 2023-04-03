import { useRef, useState, useEffect } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const EMAIL_REGEX = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export function Register() {
  // const userRef = useRef()
  const emailRef = useRef()
  const errRef = useRef()

  //Estados para Usuario
  // const [user, setUser] = useState('')
  // const [validName, setValidName] = useState(false)
  // const [userFocus, setUserFocus] = useState(false)

  //Estados para email
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  //Estados para la password
  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  //Estados para comprobar password
  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  //Estados para mostrar mensajes segun resultado
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const { signup } = useAuth()

  //Ponemos focus en el email, cuando renderiza la pagina
  useEffect(() => {
    emailRef.current.focus()
  }, [])

  // Validacion de nombre de Usuario cada vez que se modifica el user
  // useEffect(() => {
  //   // const result = USER_REGEX.test(user)
  //   // console.log(result)
  //   // console.log(user)
  //   setValidName(USER_REGEX.test(user))
  // }, [user])

  // Validación de email
  useEffect(() => {
    // const result = USER_REGEX.test(email)
    // console.log(result)
    // console.log(email)
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  //Validacion si las contraseñas són iguales
  useEffect(() => {
    // const result = PWD_REGEX.test(pwd)
    // console.log(result)
    // console.log(pwd)
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  //Reiniciamos mensaje de error
  useEffect(() => {
    setErrMsg('')
  }, [email, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Si alguien habilita el boton forzosamente
    const v1 = EMAIL_REGEX.test(email)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg('Entrada no válida')
      return
    }

    try {
      await signup(email, pwd)
      setSuccess(true)
      // Reseteamos los valores
      setEmail('')
      setPwd('')
      setMatchPwd('')
    } catch (e) {
      setErrMsg(e.message)
      errRef.current.focus()
      //TODO gestionar los códigos de error para mostrarlos personalizados.
    }
    // setSuccess(true)
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Registrado!</h1>
          <br />{' '}
          <p>
            <Link to='/login'>Iniciar sesión</Link>
          </p>
        </section>
      ) : (
        <section>
          {/* Mostramos si hay error */}
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>
            {/* <label htmlFor='username'>
              Usuario:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)} // Cada vez que el usuario cambia le asignamos el nuevo valor
              value={user}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            /> */}
            {/* Cuando el focus esta en el input de usuario, mostramos la
            descripción */}
            {/* <p
              id='uidnote'
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              De 4 a 24 caracteres.
              <br />
              Debe empezar con una letra.
              <br />
              Se permiten letras, numeros, guiones y guiones bajos.
            </p> */}
            <label htmlFor='email'>
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type='email'
              id='email'
              ref={emailRef}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby='emailnote'
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            {/* Cuando el focus esta en el input de usuario, mostramos la
            descripción */}
            <p
              id='emailnote'
              className={
                emailFocus && email && !validEmail
                  ? 'instructions'
                  : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Debe ser un email válido.
            </p>
            <label htmlFor='password'>
              Constraseña:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id='pwdnote'
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              De 8 a 24 caracteres.
              <br />
              Debe incluir letras mayúsculas y minúsculas, un número y un
              carácter especial.
              <br />
              Se permiten los siguientes caracteres especiales:{' '}
              <span aria-label='exclamación'>!</span>{' '}
              <span aria-label='arroba'>@</span>{' '}
              <span aria-label='corchete'>#</span>{' '}
              <span aria-label='signo del dollar'>$</span>{' '}
              <span aria-label='porcentaje'>%</span>
            </p>
            <label htmlFor='confirm_pwd'>
              Confirmar Contraseña:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type='password'
              id='confirm_pwd'
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id='confirmnote'
              className={
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Debe coincidir con el primer campo de entrada de contraseña
            </p>
            <button
              disabled={!validEmail || !validPwd || !validMatch ? true : false}
            >
              Registrarse
            </button>
          </form>
          <p>
            Ya estas registrado?
            <br />
            <span className='line'>
              {/*router link*/}
              <Link to='/login'>Iniciar sesión</Link>
            </span>
          </p>
        </section>
      )}
    </>
  )
}