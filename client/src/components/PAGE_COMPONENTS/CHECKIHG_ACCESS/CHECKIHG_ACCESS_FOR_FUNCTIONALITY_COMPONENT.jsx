import { observer } from "mobx-react-lite"



const CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT = (props) => {

    const children = props.children

    return (

        <>

            {
                props.variable_for_check === false ?
                    children
                    :
                    <></>
            }

        </>


    )

}

export default observer(CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT)