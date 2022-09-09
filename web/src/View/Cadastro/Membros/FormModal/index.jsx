import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, Modal, Typography } from '@mui/material';
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

const FormModal = ({ membros, idMembro, show, handleShow }) => {
	const [membro, setMembro] = useState({
		nome: "",
		sexo: "",
		identidade: ""
	});
	const [filhos, setFilhos] = useState([]);
	const [loading, setLoading] = useState(false);
	const session = getSession();

	useEffect(() => {
		if (idMembro === 0) {
			setMembro({});
			return;
		} else {
			setLoading(true);
			fetchMembro(idMembro);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idMembro, session.token]);

	const fetchMembro = ((id) => {
		api.get("/membros/" + id)
			.then(response => {
				setMembro(response.data);
				setFilhos(response.data?.parentes?.filhos);
				setLoading(false);
			})
			.catch(error => {
				setLoading(false);
				console.log(error);
			})

	})

	const handleChange = (field, value) => {
		if (field === "membro") {
			setMembro({ ...value })
			return;
		}

		setMembro({
			...membro,
			[field]: value
		});
	}

	const handleClick = (item) => {
		if (typeof item !== undefined) {
			setLoading(true);
			fetchMembro(item);
		}
	}

	return (
		<Modal
			open={show}
			onClose={handleShow}
			keepMounted 
		>
			{loading ?
				<CircularProgress />
				:
			<Box sx={style}>
				<Box>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Typography variant="h6" component="h2">
								{membro?.id ? `#${membro?.id} - ${membro?.nome}` : "Novo membro"}
							</Typography>
						</Box>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Box
							component="h3"
							borderBottom="1px solid grey"
						>
							Perfil
						</Box>
							<Perfil
								membros={membros}
								handleChange={(field, value) => handleChange(field, value)}
								membro={membro}
								handleClick={handleClick}
								loading={loading}
							/>
					</Box>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Box
							component="h3"
							borderBottom="1px solid grey"
						>
							Contato
						</Box>
					</Box>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Box
							component="h3"
							borderBottom="1px solid grey"
						>
							Endereço
						</Box>
					</Box>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Box
							component="h3"
							borderBottom="1px solid grey"
						>
							Familia
						</Box>
					</Box>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Box
							component="h3"
							borderBottom="1px solid grey"
						>
							Dados Igreja
						</Box>
					</Box>
				</Box>
				<Divider />
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button variant='outlined' color="error" sx={{ m: "1em" }}>Cancelar</Button>
					<Button variant='contained' color='success' sx={{ m: "1em" }}>Salvar</Button>
				</Box>
			</Box>
			}
		</Modal>
	);
}

export default FormModal;