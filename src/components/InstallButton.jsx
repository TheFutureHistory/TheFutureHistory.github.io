// src/InstallButton.jsx
import { useState } from 'react'

export default function InstallButton() {
  const [installPrompt, setInstallPrompt] = useState(null)

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    setInstallPrompt(event)
  })

  const handleInstall = () => {
    if (installPrompt) {
      installPrompt.prompt()
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setInstallPrompt(null)
      })
    }
  }

  return (
    <button onClick={handleInstall} disabled={!installPrompt}>
      Install App
    </button>
  )
}
