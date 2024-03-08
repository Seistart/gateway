import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"

type ButtonProps = {
  // Define the props that you need, excluding 'css' and adapting Chakra-specific props to more generic ones
  variant?: "inverse" | "transparent" | "light"
  disabled?: boolean
  onClick?: () => void
  children?: React.ReactNode
  // Add other props as needed
}

type LegendButtonProps = ButtonProps & {
  open: boolean
}

export const LegendButton = ({
  open,
  variant,
  disabled,
  onClick,
  ...rest
}: LegendButtonProps) => {
  const iconRotation = open ? "rotate-180" : "rotate-[180deg]"

  return (
    <button
      className={`absolute top-10 z-20 transition-all duration-500 ease-out ${open ? `left-48 translate-x-[-100%] rotate-180` : ` left-0 rotate-[180deg]`} flex transform bg-secondary p-5  hover:bg-opacity-75 focus:outline-none`}
      onClick={!disabled ? onClick : undefined}
      {...rest}
    >
      {open ? (
        <DoubleArrowLeftIcon
          name="uniDoubleArrowLeft"
          className={iconRotation}
        />
      ) : (
        <DoubleArrowRightIcon
          name="uniDoubleArrowRight"
          className={iconRotation}
        />
      )}

      {rest.children}
    </button>
  )
}
