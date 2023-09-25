import { createContext, useContext, useState, useEffect } from 'react'
import { Button, Modal, Input, Radio, Form } from 'antd'
import { FolderAddFilled } from '@ant-design/icons'
import KmFormItem from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/components/KmFormItem'
import LFormItem from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/components/LFormItem'
import type { TYearlyDataType } from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, convertUnitToTons } from '@/utils'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeIII/CheckScopeIIITable'
import { TScopes } from '@/types'

export const FormContext = createContext<any | null>(null)
const AddRecordButton = () => {
  const form = Form.useFormInstance()
  const { scopes, setScopes, scopesNumber } = useContext(ProjectContext)
  const { groupIndex, groupKey } = useContext(TableDataContext)
  const scopeIGroups: TScopes = scopes[scopesNumber] || []
  const group = scopeIGroups.find(
    (theGroup: { groupKey: any }) => theGroup.groupKey === groupKey,
  )
  const dataSource = group?.dataSource || []

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false)

  const [
    validating,
    setValidating,
  ] = useState(false)

  const resetFormData = () => {
    form.resetFields([
      [
        scopesNumber,
        groupIndex,
        'sourceName',
      ],
      [
        scopesNumber,
        groupIndex,
        'period',
      ],
      [
        scopesNumber,
        groupIndex,
        'fuel',
      ],
      [
        scopesNumber,
        groupIndex,
        'gwp',
      ],
      [
        scopesNumber,
        groupIndex,
        'unit',
      ],
    ])
  }

  const showModal = () => {
    setIsModalOpen(true)
    resetFormData()
  }

  const handleData = () => {
    const formData = form.getFieldsValue()?.[scopesNumber][groupIndex]
    const getYearlyAmount = (theFormData: any) => {
      switch (theFormData?.period) {
        case 'km':
          return convertUnitToTons({
            value: theFormData.yearlyAmount ?? 0,
            unit: theFormData.unit,
          })
        default:
          return 0
      }
    }
    const yearlyAmount = getYearlyAmount(formData)

    const ar5 = gwpMapping.find((gwp) => gwp?.value === formData?.gwp)?.ar5 || 0

    const carbonTonsPerYear = yearlyAmount * ar5

    const theFormatRecord: TYearlyDataType = {
      km: formData?.km,
      l: formData?.l,
      key: nanoid(),
      sourceName: formData?.sourceName,
      gwp: formData.gwp,
      yearlyAmount,
      ar5,
      co2e: carbonTonsPerYear,
      carbonTonsPerYear,
      period: formData?.period,
      monthlyAmount:
        formData?.period === 'monthly' ? formData.monthlyAmount : [],
      hourlyAmount: formData?.period === 'hourly' ? formData.hourlyAmount : 0,
      unit: formData.unit,
    }

    return [
      ...dataSource,
      theFormatRecord,
    ]
  }

  const handleModalOk = () => {
    setValidating(true)
    form
      .validateFields()
      .then((_values) => {
        setValidating(false)
        setIsModalOpen(false)
        const newDataSource = handleData()
        const newScopes = JSON.parse(JSON.stringify(scopes))

        if (newScopes && newScopes[scopesNumber]) {
          newScopes[scopesNumber][groupIndex].dataSource = newDataSource
        }
        setScopes(newScopes)
      })
      .catch((err) => {
        console.log('Validate Failed:', err)
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const period = Form.useWatch(
    [
      scopesNumber,
      groupIndex,
      'period',
    ],
    form,
  )

  return (
    <>
      <Button onClick={showModal} type="primary" className="mt-4">
        <FolderAddFilled className="mr-2" />
        新增設備
      </Button>
      <Modal
        title="新增設備"
        open={isModalOpen}
        onOk={handleModalOk}
        centered
        width={648}
        className="cc-modal"
        onCancel={handleCancel}
        okText="新增設備"
        cancelText="取消"
      >
        <div className="w-ful overflow-x-auto">
          <div className="min-w-[600px]">
            <Form
              form={form}
              onFieldsChange={() => {
                setValidating(false)
              }}
            >
              <Form.Item
                // hasFeedback={true}
                name={[
                  scopesNumber,
                  groupIndex,
                  'sourceName',
                ]}
                rules={[{ required: validating, message: '請輸入設備名稱' }]}
              >
                <Input className="mt-8" addonBefore="設備名稱" />
              </Form.Item>

              <Form.Item
                name={[
                  scopesNumber,
                  groupIndex,
                  'period',
                ]}
                initialValue="km"
              >
                <Radio.Group className="w-full mt-8" buttonStyle="solid">
                  <Radio.Button className="w-1/3 text-center" value="km">
                    等效公里排放
                  </Radio.Button>
                  <Radio.Button className="w-1/3 text-center" value="l">
                    體積排放
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              {period === 'km' && (
                <KmFormItem
                  groupIndex={groupIndex}
                  validating={validating}
                  scopesNumber={scopesNumber}
                />
              )}
              {period === 'l' && (
                <LFormItem
                  groupIndex={groupIndex}
                  validating={validating}
                  scopesNumber={scopesNumber}
                />
              )}
            </Form>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddRecordButton
