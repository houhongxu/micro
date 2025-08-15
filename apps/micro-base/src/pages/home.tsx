import { MICRO_CONFIG } from '@/config'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#eee',
        cursor: 'default',
      }}
    >
      {MICRO_CONFIG.map((config) => (
        <div key={config.name} onClick={() => navigate(config.activeRule)}>
          {config.name}
        </div>
      ))}
    </div>
  )
}
