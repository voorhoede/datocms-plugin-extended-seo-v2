import styles from './TabListItem.module.css'

type Props = {
  label: string
  activeTab: string
  onClick: (value: string) => void
}

export default function TabListItem({ activeTab, label, onClick }: Props) {
  return (
    <li role="tab">
      <button
        className={`${styles.button} ${
          activeTab === label && styles.buttonActive
        }`.trim()}
        type="button"
        onClick={() => onClick(label)}
      >
        {label}
      </button>
    </li>
  )
}
