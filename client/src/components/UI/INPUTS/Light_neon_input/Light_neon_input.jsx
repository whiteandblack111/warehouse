import { observer } from "mobx-react-lite"



const Light_neon_input = (props) => {

    let props_ref;
    let props_className;
    let props_type;
    let props_placeholder;
    let props_onChange;
    let props_onKeyUp;
    let props_value;

    return (
        <div>
            <input
                ref={input_quantity_ref}
                className={`${styles.input} ${styles.input_update}`}
                type="text"
                placeholder={quantity}
                onChange={e => setQuantity(e.target.value)}
                onKeyUp={handler_input}
                value={quantity}
            />
        </div>
    )
}

export default observer(Light_neon_input);