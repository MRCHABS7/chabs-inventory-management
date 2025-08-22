import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';
import { me } from '../lib/auth-simple';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => { if (!me()) router.replace('/'); }, [router]);
  return (
    <Layout>
      <div className="container py-6">
        <Dashboard />
      </div>
    </Layout>
  );
}
