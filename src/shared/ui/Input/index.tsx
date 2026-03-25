type InputProps = React.ComponentProps<'input'> & {
  
}

export function Input(props: InputProps) {
  return (
    <input
      className="bg-gray-600 p-1 outline-none"
      {...props}
    />
  )
}