'use client';
import { useEffect, useState } from 'react';

export default function PineDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pine-data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">로딩 중...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">📊 PINE Daily Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-2">항목</th>
              <th className="border p-2">값</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 && data[0]?.map((val: any, idx: number) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border p-2 font-semibold">{data[0]?.[idx]}</td>
                <td className="border p-2 text-right">{data[1]?.[idx]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
