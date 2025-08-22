import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { listOrders, listProducts, updateOrder, createStockMovement } from '../lib/storage-simple';
import { me } from '../lib/auth-simple';
import type { Order, Product } from '../lib/types';

export default function WarehousePage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'stock'>('orders');

  // Authentication check
  useEffect(() => { 
    if (!me()) router.replace('/'); 
  }, [router]);

  const refresh = () => {
    setOrders(listOrders());
    setProducts(listProducts());
  };
  
  useEffect(() => { refresh(); }, []);

  const warehouseOrders = orders.filter(o => 
    ['confirmed', 'preparing', 'ready'].includes(o.status)
  );

  const lowStockProducts = products.filter(p => p.stock <= p.minimumStock);

  const updateOrderStatus = (orderId: string, status: string, notes?: string) => {
    updateOrder(orderId, { 
      status: status as any, 
      warehouseNotes: notes,
      updatedAt: new Date().toISOString() 
    });
    refresh();
  };

  const adjustStock = (productId: string, adjustment: number, reason: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      // Update product stock
      const newStock = Math.max(0, product.stock + adjustment);
      // In a real app, you'd update the product stock here
      
      // Record stock movement
      createStockMovement({
        productId,
        type: adjustment > 0 ? 'in' : 'out',
        quantity: Math.abs(adjustment),
        reason,
        createdBy: 'warehouse-user'
      });
      
      refresh();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen gradient-bg-2">
        <div className="container py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Warehouse Operations</h1>
          <p className="text-white/80 text-lg">Manage orders and inventory</p>
        </div>

        {/* Tab Navigation */}
        <div className="card">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📦 Order Fulfillment ({warehouseOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('stock')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'stock'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📊 Stock Management
            </button>
          </div>

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders Requiring Action</h2>
              <div className="space-y-4">
                {warehouseOrders.map(order => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                        <p className="text-gray-600">Total: ${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}</p>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'preparing' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          Priority: {order.priority}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Order Items:</h4>
                      <div className="bg-gray-50 rounded p-3">
                        {order.items.map((item, idx) => {
                          const product = products.find(p => p.id === item.productId);
                          const hasStock = product && product.stock >= item.quantity;
                          return (
                            <div key={idx} className="flex justify-between items-center py-1">
                              <span>{product?.name || 'Unknown Product'}</span>
                              <span className={`font-medium ${hasStock ? 'text-green-600' : 'text-red-600'}`}>
                                Qty: {item.quantity} {hasStock ? '✅' : '❌ Insufficient Stock'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="btn-success text-sm px-4 py-2"
                        >
                          Start Preparation
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="btn-success text-sm px-4 py-2"
                        >
                          Mark as Ready
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          className="btn text-sm px-4 py-2"
                        >
                          Ship Order
                        </button>
                      )}
                      <button
                        onClick={() => {
                          const notes = prompt('Add warehouse notes:');
                          if (notes) updateOrderStatus(order.id, order.status, notes);
                        }}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        Add Notes
                      </button>
                    </div>

                    {order.warehouseNotes && (
                      <div className="mt-3 p-3 bg-blue-50 rounded">
                        <p className="text-sm"><strong>Warehouse Notes:</strong> {order.warehouseNotes}</p>
                      </div>
                    )}
                  </div>
                ))}
                {warehouseOrders.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No orders requiring warehouse action.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'stock' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Stock Management</h2>
              
              {/* Low Stock Alert */}
              {lowStockProducts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-red-800 mb-2">⚠️ Low Stock Alert</h3>
                  <div className="space-y-2">
                    {lowStockProducts.map(product => (
                      <div key={product.id} className="flex justify-between items-center">
                        <span className="text-red-700">{product.name}</span>
                        <span className="text-red-600 font-medium">
                          Current: {product.stock} | Min: {product.minimumStock}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Adjustment */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Quick Stock Adjustment</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <select className="input" id="product-select">
                    <option value="">Select Product</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Current: {p.stock})</option>
                    ))}
                  </select>
                  <input 
                    type="number" 
                    className="input" 
                    placeholder="Adjustment (+/-)" 
                    id="adjustment-input"
                  />
                  <button
                    onClick={() => {
                      const productSelect = document.getElementById('product-select') as HTMLSelectElement;
                      const adjustmentInput = document.getElementById('adjustment-input') as HTMLInputElement;
                      const reason = prompt('Reason for adjustment:');
                      
                      if (productSelect.value && adjustmentInput.value && reason) {
                        adjustStock(productSelect.value, parseInt(adjustmentInput.value), reason);
                        adjustmentInput.value = '';
                        productSelect.value = '';
                      }
                    }}
                    className="btn"
                  >
                    Adjust Stock
                  </button>
                </div>
              </div>

              {/* Current Stock Levels */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-left">Product</th>
                      <th>SKU</th>
                      <th>Current Stock</th>
                      <th>Min Stock</th>
                      <th>Max Stock</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td className="font-medium">{product.name}</td>
                        <td>{product.sku}</td>
                        <td className="font-medium">{product.stock}</td>
                        <td>{product.minimumStock}</td>
                        <td>{product.maximumStock}</td>
                        <td>{product.location || '-'}</td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.stock <= product.minimumStock 
                              ? 'bg-red-100 text-red-800' 
                              : product.stock >= product.maximumStock
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {product.stock <= product.minimumStock ? 'Low Stock' : 
                             product.stock >= product.maximumStock ? 'Overstock' : 'Normal'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}