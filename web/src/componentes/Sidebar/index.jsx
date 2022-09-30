import React, { useState } from "react";
import packageJSON from "../../../package.json";
import { Collapse, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AppRegistration, ArrowForward, AttachMoney, Copyright, ExpandLess, ExpandMore, PieChart, School } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarIsOpened, switchSidebar }) => {
    const navigate = useNavigate();
    
    const [selectedIndex, setSelectedIndex] = useState(0);
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
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    id="dashboard"
                >
                    <ListItemIcon>
                        <PieChart />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    onClick={() => handleClick("secretary")}
                >
                    <ListItemIcon>
                        <AppRegistration />
                    </ListItemIcon>
                    <ListItemText primary="Secretaria" />
                    {categoryOpened.secretary ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={categoryOpened.secretary} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                            sx={{ pl: 6 }}
                            id="membros"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Membros" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 2)}
                            sx={{ pl: 6 }}
                            id="visitantes"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Visitantes" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 3)}
                            sx={{ pl: 6 }}
                            id="ministerios"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Ministerios" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 4)}
                            sx={{ pl: 6 }}
                            id="eventos"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Eventos" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 4}
                            onClick={(event) => handleListItemClick(event, 5)}
                            sx={{ pl: 6 }}
                            id="inscricoes"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Inscrições" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Divider />
                <ListItemButton
                    onClick={() => handleClick("financial")}
                >
                    <ListItemIcon>
                        <AttachMoney />
                    </ListItemIcon>
                    <ListItemText primary="Financeiro" />
                    {categoryOpened.financial ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={categoryOpened.financial} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 5}
                            onClick={(event) => handleListItemClick(event, 6)}
                            sx={{ pl: 6 }}
                            id="receitas"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Receitas" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 6}
                            onClick={(event) => handleListItemClick(event, 7)}
                            sx={{ pl: 6 }}
                            id="despesas"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Despesas" />
                        </ListItemButton>

                    </List>
                </Collapse>
                <Divider />
                <ListItemButton
                    onClick={() => handleClick("teaching")}
                >
                    <ListItemIcon>
                        <School />
                    </ListItemIcon>
                    <ListItemText primary="Ensino" />
                    {categoryOpened.teaching ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={categoryOpened.teaching} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 7}
                            onClick={(event) => handleListItemClick(event, 8)}
                            sx={{ pl: 6 }}
                            id="cursos"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Cursos" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 8}
                            onClick={(event) => handleListItemClick(event, 9)}
                            sx={{ pl: 6 }}
                            id="classes"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Classes" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 9}
                            onClick={(event) => handleListItemClick(event, 10)}
                            sx={{ pl: 6 }}
                            id="professores"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Professores" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 10}
                            onClick={(event) => handleListItemClick(event, 11)}
                            sx={{ pl: 6 }}
                            id="alunos"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Alunos" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 11}
                            onClick={(event) => handleListItemClick(event, 12)}
                            sx={{ pl: 6 }}
                            id="aulas"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Aulas" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Divider />
                <ListItemButton
                    onClick={() => handleClick("settings")}
                >
                    <ListItemIcon>
                        <AttachMoney />
                    </ListItemIcon>
                    <ListItemText primary="Configurações" />
                    {categoryOpened.settings ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={categoryOpened.settings} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 12}
                            onClick={(event) => handleListItemClick(event, 13)}
                            sx={{ pl: 6 }}
                            id="usuarios"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Usuários" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 13}
                            onClick={(event) => handleListItemClick(event, 14)}
                            sx={{ pl: 6 }}
                            id="sistema"
                        >
                            <ListItemIcon>
                                <ArrowForward />
                            </ListItemIcon>
                            <ListItemText primary="Sistema" />
                        </ListItemButton>

                    </List>
                </Collapse>
                <Divider />
            </List>
            <List component="div" sx={{
                display: "flex",
                width: "240px",
                position: "absolute",
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                <ListItemButton href="https://github.com/RuivoTech" target="_blank">
                    <ListItemIcon>
                        <Copyright />
                    </ListItemIcon>
                    <ListItemText primary="RuivoTech" />
                </ListItemButton>
                <ListItemButton href={`https://github.com/RuivoTech/cem-frontend/tree/${packageJSON.version}`} target="_blank">
                    <ListItemText secondary={packageJSON.version} />
                </ListItemButton>
            </List>
        </Drawer>
    )
}


export default Sidebar;