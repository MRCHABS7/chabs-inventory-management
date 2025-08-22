import { useMemo, useState } from 'react';
import type { Customer, Product, Quotation } from '../lib/types';

type ItemDraft = { productId: string; quantity: number; customPrice?: number };

export default function QuoteBuilder({
  customers,
  products,
  onSave,
}: {
  customers: Customer[];
  products: Product[];
  onSave: (q: Omit<Quotation, 'id' | 'createdAt'>) => void;
}) {
  const [customerId, setCustomerId] = useState<string>('');
  const [items, setItems] = useState<ItemDraft[]>([]);
  const [notes, setNotes] = useState('');

  const addItem = () => setItems(prev => [...prev, { productId: products[0]?.id ?? '', quantity: 1 }]);
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const updateItem = (i: number, patch: Partial<ItemDraft>) => setItems(prev => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const total = useMemo(() => items.reduce((sum, it) => {
    const p = products.find(pp => pp.id === it.productId);
    const price = it.customPrice ?? p?.price ?? 0;
    return sum + price * (it.quantity || 0);
  }, 0), [items, products]);

  const save = () => {
    if (!customerId) return alert('Select a customer');
    if (!items.length) return alert('Add at least one item');
  
    onSave({
      customerId,
      items: items.map(i => ({
        ...i,
        quantity: Number(i.quantity),
        customPrice: Number.isFinite(i.customPrice)
          ? Number(i.customPrice)
          : undefined
      })),
      status: 'pending',
      notes
    });
  
    setCustomerId('');
    setItems([]);
    setNotes('');
  };
  

  return (
    <div className="card space-y-3">
      <h2 className="text-lg font-semibold">New Quotation</h2>

      <div className="grid md:grid-cols-2 gap-3">
        <select className="input" value={customerId} onChange={e => setCustomerId(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button className="btn" type="button" onClick={addItem}>Add Item</button>
      </div>

      {items.map((it, i) => (
        <div key={i} className="grid md:grid-cols-4 gap-3">
          <select className="input" value={it.productId} onChange={e => updateItem(i, { productId: e.target.value })}>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input className="input" type="number" min={1} value={it.quantity} onChange={e => updateItem(i, { quantity: Number(e.target.value) })} />
          <input className="input" type="number" placeholder="Custom price (optional)" value={it.customPrice ?? ''} onChange={e => updateItem(i, { customPrice: e.target.value ? Number(e.target.value) : undefined })} />
          <button className="btn" type="button" onClick={() => removeItem(i)}>Remove</button>
        </div>
      ))}

      <textarea className="input h-24" placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />

      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Total: {total.toFixed(2)}</div>
        <button className="btn" type="button" onClick={save}>Save Quotation</button>
      </div>
    </div>
  );
}