// ModalContext provides a way for any component anywhere in the app
// to open or close the Enquiry modal without passing props through every level.
import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  )
}

// Custom hook — call useModal() in any component to get { isOpen, open, close }
export function useModal() {
  return useContext(ModalContext)
}
