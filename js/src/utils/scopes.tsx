import { jsxData } from '@/pages/Check/components/EditProjectButtons/Line/defaultData'
import { TScopes } from '@/types'
import { nanoid } from 'nanoid'
import { convertLanguage } from './i18n'

export const defaultScopes: TScopes = {
  scopeI: [
    {
      groupKey: '0',
      groupName: convertLanguage('辦公室 #1'),
      dataSource: [],
    },
  ],
  scopeII: [
    {
      groupKey: '0',
      groupName: convertLanguage('辦公室 #1'),
      dataSource: [],
    },
  ],
  scopeIII: [
    {
      groupKey: '0',
      groupName: convertLanguage('辦公室 #1'),
      dataSource: [],
    },
  ],
  scopeIV: [
    {
      groupKey: '0',
      groupName: convertLanguage('辦公室 #1'),
      dataSource: [],
    },
  ],
  scopeV: [
    {
      groupKey: '0',
      groupName: convertLanguage('辦公室 #1'),
      dataSource: [],
    },
  ],
  scopeVI: [
    {
      groupKey: '0',
      groupName: convertLanguage('辦公室 #1'),
      dataSource: [],
    },
  ],
  info: {
    title: convertLanguage('○○○○股份有限公司'),
    content: '',
    companyCategory: '未分類',
    imgData: {
      attachmentId: 0,
      url: '',
    },
  },
  coefficientDiff: jsxData,
}

export const removeKey = (scopes: TScopes) => {
  return {
    ...scopes,
    scopeI: scopes?.scopeI?.map((group) => {
      return {
        ...group,
        groupKey: undefined,
        dataSource: group?.dataSource?.map((item) => {
          return {
            ...item,
            key: undefined,
          }
        }),
      }
    }),
    scopeII: scopes?.scopeII?.map((group) => {
      return {
        ...group,
        groupKey: undefined,
        dataSource: group?.dataSource?.map((item) => {
          return {
            ...item,
            key: undefined,
          }
        }),
      }
    }),
    info: {
      ...scopes?.info,
      imgData: undefined,
    },
  }
}

export const addKey = (scopes: TScopes) => {
  return {
    ...scopes,
    scopeI: scopes?.scopeI?.map((group) => {
      return {
        ...group,
        groupKey: nanoid(),
        dataSource: group?.dataSource?.map((item) => {
          return {
            ...item,
            key: nanoid(),
          }
        }),
      }
    }),
  }
}
