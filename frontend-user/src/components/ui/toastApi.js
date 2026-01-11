export function createToastApi(setItems) {
  const push = (message) => {
    const id = Math.random().toString(36).slice(2)
    setItems((s) => [...s, { id, message }])
    setTimeout(() => {
      setItems((s) => s.filter((t) => t.id !== id))
    }, 2200)
  }

  return { push }
}

