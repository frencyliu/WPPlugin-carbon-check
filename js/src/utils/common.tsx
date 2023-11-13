import React from 'react'
import type { TUnit } from '@/types'
import { round } from 'lodash-es'
import { convertLanguage } from '@/utils/i18n'

export const windowOuterWidth = window?.outerWidth || 1200

export const renderHTML = (rawHTML: string) =>
  React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } })

export const months = [
  {
    value: 0,
    label: convertLanguage('一月'),
  },
  {
    value: 1,
    label: convertLanguage('二月'),
  },
  {
    value: 2,
    label: convertLanguage('三月'),
  },
  {
    value: 3,
    label: convertLanguage('四月'),
  },
  {
    value: 4,
    label: convertLanguage('五月'),
  },
  {
    value: 5,
    label: convertLanguage('六月'),
  },
  {
    value: 6,
    label: convertLanguage('七月'),
  },
  {
    value: 7,
    label: convertLanguage('八月'),
  },
  {
    value: 8,
    label: convertLanguage('九月'),
  },
  {
    value: 9,
    label: convertLanguage('十月'),
  },
  {
    value: 10,
    label: convertLanguage('十一月'),
  },
  {
    value: 11,
    label: convertLanguage('十二月'),
  },
]

export const convertUnitToTons = ({
  value,
  unit,
}: {
  value: number
  unit: TUnit
}) => {
  switch (unit) {
    case 'kg':
      return round(value / 1000, 3)
    case 'tonne':
      return round(value, 3)
  }
}

export const reverseUnitValue = ({
  value,
  unit,
}: {
  value: number
  unit: TUnit
}) => {
  switch (unit) {
    case 'kg':
      return value * 1000
    case 'tonne':
      return value
  }
}

export const getTypeText = (
  resource: string,
  method: string,
  statusText: string,
) => {
  const getMethodText = (theMethod: string) => {
    switch (theMethod) {
      case 'get':
        return convertLanguage('獲取')
      case 'post':
        return convertLanguage('更新')
      case 'delete':
        return convertLanguage('刪除')
      default:
        return convertLanguage('更新')
    }
  }

  const methodText = getMethodText(method)
  const getResourceText = (theResource: string) => {
    switch (theResource) {
      case 'carbon-project':
        return convertLanguage('專案')
      case 'attachment':
        return convertLanguage('圖片')
    }
  }
  const resourceText = getResourceText(resource)

  switch (resource + '-' + method) {
    case 'attachment-post':
      return convertLanguage('圖片上傳')
    case 'carbon-project-post':
      return statusText === 'Created'
        ? `${resourceText}${convertLanguage('創建')}`
        : `${resourceText}${methodText}`
    default:
      return `${resourceText}${methodText}`
  }
}

export const defaultRouterMetas = [
  {
    path: '/',
    title: convertLanguage('所有專案'),
  },
  {
    path: '/create',
    title: convertLanguage('選擇你的公司分類'),
  },
  {
    path: '/check',
    title: convertLanguage('碳盤查'),
  },
]
