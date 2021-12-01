import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const Fabricacion = ()=> {
    
    const [datos, setDatos] = React.useState([])
    const [filas, setFilas] = React.useState([])

    React.useEffect(()=>{
        const getData = async ()=>{
            const response = await fetch('https://exandal.herokuapp.com/registro');
            const data = await response.json();
            setDatos(data.data);
        }
        getData();

        

    }
    , []);

    React.useEffect(()=>{
        datos.map((row) => {
            let sanitizedRow = {
                fecha:`${new Date(row.fecha).getDay().toString()}-${new Date(row.fecha).getMonth().toString()}-${new Date(row.fecha).getFullYear().toString() }`,
                turno:row.turno,
                fechaRegistro:`${new Date(row.fechaRegistro).getDay().toString()}-${new Date(row.fechaRegistro).getMonth().toString()}-${new Date(row.fechaRegistro).getFullYear().toString() }`,
                hora:`${new Date(row.fechaRegistro).getHours()}:${new Date(row.fechaRegistro).getMinutes() }`,
                codOperario:row.codOperario,
                nombreOperario:row.nombreOperario,
                nroFabricacion:row.nroFabricacion,
                lote:row.lote,
                material:row.material,
                descripcion:row.descripcion,
                unidad:row.unidad,
                peso:row.peso
            }
            setFilas(filas => [...filas, sanitizedRow])
            console.log(sanitizedRow)
        })
    }, [datos])


    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Turno</TableCell>
                <TableCell align="right">Fecha registro</TableCell>
                <TableCell align="right">Hora</TableCell>
                <TableCell align="right">Codigo Operario</TableCell>
                <TableCell align="right">Num Orden operacion</TableCell>
                <TableCell align="right">N° Lote de MP</TableCell>
                <TableCell align="right">Código de material</TableCell>
                <TableCell align="right">Descripción</TableCell>
                <TableCell align="right">Unidad de Medida</TableCell>
                <TableCell align="right">KG</TableCell>
                <TableCell align="right">Peso</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {filas.map((row) => (

                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">{row.fecha}</TableCell>
                    <TableCell align="right">{row.turno}</TableCell>
                    <TableCell align="right">{row.fechaRegistro}</TableCell>
                    <TableCell align="right">{row.hora}</TableCell>
                    <TableCell align="right">{row.codOperario}</TableCell>
                    <TableCell align="right">{row.nombreOperario}</TableCell>
                    <TableCell align="right">{row.nroFabricacion}</TableCell>
                    <TableCell align="right">{row.lote}</TableCell>
                    <TableCell align="right">{row.material}</TableCell>
                    <TableCell align="right">{row.descripcion}</TableCell>
                    <TableCell align="right">{row.unidad}</TableCell>
                    <TableCell align="right">{row.peso}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}


export default Fabricacion;
