import React from 'react';
import { Activity, TrendingUp, Mic, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: 'Mon', fluency: 65, pronunciation: 70, pitch: 60 },
  { date: 'Tue', fluency: 68, pronunciation: 72, pitch: 65 },
  { date: 'Wed', fluency: 75, pronunciation: 75, pitch: 70 },
  { date: 'Thu', fluency: 72, pronunciation: 78, pitch: 72 },
  { date: 'Fri', fluency: 80, pronunciation: 82, pitch: 78 },
  { date: 'Sat', fluency: 85, pronunciation: 85, pitch: 82 },
];

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1>Your Progress</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track your speech therapy journey over time.</p>
      </div>

      <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Activity size={32} color="var(--primary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Latest Fluency</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>85<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span></div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Star size={32} color="var(--accent-warning)" style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Pronunciation</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>85<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span></div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TrendingUp size={32} color="var(--accent-success)" style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Pitch Stability</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>82<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span></div>
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '32px' }}>
        <h2 style={{ marginBottom: '24px' }}>Performance History</h2>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="fluency" stroke="var(--primary)" strokeWidth={3} activeDot={{ r: 8 }} name="Fluency" />
              <Line type="monotone" dataKey="pronunciation" stroke="var(--accent-warning)" strokeWidth={3} name="Pronunciation" />
              <Line type="monotone" dataKey="pitch" stroke="var(--accent-success)" strokeWidth={3} name="Pitch" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
