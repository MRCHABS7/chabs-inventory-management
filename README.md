# 📦 CHABS Inventory Management System

A modern, full-featured inventory management system built with Next.js, TypeScript, and Supabase.

## ✨ Features

- **Product Management** - Add, edit, and track products with pricing
- **Order Processing** - Complete order lifecycle management
- **Customer Management** - Customer database and relationship tracking
- **Supplier Management** - Supplier relationships and purchase orders
- **Quotation System** - Generate and manage customer quotations
- **Warehouse Management** - Inventory tracking and stock movements
- **Reports & Analytics** - Business insights and performance metrics
- **Automation Rules** - Automated workflows and notifications

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **PDF Generation**: jsPDF

## 🌐 Live Demo

Visit: [Your Live URL Here]

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chabs-inventory-system.git
   cd chabs-inventory-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase credentials to `.env.local`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 📊 Database Schema

The system uses PostgreSQL with the following main tables:
- `products` - Product catalog and inventory
- `customers` - Customer information
- `orders` - Order processing and tracking
- `suppliers` - Supplier management
- `quotations` - Quote generation and tracking
- `purchase_orders` - Supplier purchase orders

## 🚀 Deployment

This project is optimized for deployment on Vercel with Supabase:

1. **Deploy to Vercel**: Connect your GitHub repository
2. **Set up Supabase**: Create project and configure database
3. **Add environment variables**: Configure Supabase credentials
4. **Run database migrations**: Set up tables using provided SQL

See `SETUP-WINDOWS.md` for detailed deployment instructions.

## 📈 Scaling

- **Free Tier**: Handles up to 10,000 users
- **Pro Tier**: Scales to 100,000+ users
- **Enterprise**: Unlimited scaling with dedicated resources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue on GitHub.

---

Built with ❤️ for modern inventory management