import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaSearch, FaPhone, FaEnvelope } from 'react-icons/fa';
import { getCustomers } from '../features/customers/customerSlice';
import Loading from '../components/Loading';

const Customers = () => {
  const dispatch = useDispatch();
  const { customers, isLoading } = useSelector((state) => state.customers);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-between flex-center">
        <h1>Clientes</h1>
        <button className="btn btn-primary">
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
        {customers.map((customer) => (
          <div key={customer._id} className="card">
            <div className="flex flex-between">
              <h3>{customer.name}</h3>
              <button className="btn btn-primary">Ver detalles</button>
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
                <span>Reparaciones: {customer.repairs?.length || 0}</span>
                <span>Última visita: {customer.lastVisit ? new Date(customer.lastVisit).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers; 