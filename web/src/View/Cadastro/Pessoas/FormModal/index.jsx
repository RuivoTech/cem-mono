import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Divider, Modal, Tab } from '@mui/material';
import Perfil from './Perfil';

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

const FormModal = ({ membros, ministerios = [], show, handleShow }) => {
	const [tabStatus, setTabStatus] = useState('1');

	const handleTabStatus = (newStatus) => {
		setTabStatus(newStatus);
	};

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
						<Perfil membros={membros} />
					</TabPanel>
					<TabPanel value='2'>Contato</TabPanel>
					<TabPanel value='3'>Endereço</TabPanel>
					<TabPanel value='4'>Dados Igreja</TabPanel>
				</TabContext>
				<Divider />
				<Box sx={{}} alignItems="flex-end" justifyContent="flex-end">
					<Button variant='contained' color='success'>Salvar</Button>
				</Box>
			</Box>
		</Modal>
	);
}

export default FormModal;