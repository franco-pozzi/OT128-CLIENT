import '../FormStyles.css'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toBase64 } from '../../utils/toBase64'
import { SUPPORTED_FORMATS } from '../../utils/supportedFormatsImg'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LinearProgressFeedback } from '../LinearProgress'
import {
  postActivity,
  putActivity,
} from '../../Services/apiServices/activitiesApiService'
import { alertServiceInfoTimer } from '../AlertService'
import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from '@mui/material'

const ActivitiesForm = () => {
  let id = useParams().id
  const [responseServer, setResponseServer] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const formikInitialValues = {
    name: '',
    description: '',
    image: undefined,
  }
  const formikValidationSchema = Yup.object({
    name: Yup.string().required('El campo nombre es obligatorio.'),
    description: Yup.string(),
    image: Yup.mixed()
      .required('ingrese una imagen')
      .test(
        'fileType',
        'Formato incorrecto. Sólo se aceptan archivos .jpg, .jpeg, .png',
        (value) => {
          if (value) return SUPPORTED_FORMATS.includes(value && value.type)
        },
      ),
  })

  const handleSubmit = async (formData) => {
    setIsLoading(true)
    const imageBase64 = await toBase64(formData.image)
    console.log(id)
    if (id) {
      setResponseServer(
        await putActivity(id, {
          ...formData,
          image: imageBase64,
        }),
      )
    } else {
      setResponseServer(
        await postActivity({
          ...formData,
          image: imageBase64,
        }),
      )
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setResponseServer(undefined)
    }, 3100)
    console.log(responseServer)
  }, [responseServer])

  return (
    <Formik
      enableReinitialize
      initialValues={formikInitialValues}
      validationSchema={formikValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        setFieldValue,
        touched,
      }) => (
        <Container>
          <Box sx={{ boxShadow: 5, p: 5, mt: 2 }}>
            <Typography variant="h4">
              {!id ? 'Crear Actividad' : 'Editar Actividad'}
            </Typography>
            <form className="form-container" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name && errors.name}
                label="Título Actividad"
                error={touched.name && Boolean(errors.name)}
              />
              <CKEditor
                editor={ClassicEditor}
                data={values.description}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setFieldValue('description', data)
                }}
              />
              <ErrorMessage component="small" name="description" />
              <label htmlFor="image">
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="image"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    setFieldValue('image', e.target.files[0])
                  }}
                  error={errors.image}
                />
                <Button fullWidth variant="outlined" component="span">
                  subir imagen
                </Button>
                <ErrorMessage component="small" name="image" />
              </label>
              <Button type="submit" variant="contained">
                {id ? 'Editar actividad' : 'Crear actividad'}
              </Button>
              {responseServer !== undefined
                ? alertServiceInfoTimer(
                    'start',
                    'info',
                    responseServer.data.message,
                    false,
                    3000,
                  )
                : null}
              <LinearProgressFeedback isActive={isLoading} />
            </form>
          </Box>
        </Container>
      )}
    </Formik>
  )
}

export default ActivitiesForm
