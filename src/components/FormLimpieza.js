import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TimePicker } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NativeSelect from '@mui/material/NativeSelect';
import SendIcon from '@mui/icons-material/Send';


const validationSchema = yup.object({
  turno: yup
    .string('Ingrese el turno')
    .min(1, 'Solo existe turno 1 y 2')
    .required('El turno es requerido'),
  codOperario: yup
    .string('Enter your codOperario')
    .min(5, 'El codigo del operario debe tener 5 caracteres')
    .required('El codigo operario es requerido'),
  nombreOperario: yup
    .string('Ingrese el nombre del operario')
    .required('El nombre es requerido'),
  nroFabricacion: yup
    .string('Ingresa el numero de fabricacion')
    .min(5, 'El numero de fabricacion debe tener 8 caracteres')
    .required('El numero de fabricacion es requerido'),
  lote: yup
    .string('Ingrese numero de lote')
    .required('El numero de lote es requerido'),
  material: yup
    .string('Ingrese codigo de material')
    .min(6, 'El codigo del material debe tener 6 caracteres')
    .required('El codigo material es requerido'),
  descripcion: yup
    .string('Ingrese descripcion')
    .required('La descripcion es requerida'),
  peso: yup
    .string('El peso debe ser un numero')
    .required('La peso es requerida'),
});


const FormLimpieza = () => {
  const formik = useFormik({
    initialValues: {
      lote: 12,
      material: 'foobar',
    },
    validationSchema: validationSchema

  });
  


  const [value, setValue] = React.useState(new Date());
  const [fecRegistro, setFecRegistro] = React.useState(new Date());
  const [hora, setHora] = React.useState(new Date());
  const [unidad, setUnidad] = useState('')
  const [objPost, setObjPost] = useState({}) // en objpost esta el obj global para el post
  

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setObjPost({...formik.values, fecha: value, hora: hora, unidad: unidad, fechaRegistro: fecRegistro})
    console.log('dasdas');

    // const data = await fetch('https://exandal.herokuapp.com/registro',{
    //   method: 'POST',
    //   body: JSON.stringify(ObjPost), 
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // })

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "codOperario": objPost.codOperario,
      "descripcion": objPost.descripcion,
      "fecha": objPost.fecha,
      "fechaRegistro": objPost.fechaRegistro,
      "hora": objPost.hora,
      "lote": objPost.lote,
      "material": objPost.material,
      "nombreOperario": objPost.nombreOperario,
      "nroFabricacion": objPost.nroFabricacion,
      "peso": objPost.peso,
      "turno": objPost.turno,
      "unidad": objPost.unidad
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://exandal.herokuapp.com/registro", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    

  };
  const handleReset = () => {
    
  };
  

  return (
    <Container maxWidth="sm" onReset={handleReset}>
      <Box sx={{ marginTop: '10%' }} >
        <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Fecha"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
          <TextField
            style={{ marginTop: '15px' }}
            id="turno"
            name="turno"
            label="Turno"
            type="string"
            value={formik.values.turno}
            onChange={formik.handleChange}
            error={formik.touched.turno && Boolean(formik.errors.turno)}
            helperText={formik.touched.turno && formik.errors.turno}
          />
        <LocalizationProvider   dateAdapter={AdapterDateFns}>
          <Stack spacing={13} style={{ marginTop: '15px', marginBottom:'15px' }}>
            <DesktopDatePicker
              label="Fecha de registro"
              inputFormat="MM/dd/yyyy"
              value={fecRegistro}
              onChange={(value)=> {
                setFecRegistro(value)
                console.log(fecRegistro)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <LocalizationProvider  dateAdapter={AdapterDateFns}>
          <TimePicker
              label="Hora"
              clearable
              ampm={false}
              value={hora}
              onChange={(value)=>{
                setHora(value)
                console.log(hora)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
          <TextField
            style={{ marginTop: '15px' }}
            fullWidth
            id="codOperario"
            name="codOperario"
            label="Codigo operario"
            type="string"
            value={formik.values.codOperario}
            onChange={formik.handleChange}
            error={formik.touched.codOperario && Boolean(formik.errors.codOperario)}
            helperText={formik.touched.codOperario && formik.errors.codOperario}
          />
          <TextField
            style={{ marginTop: '15px' }}
            fullWidth
            id="nombreOperario"
            name="nombreOperario"
            label="Nombre operario"
            type="string"
            value={formik.values.nombreOperario}
            onChange={formik.handleChange}
            error={formik.touched.nombreOperario && Boolean(formik.errors.nombreOperario)}
            helperText={formik.touched.nombreOperario && formik.errors.nombreOperario}
          />
          <TextField
            style={{ marginTop: '15px' }}
            fullWidth
            id="nroFabricacion"
            name="nroFabricacion"
            label="Numero fabricacion"
            type="number"
            value={formik.values.nroFabricacion}
            onChange={formik.handleChange}
            error={formik.touched.nroFabricacion && Boolean(formik.errors.nroFabricacion)}
            helperText={formik.touched.nroFabricacion && formik.errors.nroFabricacion}
          />
          <TextField
            style={{ marginTop: '15px' }}
            fullWidth
            id="lote"
            name="lote"
            label="Numero lote"
            type="number"
            value={formik.values.lote}
            onChange={formik.handleChange}
            error={formik.touched.lote && Boolean(formik.errors.lote)}
            helperText={formik.touched.lote && formik.errors.lote}
          />
          <TextField
            style={{ marginTop: '15px' }}
            fullWidth
            id="material"
            name="material"
            label="Codigo material"
            type="string"
            value={formik.values.material}
            onChange={formik.handleChange}
            error={formik.touched.material && Boolean(formik.errors.material)}
            helperText={formik.touched.material && formik.errors.material}
          />
          <TextField
            style={{ marginTop: '15px' }}
            fullWidth
            id="descripcion"
            name="descripcion"
            label="Descripcion"
            type="string"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
            helperText={formik.touched.descripcion && formik.errors.descripcion}
          />
          <Box sx={{ minWidth: 120 }} style={{ marginTop: '15px' }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Unidad
              </InputLabel>
              <NativeSelect
                name="unidada"
                onChange={(unidad)=>{
                  setUnidad(unidad.target.value)
                  console.log(unidad.target.value)
                }}
                value={unidad}
                defaultValue={'Kilogramos'}
                inputProps={{
                  name: 'uni',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={'Kilogramos'}>Kilogramos</option>
                <option value={'Gramos'}>Gramos</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <TextField
            style={{ marginTop: '15px' }}
            fullWidth
            id="peso"
            name="peso"
            label="Peso"
            type="number"
            value={formik.values.peso}
            onChange={formik.handleChange}
            error={formik.touched.peso && Boolean(formik.errors.peso)}
            helperText={formik.touched.peso && formik.errors.peso}
          />
          
          <Stack justifyContent="center" direction="row" spacing={1} style={{ marginTop: '25px', marginBottom:'100px' }}>
            <Button  
              color="primary" 
              variant="contained" 
              endIcon={<SendIcon />} 
              type="submit">
              Guardar
            </Button>
            <Button  color="secondary" variant="contained" type="submit">
              Descargar excel
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default FormLimpieza;
