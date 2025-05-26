import { observer } from "mobx-react-lite"
import { useEffect, useState, useRef } from "react";
import styles_typeText from "./light_neon_input_typeText.module.css"
import styles_typeFile from "./light_neon_input_typeFile.module.css"
import { checkInput_for_allowNumbers } from "../../../../utils/helpers";


// props ---> forTypeValue={"number"}

const Light_neon_input = (props) => {

    let styles = null
    {
        props.type === "text"
            ?
            styles = styles_typeText
            :
            styles = styles_typeFile
    }

    const [inputValue, setInputValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const inputRef = useRef(null);

    const handleInputClick = (event) => {
        if (!isClicked) {
            props.onChange('');
            setIsClicked(true);
        }
    };

    // const handleInputChange = (event) => {
    //     props.onChange(event.target.value);
    // };  

    const handleInputChange = (event) => {

        if (props.forTypeValue && props.forTypeValue === "number") {
            checkInput_for_allowNumbers(event)
        }

        props.onChange(event.target.value);

    };


    if (styles) {
        return (

            <div
                className={`${styles.inputBox}`}
            >
                <input

                    ref={props.ref ? props.ref : inputRef}
                    className={`${styles.input} ${props.className}`}
                    name={props.name}
                    type={props.type}
                    key={props.forKey}
                    required="required"
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    onKeyUp={props.onKeyUp}
                    value={props.value}
                />

                <span htmlFor={props.id} className={`${styles.span} ${props.className_placeholder}`}>{props.placeholder}</span>
            </div>
        )
    }


}

export default observer(Light_neon_input);