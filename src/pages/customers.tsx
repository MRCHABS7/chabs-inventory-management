import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CustomerForm from '../components/CustomerForm';
import { createCustomer, deleteCustomer, listCustomers } from '../lib/storage-simple';
import type { Customer } from '../lib/types';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const refresh = () => setCustomers(listCustomers());
  useEffect(() => { refresh(); }, []);

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <CustomerForm onSave={(draft) => { createCustomer({ id: '', ...draft } as any); refresh(); }} />
        <div className="card">
          <table className="table">
            <thead><tr><th className="text-left">Name</th><th>Email</th><th>Phone</th><th>Address</th><th /></tr></thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td className="text-left">{c.name}</td>
                  <td>{c.email ?? '-'}</td>
                  <td>{c.phone ?? '-'}</td>
                  <td>{c.address ?? '-'}</td>
                  <td><button className="btn" onClick={() => { deleteCustomer(c.id); refresh(); }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
