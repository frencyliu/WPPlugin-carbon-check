import { useContext } from 'react'
import { Row, Col, Alert, Empty } from 'antd'
import CheckChartColumn from '@/components/CheckChartColumn'
import CheckChartPie from '@/components/CheckChartPie'
import { ProjectContext } from '@/pages/Check'
import { flatten, round } from 'lodash-es'
import { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { TGroupData } from '@/types'
import { nanoid } from 'nanoid'
import { convertLanguage } from '@/utils/i18n'
import { gwpMapping } from '@/utils'

const Chart = () => {
  const { projectData, scopes } = useContext(ProjectContext)
  const scopeIGroups: TGroupData[] = scopes?.scopeI || []
  const scopeIIGroups: TGroupData[] = scopes?.scopeII || []
  const scopeIIIGroups: TGroupData[] = scopes?.scopeIII || []
  const scopeIVGroups: TGroupData[] = scopes?.scopeIV || []
  const scopeVGroups: TGroupData[] = scopes?.scopeV || []
  const scopeVIGroups: TGroupData[] = scopes?.scopeVI || []

  const coefficient = (tYearlyDataType: TYearlyDataType) => {
    return (
      scopes.coefficientDiff
        .find((item) => item.nameZh === tYearlyDataType?.km)
        ?.data.find(
          (i) =>
            i.unit1 ===
            gwpMapping
              .find((item) => item.value === tYearlyDataType.gwp)
              ?.value.toLocaleUpperCase(),
        )?.data || 0
    )
  }

  const calculateCarbonTons = (group: TGroupData, name: string) =>
    group?.dataSource.map((record: TYearlyDataType) => ({
      ...record,
      scopeName: name,
    })) || []

  const calculateCarbonTons34 = (group: TGroupData, name: string) =>
    group?.dataSource.map((record: TYearlyDataType) => ({
      ...record,
      carbonTonsPerYear: record.tonAmount
        ? round(record.tonAmount * (record.kmAmount || 0) * record.ar5, 10)
        : (record.kmAmount || 0) * coefficient(record),
      scopeName: name,
    })) || []

  const mergedDataSource: TYearlyDataType[] = flatten([
    ...(scopeIGroups.map((group) => calculateCarbonTons(group, 'SCOPE I')) ||
      []),
    ...(scopeIIGroups.map((group) => calculateCarbonTons(group, 'SCOPE II')) ||
      []),
    ...(scopeIIIGroups.map((group) =>
      calculateCarbonTons34(group, 'SCOPE III'),
    ) || []),
    ...(scopeIVGroups.map((group) =>
      calculateCarbonTons34(group, 'SCOPE IV'),
    ) || []),
    ...(scopeVGroups.map((group) => calculateCarbonTons(group, 'SCOPE V')) ||
      []),
    ...(scopeVIGroups.map((group) => calculateCarbonTons(group, 'SCOPE VI')) ||
      []),
  ])

  const analytics = projectData?.meta_box?.analytics || ''
  const analyticsLines = () =>
    analytics.split(/\r\n/g).map((line: string) => (
      <p className="my-0" key={nanoid()}>
        {line}
      </p>
    ))

  const suggestion = projectData?.meta_box?.suggestion || ''
  const suggestionLines = () =>
    suggestion.split(/\r\n/g).map((line: string) => (
      <p className="my-0" key={nanoid()}>
        {line}
      </p>
    ))

  return (
    <>
      <Row gutter={24}>
        {mergedDataSource.length > 0 ? (
          <>
            <Col span={24} lg={{ span: 12 }} className="mb-12">
              <CheckChartColumn mergedDataSource={mergedDataSource} />
            </Col>
            <Col span={24} lg={{ span: 6 }} className="mb-12">
              <CheckChartPie
                mergedDataSource={mergedDataSource}
                pieType="group"
              />
            </Col>
            <Col span={24} lg={{ span: 6 }} className="mb-12">
              <CheckChartPie
                mergedDataSource={mergedDataSource}
                pieType="scope"
              />
            </Col>
          </>
        ) : (
          <div className="w-full px-2">
            <div className="flex justify-center items-center w-full aspect-video bg-slate-100 rounded-xl">
              <Empty description={convertLanguage('沒有資料')} />
            </div>
          </div>
        )}
      </Row>
      <Row className="mt-8" gutter={24}>
        {!!analytics && (
          <Col span={24} lg={{ span: 12 }} className="mb-8">
            <Alert
              className="h-full"
              message={convertLanguage('分析事項')}
              description={<>{analyticsLines()}</>}
              type="info"
              showIcon
            />
          </Col>
        )}
        {!!suggestion && (
          <Col span={24} lg={{ span: 12 }} className="mb-8">
            <Alert
              className="h-full"
              message={convertLanguage('建議事項')}
              description={<>{suggestionLines()}</>}
              type="warning"
              showIcon
            />
          </Col>
        )}
      </Row>
    </>
  )
}

export default Chart
