import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Box } from "@material-ui/core";
import WalletBalance from './WalletBalance'
import {CategoryScale} from 'chart.js';
Chart.register(CategoryScale);

export default function LineChart({ chartData, name , contract}) {
	return (
		<Box sx={{width: '100%', marginTop: '16vh', position: 'absolute', display: 'flex', justifyContent: 'space-around', left: '0'}}>
			<Box sx={{width: '100vh', height: '75vh'}}>
				<h2>Your ${contract.symbol ? contract.symbol.toUpperCase() : ''} balance: </h2>
				<WalletBalance contract={contract.contract} symbol={contract.symbol}/>
				<h2>${name} price history</h2>
				<Line
					data={chartData}
					options={{
						plugins: {
							legend: {
								display: false
							}
						}
					}}
				/>
			</Box>
		</Box>
	);
}
