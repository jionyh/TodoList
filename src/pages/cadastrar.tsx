import { Header } from '@/components/Header'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Cadastrar = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Senhas não conferem')
      setPassword('')
      setConfirmPassword('')
    }
    if (email && name && password === confirmPassword) {
      const req = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (req.ok) {
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
        }
      }
    }
  }

  return (
    <div>
      <Header />
      <Head>
        <title>Cadastrar</title>
      </Head>
      <div className='w-80 p-6 bg-cinza-400 m-auto rounded-lg shadow-lg'>
        <h1 className='text-cinza-100 text-center text-xl mb-3'>Cadastro</h1>
        <div className='flex flex-col gap-2 justify-center items-end'>
          <input
            className='w-full bg-cinza-500 border-[1px] border-cinza-700 text-cinza-300 text-base p-3 rounded-lg flex-1 focus:outline-none focus:border-purple-dark focus:text-cinza-100'
            type='email'
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Digite o seu Nome'
          />
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
          <input
            className='w-full bg-cinza-500 border-[1px] border-cinza-700 text-cinza-300 text-base p-3 rounded-lg flex-1 focus:outline-none focus:border-purple-dark focus:text-cinza-100'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirme a senha'
          />
          <button
            onClick={handleSignUp}
            className='w-fit flex p-1 items-center cursor-pointer bg-blue-dark rounded-lg text-cinza-100 hover:bg-blue'>
            Cadastrar
          </button>
        </div>
        {error && (
          <div>
            <span className='text-danger'>{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cadastrar
