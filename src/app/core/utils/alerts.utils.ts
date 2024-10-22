import Swal, { SweetAlertIcon } from 'sweetalert2'

//Alertas opcionales
export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  export const toastAlert = (title: string, icon: SweetAlertIcon) => {
    Toast.fire({
      icon: icon,
      title: title,
    });
  };
