import { useEffect } from 'react'
import cn from 'classnames'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useAppSelector } from '@/hooks'
import { ICharacteristicListProps } from './CharacteristicList.props'

import { Frame } from '@/components'

import styles from './CharacteristicList.module.scss'

/**
 * Компонент cписка характеристик
 * @param {ICharacteristicListProps} scrollToRef - ссылка на форму
 */

interface IFormInputs {
  [key: string]: string
}

export function CharacteristicList({ scrollToRef }: ICharacteristicListProps) {
  const { trains, filter } = useAppSelector((state) => state.trains)
  const [activeTrain] = trains.filter((train) => train.id === filter)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  // Имитация отправки формы
  const submitForm: SubmitHandler<IFormInputs> = (data) => {
    const speedsSort = Object.entries(data)
      .filter(([key]) => key.startsWith('speed'))
      .map(([, value]) => parseInt(value))
      .sort((a, b) => a - b)

    console.log(
      `${activeTrain.name}. Cписок скоростных ограничений, отсортированных по возрастанию: ${speedsSort.join(', ')}`
    )
  }

  const speedAndEngineAmperageReg = /^[1-9]\d*$/
  const forceReg = /^(0|[1-9]\d*)\.\d*[1-9]$/

  useEffect(() => {
    reset()

    setTimeout(() => {
      trigger()
    }, 100)
  }, [filter, trigger, reset])

  return (
    <Frame>
      <form
        className={styles.form}
        onSubmit={handleSubmit(submitForm)}
        noValidate
        ref={scrollToRef}
      >
        <table className={styles.characteristicList}>
          <caption className={styles.caption}>
            <div className={styles.caption__title}>Характеристиками</div>
            <div className={styles.caption__description}>
              {activeTrain.name}
            </div>
          </caption>
          <thead>
            <tr>
              <th className={styles.th}>Ток двигателя</th>
              <th className={styles.th}>Сила тяги</th>
              <th className={styles.th}>Скорость</th>
            </tr>
          </thead>
          <tbody>
            {activeTrain.characteristics.map(
              ({ id, force, speed, engineAmperage }) => (
                <tr key={`${activeTrain.id}-${id}`}>
                  <td className={styles.td}>
                    <input
                      className={cn(styles.form__field, {
                        [styles['form__field--error']]:
                          errors[`engineAmperage-${activeTrain.id}-${id}`],
                      })}
                      {...register(`engineAmperage-${activeTrain.id}-${id}`, {
                        required: true,
                        pattern: speedAndEngineAmperageReg,
                      })}
                      type="number"
                      defaultValue={engineAmperage}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      className={cn(styles.form__field, {
                        [styles['form__field--error']]:
                          errors[`force-${activeTrain.id}-${id}`],
                      })}
                      {...register(`force-${activeTrain.id}-${id}`, {
                        required: true,
                        pattern: forceReg,
                      })}
                      type="number"
                      defaultValue={force}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      className={cn(styles.form__field, {
                        [styles['form__field--error']]:
                          errors[`speed-${activeTrain.id}-${id}`],
                      })}
                      {...register(`speed-${activeTrain.id}-${id}`, {
                        required: true,
                        pattern: speedAndEngineAmperageReg,
                      })}
                      type="number"
                      defaultValue={speed}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <button type="submit" className={styles.button} disabled={!isValid}>
          Отправить данные
        </button>
      </form>
    </Frame>
  )
}
