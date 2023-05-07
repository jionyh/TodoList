import { Header } from '@/components/Header'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasErrror, sethasError] = useState(false)

  const handleLogin = async () => {
    const request = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (request && request.ok) {
      if (router.query.callbackUrl) {
        router.push(router.query.callbackUrl as string)
      } else {
        router.push('/')
      }
    } else {
      sethasError(true)
    }
  }

  return (
    <div>
      <Header />
      <Head>
        <title>Login</title>
      </Head>
      <div className='w-80 p-6 bg-cinza-400 m-auto rounded-lg shadow-lg'>
        <h1 className='text-cinza-100 text-center text-xl mb-3'>Login</h1>
        <div className='flex flex-col gap-2 justify-center items-end'>
          <input
            className='w-full bg-cinza-500 border-[1px] border-cinza-700 text-cinza-300 text-base p-3 rounded-lg flex-1 focus:outline-none focus:border-purple-dark focus:text-cinza-100'
            type='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Digite o seu Email'
          />
          <input
            className='w-full bg-cinza-500 border-[1px] border-cinza-700 text-cinza-300 text-base p-3 rounded-lg flex-1 focus:outline-none focus:border-purple-dark focus:text-cinza-100'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Digite sua Senha'
          />
          <button
            onClick={handleLogin}
            className='w-fit flex p-1 items-center cursor-pointer bg-blue-dark rounded-lg text-cinza-100 hover:bg-blue'>
            Entrar
          </button>
          {hasErrror && <p className='text-danger'>Usuário ou senha Inválido!</p>}
        </div>

        <hr className='my-2' />
        <div className='flex flex-col items-end mt-4 gap-2 justify-center'>
          <p className='text-cinza-100 text-lg'>Não tem cadastro?</p>
          <Link href={'/cadastrar'}>
            <button className='w-fit flex p-1 items-center cursor-pointer bg-blue-dark rounded-lg text-cinza-100 hover:bg-blue'>
              Cadastrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
