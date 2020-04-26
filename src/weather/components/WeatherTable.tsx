import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    tableContainer: {
        paddingBottom: "2em",
    },
    table: {
        minWidth: 375,
    },
});

function createData(name: string, calories: number, fat: number) {
    return { name, calories, fat };
}

const rows = [
    createData('Monday', 159, 6.0),
    createData('Tuesday', 237, 9.0),
    createData('Wednesday', 262, 16.0),
    createData('Thursday', 305, 3.7),
    createData('Friday', 356, 16.0),
    createData('Saturday', 356, 16.0),
    createData('Sunday', 356, 16.0),
];

const WeatherTable = () => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export { WeatherTable };