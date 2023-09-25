import { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { IDefaultData } from '@/pages/Check/components/EditProjectButtons/Line/defaultData'

export type TGroupData = {
  groupKey: string
  groupName: string
  dataSource: TYearlyDataType[]
}

export type TInfo = {
  title: string
  content: string
  companyCategory: string
  imgData: {
    attachmentId: number
    url: string
  }
}

export type TScopes = {
  [key: string]: any
  scopeI: TGroupData[]
  scopeII: TGroupData[]
  scopeIII: TGroupData[]
  scopeIV: TGroupData[]
  scopeV: TGroupData[]
  scopeVI: TGroupData[]
  info: TInfo
  coefficientDiff: IDefaultData[]
}
