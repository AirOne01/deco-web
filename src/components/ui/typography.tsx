import { type ReactNode } from 'react'
import { cn } from '~/lib/utils'

export function H1({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <h1 className={cn(className, "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl")} {...props}>
      { children }
    </h1>
  )
}

export function H2({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <h1 className={cn(className, "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0")} {...props}>
      { children }
    </h1>
  )
}

export function H3({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <h1 className={cn(className, "scroll-m-20 text-2xl font-semibold tracking-tight")} {...props}>
      { children }
    </h1>
  )
}

export function H4({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <h1 className={cn(className, "scroll-m-20 text-xl font-semibold tracking-tight")} {...props}>
      { children }
    </h1>
  )
}

export function P({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <p className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")} {...props}>
      { children }
    </p>
  )
}

export function Blockquote({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <blockquote className={cn(className, "mt-6 border-l-2 pl-6 italic")} {...props}>
      { children }
    </blockquote>
  )
}

export function Ul({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <ul className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")} {...props}>
      { children }
    </ul>
  )
}

export function Code({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <code className={cn(className, "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold")} {...props}>
      { children }
    </code>
  )
}

export function Lead({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <p className={cn(className, "text-xl text-muted-foreground")} {...props}>
      { children }
    </p>
  )
}

export function Large({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <div className={cn(className, "text-lg font-semibold")} {...props}>
      { children }
    </div>
  )
}

export function Small({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <small className={cn(className, "text-sm font-medium leading-none")} {...props}>
      { children }
    </small>
  )
}

export function Muted({ className, children, ...props }: { className?: string, children: ReactNode }) {
  return (
    <p className={cn(className, "text-sm text-muted-foreground")} {...props}>
      { children }
    </p>
  )
}
  