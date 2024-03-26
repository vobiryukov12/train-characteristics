export interface ICharacteristics {
  id: number
  speed: number
  force: number
  engineAmperage: number
}

export interface ITrain {
  id: number
  name: string
  description: string
  characteristics: ICharacteristics[]
}

export interface IStateTrains {
  trains: ITrain[]
  loading: boolean
  error: string
  filter: number
}
