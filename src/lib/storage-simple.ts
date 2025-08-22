// Stable storage functions for CHABS Inventory System
import { v4 as uuid } from 'uuid';
import type { Customer, Product, Quotation, Order, Supplier, PurchaseOrder, AutomationRule, AIInsight, StockMovement, SupplierPrice, CompanyDetails, ID } from './types';

const KEY = {
  customers: 'chabs_customers',
  products: 'chabs_products',
  quotations: 'chabs_quotations',
  orders: 'chabs_orders',
  suppliers: 'chabs_suppliers',
  purchaseOrders: 'chabs_purchase_orders',
  automationRules: 'chabs_automation_rules',
  aiInsights: 'chabs_ai_insights',
  stockMovements: 'chabs_stock_movements',
  supplierPrices: 'chabs_supplier_prices',
  company: 'chabs_company'
} as const;

const get = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const set = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore errors
  }
};

// Customers
export const listCustomers = (): Customer[] => get<Customer[]>(KEY.customers, []);
export const createCustomer = (c: Omit<Customer, 'id'>): Customer => {
  const all = listCustomers();
  const next: Customer = { ...c, id: uuid() };
  set(KEY.customers, [next, ...all]);
  return next;
};
export const deleteCustomer = (id: ID) => {
  const all = listCustomers().filter(c => c.id !== id);
  set(KEY.customers, all);
};

// Products
export const listProducts = (): Product[] => get<Product[]>(KEY.products, []);
export const createProduct = (p: Omit<Product, 'id'>): Product => {
  const all = listProducts();
  const next: Product = { 
    ...p, 
    id: uuid(),
    sellingPrice: typeof p.sellingPrice === 'number' ? p.sellingPrice : parseFloat(String(p.sellingPrice)) || 0,
    costPrice: typeof p.costPrice === 'number' ? p.costPrice : parseFloat(String(p.costPrice)) || 0,
    stock: typeof p.stock === 'number' ? p.stock : parseInt(String(p.stock)) || 0
  };
  set(KEY.products, [next, ...all]);
  return next;
};
export const deleteProduct = (id: ID) => {
  const all = listProducts().filter(p => p.id !== id);
  set(KEY.products, all);
};

// Quotations
export const listQuotations = (): Quotation[] => get<Quotation[]>(KEY.quotations, []);
export const createQuotation = (q: Omit<Quotation, 'id' | 'createdAt'>): Quotation => {
  const all = listQuotations();
  const next: Quotation = { ...q, id: uuid(), createdAt: new Date().toISOString() };
  set(KEY.quotations, [next, ...all]);
  return next;
};
export const updateQuotation = (id: ID, patch: Partial<Quotation>): Quotation | null => {
  const all = listQuotations();
  const idx = all.findIndex(q => q.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...patch };
  all[idx] = updated;
  set(KEY.quotations, all);
  return updated;
};

// Orders
export const listOrders = (): Order[] => get<Order[]>(KEY.orders, []);
export const createOrder = (o: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
  const all = listOrders();
  const orderNumber = `ORD-${Date.now()}`;
  const next: Order = { 
    ...o, 
    id: uuid(), 
    orderNumber,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  set(KEY.orders, [next, ...all]);
  return next;
};
export const updateOrder = (id: ID, patch: Partial<Order>): Order | null => {
  const all = listOrders();
  const idx = all.findIndex(o => o.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  all[idx] = updated;
  set(KEY.orders, all);
  return updated;
};

// Suppliers
export const listSuppliers = (): Supplier[] => get<Supplier[]>(KEY.suppliers, []);
export const createSupplier = (s: Omit<Supplier, 'id' | 'createdAt'>): Supplier => {
  const all = listSuppliers();
  const next: Supplier = { ...s, id: uuid(), createdAt: new Date().toISOString() };
  set(KEY.suppliers, [next, ...all]);
  return next;
};
export const deleteSupplier = (id: ID) => {
  const all = listSuppliers().filter(s => s.id !== id);
  set(KEY.suppliers, all);
};

// Purchase Orders
export const listPurchaseOrders = (): PurchaseOrder[] => get<PurchaseOrder[]>(KEY.purchaseOrders, []);
export const createPurchaseOrder = (po: Omit<PurchaseOrder, 'id' | 'poNumber' | 'createdAt' | 'updatedAt'>): PurchaseOrder => {
  const all = listPurchaseOrders();
  const poNumber = `PO-${Date.now()}`;
  const next: PurchaseOrder = { 
    ...po, 
    id: uuid(), 
    poNumber,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  set(KEY.purchaseOrders, [next, ...all]);
  return next;
};
export const updatePurchaseOrder = (id: ID, patch: Partial<PurchaseOrder>): PurchaseOrder | null => {
  const all = listPurchaseOrders();
  const idx = all.findIndex(po => po.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  all[idx] = updated;
  set(KEY.purchaseOrders, all);
  return updated;
};

// Stock Movements
export const createStockMovement = (sm: Omit<StockMovement, 'id' | 'createdAt'>): StockMovement => {
  const all = get<StockMovement[]>(KEY.stockMovements, []);
  const next: StockMovement = { ...sm, id: uuid(), createdAt: new Date().toISOString() };
  set(KEY.stockMovements, [next, ...all]);
  return next;
};

// Supplier Prices
export const listSupplierPrices = (): SupplierPrice[] => get<SupplierPrice[]>(KEY.supplierPrices, []);

// Company
export const getCompany = (): CompanyDetails => get<CompanyDetails>(KEY.company, { name: 'CHABS Inventory' });

// Automation Rules
export const listAutomationRules = (): AutomationRule[] => get<AutomationRule[]>(KEY.automationRules, []);
export const createAutomationRule = (rule: Omit<AutomationRule, 'id' | 'createdAt' | 'triggerCount'>): AutomationRule => {
  const all = listAutomationRules();
  const next: AutomationRule = { 
    ...rule, 
    id: uuid(), 
    createdAt: new Date().toISOString(),
    triggerCount: 0
  };
  set(KEY.automationRules, [next, ...all]);
  return next;
};
export const updateAutomationRule = (id: ID, patch: Partial<AutomationRule>): AutomationRule | null => {
  const all = listAutomationRules();
  const idx = all.findIndex(rule => rule.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...patch };
  all[idx] = updated;
  set(KEY.automationRules, all);
  return updated;
};
export const deleteAutomationRule = (id: ID) => {
  const all = listAutomationRules().filter(rule => rule.id !== id);
  set(KEY.automationRules, all);
};

// AI Insights
export const listAIInsights = (): AIInsight[] => get<AIInsight[]>(KEY.aiInsights, []);

// Helper functions
export const autoGeneratePurchaseOrders = () => [];
export const generateAIInsights = () => {};
export const checkAutomationRules = () => {};
export const calculateProfitAnalysis = () => null;