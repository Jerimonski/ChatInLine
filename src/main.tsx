import { createRoot } from "react-dom/client"
import "./css/style.css"
import App from "./App.tsx"
import "animate.css"

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
)
