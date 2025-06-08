import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import CustomerItem from '../components/CustomerItem';
import Loading from '../components/Loading';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../features/customers/customerSlice';
import { FaPlus, FaSearch, FaPhone, FaEnvelope } from 'react-icons/fa';

const initialFormState = {
  name: '',
  phone: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: ''
  },
  notes: ''
};

const Customers = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  const { customers, isLoading, error } = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleOpenDialog = (customer = null) => {
    if (customer) {
      setFormData(customer);
      setEditingId(customer._id);
    } else {
      setFormData(initialFormState);
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormState);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateCustomer({ id: editingId, customerData: formData }));
    } else {
      dispatch(createCustomer(formData));
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
      dispatch(deleteCustomer(id));
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  if (isLoading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <div className="flex flex-between flex-center">
        <h1>Clientes</h1>
        <button className="btn btn-primary" onClick={() => handleOpenDialog()}>
          <FaPlus />
          Nuevo Cliente
        </button>
      </div>

      <div className="card">
        <div className="form-group" style={{ width: '300px', marginBottom: 0 }}>
          <div className="flex">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" style={{ marginLeft: '8px' }}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {filteredCustomers.map((customer) => (
          <div key={customer._id} className="card">
            <div className="flex flex-between">
              <h3>{customer.name}</h3>
              <button className="btn btn-primary" onClick={() => handleOpenDialog(customer)}>Ver detalles</button>
            </div>
            <div style={{ marginTop: '16px' }}>
              <p className="flex flex-center" style={{ gap: '8px', marginBottom: '8px' }}>
                <FaPhone />
                {customer.phone}
              </p>
              <p className="flex flex-center" style={{ gap: '8px', marginBottom: '16px' }}>
                <FaEnvelope />
                {customer.email}
              </p>
              <div className="flex flex-between" style={{ color: 'var(--text-secondary)' }}>
                <span>Reparaciones: {customer.repairs}</span>
                <span>Última visita: {new Date(customer.lastVisit).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Editar Cliente' : 'Nuevo Cliente'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Teléfono"
                  fullWidth
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Calle"
                  fullWidth
                  value={formData.address.street}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Ciudad"
                  fullWidth
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Estado"
                  fullWidth
                  value={formData.address.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Código Postal"
                  fullWidth
                  value={formData.address.zipCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, zipCode: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notas"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingId ? 'Guardar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Customers; 