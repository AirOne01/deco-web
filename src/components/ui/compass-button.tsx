import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const CompassButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className="group w-28 h-10 flex items-center justify-start gap-2.5 bg-[rgb(161,255,20)] text-[rgb(19,19,19)] font-semibold relative cursor-pointer duration-[0.2s] shadow-[5px_5px_10px_rgba(0,0,0,0.116)] duration-[0.5s] p-2 rounded-[30px] border-[none] hover:bg-[rgb(192,255,20)] hover:duration-[0.5s] active:duration-[0.2s] active:scale-[0.97]"
        ref={ref}
        {...props}
      >
        <svg className="h-6 group-hover:rotate-180 duration-1000" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
        Explore
      </Comp>
    )
  }
)
CompassButton.displayName = "CompassButton"

export { CompassButton }
