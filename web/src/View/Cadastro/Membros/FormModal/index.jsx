import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, Modal, Typography } from '@mui/material';

import Profile from './Profile';
import api from '../../../../services/api';
import Membro from '../../../../Model/Membro';
import Contact from './Contact';
import Address from './Address';
import Family from './Family';

const FormModal = ({ membros, idMembro, show, handleShow }) => {
	const MembroModel = new Membro();
	const [membro, setMembro] = useState(new Membro());
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (parseInt(idMembro) === 0) {
			setMembro(new Membro());
			return;
		} else {
			setLoading(true);
			fetchMembro(idMembro);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idMembro]);

	const fetchMembro = ((id) => {
		api.get("/membros/" + id)
			.then(response => {
				if (response.data.message) {
					setLoading(false);
					setMembro(new Membro())
					return
				}
				setMembro(response.data);
				setLoading(false);
			})
			.catch(error => {
				setLoading(false);
				console.log(error);
			})

	})

	const handleChange = (field = "", value) => {
		const [item, subItem] = field.split(".");
		if (field === "membro") {
			setMembro({ ...value })
			return;
		}

		if (Boolean(subItem)) {
			setMembro({
				...membro,
				[item]: {
					...membro[item],
					[subItem]: value
				}
			})
			return;
		}

		setMembro({
			...membro,
			[field]: value
		});
	}

	const handleClick = (item) => {
		if (item !== null) {
			setLoading(true);
			fetchMembro(item.id);
		} else {
			setMembro(MembroModel);
		}
	}

	return (
		<Modal
			open={show}
			onClose={handleShow}
			sx={{ overflowY: "auto" }}
		>
			{loading ?
				<CircularProgress />
				:
				<Box sx={{
					position: 'absolute',
					top: '10px',
					left: '50%',
					transform: 'translate(-50%, 0%)',
					width: {
						xs: "80%",
						md: "60%"
					},
					bgcolor: 'background.paper',
					border: '2px solid #c7c7c7',
					boxShadow: 24,
					padding: 2,
					marginTop: 4
				}}>
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
							<Profile
								membros={membros}
								handleChange={handleChange}
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
							<Contact membro={membro} handleChange={handleChange} />
					</Box>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Box
							component="h3"
							borderBottom="1px solid grey"
						>
							Endereço
						</Box>
							<Address membro={membro} handleChange={handleChange} />
					</Box>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Box
							component="h3"
							borderBottom="1px solid grey"
						>
								Família
						</Box>
							<Family membro={membro} membros={membros} handleChange={handleChange} />
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