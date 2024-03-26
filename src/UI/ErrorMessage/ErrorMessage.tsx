import './ErrorMessage.scss'

/**
 * Компонент используется для отображения сообщений об ошибках.
 * @param {string} errorMessage сообщение об ошибке
 */

export function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <div className="error">{errorMessage}</div>
}
