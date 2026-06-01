'use client'

export function Spotlight({ className, fill = 'white' }: { className?: string; fill?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className || ''}`}>
      <svg width="720" height="720" viewBox="0 0 720 720" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="g" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={fill} stopOpacity="0.28" />
            <stop offset="60%" stopColor={fill} stopOpacity="0.06" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="720" height="720" fill="url(#g)" />
      </svg>
    </div>
  )
}
