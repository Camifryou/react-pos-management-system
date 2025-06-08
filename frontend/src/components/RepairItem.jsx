import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';

const statusColors = {
  'Pending': 'warning',
  'Diagnosed': 'info',
  'In Progress': 'primary',
  'Waiting Parts': 'error',
  'Completed': 'success',
  'Delivered': 'default',
  'Cancelled': 'error'
};

const RepairItem = ({ repair }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/repairs/${repair._id}`);
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
            {repair.device.brand} {repair.device.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cliente: {repair.customer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Problema: {repair.issue.description}
          </Typography>
        </Stack>

        <Stack spacing={2} alignItems="flex-end">
          <Badge 
            color={statusColors[repair.status]} 
            badgeContent={repair.status}
          />
          <Typography variant="body2" color="text.secondary">
            Recibido: {format(new Date(repair.dates.received), 'dd/MM/yyyy')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Técnico: {repair.technician.name}
          </Typography>
        </Stack>
      </Stack>

      {repair.diagnosis && (
        <Stack mt={2} spacing={1}>
          <Typography variant="body2">
            <strong>Diagnóstico:</strong> {repair.diagnosis.notes}
          </Typography>
          {repair.diagnosis.estimatedCost && (
            <Typography variant="body2">
              <strong>Costo Estimado:</strong> ${repair.diagnosis.estimatedCost}
            </Typography>
          )}
          {repair.diagnosis.estimatedTime && (
            <Typography variant="body2">
              <strong>Tiempo Estimado:</strong> {repair.diagnosis.estimatedTime}
            </Typography>
          )}
        </Stack>
      )}

      {repair.cost.total > 0 && (
        <Stack mt={2} direction="row" justifyContent="flex-end" spacing={2}>
          <Typography variant="body2">
            <strong>Partes:</strong> ${repair.cost.parts}
          </Typography>
          <Typography variant="body2">
            <strong>Mano de Obra:</strong> ${repair.cost.labor}
          </Typography>
          <Typography variant="body1" color="primary">
            <strong>Total:</strong> ${repair.cost.total}
          </Typography>
        </Stack>
      )}
    </Card>
  );
};

export default RepairItem; 