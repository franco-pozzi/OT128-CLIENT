import {
  Avatar,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Link } from 'react-router-dom'

const mock = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: 2,
    name: 'Freddy Mercury',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: 3,
    name: 'Frank Sinatra',
    image: 'https://picsum.photos/200/200',
  },
]

const MemberRow = ({ member }) => {
  return (
    <TableRow
      key={member.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {member.name}
      </TableCell>
      <TableCell>
        <Avatar
          src={member.image}
          alt={member.name}
          variant="square"
          sx={{ width: 120, height: 120, margin: 'auto' }}
        />
      </TableCell>
      <TableCell align="right">
        <Button sx={{ m: 1 }} variant="contained" color="success">
          Editar
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="success">
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  )
}

const MembersScreen = () => {
  return (
    <Container>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 5, marginTop: 5, marginBottom: 5 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Photo</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <Link
                  to="/backoffice/members/create"
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" color="success">
                    Crear Miembro
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mock.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default MembersScreen