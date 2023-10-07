/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from 'react'
import { Table, Row, Button, Form, Popconfirm } from 'antd'
import AddRecordButton from './components/AddRecordButton'
import type { TYearlyDataType } from './types'
import useColumns from './hooks/useColumns'
import { TableDataContext } from '@/pages/Check/ScopeIII/CheckScopeIIITable'
import { DeleteFilled } from '@ant-design/icons'
import useMonthlyTable from './hooks/useMonthlyTable'
import type { ColumnType } from 'antd/lib/table'
import { useColor, useEditableTitle } from '@/hooks'
import { ProjectContext } from '@/pages/Check'
import { windowOuterWidth, companyCategories } from '@/utils'
import { convertLanguage } from '@/utils/i18n'

const App: React.FC = () => {
  console.log('render ScopeIIITable')
  const size = windowOuterWidth < 768 ? 'small' : 'middle'
  const { colorPrimary } = useColor()
  const columns = useColumns()
  const { renderTable } = useMonthlyTable()
  const {
    projectData: projectContextData,
    scopes,
    printMode = false,
    scopesNumber,
  } = useContext(ProjectContext)
  const {
    groupKey,
    groupIndex,
    groupData,
    onDelete: handleDeleteGroup = () => {},
    scopesNumberForPrint,
  } = useContext(TableDataContext)
  const scopeNumberGroups = scopesNumberForPrint
    ? scopes[scopesNumberForPrint]
    : scopes[scopesNumber] || []
  const initialValues = companyCategories.find(
    (companyCategory) => companyCategory.name === scopes?.info?.companyCategory,
  )?.scopeIDefaultValue || [convertLanguage('辦公室')]

  const dataSource =
    scopeNumberGroups.find(
      (group: { groupKey: any }) => group.groupKey === groupKey,
    )?.dataSource || []
  const form = Form.useFormInstance()
  // const data = JSON.parse(projectContextData?.meta?.project_data || '{}')

  const { element } = useEditableTitle({
    form,
    name: [
      scopesNumber,
      groupIndex,
      'groupName',
    ],
    required: true,
    initialValue: initialValues[0] || convertLanguage('辦公室'),
    title: {
      theTitle: groupData?.groupName || initialValues[0],
      level: 4,
    },
    printMode,
  })

  const handleDelete = (theGroupKey: string) => () => {
    handleDeleteGroup(theGroupKey)
  }
  return (
    <div>
      {element}
      <Table
        size={size}
        className="mt-4"
        expandable={{
          expandedRowRender: (record: TYearlyDataType) => renderTable(record),
          rowExpandable: (record) => record.period === 'monthly',
        }}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnType<TYearlyDataType>[]}
        pagination={false}
      />
      {!printMode && (
        <Row justify="space-between">
          <Popconfirm
            title={convertLanguage('確認刪除群組?')}
            okText={convertLanguage('確認')}
            cancelText={convertLanguage('取消')}
            onConfirm={handleDelete(groupKey)}
          >
            <Button className="mt-4" type="dashed" danger>
              <DeleteFilled className="mr-2" />
              {convertLanguage('刪除群組')}
            </Button>
          </Popconfirm>
          <AddRecordButton />
        </Row>
      )}

      <div style={{ backgroundColor: colorPrimary }} className="my-8 h-[3px]" />
    </div>
  )
}

export default App
