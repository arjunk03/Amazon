import { useToast } from '../context/ToastContext';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded shadow-lg text-white ${
            t.type === 'error' ? 'bg-red-600' : t.type === 'info' ? 'bg-blue-600' : 'bg-gray-800'
          }`}
        >
          {t.message}
          <button onClick={() => removeToast(t.id)} className="ml-2 text-sm underline">Dismiss</button>
        </div>
      ))}
    </div>
  );
}
