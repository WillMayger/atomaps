import React from 'react'
import styles from './Atomap.module.css'

export interface AtomapProps {
  test?: string
}

export default function Atomap({ test = 'This will be a map' }: AtomapProps) {
  return (
    <p className={styles.atomap}>
      {test}
    </p>
  )
}