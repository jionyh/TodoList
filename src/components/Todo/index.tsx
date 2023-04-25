import { FiTrash2 } from 'react-icons/fi'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { MdOutlineCircle } from 'react-icons/md'

type Props = {
  id: string
  todo: string
  done: boolean
}

export const Todo = ({ id, todo, done }: Props) => {
  return (
    <div className='flex items-center justify-between p-4 bg-cinza-500 border-[1px] border-cinza-400  text-sm text-cinza-100 leading-normal rounded-lg cursor-pointer group'>
      <button>
        {done ? (
          <AiOutlineCheckCircle
            size={16}
            className='text-blue group-hover:text-blue-dark'
          />
        ) : (
          <MdOutlineCircle
            size={16}
            className='text-purple group-hover:text-purple-dark'
          />
        )}
      </button>
      <span>{todo}</span>
      <button>
        <FiTrash2
          size={16}
          className='text-cinza-300 group-hover:text-danger'
        />
      </button>
    </div>
  )
}
