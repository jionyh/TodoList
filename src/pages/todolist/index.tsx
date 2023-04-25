import { Badge } from '@/components/Badges'
import { EmptyTodo } from '@/components/EmptyTodo'
import { InputTask } from '@/components/InputTask'
import { Todo } from '@/components/Todo'
import { TodoType } from '@/types/todo'
import { useEffect, useState } from 'react'

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState<Number>(0)

  useEffect(() => {
    setLoading(true)
    const todo = localStorage.getItem('todo')

    if (!todo) {
      setLoading(false)
      return
    }

    setTodos(JSON.parse(todo))
  }, [])

  return (
    <main className=' mx-[352px]'>
      <InputTask />
      <div className='mt-16'>
        <div className='flex justify-between text-sm font-bold'>
          <Badge
            title={'Tarefas Criadas'}
            count={0}
          />
          <Badge
            title={'Tarefas Concluídas'}
            count={2}
          />
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
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default TodoList
