import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Stack, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Phone as PhoneIcon, Email as EmailIcon } from '@mui/icons-material';

const CustomerItem = ({ customer, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/customers/${customer._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(customer);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(customer._id);
  };

  return (
    <Card 
      sx={{ 
        p: 2, 
        mb: 2, 
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6
        }
      }}
      onClick={handleClick}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={1}>
          <Typography variant="h6">
            {customer.name}
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {customer.phone}
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {customer.email}
              </Typography>
            </Stack>
          </Stack>

          {customer.address && (
            <Typography variant="body2" color="text.secondary">
              {customer.address.street}, {customer.address.city}
            </Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {customer.repairs && customer.repairs.length > 0 && (
        <Stack mt={2}>
          <Typography variant="body2" color="text.secondary">
            <strong>Reparaciones:</strong> {customer.repairs.length}
          </Typography>
        </Stack>
      )}

      {customer.notes && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mt: 2, fontStyle: 'italic' }}
        >
          {customer.notes}
        </Typography>
      )}
    </Card>
  );
};

export default CustomerItem; 