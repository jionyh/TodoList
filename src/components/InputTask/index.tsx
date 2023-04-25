import Image from 'next/image'
import plus from '@/assets/plus.svg'

export const InputTask = () => {
  const setLocalStorage = async () => {
    const todo = [
      { id: 'afasfafafa', todo: 'Tarefa à fazer', done: false },
      { id: 'dasdaewaea', todo: 'Tarefa à fazer 2', done: true },
    ]
    localStorage.setItem('todo', JSON.stringify(todo))
    console.log('salvei no localStorage')
  }

  return (
    <div className='mt-[-27px] flex'>
      <input
        className='bg-cinza-500 border-[1px] border-cinza-700 text-cinza-300 text-base p-4 rounded-lg flex-1 focus:outline-none focus:border-purple-dark focus:text-cinza-100'
        type='text'
        placeholder='Adicione uma nova tarefa'
      />
      <button
        className='ml-2 flex p-4 items-center cursor-pointer bg-blue-dark rounded-lg text-cinza-100 hover:bg-blue'
        onClick={setLocalStorage}>
        Criar{' '}
        <Image
          className='ml-2'
          src={plus}
          alt=''
          height={16}
          width={16}
        />
      </button>
    </div>
  )
}
