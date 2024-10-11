import { MICRO_CONFIG } from './consts'
import { useNavigate } from 'react-router-dom'

function App() {
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

export default App
