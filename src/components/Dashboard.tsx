import Link from 'next/link';
import { listCustomers, listProducts, listQuotations } from '../lib/storage';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [counts, setCounts] = useState({ customers: 0, products: 0, quotations: 0 });

  useEffect(() => {
    setCounts({
      customers: listCustomers().length,
      products: listProducts().length,
      quotations: listQuotations().length,
    });
  }, []);

  return (
    <div className="min-h-screen gradient-bg-3">
      <div className="container py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">CHABS Inventory Dashboard</h1>
          <p className="text-white/80 text-lg">Advanced Business Management System</p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-2xl font-bold text-blue-600">{counts.customers}</div>
            <div className="text-sm text-gray-600">Customers</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">📦</div>
            <div className="text-2xl font-bold text-green-600">{counts.products}</div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-2xl font-bold text-purple-600">{counts.quotations}</div>
            <div className="text-sm text-gray-600">Quotations</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">🚚</div>
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-sm text-gray-600">Orders</div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Link href="/customers" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Management</h3>
              <p className="text-sm text-gray-600">Manage clients, contacts & credit limits</p>
            </div>
          </Link>

          <Link href="/suppliers" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Supplier Management</h3>
              <p className="text-sm text-gray-600">Manage suppliers & price comparisons</p>
            </div>
          </Link>

          <Link href="/products" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Inventory Management</h3>
              <p className="text-sm text-gray-600">Products, BOM, cost & pricing</p>
            </div>
          </Link>

          <Link href="/quotations" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quotation System</h3>
              <p className="text-sm text-gray-600">Create quotes & convert to orders</p>
            </div>
          </Link>

          <Link href="/orders" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Management</h3>
              <p className="text-sm text-gray-600">Track orders & delivery status</p>
            </div>
          </Link>

          <Link href="/purchase-orders" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Purchase Orders</h3>
              <p className="text-sm text-gray-600">Automated supplier ordering</p>
            </div>
          </Link>

          <Link href="/warehouse" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Warehouse Operations</h3>
              <p className="text-sm text-gray-600">Stock movements & fulfillment</p>
            </div>
          </Link>

          <Link href="/automation" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI & Automation</h3>
              <p className="text-sm text-gray-600">Smart business automation</p>
            </div>
          </Link>

          <Link href="/reports" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Reports & Analytics</h3>
              <p className="text-sm text-gray-600">Profit analysis & insights</p>
            </div>
          </Link>

          <Link href="/settings" className="group">
            <div className="card hover:scale-105 transition-transform duration-300 text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">System Settings</h3>
              <p className="text-sm text-gray-600">Company details & configuration</p>
            </div>
          </Link>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🚀 Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
                <div className="font-medium text-blue-800">Create New Quotation</div>
                <div className="text-sm text-blue-600">Start a new quote for a customer</div>
              </button>
              <button className="w-full p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
                <div className="font-medium text-green-800">Add New Product</div>
                <div className="text-sm text-green-600">Add product with BOM & pricing</div>
              </button>
              <button className="w-full p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                <div className="font-medium text-purple-800">Stock Adjustment</div>
                <div className="text-sm text-purple-600">Update inventory levels</div>
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">⚠️ Alerts & Notifications</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="font-medium text-red-800">Low Stock Alert</div>
                <div className="text-sm text-red-600">3 products below minimum stock</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium text-yellow-800">Pending Orders</div>
                <div className="text-sm text-yellow-600">5 orders awaiting preparation</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">Quotes Expiring Soon</div>
                <div className="text-sm text-blue-600">2 quotes expire this week</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="card">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">CHABS Inventory System</h3>
              <p className="text-sm text-gray-600">Professional Edition - v2.0.0</p>
            </div>
            <div className="text-right">
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-2">🟢 System Online</div>
              <div className="text-sm text-gray-600">Last sync: {new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}