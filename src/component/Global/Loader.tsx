import React from 'react'

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

interface LoaderProps {
  fullscreen?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'white' | 'gray'
  text?: string
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-4',
  lg: 'h-10 w-10 border-4',
}

const colorMap = {
  blue: 'border-blue-600 text-blue-600',
  green: 'border-green-500 text-green-500',
  red: 'border-red-600 text-red-600',
  yellow: 'border-yellow-500 text-yellow-500',
  white: 'border-white text-white',
  gray: 'border-gray-500 text-gray-500',
}

const Loader: React.FC<LoaderProps> = ({
  fullscreen,
  size ,
  color,
  text,
}) => {
  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full border-t-transparent border-solid',
        sizeMap[size?size:'md'],
        colorMap[color?color:'blue']
      )}
    />
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
        {spinner}
        {text && <p className="mt-3 text-white font-medium">{text}</p>}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {spinner}
      {text && <span className="text-sm text-gray-600 dark:text-gray-300">{text}</span>}
    </div>
  )
}

export default Loader
