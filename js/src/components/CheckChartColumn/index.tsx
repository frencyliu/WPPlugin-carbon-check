import { Column } from '@ant-design/plots'
import { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { flatten, round } from 'lodash-es'
import { IStyle } from './interfaces'
import { convertUnitToTons } from '@/utils'

const CheckChartColumn: React.FC<{
  mergedDataSource: TYearlyDataType[]
}> = ({ mergedDataSource }) => {
  const formatData = !!mergedDataSource
    ? mergedDataSource.map((record) => {
        if (record?.period === 'monthly') {
          const monthlyAmount = record?.monthlyAmount || []

          const dataArr = monthlyAmount.map((amount, index) => {
            const amountTon = convertUnitToTons({
              value: amount * (record?.ar5 || 1),
              unit: record?.unit,
            })
            return {
              month: `${index + 1}月`,
              value: round(amountTon, 1),
              type: record?.sourceName,
            }
          })
          return dataArr
        }
        const carbonTonsPerYear = record?.carbonTonsPerYear || 0
        const dataArr = new Array(12)
          .fill(carbonTonsPerYear / 12)
          .map((amount, index) => ({
            month: `${index + 1}月`,
            value: round(amount, 1),
            type: record?.sourceName,
          }))
        return dataArr
      })
    : []

  const data = flatten(formatData)

  const config = {
    data,
    isStack: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    label: {
      // 可手动配置 label 数据标签位置
      // position: 'middle', // 'top', 'bottom', 'middle'
    },
  }

  return <Column {...config} />
}

export default CheckChartColumn
