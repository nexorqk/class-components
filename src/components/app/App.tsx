import { useModal } from '@/hooks/useModal';
import './App.css';
import { Modal } from '@/components/modal/Modal';

export const App = () => {
  const { isShowing, toggle } = useModal();

  return (
    <div>
      <div>App</div>
      <Modal isShowing={isShowing} toggle={toggle} />
    </div>
  );
};
