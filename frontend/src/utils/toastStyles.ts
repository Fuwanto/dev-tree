import { toast } from "sonner"

export const techToastStyles = {
  success: {
    style: {
      background: "rgba(17, 24, 39, 0.95)", // Fondo oscuro semi-transparente
      border: "1px solid #34D399", // Borde verde neón
      color: "#ECFDF5", // Texto verde claro
      borderRadius: "8px",
      padding: "12px 16px",
      backdropFilter: "blur(8px)",
      boxShadow: "0 2px 8px rgba(52, 211, 153, 0.25)",
      fontSize: "14px",
      fontWeight: "500",
    },
    icon: "✅",
  },
  error: {
    style: {
      background: "rgba(17, 24, 39, 0.95)",
      border: "1px solid #F87171", // Borde rojo neón
      color: "#FEF2F2", // Texto rojo claro
      borderRadius: "8px",
      padding: "12px 16px",
      backdropFilter: "blur(8px)",
      boxShadow: "0 2px 8px rgba(248, 113, 113, 0.25)",
      fontSize: "14px",
      fontWeight: "500",
    },
    icon: "❌",
  },
}

export const techToast = {
  success: (message: string, description?: string) =>
    toast.success(message, {
      ...techToastStyles.success,
      description,
    }),

  error: (message: string, description?: string) =>
    toast.error(message, {
      ...techToastStyles.error,
      description,
    }),
}
