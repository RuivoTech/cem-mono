import React, { useState, useEffect } from "react";
import {
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import { useToasts } from "react-toast-notifications";

import api, { URL_BASE } from "../../../services/api";
import { getSession } from "../../../services/auth";

import imageBackground from "../../../images/no-image.png";
import Utils from "../../../componentes/Utils";
import Item from "../../../componentes/Item";

const FormModal = ({ data, show, handleShow, className, campanhaAtiva }) => {
    const [campanha, setCampanha] = useState({});
    const [item, setItem] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const [tabAtivo, setTabAtivo] = useState("campaign");
    const session = getSession();

    useEffect(() => {
        const request = async () => {
            if (data.id) {
                const response = await api.get("/campaign/" + data.id, {
                    headers: {
                        Authorization: `Bearer ${session.token}`
                    }
                })
                let campaign = response.data;

                campaign.items = campaign.items.map(item => {
                    return {
                        ...item,
                        image: `${URL_BASE}/${item.image}`
                    }
                })

                setCampanha({
                    ...campaign,
                    date: Utils.converteData(campaign.date, "YYYY-MM-DD")
                });
            }
        }
        request();
        removeAllToasts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    useEffect(() => {
        let disabled = false;

        if (!carregando) {
            disabled = !disabled;
        }

        if (campanha.items) {
            if (campanha.items.length >= 1) {
                disabled = !disabled;
            }
        }

        setButtonIsDisabled(disabled);
    }, [carregando, campanha])

    const toggle = tab => {
        if (tabAtivo !== tab) setTabAtivo(tab);
    }

    const handleSubmit = async () => {
        if (campanha.status && campanhaAtiva.id !== campanha.id) {
            const confirmCampaign = window.confirm("Existe uma campanha ativa, deseja alterar?");
            if (confirmCampaign) {
                await api.put("/campaign", {
                    ...campanhaAtiva,
                    date: campanhaAtiva.date.split("T")[0],
                    status: false
                }, {
                    headers: {
                        Authorization: `Bearer ${session.token}`
                    }
                })
            } else {
                return;
            }
        }
        let campaign = {
            id: campanha.id ? campanha.id : 0,
            title: campanha.title,
            status: campanha.status,
            date: campanha.date,
            timeStart: campanha.timeStart,
            timeEnd: campanha.timeEnd
        };

        setCarregando(true);

        if (campaign.id !== 0) {
            api.put("/campaign", campaign, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            }).then(response => {
                submitItems(campaign.id);
            }).catch(error => {
                console.error(error);
                addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
            });
        } else {
            api.post("/campaign", campaign, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            }).then(response => {
                console.log(response.data);
                submitItems(response.data.id);
            }).catch(error => {
                console.error(error);
                addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
            });
        }
    }

    const submitItems = (campaignId) => {
        campanha.items.forEach(item => {
            let formData = new FormData();
            formData.set("title", item.title);
            formData.set("cost", item.cost);
            formData.set("description", item.description);
            formData.set("fkCampaign", campaignId > 0 ? campaignId : item.fkCampaign);
            formData.set("image", item.image.replace(`${URL_BASE}/`, ""));
            formData.set("file", item.file);

            api.post("/itemCampaign", formData, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            }).then(response => {
                if (!response.data.error) {
                    addToast("Campanha salva com sucesso!", { appearance: "success" });
                }
            }).catch(error => {
                console.error(error);
                addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
            })
        })
    }

    const handleChange = event => {
        const [value, subValue] = event.target.name.split(".");

        if (subValue) {
            setCampanha({
                ...campanha,
                [value]: {
                    ...campanha[value],
                    [subValue]: event.target.value
                }
            });
        } else {
            setCampanha({
                ...campanha,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleChangeItem = (event) => {
        setItem({
            ...item,
            [event.target.name]: event.target.value
        });
    }

    const handleChangeImage = (event) => {
        setItem({
            ...item,
            image: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0]
        })
    }

    const handleChangeMoney = (event) => {
        let value = "";
        if (event.key === "Backspace") {
            value = item.cost && item.cost.toString().slice(0, -1);
        } else if (event.key >= 0 && event.key <= 9) {
            value = `${item.cost}${event.key}`.replace("undefined", "");
        }

        setItem({
            ...item,
            cost: value
        });
    }

    const handleClickAddItem = () => {
        let newItems = campanha.items ? campanha.items : [];

        newItems.push(item);

        setCampanha({
            ...campanha,
            items: newItems
        });

        setItem({
            title: "",
            description: "",
            cost: 0
        });

        document.getElementById("itemImage").value = "";
    }

    const handleClickEditItem = () => {
        let itemsFiltered = campanha.items.map((itemCampanha, index) => {
            return index === item.index ? item : itemCampanha;
        })

        setCampanha({
            ...campanha,
            items: itemsFiltered
        });

        setItem({
            title: "",
            description: "",
            cost: 0
        });

        document.getElementById("itemImage").value = "";
    }

    const handleClickEdit = (event) => {
        let itemSelected = campanha.items.filter((item, index) => {
            return index === event && item;
        })

        itemSelected = itemSelected[0];

        setItem({
            ...itemSelected,
            edit: true,
            index: event
        });
    }

    const handleClickRemove = (index) => {
        let itemsFiltered = campanha.items.filter((item, itemIndex) => {
            return itemIndex == !index && item;
        })

        setCampanha({
            ...campanha,
            items: itemsFiltered
        });
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>
                    {campanha?.id ? `#${campanha.id} - ${campanha?.title}` : "Nova Campanha"}
                </ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={tabAtivo === 'campaign' ? "active" : ""}
                                onClick={() => { toggle('campaign'); }}
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                Campanha
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={tabAtivo === 'items' ? "active" : ""}
                                onClick={() => { toggle('items'); }}
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                Items
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={tabAtivo}>
                        <TabPane tabId="campaign">
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="campaignTitle">Titulo:</label>
                                    <input
                                        className="form-control"
                                        id="campaignTitle"
                                        name="title"
                                        type="text"
                                        value={campanha.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ex.: Pizza missionária"
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="Status">Status:</label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="custom-select"
                                        value={campanha.status}
                                        onChange={handleChange}
                                    >
                                        <option>Escolha...</option>
                                        <option value="1">Ativo</option>
                                        <option value="0">Inativo</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="date">Data de entrega:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        name="date"
                                        onChange={handleChange}
                                        value={campanha.date}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="date">Horário de inicio:</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="timeStart"
                                        name="timeStart"
                                        min="08:00"
                                        max="23:00"
                                        onChange={handleChange}
                                        value={campanha.timeStart}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="timeEnd">Horário de fim:</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="timeEnd"
                                        name="timeEnd"
                                        onChange={handleChange}
                                        value={campanha.timeEnd}
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="items">
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemTitle">Titulo:</label>
                                    <input
                                        className="form-control"
                                        id="itemTitle"
                                        name="title"
                                        type="text"
                                        value={item.title}
                                        onChange={handleChangeItem}
                                        required
                                        placeholder="Ex.: Marmita individual"
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="itemCost">Valor:</label>
                                    <input
                                        className="form-control"
                                        id="itemCost"
                                        name="cost"
                                        type="text"
                                        value={Utils.converteMoeda(item.cost)}
                                        onKeyDown={handleChangeMoney}
                                        onChange={() => { }}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="itemImage">Imagem:</label>
                                    <input
                                        className="form-control"
                                        id="itemImage"
                                        name="image"
                                        type="file"
                                        onChange={handleChangeImage}
                                        required
                                        accept="image/*"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemDescription">Descrição:</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        id="itemDescription"
                                        cols="10"
                                        rows="5"
                                        placeholder="Ex.: Arroz, feijão, frango assado, farofa, salada."
                                        onChange={handleChangeItem}
                                        value={item.description}
                                        required
                                    ></textarea>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-3">
                                    <img src={item.image ? item.image : imageBackground} height="130px" width="130px" />
                                </div>
                                <div className="col-md-12 d-flex justify-content-end ">
                                    <button
                                        className={item.edit ? "btn btn-primary" : "btn btn-success"}
                                        onClick={item.edit ? handleClickEditItem : handleClickAddItem}
                                    >
                                        {item.edit ?
                                            <span><i className="fa fa-edit fa-sm"></i> Editar</span>
                                            : <span><i className="fa fa-plus fa-sm"></i> Adicionar</span>
                                        }
                                    </button>
                                </div>
                                <div className="col-md-12">
                                    <hr className="mt-2 mb-3" />
                                </div>
                                {campanha.items && campanha.items.map((item, index) => {
                                    return <Item
                                        key={index}
                                        index={index}
                                        item={item}
                                        onClickEdit={index => handleClickEdit(index)}
                                        onClickRemove={index => handleClickRemove(index)}
                                    />
                                })}
                            </div>
                        </TabPane>
                    </TabContent>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="success"
                        onClick={() => handleSubmit()}
                        disabled={buttonIsDisabled}
                    >
                        Salvar
                    </Button>
                    {' '}
                    <Button type="button" color="danger" onClick={handleShow} disabled={carregando}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FormModal;