import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { getRepairs } from '../features/repairs/repairSlice';
import Loading from '../components/Loading';

const Repairs = () => {
  const dispatch = useDispatch();
  const { repairs, isLoading } = useSelector((state) => state.repairs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    dispatch(getRepairs());
  }, [dispatch]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'badge badge-pending';
      case 'in_progress':
        return 'badge badge-progress';
      case 'completed':
        return 'badge badge-completed';
      default:
        return 'badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En Progreso';
      case 'completed':
        return 'Completado';
      default:
        return status;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-between flex-center">
        <h1>Reparaciones</h1>
        <button className="btn btn-primary">
          <FaPlus />
          Nueva Reparación
        </button>
      </div>

      <div className="card">
        <div className="flex flex-between flex-center">
          <div className="form-group" style={{ width: '300px', marginBottom: 0 }}>
            <div className="flex">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar reparación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" style={{ marginLeft: '8px' }}>
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="flex flex-center">
            <FaFilter style={{ marginRight: '8px' }} />
            <select
              className="form-control"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Dispositivo</th>
              <th>Problema</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((repair) => (
              <tr key={repair._id}>
                <td>#{repair._id.slice(-4)}</td>
                <td>{repair.customer.name}</td>
                <td>{repair.device.brand} {repair.device.model}</td>
                <td>{repair.issue.description}</td>
                <td>{new Date(repair.dates.received).toLocaleDateString()}</td>
                <td>
                  <span className={getStatusBadgeClass(repair.status)}>
                    {getStatusText(repair.status)}
                  </span>
                </td>
                <td>
                  <div className="flex" style={{ gap: '8px' }}>
                    <button className="btn btn-warning">Ver</button>
                    <button className="btn btn-primary">Editar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Repairs; 