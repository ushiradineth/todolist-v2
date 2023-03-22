import { toast as T } from "react-toastify";

export default function toast(text: string, type: "info" | "success" | "warning" | "error" | "default") {
  T(text, {
    type: type,
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}
