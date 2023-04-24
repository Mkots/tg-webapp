import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {TelegramWebApps} from "telegram-webapps-types";

type TGWindow = Window & typeof globalThis & {Telegram: {
    WebApp: TelegramWebApps.WebApp;
    WebAppUser: TelegramWebApps.WebAppUser
    }
}

const tg = (window as TGWindow).Telegram;
function App() {
  const [count, setCount] = useState(0)

    useEffect(() => {
        tg.WebApp.ready();
    }, []);
    

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={tg.WebApp.initDataUnsafe.user?.first_name} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
