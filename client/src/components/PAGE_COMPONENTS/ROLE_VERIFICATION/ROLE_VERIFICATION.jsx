import { observer } from "mobx-react-lite"



const ROLE_VERIFICATION = (props) => {

    const children = props.children

    return (
        <div >
            {props.access_verification === true ?
                 children 
                :
                <></>
            }
        </div>
    )

}

export default observer(ROLE_VERIFICATION)