import React from "react"

import styles from './MenuOption.module.css'

interface MenuOptionProps {
  label: string,
  selected?: boolean,
  onClick: () => void,
};

export const MenuOtption: React.FC<MenuOptionProps> = ({label, selected = false, onClick}) => {
  return (
    <div
      className={`
        ${styles.menuOptionContainer}
        ${selected ? styles.selected : ''}
    `}
    onClick={onClick}
    >
      {label}
    </div>
  );
}