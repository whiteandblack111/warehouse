import { useContext, useEffect, useMemo, useState } from "react";

import { observer } from "mobx-react-lite"
import styles from "./popup_fon.module.css"

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particle_options } from "../../../utils/particle_options";






const Popup_fon = (props) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {

            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });

        return (
            setInit(false)
        )
    }, []);

    const particlesLoaded = (container) => {
        // console.log(container);
    };

    const options = useMemo(
        () =>
            (particle_options),
        [],
    );


    return (
        <div className={styles.popup_fon} >
            {
                init ?
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={options}
                    />
                    :
                    <></>

            }
            {props.children}

            
        </div>
    )
}

export default observer(Popup_fon)