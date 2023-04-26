type Props = {
  title: string
  done?: number
  total?: number
  created?: boolean
}

export const Badge = ({ title, done, total = 0, created }: Props) => {
  return (
    <span className='text-purple'>
      {title}
      <span className='bg-cinza-400 rounded-full text-cinza-200 py-0.5 px-2 ml-3'>{created ? total : `${done} de ${total}`}</span>
    </span>
  )
}
