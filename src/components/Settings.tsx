import { useEffect, useState } from 'react';
import { getCompany, setCompany } from '../lib/storage';
import type { CompanyDetails } from '../lib/types';

export default function Settings() {
  const [c, setC] = useState<CompanyDetails>({ name: '' });

  useEffect(() => { setC(getCompany()); }, []);

  const save = () => { setCompany(c); alert('Company details saved'); };

  return (
    <div className="card space-y-3 max-w-xl">
      <h2 className="text-lg font-semibold">Company Details</h2>
      <input className="input" placeholder="Name" value={c.name} onChange={e => setC({ ...c, name: e.target.value })} />
      <input className="input" placeholder="Address" value={c.address ?? ''} onChange={e => setC({ ...c, address: e.target.value })} />
      <input className="input" placeholder="Phone" value={c.phone ?? ''} onChange={e => setC({ ...c, phone: e.target.value })} />
      <input className="input" placeholder="Email" value={c.email ?? ''} onChange={e => setC({ ...c, email: e.target.value })} />
      <button className="btn" type="button" onClick={save}>Save</button>
    </div>
  );
}

