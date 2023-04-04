import { useState } from "react"
import { FaTrash, FaPen } from "react-icons/fa"
import { Button } from "datocms-react-ui"

import TabListItem from "../TabListItem/TabListItem"

import styles from "./TabList.module.css"

type Props = {
  children: JSX.Element[]
  onConfigure: () => void
  resetData: () => void
}

export default function TabList({ children, onConfigure, resetData }: Props) {
  const firstKey = children[0].key as string
  const [activeTab, setActiveTab] = useState<string>(firstKey)

  function onClickTabItem(tab: string) {
    setActiveTab(tab)
  }

  return (
    <section className={styles.tabs}>
      <div className={styles.navigation}>
        <ul className={styles.list} role="tablist">
          {children.map((child) => {
            const { key } = child
            return (
              <TabListItem
                activeTab={activeTab}
                key={key}
                label={key as string}
                onClick={onClickTabItem}
              />
            )
          })}
        </ul>
        <div className={styles.configure}>
          <Button buttonSize="xxs" onClick={onConfigure} leftIcon={<FaPen />}>
            Edit
          </Button>

          <Button
            className={styles.resetButton}
            buttonSize="xxs"
            onClick={resetData}
            buttonType="negative"
            leftIcon={<FaTrash />}
          >
            Reset
          </Button>
        </div>
      </div>
      <section className={styles.content}>
        {children.map((child) => {
          if (child.key !== activeTab) return undefined
          return child.props.children
        })}
      </section>
    </section>
  )
}
