import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function NotificationProvider({ children }: React.PropsWithChildren) {
  return (
    <div>
      <ToastContainer stacked />
      {children}
    </div>
  );
}
