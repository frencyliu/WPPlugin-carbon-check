import { useContext } from 'react'
import type { ColumnType } from 'antd/lib/table'
import type { TYearlyDataType } from '../types'
import { Popconfirm, Tooltip } from 'antd'
import { TableDataContext } from '@/pages/Check/ScopeIII/CheckScopeIIITable'
import { ProjectContext } from '@/pages/Check'
import { DeleteOutlined, InfoCircleFilled } from '@ant-design/icons'
import { gwpMapping } from '@/utils'
import EditRecordButton from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/components/EditRecordButton'
import { useColor } from '@/hooks'
import { round } from 'lodash-es'
import { convertLanguage } from '@/utils/i18n'

const useColumns = () => {
  const { colorPrimary } = useColor()
  const {
    scopes,
    setScopes,
    printMode = false,
    scopesNumber,
  } = useContext(ProjectContext)
  const scopeIGroups = scopes[scopesNumber] || []
  const { groupIndex } = useContext(TableDataContext)
  const group = scopeIGroups[groupIndex]
  const dataSource = group?.dataSource || []

  const handleDelete = (key: string) => {
    const deleteDataSourceName = dataSource.filter(
      (theRecord: { key: string }) => theRecord.key === key,
    )[0].sourceName

    const newDataSource = dataSource.filter(
      (theRecord: { sourceName: string }) =>
        theRecord.sourceName !== deleteDataSourceName,
    )
    setScopes({
      ...scopes,
      [scopesNumber]: [
        ...scopeIGroups.slice(0, groupIndex),
        {
          ...group,
          dataSource: newDataSource,
        },
        ...scopeIGroups.slice(groupIndex + 1),
      ],
    })
  }

  const defaultColumns: (ColumnType<TYearlyDataType> & {
    editable?: boolean
    dataIndex: string
  })[] = [
    {
      title:
        scopesNumber === 'scopeIII'
          ? convertLanguage('運輸設備')
          : convertLanguage('排碳設備'),
      align: 'center',
      dataIndex: 'sourceName',
      width: 200,
      fixed: false,
    },
    {
      title: convertLanguage('溫室氣體'),
      width: 60,
      align: 'center',
      dataIndex: 'gwp',
      render: (gwp) =>
        gwpMapping.find((item) => item.value === gwp)?.label || '-',
    },
    {
      title: convertLanguage('溫室氣體排放量 (噸/年)'),
      align: 'center',
      width: 200,
      dataIndex: 'kmAmount',
      render: (kmAmount: number, record: TYearlyDataType) =>
        record.gwp ? round(kmAmount, 3) : '-',
    },
    ...(scopesNumber === 'scopeIII'
      ? [
          {
            title: convertLanguage('頓'),
            width: 50,
            align: 'center' as any,
            dataIndex: 'tonAmount',
            render: (kmAmount: number, record: TYearlyDataType) =>
              record.gwp ? '-' : kmAmount,
          },
          {
            title: convertLanguage('公里'),
            width: 50,
            align: 'center' as any,
            dataIndex: 'kmAmount',
            render: (kmAmount: number, record: TYearlyDataType) =>
              record.gwp ? '-' : kmAmount,
          },
        ]
      : []),
    {
      title: convertLanguage('GPT係數'),
      align: 'center',
      dataIndex: 'km',
      width: 120,
      render: (km: string, record: TYearlyDataType) => {
        if (record.tonAmount) {
          return record.ar5
        }
        const coefficient =
          scopes.coefficientDiff
            .find((item) => item.nameZh === km)
            ?.data.find(
              (i) =>
                i.unit1 ===
                gwpMapping
                  .find((item) => item.value === record.gwp)
                  ?.value.toLocaleUpperCase(),
            )?.data || 0
        return coefficient
      },
    },
    {
      title: (
        <>
          <Tooltip
            title={convertLanguage(
              '二氧化碳當量(CO2e, carbon dioxide equivalent)是測量碳足跡(carbon footprints)的標準單位',
            )}
          >
            CO<sub>2</sub>e {convertLanguage('碳排 (噸/年)')}
            <InfoCircleFilled style={{ color: colorPrimary }} />
          </Tooltip>
        </>
      ),
      align: 'center',
      dataIndex: 'km',

      render: (km: string, record: TYearlyDataType) => {
        if (record.tonAmount) {
          return round(
            record.tonAmount * (record.kmAmount || 0) * record.ar5,
            10,
          )
        }
        const coefficient =
          scopes.coefficientDiff
            .find((item) => item.nameZh === km)
            ?.data.find(
              (i) =>
                i.unit1 ===
                gwpMapping
                  .find((item) => item.value === record.gwp)
                  ?.value.toLocaleUpperCase(),
            )?.data || 0
        const kmAmount = record.kmAmount || 0
        return coefficient * kmAmount
      },

      width: 200,
    },
    {
      title: convertLanguage('動作'),
      align: 'center',
      dataIndex: 'action',
      width: 100,
      fixed: false,
      render: (_, record: TYearlyDataType) => (
        <p className="text-center">
          <Popconfirm
            title={convertLanguage('確認刪除?')}
            onConfirm={() => handleDelete(record.key)}
          >
            <DeleteOutlined className="text-red-500 text-[20px]" />
          </Popconfirm>
          <EditRecordButton record={record} />
        </p>
      ),
    },
  ]

  if (printMode) {
    defaultColumns.pop()
    return defaultColumns
  }

  return defaultColumns
}

export default useColumns
