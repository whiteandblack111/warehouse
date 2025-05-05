import React from 'react';
import { observer } from "mobx-react-lite"
import styles from './sticker_warehouse.module.css'

const Sticker_warehouse = ({ sticker }) => {

    return(
        <div className={styles.barcode_box_item}>
          <div>{`${sticker.shop_name}`}</div>
          <div>{`Шк: ${sticker.barcode}`}</div>
          <div>{`Арт: ${sticker.warehouse_ID}`}</div>
          
        </div>
    )
}


export default observer(Sticker_warehouse)