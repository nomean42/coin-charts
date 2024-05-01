import {List, ListItem, TextField} from '@material-ui/core';
import {useCallback, useEffect, useState} from 'react';
import mainConfig from '../config';
import {Box} from '@mui/material';


export default function Search() {
	const {coinGecko} = mainConfig;
	const [list, setList] = useState([]);

	useEffect(() => {
		fetch('https://api.coingecko.com/api/v3/coins/list', {
			method: 'GET',
			headers: {
				'accept': 'application/json',
				'x-cg-demo-api-key': `${coinGecko.apiKey}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setList(data);
			})
			.catch((error) => {/*TODO*/ alert(error.message);});
	},[])

	const [filteredList, setFilteredList] = useState([]);
	const [selected, setSelected] = useState(null);
	const onChange = useCallback((event) => {

		const inputValue = event.target.value;
		if (inputValue && inputValue.length >= 3) {
			const filtered = list.filter((item) => item.symbol.includes(inputValue) || item.name.includes(inputValue));
			setFilteredList(filtered);
		} else {
			setFilteredList([]);
			setSelected(null);
		}
	}, [list])

	const onItemClick = useCallback((event) => {
		setSelected(filteredList.find(({id}) => id === event.target.id));
	}, [filteredList]);

	return (
		<Box sx={{display: 'flex', flexDirection: 'column'}}>
			<TextField
				sx={{maxHeight: '4vh'}}
				id='outlined-basic'
				label='Coin'
				variant='outlined'
				onChange={onChange}
			/>
			{!selected &&
				<List>
					{filteredList.map(({id, symbol, name}) => {
						return <ListItem onClick={onItemClick} button id={id}>{`${symbol}/${name}`}</ListItem>
					})}
				</List>
			}
			{
				!!selected && <Box>{selected.id}</Box>
			}
		</Box>
	);
}
