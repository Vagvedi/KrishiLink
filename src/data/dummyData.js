// Demo data for KrishiLink Dashboard
export const demoStats = [
  { name: 'Total Orders', value: '234', change: '+12%', changeType: 'positive' },
  { name: 'Revenue', value: 'Rs 45,678', change: '+8%', changeType: 'positive' },
  { name: 'Active Products', value: '45', change: '+3', changeType: 'positive' },
  { name: 'Pending Orders', value: '8', change: '-2', changeType: 'negative' },
]

export const demoRecentOrders = [
  { id: 'ORD001', product: 'Wheat', quantity: '500 kg', status: 'Delivered', date: '2024-04-15' },
  { id: 'ORD002', product: 'Rice', quantity: '300 kg', status: 'In Transit', date: '2024-04-16' },
  { id: 'ORD003', product: 'Vegetables', quantity: '150 kg', status: 'Processing', date: '2024-04-17' },
  { id: 'ORD004', product: 'Fruits', quantity: '200 kg', status: 'Pending', date: '2024-04-17' },
]

export const demoProducts = [
  { id: 'PRD001', name: 'Organic Wheat', category: 'Grains', price: 'Rs 2,500/ton', stock: '50 tons', status: 'Available' },
  { id: 'PRD002', name: 'Basmati Rice', category: 'Grains', price: 'Rs 4,000/ton', stock: '30 tons', status: 'Available' },
  { id: 'PRD003', name: 'Fresh Tomatoes', category: 'Vegetables', price: 'Rs 20/kg', stock: '500 kg', status: 'Available' },
  { id: 'PRD004', name: 'Seasonal Fruits', category: 'Fruits', price: 'Rs 50/kg', stock: '200 kg', status: 'Limited' },
]

export const demoBuyers = [
  { id: 'BUY001', name: 'Mumbai Fresh Market', type: 'Wholesaler', location: 'Mumbai', rating: 4.5, orders: 45 },
  { id: 'BUY002', name: 'Delhi Organic Store', type: 'Retailer', location: 'Delhi', rating: 4.8, orders: 23 },
  { id: 'BUY003', name: 'Bangalore Food Co.', type: 'Processor', location: 'Bangalore', rating: 4.2, orders: 67 },
  { id: 'BUY004', name: 'Chennai Distributors', type: 'Distributor', location: 'Chennai', rating: 4.6, orders: 89 },
]
