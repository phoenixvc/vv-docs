import type React from "react"
import { cn } from "@/lib/utils"

export interface CardProps {
  className?: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800",
        className,
      )}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps {
  className?: string
  children: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
}

export interface CardTitleProps {
  className?: string
  children: React.ReactNode
}

export const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>{children}</h3>
}

export interface CardDescriptionProps {
  className?: string
  children: React.ReactNode
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children }) => {
  return <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)}>{children}</p>
}

export interface CardContentProps {
  className?: string
  children: React.ReactNode
}

export const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>
}

export interface CardFooterProps {
  className?: string
  children: React.ReactNode
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children }) => {
  return <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>
}

export default Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})
