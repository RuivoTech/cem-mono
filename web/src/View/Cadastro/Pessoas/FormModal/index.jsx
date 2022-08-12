import React, { useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Divider, Modal, Tab } from '@mui/material';
import Perfil from './Perfil';
import api from '../../../../services/api';
import { getSession } from '../../../../services/auth';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "80%",
	bgcolor: 'background.paper',
	border: '2px solid #c7c7c7',
	boxShadow: 24,
	p: 2
};

const FormModal = ({ membros, ministerios, idMembro = [], show, handleShow }) => {
	const [tabStatus, setTabStatus] = useState('1');
	const [membro, setMembro] = useState({});
	const [filhos, setFilhos] = useState([]);
	const session = getSession();

	useEffect(() => {
		const fetchMembro = async () => {
			const response = idMembro > 0 ? await api.get("/membros/" + idMembro, {
				headers: {
					Authorization: `Bearer ${session.token}`
				}
			}) : { ministerios: [] };

			setMembro(response.data);
			setFilhos(response.data?.parentes.filhos);
		}

		fetchMembro();

	}, [idMembro, session.token]);

	const handleTabStatus = (newStatus) => {
		setTabStatus(newStatus);
	};

	const handleChange = (field, value) => {
		setMembro({
			...membro,
			[field]: value
		})
	}

	return (
		<Modal
			open={show}
			onClose={handleShow}
		>
			<Box sx={style}>
				<TabContext value={tabStatus}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={(_, value) => handleTabStatus(value)}>
							<Tab label="Perfil" value="1" />
							<Tab label="Contato" value="2" />
							<Tab label="Endereço" value="3" />
							<Tab label="Dados Igreja" value="4" />
						</TabList>
					</Box>
					<TabPanel value='1'>
						<Perfil membros={membros} membro={membro} handleChange={(field, value) => handleChange(field, value)} />
					</TabPanel>
					<TabPanel value='2'>Contato</TabPanel>
					<TabPanel value='3'>Endereço</TabPanel>
					<TabPanel value='4'>Dados Igreja</TabPanel>
				</TabContext>
				<Divider />
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button variant='outlined' color="error" sx={{ m: "1em" }}>Cancelar</Button>
					<Button variant='contained' color='success' sx={{ m: "1em" }}>Salvar</Button>
				</Box>
			</Box>
		</Modal>
	);
}

export default FormModal;