import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils.js'

export const Logo = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className }, ref) => (
  <div ref={ref} className={cn('flex flex-row', className)}>
    <h1>
      <span className="text-2xl font-semibold leading-none pr-2 tracking-wide">
        vlt
      </span>
      <span className="text-2xl font-light leading-none text-zinc-500 tracking-wide">
        {'/vōlt/'}
      </span>
    </h1>
  </div>
))
Logo.displayName = 'Logo'