type Props = {
  title: string
  count: number
  total?: number
}

export const Badge = ({ title, count, total }: Props) => {
  return (
    <span className='text-purple'>
      {title}
      <span className='bg-cinza-400 rounded-full text-cinza-200 py-0.5 px-2 ml-3'>{count}</span>
    </span>
  )
}
