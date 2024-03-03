import { Button } from '@/components/ui/button'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string
  icon?: string
}

const ChartNavigationButton = ({ children, icon, ...rest }: Props) => (
  <Button
    className='h-5.5 w-5.5 fill-[#ffffff] stroke-[#1082ff] text-[#1082ff] hover:fill-[#1082ff] active:fill-[#1082ff] disabled:fill-[#ffffff] disabled:stroke-[#c7c7c7] disabled:text-[#c7c7c7]'
    title={children}
    {...rest}
  >
    <svg className='icon'>
      <use xlinkHref={`#icon-${icon}`} />
    </svg>
    <span className='visually-hidden'>{children}</span>
  </Button>
)

export default ChartNavigationButton
