import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { WeatherRow } from '../models/weather';
import "../styles/weather-table.scss";

interface WeatherTableProps {
   weatherRowData: WeatherRow[];
}

const WeatherTable: React.FunctionComponent<WeatherTableProps> = ({weatherRowData}) => {
    return (
        <TableContainer className="table-container" component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell align="right">Max Temp</TableCell>
                        <TableCell align="right">Min Temp</TableCell>
                        <TableCell align="right">State</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weatherRowData.map((row: WeatherRow) => (
                        <TableRow key={row.day}>
                            <TableCell component="th" scope="row">
                                {row.day}
                            </TableCell>
                            <TableCell align="right">{Math.round(row.max_temperature)}</TableCell>
                            <TableCell align="right">{Math.round(row.min_temperature)}</TableCell>
                            <TableCell align="right">
                                <img width="20em" src={`https://www.metaweather.com/static/img/weather/${row.state}.svg`} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export { WeatherTable };