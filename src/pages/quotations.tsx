import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import QuoteBuilder from '../components/QuoteBuilder';
import PDFExporter from '../components/PDFExporter';
import { createQuotation, listCustomers, listProducts, listQuotations, updateQuotation } from '../lib/storage-simple';
import type { Customer, Product, Quotation } from '../lib/types';
import { getCompany } from '../lib/storage-simple';

export default function QuotationsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [quotes, setQuotes] = useState<Quotation[]>([]);

  const refresh = () => {
    setCustomers(listCustomers());
    setProducts(listProducts());
    setQuotes(listQuotations());
  };
  useEffect(() => { refresh(); }, []);

  const company = useMemo(() => getCompany(), [quotes]);

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold">Quotations</h1>

        <QuoteBuilder customers={customers} products={products} onSave={(q) => { createQuotation(q); refresh(); }} />

        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th className="text-left">Quote ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q => {
                const c = customers.find(cc => cc.id === q.customerId);
                const total = q.items.reduce((sum, it) => {
                  const p = products.find(pp => pp.id === it.productId);
                  const price = it.customPrice ?? p?.price ?? 0;
                  return sum + price * it.quantity;
                }, 0);
                return (
                  <tr key={q.id}>
                    <td className="text-left">{q.id.slice(0, 8)}</td>
                    <td>{c?.name ?? '-'}</td>
                    <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        className="input"
                        value={q.status}
                        onChange={e => { updateQuotation(q.id, { status: e.target.value as any }); refresh(); }}
                      >
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td>{typeof total === 'number' ? total.toFixed(2) : '0.00'}</td>
                    <td className="space-x-2">
                      {c && (
                        <PDFExporter company={company} customer={c} quotation={q} products={products} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}