import { createContext, useContext, useState } from 'react'
import { Modal, Input, Radio, Form } from 'antd'
import { SlidersOutlined } from '@ant-design/icons'
import type { TYearlyDataType } from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, convertUnitToTons, reverseUnitValue } from '@/utils'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeIII/CheckScopeIIITable'
import { useColor } from '@/hooks'
import { round } from 'lodash-es'
import KmFormItem from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/components/KmFormItem'
import LFormItem from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/components/LFormItem'

export const FormContext = createContext<any | null>(null)
const EditRecordButton: React.FC<{ record: TYearlyDataType }> = ({
  record,
}) => {
  const form = Form.useFormInstance()
  const { scopes, setScopes, scopesNumber } = useContext(ProjectContext)
  const { groupIndex, groupKey } = useContext(TableDataContext)
  const scopeIGroups = scopes[scopesNumber] || []
  const group = scopeIGroups.find(
    (theGroup: { groupKey: any }) => theGroup.groupKey === groupKey,
  )
  const dataSource = group?.dataSource || []
  const { colorPrimary } = useColor()

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false)

  const [
    validating,
    setValidating,
  ] = useState(false)

  const showModal = (theRecord: TYearlyDataType) => () => {
    const values = form.getFieldsValue()

    setIsModalOpen(true)

    const theYearlyAmount = reverseUnitValue({
      value: theRecord.yearlyAmount,
      unit: theRecord.unit,
    })

    const theHourlyAmount = theRecord.hourlyAmount || 0
    const theHours = !!theHourlyAmount ? theYearlyAmount / theHourlyAmount : 0

    form.setFieldsValue({
      [scopesNumber]: {
        ...values[scopesNumber],
        [groupIndex]: {
          groupName: group?.groupName || '',
          sourceName: theRecord.sourceName,
          period: theRecord.period,
          yearlyAmount: reverseUnitValue({
            value: theRecord.yearlyAmount || 0,
            unit: theRecord.unit,
          }),
          monthlyAmount: theRecord.monthlyAmount || new Array(12).fill(0),
          hourlyAmount: theRecord.hourlyAmount || 0,
          hours: round(theHours, 1),
          gwp: theRecord.gwp,
          unit: theRecord.unit,
          km: theRecord?.km,
          l: theRecord?.l,
        },
      },
    })
  }

  const handleData = () => {
    const formData = form.getFieldsValue()[scopesNumber][groupIndex]

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
      key: record?.key || nanoid(),
      sourceName: formData?.sourceName,
      gwp: formData?.gwp,
      yearlyAmount,
      ar5,
      co2e: carbonTonsPerYear,
      carbonTonsPerYear,
      period: formData?.period,
      monthlyAmount:
        formData?.period === 'monthly' ? formData?.monthlyAmount : [],
      hourlyAmount: formData?.period === 'hourly' ? formData?.hourlyAmount : 0,
      unit: formData.unit,
      km: formData?.km,
      l: formData?.l,
    }

    const theRecordIndex = dataSource.findIndex(
      (theRecord: { key: string }) => theRecord.key === record?.key,
    )

    return [
      ...dataSource.slice(0, theRecordIndex),
      theFormatRecord,
      ...dataSource.slice(theRecordIndex + 1),
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

        newScopes[scopesNumber][groupIndex].dataSource = newDataSource

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
      <SlidersOutlined
        className="ml-4 text-[20px]"
        style={{ color: colorPrimary }}
        onClick={showModal(record)}
      />
      <Modal
        title="編輯設備"
        open={isModalOpen}
        onOk={handleModalOk}
        centered
        width={648}
        className="cc-modal"
        onCancel={handleCancel}
        okText="編輯設備"
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

export default EditRecordButton
