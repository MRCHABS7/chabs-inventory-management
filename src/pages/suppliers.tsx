import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { listSuppliers, createSupplier, deleteSupplier } from '../lib/storage-simple';
import SupplierForm from '../components/SupplierForm';
import type { Supplier } from '../lib/types';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const refresh = () => setSuppliers(listSuppliers());
  useEffect(() => { refresh(); }, []);

  return (
    <Layout>
      <div className="min-h-screen gradient-bg-2">
        <div className="container py-6 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Supplier Management</h1>
            <p className="text-white/80 text-lg">Manage your suppliers and compare prices</p>
          </div>

          <SupplierForm onSave={(draft) => { createSupplier(draft); refresh(); }} />
          
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Suppliers Directory</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-left">Supplier Name</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Rating</th>
                    <th>Payment Terms</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map(s => (
                    <tr key={s.id}>
                      <td className="font-medium">{s.name}</td>
                      <td>{s.contactPerson || '-'}</td>
                      <td>{s.email || '-'}</td>
                      <td>{s.phone || '-'}</td>
                      <td>
                        <div className="flex items-center">
                          {'⭐'.repeat(s.rating)}
                          <span className="ml-2 text-sm text-gray-600">({s.rating}/5)</span>
                        </div>
                      </td>
                      <td>{s.paymentTerms || '-'}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button className="btn-secondary text-sm px-3 py-1">Edit</button>
                          <button 
                            className="btn-danger text-sm px-3 py-1" 
                            onClick={() => { deleteSupplier(s.id); refresh(); }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {suppliers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No suppliers found. Add your first supplier above.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}