import data from './covertData'
import filteredArray from './tkData'
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

export interface ITKData {
  nameZh: string
  nameEn: string
  announcementyear: number
  coe: number
  unit: string
  departmentname: string
}

export const tkmData: ITKData[] = filteredArray
