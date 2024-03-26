import cn from 'classnames'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { chooseTrain } from '@/store/trains.slice'
import { Frame } from '@/components'

import styles from './TrainList.module.scss'

/**
 * Компонент списка поездов
 */

export function TrainList() {
  const { trains, filter } = useAppSelector((state) => state.trains)
  const dispatch = useAppDispatch()

  const onTrainClick = (id: number) => {
    trains.forEach((train) => {
      if (train.id === id) {
        dispatch(chooseTrain(id))
      }
    })
  }

  return (
    <Frame>
      <table className={styles.trainList}>
        <caption>Поезда</caption>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr
              key={train.id}
              onClick={() => onTrainClick(train.id)}
              className={cn(styles.trainList__row, {
                [styles['trainList__row--active']]: filter === train.id,
              })}
            >
              <td>{train.name}</td>
              <td>{train.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  )
}
