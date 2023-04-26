import React from 'react'
import Image from 'next/image'
import plus from '@/assets/plus.svg'
import { v4 as uuid } from 'uuid'
import { ReactElement, ReactEventHandler, useState } from 'react'
import { TodoType } from '@/types/todo'

type Props = {
  handle: (todo: TodoType) => void
}

export const InputTask = ({ handle }: Props) => {
  const setLocalStorage = async () => {
    const todo = [
      { id: 'afasfafafa', todo: 'Tarefa à fazer', done: false },
      { id: 'dasdaewaea', todo: 'Tarefa à fazer 2', done: true },
    ]
    localStorage.setItem('todo', JSON.stringify(todo))
  }
  const [inputTodo, setInputTodo] = useState('')

  function addTodo() {
    let id = uuid()
    let todo = inputTodo

    handle({
      id,
      todo,
      done: false,
    })
  }

  return (
    <div className='mt-[-27px] flex'>
      <input
        className='bg-cinza-500 border-[1px] border-cinza-700 text-cinza-300 text-base p-4 rounded-lg flex-1 focus:outline-none focus:border-purple-dark focus:text-cinza-100'
        type='text'
        placeholder='Adicione uma nova tarefa'
        value={inputTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTodo(e.target.value)}
      />
      <button
        className='ml-2 flex p-4 items-center cursor-pointer bg-blue-dark rounded-lg text-cinza-100 hover:bg-blue'
        onClick={addTodo}>
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
