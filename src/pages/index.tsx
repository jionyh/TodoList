import { EmptyTodo } from '@/components/EmptyTodo'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { v4 as uuid } from 'uuid'
import { Todo } from '@/components/Todo'
import { TodoType } from '@/types/todo'
import { useEffect, useState } from 'react'

type TodoDone = {
  total: number
  done: number
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [inputTodo, setInputTodo] = useState('')
  const [loading, setLoading] = useState(false)
  const [todoDone, setTodoDone] = useState<TodoDone>({ total: 0, done: 0 })

  function checkTodoStorage() {
    setLoading(true)
    const todo = localStorage.getItem('todo')
    if (todo) {
      let newTodo: TodoType[] = JSON.parse(todo)
      setTodos(newTodo)
      let total = newTodo.length
      let done = newTodo.filter((item) => item.done === true).length
      setTodoDone({ total, done })
      setLoading(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    checkTodoStorage()
  }, [])

  function addTodo() {
    let id = uuid()
    let newTodos = [...todos, { id, todo: inputTodo, done: false }]
    localStorage.setItem('todo', JSON.stringify(newTodos))
    checkTodoStorage()
    setInputTodo('')
  }

  function deleteTodo(id: string) {
    let newTodos = todos.filter((item) => item.id !== id)
    localStorage.setItem('todo', JSON.stringify(newTodos))
    checkTodoStorage()
  }

  function markTodoDone(id: string) {
    let markedTodo = todos
    markedTodo.filter((item) => item.id === id).forEach((item) => (item.done = !item.done))
    localStorage.setItem('todo', JSON.stringify(markedTodo))
    checkTodoStorage()
  }

  return (
    <>
      {loading ? (
        <div>Carregando</div>
      ) : (
        <main className='lg:mx-[300px] p-3'>
          <div className='mt-[-27px] flex'>
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
            <div className='flex flex-col gap-1 mt-6'>
              {todos.length === 0 ? (
                <EmptyTodo />
              ) : (
                todos.map((item) => (
                  <Todo
                    key={item.id}
                    id={item.id}
                    todo={item.todo}
                    done={item.done}
                    fnDelete={deleteTodo}
                    fnEdit={markTodoDone}
                  />
                ))
              )}
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default TodoList
