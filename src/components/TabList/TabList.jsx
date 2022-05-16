import { useState } from 'react'
import TabListItem from '../TabListItem/TabListItem'
import { FaTrash, FaPen } from "react-icons/fa";
import { Button } from "datocms-react-ui";
import "./TabList.css"
import '../App/App.css'

export default function TabList({
  children,
  onConfigure,
  resetData,
}) {
  const [activeTab, setActiveTab] = useState(children[0].props.label)

  function onClickTabItem(tab) {
    setActiveTab(tab)
  }

  return (
    <section className="tabs">
      <ul className="tabs__tab-list" role="tablist">
        {children.map((child) => {
          const { label } = child.props
          return (
            <TabListItem
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          )
        })}
        <div className='configure-section'>
          <Button buttonSize="xxs" onClick={onConfigure} leftIcon={<FaPen />}>
            Edit
          </Button>

          <Button buttonSize="xxs" onClick={resetData} buttonType="negative" leftIcon={<FaTrash />}>
            Reset
          </Button>

        </div>
      </ul>
      <section className="tabs__tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined
          return child.props.children
        })}

      </section>
    </section>
  )
}
