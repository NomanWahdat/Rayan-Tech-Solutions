'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-2xl border border-white/10 overflow-hidden', className)}>
      {children}
    </div>
  )
}
