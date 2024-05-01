import {List, ListItem, TextField, Box} from '@material-ui/core';
import {useCallback, useEffect, useState} from 'react';
import Chart from './Chart';
import mainConfig from '../config';

const preProcessChartData = (rawData, name) => {
	const labels = [];
	const data = [];

	rawData.forEach(([date, price]) => {
		labels.push(date);
		data.push(price);
	})

	return {
		labels,
		datasets: [
			{
				label: `${name} price history`,
				data,
				borderColor: '#106774'
			}
		]
	}
}


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
	}, [coinGecko.apiKey]);

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

	const [chartData, setChartData] = useState(null);
	useEffect(() => {
		if (selected) {
			fetch(`https://api.coingecko.com/api/v3/coins/${selected.id}/market_chart?vs_currency=usd&days=30`, {
				method: 'GET',
				headers: {
					'accept': 'application/json',
					'x-cg-demo-api-key': `${coinGecko.apiKey}`,
				},
			})
				.then((response) => response.json())
				.then((rawData) => {
					const preprocessedData = preProcessChartData(rawData.prices, selected.name);
					setChartData(preprocessedData);
				})
				.catch((error) => {/*TODO*/ alert(error.message);});
		}
	}, [coinGecko.apiKey, selected]);

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
						return <ListItem onClick={onItemClick} button key={id} id={id}>{`${symbol}/${name}`}</ListItem>
					})}
				</List>
			}
			{
				!!selected && !!chartData && <Chart chartData={chartData} name={selected.name}/>
			}
		</Box>
	);
}
