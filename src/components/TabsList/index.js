import './index.css'

const TabsList = props => {
  const {Details, setActiveTab, isActive} = props
  const {menuCategory, menuCategoryId} = Details

  const onClickTab = () => {
    setActiveTab(menuCategoryId)
  }
  const tabBtnClassName = isActive ? 'tab-button active' : 'tab-button'
  return (
    <li className="tab-item">
      <button type="button" onClick={onClickTab} className={tabBtnClassName}>
        {menuCategory}
      </button>
    </li>
  )
}
export default TabsList
