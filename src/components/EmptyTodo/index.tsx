import Image from 'next/image'
import clipboard from '@/assets/Clipboard.svg'

export const EmptyTodo = () => {
  return (
    <div className='text-cinza-300 text-base text-center flex flex-col justify-center items-center'>
      <Image
        className='mt-20 mb-4'
        src={clipboard}
        alt=''
      />
      <p className='font-bold'>Você ainda não tem tarefas cadastradas</p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}
