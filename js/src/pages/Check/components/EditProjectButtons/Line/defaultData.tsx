import data from './covertData'

export interface IDefaultDataData {
  data: number
  unit1: string
  unit2: string
}

export interface IDefaultData {
  nameZh: string
  nameEn: string
  data: IDefaultDataData[]
}

export const jsxData: IDefaultData[] = data
