import React, { useEffect, useState } from "react";
import { ImageBackground, RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import fundo from "../../assets/images/fundo.png";

import Menu from "../../Components/Menu";
import EventItem from "../../Components/EventItem";

import Axios from "axios";

import { data } from "./data";

const Eventos = () => {
    const [events, setEvents] = useState({});
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const currentDate = new Date();
        let allDays = [];

        for (let i = 0; i < 30; i++) {
            const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), (currentDate.getDate() + i), 0, 0, 0);

            data.forEach(item => {
                const itemDateStart = item.dataInicio ? new Date(item.dataInicio + "T03:00:00") : null;
                const itemDateEnd = item.dataFim ? new Date(item.dataFim + "T03:00:00") : null;
                const dayExist = allDays.findIndex(event => event.day === currentDay.getDate());
                const event = {
                    id: item.id,
                    color: item.color,
                    day: currentDay.getDate(),
                    weekDay: currentDay.getDay(),
                    month: currentDay.getMonth(),
                    title: item.title,
                    hourStart: item.horaInicial,
                    hourEnd: item.horaFinal
                }

                if (itemDateStart.getTime() <= currentDay.getTime() && itemDateEnd.getTime() >= currentDay.getTime()) {
                    if (dayExist >= 0) {
                        allDays[dayExist] = event;
                    } else {
                        allDays = [...allDays, event]
                    }
                } else if (item.repete && item.diaSemana === currentDay.getDay() && dayExist === -1) {
                    allDays = [...allDays, event];
                }
            });
        }

        setEvents(allDays);
    }, []);

    function handleRefresh() {
        const url = `https://api.github.com/v3/users/RuivoTech`;
        setIsRefreshing(true)
        Axios.get(url)
            .then(res => {
                setResponseData(res.data);
                setIsRefreshing(false);
            })
            .catch(error => {
                console.log(error);
                setIsRefreshing(false);
            });
    }

    return (
        <>
            <ImageBackground source={fundo} style={{
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center"
            }}>
                <Menu />
                <FlatList
                    style={{
                        paddingTop: 10,
                        paddingBottom: 20
                    }}
                    refreshing
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={() => handleRefresh()} />
                    }
                    data={events}
                    renderItem={({ item }) =>
                        <EventItem
                            event={item}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </ImageBackground>
        </>
    )
}

export default Eventos;