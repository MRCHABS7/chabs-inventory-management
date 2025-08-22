import { ReactNode } from 'react';
import Navigation from './Navigation';
import { me } from '../lib/auth-simple';

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export default function Layout({ children, showNavigation = true }: LayoutProps) {
  const user = me();
  const shouldShowNav = showNavigation && user;

  return (
    <div className="min-h-screen bg-gray-50">
      {shouldShowNav && <Navigation />}
      <main className={shouldShowNav ? 'pt-0' : ''}>
        {children}
      </main>
      
      {/* Footer */}
      {shouldShowNav && (
        <footer className="bg-white border-t border-gray-200 mt-20">
          <div className="container py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <span className="font-bold text-gray-900">CHABS Inventory</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Advanced Business Management System for modern enterprises.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Inventory Management</li>
                  <li>Purchase Orders</li>
                  <li>AI Automation</li>
                  <li>Advanced Reports</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Documentation</li>
                  <li>Help Center</li>
                  <li>Contact Support</li>
                  <li>Training</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">System Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">All Systems Operational</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">AI Services Online</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-8 flex justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2024 CHABS Inventory System. All rights reserved.
              </p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>v2.0.0</span>
                <span>•</span>
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}