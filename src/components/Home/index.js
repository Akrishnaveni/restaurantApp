import {Component} from 'react'
import './index.css'
import Header from '../Header'
import TabsList from '../TabsList'
import DishItem from '../DishItem'

let fil

class Home extends Component {
  state = {
    activeCategoryId: '',
    restarantData: [],
    cartCount: 0,
  }

  componentDidMount() {
    this.getData()
  }

  onIncriment = () => {
    this.setState(prevState => ({
      cartCount: prevState.cartCount + 1,
    }))
  }

  onDecriment = () => {
    this.setState(prevState => ({
      cartCount: prevState.cartCount - 1,
    }))
  }

  setActiveTab = menuCategoryId => {
    this.setState({
      activeCategoryId: menuCategoryId,
    })
  }

  getData = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const restaurantName = data[0].restaurant_name
    const restaurantId = data[0].restaurant_id
    const tableMenuList = data[0].table_menu_list.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishImage: eachDish.dish_image,
        dishPrice: eachDish.dish_price,
        dishCurrency: eachDish.dish_currency,
        dishCalaries: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        addonCat: eachDish.addonCat.map(eachAddOn => ({
          addonCategory: eachAddOn.addon_category,
          addonCategoryId: eachAddOn.addon_category_id,
          addons: eachAddOn.addons.map(each => ({
            dishId: each.dish_id,
            dishName: each.dish_name,
            dishImage: each.dish_image,
            dishPrice: each.dish_price,
            dishCurrency: each.dish_currency,
            dishCalories: each.dish_calories,
            dishDesrciption: each.dish_description,
            dishAvailability: each.dish_Availability,
          })),
        })),
      })),
    }))
    const categoryList = tableMenuList.map(each => each.menuCategoryId)

    const updateData = {
      restaurantName,
      restaurantId,
      tableMenuList,
    }

    this.setState({
      restarantData: updateData,
      activeCategoryId: categoryList[0],
    })
  }

  getDishesData = cData => {
    const {activeCategoryId} = this.state
    const fildata = cData.tableMenuList.filter(
      eachCat => activeCategoryId === eachCat.menuCategoryId,
    )

    console.log(fildata)
    return fildata
  }

  render() {
    const {restarantData, activeCategoryId, cartCount} = this.state

    const menuCategoryList = restarantData.tableMenuList
    if (menuCategoryList !== undefined) {
      fil = menuCategoryList.filter(
        eachCat => activeCategoryId === eachCat.menuCategoryId,
      )
    }
    let d
    if (fil !== undefined) {
      d = fil[0].categoryDishes
      console.log(d)
    }

    return (
      <div className="app-container">
        <Header name={restarantData.restaurantName} count={cartCount} />
        {menuCategoryList !== undefined && (
          <ul className="tabs-list">
            {menuCategoryList.map(eachCategory => (
              <TabsList
                key={eachCategory.menuCategoryId}
                Details={eachCategory}
                isActive={activeCategoryId === eachCategory.menuCategoryId}
                setActiveTab={this.setActiveTab}
              />
            ))}
          </ul>
        )}
        {d !== undefined && (
          <ul className="dish-list">
            {d.map(eachDishDetails => (
              <DishItem
                key={eachDishDetails.dishId}
                dishDetails={eachDishDetails}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
