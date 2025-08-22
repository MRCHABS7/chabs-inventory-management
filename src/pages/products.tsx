import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductForm from '../components/ProductForm';
import InventoryView from '../components/InventoryView';
import { createProduct, deleteProduct, listProducts } from '../lib/storage-simple';
import type { Product } from '../lib/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const refresh = () => setProducts(listProducts());
  useEffect(() => { refresh(); }, []);

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductForm onSave={(draft) => { createProduct({ id: '', ...draft } as any); refresh(); }} />
        <InventoryView products={products} />
        <div className="card">
          <table className="table">
            <thead><tr><th className="text-left">Product</th><th>Price</th><th>Stock</th><th /></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td className="text-left">{p.name}</td>
                  <td>{typeof p.sellingPrice === 'number' ? p.sellingPrice.toFixed(2) : '0.00'}</td>
                  <td>{p.stock || 0}</td>
                  <td><button className="btn" onClick={() => { deleteProduct(p.id); refresh(); }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
