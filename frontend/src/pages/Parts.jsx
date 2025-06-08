import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaSearch, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import { getParts } from '../features/parts/partSlice';
import Loading from '../components/Loading';

const Parts = () => {
  const dispatch = useDispatch();
  const { parts, isLoading } = useSelector((state) => state.parts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    dispatch(getParts());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-between flex-center">
        <h1>Repuestos</h1>
        <button className="btn btn-primary">
          <FaPlus />
          Nuevo Repuesto
        </button>
      </div>

      <div className="card">
        <div className="flex flex-between flex-center">
          <div className="form-group" style={{ width: '300px', marginBottom: 0 }}>
            <div className="flex">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar repuesto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" style={{ marginLeft: '8px' }}>
                <FaSearch />
              </button>
            </div>
          </div>

          <select
            className="form-control"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="all">Todas las categorías</option>
            <option value="screens">Pantallas</option>
            <option value="batteries">Baterías</option>
            <option value="cameras">Cámaras</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {parts.map((part) => (
          <div key={part._id} className="card">
            <div className="flex flex-between">
              <h3>{part.name}</h3>
              <button className="btn btn-primary">Editar</button>
            </div>
            <div style={{ marginTop: '16px' }}>
              <div className="flex flex-between" style={{ marginBottom: '16px' }}>
                <div className="flex flex-center" style={{ gap: '8px' }}>
                  <FaBoxOpen />
                  <span>Stock: {part.stock.current}</span>
                </div>
                {part.stock.current < part.stock.minimum && (
                  <span className="badge badge-warning flex flex-center" style={{ gap: '4px' }}>
                    <FaExclamationTriangle />
                    Bajo stock
                  </span>
                )}
              </div>
              <p style={{ marginBottom: '8px' }}>
                <strong>Precio:</strong> ${part.price.sale}
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong>Compatibilidad:</strong>
                <br />
                {part.compatibility.map((device) => (
                  <span key={device.brand + device.model}>{device.brand} {device.model}, </span>
                ))}
              </p>
              <div className="flex flex-between">
                <button className="btn btn-warning">Ajustar stock</button>
                <button className="btn btn-success">Ordenar más</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parts; 