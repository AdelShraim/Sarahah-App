import React from 'react'
import styles from './Loader.module.css';


function Loader() {
  return (
  <div className={styles["loaderContainer"]}>

<div className={styles["spinner"]}>
  <div className={styles["dot1"]} />
  <div className={styles["dot2"]} />
</div>


  </div>
  )
}

export default Loader