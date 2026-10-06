type AppLoaderProps = {
  label?: string
}

function AppLoader({ label = 'Loading GoalSave…' }: AppLoaderProps) {
  return (
    <div className="app-loader" role="status" aria-live="polite" aria-label={label}>
      <div className="app-loader-brand" aria-hidden="true">
        <span className="app-loader-mark">G</span>
        <span>GoalSave</span>
      </div>
      <span className="app-loader-spinner" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default AppLoader
