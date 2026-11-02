import { Link } from 'react-router-dom'

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="PennyWise home">
      <span className="brand-mark" aria-hidden="true">G</span>
      <span>PennyWise</span>
    </Link>
  )
}

export default Brand
