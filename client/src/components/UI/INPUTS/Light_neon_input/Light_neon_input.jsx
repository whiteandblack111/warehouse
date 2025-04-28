import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react";
import styles_typeText from "./light_neon_input_typeText.module.css"
import styles_typeFile from "./light_neon_input_typeFile.module.css"



const Light_neon_input = (props) => {
    
    let styles = null
    {
        props.type ==="text"
        ?
        styles = styles_typeText
        :
        styles = styles_typeFile
    }

    if (styles) {
        return (

            <div
                className={`${styles.inputBox}`}
            >
                <input
                    ref={props.ref}
                    className={`${props.className} ${styles.input} `}
                    name={props.name}
                    type={props.type}
                    key={props.forKey}
                    required="required"
                    onChange={
                        (e)=>{props.onChange(e.target.value)}
                    }
                    onKeyUp={props.onKeyUp}
                    value={props.value}
                />

                <span htmlFor={props.id} className={`${styles.span} `}>{props.placeholder}</span>
            </div>
        )
    }


}

export default observer(Light_neon_input);