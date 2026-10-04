type LoadingSpinnerProps = {
  size?: 'small' | 'large'
  tone?: 'light' | 'brand'
}

function LoadingSpinner({ size = 'small', tone = 'light' }: LoadingSpinnerProps) {
  return <span className={`ui-spinner ui-spinner-${size} ui-spinner-${tone}`} aria-hidden="true" />
}

export default LoadingSpinner
