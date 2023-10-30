import './index.css'

const DishItem = props => {
  const {dishDetails, onIncriment, onDecriment} = props
  console.log(dishDetails)

  const onClickPlus = () => {
    onIncriment()
  }

  const onClickMinus = () => {
    onDecriment()
  }
  return (
    <li className="dish-item">
      <div className="av-card">
        <p className="circle" />
      </div>
      <div className="details">
        <h1 className="dish-name">{dishDetails.dishName}</h1>
        <p className="dish-currency">
          {dishDetails.dishCurrency} {dishDetails.dishPrice}
        </p>
        <p className="dish-desc">{dishDetails.dishDescription}</p>
        <div className="button-container">
          <button type="button" className="btn">
            -
          </button>
          <p className="count">0</p>
          <button type="button" className="btn">
            +
          </button>
        </div>
        {dishDetails.dishAvailability === false && (
          <p className="nt">Not available</p>
        )}
        {dishDetails.addonCat.length > 0 && (
          <p className="cust">Customizations available</p>
        )}
      </div>
      <div className="cals">
        <p className="calaries">{dishDetails.dishCalaries} calories</p>
      </div>
      <div className="cals">
        <img src={dishDetails.dishImage} alt="dish" className="img" />
      </div>
    </li>
  )
}
export default DishItem
