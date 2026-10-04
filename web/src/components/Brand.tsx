import { Link } from 'react-router-dom'

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="GoalSave home">
      <span className="brand-mark" aria-hidden="true">G</span>
      <span>GoalSave</span>
    </Link>
  )
}

export default Brand
