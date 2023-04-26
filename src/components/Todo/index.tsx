import { FiTrash2 } from 'react-icons/fi'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { MdOutlineCircle } from 'react-icons/md'

type Props = {
  id: string
  todo: string
  done: boolean
  fnDelete?: (id: string) => void
  fnEdit?: (id: string) => void
}

export const Todo = ({ id, todo, done, fnDelete, fnEdit }: Props) => {
  const handleDelete = () => {
    if (!fnDelete) return
    fnDelete(id)
  }

  const handleEdit = () => {
    if (!fnEdit) return
    fnEdit(id)
  }

  return (
    <div className='flex items-center justify-between p-4 bg-cinza-500 border-[1px] border-cinza-400  text-sm text-cinza-100 leading-normal rounded-lg cursor-pointer'>
      <button
        className='mr-5'
        onClick={handleEdit}>
        {done ? (
          <AiOutlineCheckCircle
            size={22}
            className='text-blue hover:text-blue-dark'
          />
        ) : (
          <MdOutlineCircle
            size={22}
            className='text-purple hover:text-purple-dark'
          />
        )}
      </button>
      <span className={`flex-1  text-left ${done ? 'line-through text-cinza-300' : ''}`}>{todo}</span>
      <button className='ml-5'>
        <FiTrash2
          size={22}
          className='text-cinza-300 hover:text-danger'
          onClick={handleDelete}
        />
      </button>
    </div>
  )
}
