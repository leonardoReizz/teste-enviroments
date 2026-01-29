import React from 'react'
import ReactDOM from 'react-dom/client'

// These environment variables are injected at BUILD TIME
// They are replaced by Vite during the build process
const envVars = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_ENV: import.meta.env.VITE_ENV,
  MODE: import.meta.env.MODE,
}

function App() {
  const hasEnvVars = Object.values(envVars).some(v => v && v !== 'undefined')

  return (
    <div>
      <h1>Build-Time Environment Variables Test</h1>

      <div className="card">
        <h2>Status</h2>
        {hasEnvVars ? (
          <p className="success">Environment variables were successfully injected at build time!</p>
        ) : (
          <p className="warning">No environment variables detected. Make sure to pass them via --build-arg</p>
        )}
      </div>

      <div className="card">
        <h2>Environment Variables</h2>
        {Object.entries(envVars).map(([name, value]) => (
          <div className="env-item" key={name}>
            <span className="env-name">{name}</span>
            <span className="env-value">{value || '(not set)'}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>How It Works</h2>
        <p>1. Frontend sends environment variables in the QuickSetup form</p>
        <p>2. NestJS API converts them to buildArgs and sends to Go API</p>
        <p>3. Go API passes them to Kaniko as --build-arg flags</p>
        <p>4. Dockerfile declares ARG and sets ENV from it</p>
        <p>5. Vite reads env vars during "npm run build"</p>
        <p>6. Variables are baked into the JavaScript bundle</p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
