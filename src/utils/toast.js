/**
 * Wrapper centralizado de SweetAlert2 (cargado vía CDN como window.Swal).
 * Usar estas funciones en lugar de alert() / confirm() nativos.
 */

const Swal = () => window.Swal

/** Toast no intrusivo — aparece en la esquina y desaparece solo */
const Toast = () =>
  Swal().mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal().stopTimer
      toast.onmouseleave = Swal().resumeTimer
    },
  })

export function toastSuccess(message) {
  Toast().fire({ icon: 'success', title: message })
}

export function toastError(message) {
  Toast().fire({ icon: 'error', title: message })
}

export function toastWarning(message) {
  Toast().fire({ icon: 'warning', title: message })
}

export function toastInfo(message) {
  Toast().fire({ icon: 'info', title: message })
}

/** Diálogo de confirmación — devuelve true si el usuario confirma */
export async function confirmDialog({ title, text, confirmText = 'Sí, continuar', cancelText = 'Cancelar', icon = 'warning' } = {}) {
  const result = await Swal().fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: '#7c3aed',
    cancelButtonColor: '#6b7280',
    reverseButtons: true,
  })
  return result.isConfirmed
}

/** Alerta informativa simple */
export function alertInfo(title, text) {
  return Swal().fire({ title, text, icon: 'info', confirmButtonColor: '#7c3aed' })
}

export function alertSuccess(title, text) {
  return Swal().fire({ title, text, icon: 'success', confirmButtonColor: '#7c3aed' })
}

export function alertError(title, text) {
  return Swal().fire({ title, text, icon: 'error', confirmButtonColor: '#7c3aed' })
}
