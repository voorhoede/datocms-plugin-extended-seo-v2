import './TabListItem.css';

export default function TabListItem({ activeTab, label, onClick }) {
  return (
    <li
      className={`tab-list-item${
        activeTab === label ? ' tab-list-item--active' : ''
      }`.trim()}
      role="tab"
    >
      <button type="button" onClick={() => onClick(label)}>
        {label}
      </button>
    </li>
  )
}