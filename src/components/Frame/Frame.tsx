import styles from './Frame.module.scss'

/**
 * Компонент отвечает за отображение белого контейнера, который принимает дочерние элементы
 * @param {React.ReactNode} children - дочерние элементы
 */

export function Frame({ children }: { children: React.ReactNode }) {
  return <div className={styles.frame}>{children}</div>
}
