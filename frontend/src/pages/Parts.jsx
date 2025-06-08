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
  Grid,
  MenuItem,
  IconButton
} from '@mui/material';
import { Add as AddIcon, AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import PartItem from '../components/PartItem';
import Loading from '../components/Loading';
import { getParts, createPart, updatePart, deletePart } from '../features/parts/partSlice';

const partTypes = [
  'Screen',
  'Battery',
  'Camera',
  'Speaker',
  'Microphone',
  'Charging Port',
  'Other'
];

const initialFormState = {
  name: '',
  description: '',
  type: '',
  compatibility: [],
  sku: '',
  price: {
    purchase: '',
    sale: ''
  },
  stock: {
    current: 0,
    minimum: 1
  },
  supplier: {
    name: '',
    contact: '',
    code: ''
  },
  location: '',
  notes: ''
};

const Parts = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  const { parts, isLoading, error } = useSelector(state => state.parts);

  useEffect(() => {
    dispatch(getParts());
  }, [dispatch]);

  const handleOpenDialog = (part = null) => {
    if (part) {
      setFormData(part);
      setEditingId(part._id);
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
      dispatch(updatePart({ id: editingId, partData: formData }));
    } else {
      dispatch(createPart(formData));
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta parte?')) {
      dispatch(deletePart(id));
    }
  };

  const handleAddCompatibility = () => {
    setFormData({
      ...formData,
      compatibility: [...formData.compatibility, { brand: '', model: '' }]
    });
  };

  const handleRemoveCompatibility = (index) => {
    const newCompatibility = formData.compatibility.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      compatibility: newCompatibility
    });
  };

  const handleCompatibilityChange = (index, field, value) => {
    const newCompatibility = formData.compatibility.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFormData({
      ...formData,
      compatibility: newCompatibility
    });
  };

  const filteredParts = parts.filter(part => {
    const matchesType = !typeFilter || part.type === typeFilter;
    const matchesSearch = !searchTerm || 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  if (isLoading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Partes y Repuestos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nueva Parte
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
          label="Tipo"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {partTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {filteredParts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No se encontraron partes
        </Typography>
      ) : (
        <Stack spacing={2}>
          {filteredParts.map((part) => (
            <PartItem
              key={part._id}
              part={part}
              onEdit={() => handleOpenDialog(part)}
              onDelete={handleDelete}
            />
          ))}
        </Stack>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingId ? 'Editar Parte' : 'Nueva Parte'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                  select
                  label="Tipo"
                  fullWidth
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {partTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descripción"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="SKU"
                  fullWidth
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Precio Compra"
                  type="number"
                  fullWidth
                  required
                  value={formData.price.purchase}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: { ...formData.price, purchase: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Precio Venta"
                  type="number"
                  fullWidth
                  required
                  value={formData.price.sale}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: { ...formData.price, sale: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Stock Actual"
                  type="number"
                  fullWidth
                  required
                  value={formData.stock.current}
                  onChange={(e) => setFormData({
                    ...formData,
                    stock: { ...formData.stock, current: parseInt(e.target.value) }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Stock Mínimo"
                  type="number"
                  fullWidth
                  required
                  value={formData.stock.minimum}
                  onChange={(e) => setFormData({
                    ...formData,
                    stock: { ...formData.stock, minimum: parseInt(e.target.value) }
                  })}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Compatibilidad
                  <IconButton size="small" onClick={handleAddCompatibility}>
                    <AddCircleOutline />
                  </IconButton>
                </Typography>
                {formData.compatibility.map((comp, index) => (
                  <Stack key={index} direction="row" spacing={2} mb={2}>
                    <TextField
                      label="Marca"
                      value={comp.brand}
                      onChange={(e) => handleCompatibilityChange(index, 'brand', e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Modelo"
                      value={comp.model}
                      onChange={(e) => handleCompatibilityChange(index, 'model', e.target.value)}
                      fullWidth
                    />
                    <IconButton size="small" onClick={() => handleRemoveCompatibility(index)}>
                      <RemoveCircleOutline />
                    </IconButton>
                  </Stack>
                ))}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Proveedor"
                  fullWidth
                  value={formData.supplier.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, name: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Contacto Proveedor"
                  fullWidth
                  value={formData.supplier.contact}
                  onChange={(e) => setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, contact: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Código Proveedor"
                  fullWidth
                  value={formData.supplier.code}
                  onChange={(e) => setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, code: e.target.value }
                  })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Ubicación"
                  fullWidth
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
    </Container>
  );
};

export default Parts; 