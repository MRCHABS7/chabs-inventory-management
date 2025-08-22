import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { listOrders, updateOrder, listCustomers } from '../lib/storage-simple';
import type { Order, Customer } from '../lib/types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const refresh = () => {
    setOrders(listOrders());
    setCustomers(listCustomers());
  };
  
  useEffect(() => { refresh(); }, []);

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.name || 'Unknown Customer';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-orange-100 text-orange-800',
      ready: 'bg-green-100 text-green-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-200 text-green-900',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    updateOrder(orderId, { status: status as any, updatedAt: new Date().toISOString() });
    refresh();
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <Layout>
      <div className="min-h-screen gradient-bg">
        <div className="container py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Order Management</h1>
          <p className="text-white/80 text-lg">Track and manage customer orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="card">
          <div className="flex flex-wrap gap-2 mb-4">
            {['all', 'pending', 'confirmed', 'preparing', 'ready', 'shipped', 'delivered'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                    {orders.filter(o => o.status === status).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Orders ({filteredOrders.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-left">Order #</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created</th>
                  <th>Expected Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="font-medium">{order.orderNumber}</td>
                    <td>{getCustomerName(order.customerId)}</td>
                    <td className="font-medium">${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                        {order.priority}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.expectedDelivery ? new Date(order.expectedDelivery).toLocaleDateString() : '-'}</td>
                    <td>
                      <select
                        className="input text-sm"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No orders found for the selected filter.
              </div>
            )}
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Pending Orders</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-orange-600">{orders.filter(o => o.status === 'preparing').length}</div>
            <div className="text-sm text-gray-600">In Preparation</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{orders.filter(o => o.status === 'shipped').length}</div>
            <div className="text-sm text-gray-600">Shipped</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">
              ${orders.reduce((sum, o) => sum + (typeof o.total === 'number' ? o.total : 0), 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Value</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}