import { useMemo, useState } from 'react'
import { createToastApi } from './toastApi'
import { ToastContext } from './ToastContext'

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const api = useMemo(() => createToastApi(setItems), [])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[80] space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 shadow-2xl backdrop-blur"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
