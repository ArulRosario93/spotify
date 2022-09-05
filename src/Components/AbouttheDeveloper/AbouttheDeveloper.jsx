import React from "react";
import Header from "./Header/Header";
import { useDataLayerValue } from "../DataLayer";
import "./AbouttheDeveloper.css";

const AbouttheDeveloper = () => {
    const [{set_developer}, dispatch] = useDataLayerValue();
    return(
        <div>
            <Header />
            <div className="devImg">
                <img src={set_developer?.images?.[0]?.url}/>
            </div>
        </div>
    )
}

export default AbouttheDeveloper;