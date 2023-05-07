import { EmptyTodo } from '@/components/EmptyTodo'
import { AiOutlineCaretDown, AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineUser } from 'react-icons/ai'
import { Todo } from '@/components/Todo'
import { TodoType } from '@/types/todo'
import { useEffect, useState } from 'react'
import api from '@/libs/api'
import { useRouter } from 'next/router'
import { Header } from '@/components/Header'
import { signOut } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { authOptions } from './api/auth/[...nextauth]'
import { User } from '@/types/user'

type TodoDone = {
  total: number
  done: number
}

type Props = {
  todo: TodoType[]
  loggedUser: User
}

const TodoList = ({ todo, loggedUser }: Props) => {
  const router = useRouter()

  const headers = {
    'Content-Type': 'application/json',
  }

  const [todos, setTodos] = useState<TodoType[]>(todo)
  const [inputTodo, setInputTodo] = useState('')
  const [loading, setLoading] = useState(false)
  const [todoDone, setTodoDone] = useState<TodoDone>({ total: 0, done: 0 })
  const [dropDownOpen, setDropDownOpen] = useState(false)

  const loadTodos = async () => {
    const req = await fetch(`/api/todo?userId=${loggedUser.id}`)
    const json = await req.json()
    setTodos(json.todos)
  }

  const addTodo = async () => {
    if (inputTodo) {
      const req = await fetch('/api/todo', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: inputTodo,
          userId: loggedUser.id,
        }),
      })
      if (req.ok) {
        setInputTodo('')
        loadTodos()
        return
      }
    }

    alert('Erro ao criar a tarefa!')
  }

  const deleteTodo = async (id: string) => {
    const req = await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
      headers,
    })
    if (req.ok) {
      loadTodos()
      return
    }
    alert('Erro ao deletar a tarefa!')
  }

  const markTodoDone = async (id: string, done: boolean) => {
    const req = await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        done: done.toString(),
      }),
    })
    if (req.ok) {
      loadTodos()
      return
    }
    alert('Erro ao marcar tarefa!')
  }

  useEffect(() => {
    let total = todos.length
    let done = todos.filter((item) => item.done === true).length
    setTodoDone({ total, done })
  }, [todos])

  return (
    <>
      {loading ? (
        <div>Carregando</div>
      ) : (
        <div>
          <nav className='bg-cinza-700'>
            <div className='lg:mx-[300px] p-5 pr-10 flex flex-col  items-end bg-gradient-to-l from-cinza-600 to-cinza-700 text-cinza-100 rounded-lg shadow-xl'>
              <div className='flex-1 flex items-center justify-center gap-2'>
                <AiOutlineUser
                  size={20}
                  className='text-purple-dark'
                />
                <span className='text-cinza-300 text-xs flex items-center justify-center'>
                  {loggedUser.name.toUpperCase()}
                  <AiOutlineCaretDown
                    onClick={() => setDropDownOpen(!dropDownOpen)}
                    className=' ml-2 text-cinza-100 cursor-pointer'
                    size={16}
                  />
                </span>
              </div>
              {/* Inicio do Dropdown */}
              {dropDownOpen && (
                <div className='relative'>
                  <div className='absolute right-0 w-32 bg-cinza-400 rounded-lg shadow-xl'>
                    <div className='flex flex-col items-center justify-center'>
                      <button
                        className='bg-cinza-500 w-full p-1 flex items-center justify-center gap-2'
                        onClick={() => signOut()}>
                        <span>Sair</span>
                        <AiOutlineCloseCircle
                          size={18}
                          className='text-danger'
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Fim do Dropdown */}
            </div>
          </nav>
          <Header />
          <main className='lg:mx-[300px] p-3'>
            <div className='flex'>
              <input
                className='bg-cinza-500 border-[1px] border-cinza-700 text-cinza-300 text-base p-4 rounded-lg flex-1 focus:outline-none focus:border-purple-dark focus:text-cinza-100'
                type='text'
                autoFocus
                placeholder='Adicione uma nova tarefa'
                value={inputTodo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTodo(e.target.value)}
              />
              <button
                className='ml-2 flex p-4 items-center cursor-pointer bg-blue-dark rounded-lg text-cinza-100 hover:bg-blue'
                onClick={addTodo}>
                Criar{' '}
                <AiOutlinePlusCircle
                  className='ml-2'
                  size={18}
                />
              </button>
            </div>
            <div className='mt-16'>
              <div className='flex justify-between text-sm font-bold'>
                <span className='text-purple'>
                  Tarefas Criadas
                  <span className='bg-cinza-400 rounded-full text-cinza-200 py-0.5 px-2 ml-3'>{todoDone.total}</span>
                </span>

                <span className='text-purple'>
                  Tarefas Concluídas
                  <span className='bg-cinza-400 rounded-full text-cinza-200 py-0.5 px-2 ml-3'>
                    {todoDone.done} de {todoDone.total}
                  </span>
                </span>
              </div>
              <div className='flex flex-col gap-1 mt-6 transition-all'>
                {todos.length === 0 ? (
                  <EmptyTodo />
                ) : (
                  todos.map((item) => (
                    <Todo
                      key={item.id}
                      id={item.id}
                      todo={item.title}
                      done={item.done}
                      fnDelete={deleteTodo}
                      fnEdit={markTodoDone}
                    />
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  )
}

export default TodoList

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) return { redirect: { destination: '/login', permanent: true } }

  const todo = await api.getTodoByUserId(parseInt(session.user.id))

  return {
    props: {
      loggedUser: session.user,
      todo,
    },
  }
}
