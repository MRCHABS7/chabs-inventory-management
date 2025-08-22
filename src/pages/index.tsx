import LoginForm from '../components/LoginForm';

export default function IndexPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">CHABS Inventory</h1>
          <p className="text-white/80 text-lg">Advanced Business Management System</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}