import './index.css'

const Header = props => {
  const {name} = props

  return (
    <nav className="nav-header">
      <h1 className="title">{name}</h1>
      <div>
        <p className="orders">My Orders</p>
      </div>
    </nav>
  )
}
export default Header
