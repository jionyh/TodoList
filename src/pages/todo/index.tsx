import { Todo } from '@/types/todo'

type Props = {
  todo: Todo[]
}

const todo = ({ todo }: Props) => {
  return (
    <div>
      <h1 className='text-3xl text-center border-b'>Lista de Tarefas</h1>
      <ul className='m-2 list-group'>
        {todo.map((item) => (
          <li
            key={item.id.toString()}
            className={`${item.completed === true ? 'text-green-700' : 'text-red-700'} list-group-item`}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default todo

export const getServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const todoList: Todo[] = await res.json()

  return {
    props: {
      todo: todoList,
    },
  }
}
