import React, { useState } from "react";
import { Box, Collapse, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ArrowForward, ExpandLess, ExpandMore, PieChart } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import { sidebarList } from "./sidebarList";
import { useAuth } from "../../context/auth";

const Sidebar = ({ sidebarIsOpened, switchSidebar }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [categoryOpened, setCategoryOpened] = useState({
        secretary: false,
        financial: false,
        teaching: false,
        settings: false
    })

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        navigate(`/${event.currentTarget.id}`);
        switchSidebar();
    }

    const handleClick = (category) => {
        setCategoryOpened({
            ...categoryOpened,
            [category]: !categoryOpened[category]
        });
    }

    return (
        <Drawer
            anchor="left"
            open={sidebarIsOpened}
            onClose={(event) => switchSidebar(event)}
            PaperProps={{
                sx: {
                    width: "240px"
                }
            }}
        >
            <List
                sx={{ width: '100%', maxWidth: 460 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton
                    selected={selectedIndex === -1}
                    onClick={(event) => handleListItemClick(event, -1)}
                    id="dashboard"
                >
                    <ListItemIcon>
                        <PieChart />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <Divider />

                {sidebarList.map((itemCategory, index) => {
                    return (
                        <Box key={index}>
                            <ListItemButton onClick={() => handleClick(itemCategory.category)}>
                                <Icon sx={{ marginRight: 2 }}>
                                    {itemCategory.icon}
                                </Icon>
                                <ListItemText primary={itemCategory.name} />
                                {categoryOpened[itemCategory.category] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={categoryOpened[itemCategory.category]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {itemCategory.items.map((item, itemIndex) => {
                                        const existPermission = user?.permissoes.filter(permissao => permissao.menuPermissao === item.field);

                                        if (!existPermission) {
                                            return null;
                                        }

                                        return (
                                            <ListItemButton
                                                key={itemIndex}
                                                selected={selectedIndex === itemIndex}
                                                onLoad={(event) => location.pathname.slice(0) === item.field ? handleListItemClick(event, itemIndex) : null}
                                                onClick={(event) => handleListItemClick(event, itemIndex)}
                                                sx={{ pl: 3 }}
                                                id={item.field}
                                            >
                                                <ListItemIcon>
                                                    <ArrowForward />
                                                </ListItemIcon>
                                                <ListItemText primary={item.name} />
                                            </ListItemButton>
                                        )
                                    })}
                                </List>
                            </Collapse>
                            <Divider />
                        </Box>
                    )
                })}
            </List>
        </Drawer>
    )
}


export default Sidebar;