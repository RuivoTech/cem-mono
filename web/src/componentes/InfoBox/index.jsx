import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.css";
import { Box } from "@mui/material";

const InfoBox = ({ icone, titulo, quantidade, corFundo }) => {
    const color = {
        success: {
            color: "rgb(40, 167, 69)",
            shadow: `rgba(40, 167, 69, 0.8)`
        },
        danger: {
            color: "rgb(220, 53, 69)",
            shadow: `rgba(220, 53, 69, 0.8)`
        },
        warning: {
            color: "rgb(255, 193, 7)",
            shadow: `rgba(255, 193, 7, 0.8)`
        },
        primary: {
            color: "rgb(0, 123, 255)",
            shadow: `rgba(0, 123, 255, 0.8)`
        },
        info: {
            color: "rgb(23, 162, 184)",
            shadow: `rgba(23, 162, 184, 0.8)`
        }
    }
    return (
        <>
            <Box width="calc(100% - 22px)" margin="10px">
                <div
                    className={"info-box hover-expand-effect"}
                    style={{
                        backgroundColor: color[corFundo].color
                    }}
                >
                    <div className="icon h-100">
                        <FontAwesomeIcon icon={['fas', icone]} size="lg" />
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
            </Box>
        </>
    )
}

export default InfoBox;