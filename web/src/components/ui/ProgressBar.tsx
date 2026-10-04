import type { CSSProperties } from 'react'

type ProgressBarProps = {
  value: number
  label?: string
  size?: 'small' | 'medium' | 'large'
}

function ProgressBar({ value, label, size = 'medium' }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value))
  const style = { '--progress-value': `${safeValue}%` } as CSSProperties

  return (
    <div
      className={`ui-progress ui-progress-${size}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
    >
      <span style={style} />
    </div>
  )
}

export default ProgressBar
