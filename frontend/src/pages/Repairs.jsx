import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
  Box
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
import RepairItem from '../components/RepairItem';
import Loading from '../components/Loading';
import { getRepairs } from '../features/repairs/repairSlice';

const statusFilters = [
  'Todas',
  'Pending',
  'Diagnosed',
  'In Progress',
  'Waiting Parts',
  'Completed',
  'Delivered',
  'Cancelled'
];

const Repairs = () => {
  const dispatch = useDispatch();
  const [statusFilter, setStatusFilter] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const { repairs, isLoading, error } = useSelector(state => state.repairs);

  useEffect(() => {
    dispatch(getRepairs());
  }, [dispatch]);

  const handleNewRepair = () => {
    // TODO: Implementar navegación a formulario de nueva reparación
  };

  const filteredRepairs = repairs.filter(repair => {
    const matchesStatus = statusFilter === 'Todas' || repair.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      repair.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.device.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  if (isLoading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Reparaciones</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewRepair}
        >
          Nueva Reparación
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} mb={4}>
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TextField
          select
          label="Estado"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 200 }}
        >
          {statusFilters.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {filteredRepairs.length === 0 ? (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No se encontraron reparaciones
        </Typography>
      ) : (
        <Stack spacing={2}>
          {filteredRepairs.map((repair) => (
            <RepairItem key={repair._id} repair={repair} />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Repairs; 