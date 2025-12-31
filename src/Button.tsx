type Props = {
  title: string
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export const Button = ({
                         title,
                         onClick,
                         disabled,
                         className
                       }: Props) => {
  return <button
    onClick={onClick}
    disabled={disabled}
    className={className}
  >{title}</button>
}