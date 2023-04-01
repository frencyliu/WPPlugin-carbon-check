/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from 'react'
import { Table, Row, Button, Form, Popconfirm } from 'antd'
import AddRecordButton from './components/AddRecordButton'
import { TYearlyDataType } from './types'
import useColumns from './hooks/useColumns'
import { TableDataContext } from '@/pages/Check/ScopeII/CheckScopeIITable'
import { DeleteFilled } from '@ant-design/icons'
import type { ColumnType } from 'antd/lib/table'
import { useColor, useEditableTitle } from '@/hooks'
import { ProjectContext } from '@/pages/Check'
import { windowOuterWidth, companyCategories } from '@/utils'

const App: React.FC = () => {
  const size = windowOuterWidth < 768 ? 'small' : 'middle'
  const { colorPrimary } = useColor()
  const columns = useColumns()

  const {
    projectData: projectContextData,
    scopes,
    printMode = false,
  } = useContext(ProjectContext)
  const scopeIIGroups = scopes?.scopeII || []

  const initialValue =
    companyCategories.find(
      (companyCategory) =>
        companyCategory.name === scopes?.info?.companyCategory,
    )?.scopeIDefaultValue || '辦公室'

  const {
    groupKey,
    groupIndex,
    groupData,
    onDelete: handleDeleteGroup = () => {},
  } = useContext(TableDataContext)

  const dataSource =
    (scopeIIGroups.find((group) => group.groupKey === groupKey)?.dataSource as
      | TYearlyDataType[]
      | undefined) || ([] as TYearlyDataType[])

  const id = projectContextData?.id || 0
  const form = Form.useFormInstance()
  // const data = JSON.parse(projectContextData?.meta?.project_data || '{}')

  // TODO: theTitle可以優化 因為有時候會讀不到直
  const { element } = useEditableTitle({
    form,
    name: [
      'scopeII',
      groupIndex,
      'groupName',
    ],
    required: true,
    initialValue,
    title: {
      theTitle: groupData?.groupName || initialValue,
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
        bordered
        dataSource={dataSource}
        columns={columns as ColumnType<TYearlyDataType>[]}
        pagination={false}
      />
      {!printMode && (
        <Row justify="space-between">
          <Popconfirm
            title="確認刪除群組?"
            okText="確認"
            cancelText="取消"
            onConfirm={handleDelete(groupKey)}
          >
            <Button className="mt-4" type="dashed" danger>
              <DeleteFilled className="mr-2" />
              刪除群組
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
