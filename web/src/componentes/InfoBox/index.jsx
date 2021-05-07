import React from "react";
import "./styles.css";

const InfoBox = ({ icone, titulo, quantidade, corFundo }) => {
    const cor = {
        success: {
            color: "rgb(0, 255, 0)",
            shadow: `rgba(0, 255, 0, 0.8)`
        },
        danger: {
            color: "rgb(255, 0, 0)",
            shadow: `rgba(255, 0, 0, 0.8)`
        },
        warning: {
            color: "rgb(255, 255, 0)",
            shadow: `rgba(255, 255, 0, 0.8)`
        },
        primary: {
            color: "rgb(0, 0, 255)",
            shadow: `rgba(0, 0, 255, 0.8)`
        },
        info: {
            color: "rgb(0, 255, 255)",
            shadow: `rgba(0, 255, 255, 0.8)`
        }
    }
    return (
        <>
            <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div
                    className={"info-box bg-" + corFundo + " hover-expand-effect"}
                    style={{
                        border: `1px solid ${cor[corFundo].color}`,
                        boxShadow: "2px 2px 5px 2px rgba(61, 61, 61, 0.8)"
                    }}
                >
                    <div className="icon h-100">
                        <i className={"fa fa-" + icone + " fa-2x"}></i>
                    </div>
                    <div className="content">
                        <div className="text">
                            {titulo}
                        </div>
                        <div className="number">
                            {quantidade}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoBox;