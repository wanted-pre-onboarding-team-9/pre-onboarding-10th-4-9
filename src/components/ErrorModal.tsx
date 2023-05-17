import { useErrorDispatch, useErrorState } from '../contexts/ErrorContext';

import '../styles/ErrorModal.css';

export const ErrorModal = () => {
  const { error, hasError } = useErrorState();
  const { hideError } = useErrorDispatch();

  if (!hasError || error === '') return null;

  return (
    <dialog className="modal-container" open={hasError}>
      <h1>Error</h1>
      <div>{error}</div>
      <button type="button" onClick={hideError} className="modal-button">
        닫기
      </button>
    </dialog>
  );
};

export default ErrorModal;
