import { createContext, useContext, useState } from 'react'
import { Modal, Input, Form, Radio } from 'antd'
import { SlidersOutlined } from '@ant-design/icons'
import type { TYearlyDataType } from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, reverseUnitValue } from '@/utils'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeIII/CheckScopeIIITable'
import { useColor } from '@/hooks'
import { round } from 'lodash-es'
import KmFormItem from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/components/KmFormItem'
import { convertLanguage } from '@/utils/i18n'
import TonsKmFormItem from '../TonsKmFormItem'
import { tkmData } from '@/pages/Check/components/EditProjectButtons/Line/defaultData'

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

  const period = Form.useWatch(
    [
      scopesNumber,
      groupIndex,
      'period',
    ],
    form,
  )
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
        },
      },
    })
  }

  const handleData = () => {
    const formData = form.getFieldsValue()[scopesNumber][groupIndex]
    const getYearlyAmount = (theFormData: any) => {
      return round(theFormData.kmAmount, 3)
    }
    const yearlyAmount = getYearlyAmount(formData)
    if (period === 'fuel') {
      const coefficientData =
        scopes.coefficientDiff.find((item) => item.nameZh === record.km)
          ?.data ?? []
      const theRecordIndex = dataSource.findIndex(
        (theRecord: { sourceName: string }) =>
          theRecord.sourceName === record?.sourceName,
      )
      const threeRecords = dataSource.filter(
        (theRecord: { sourceName: string }) =>
          theRecord.sourceName === record?.sourceName,
      )
      const coefficient =
        coefficientData.find((item) => item.unit1 === record.gwp)?.data ?? 0

      const newThreeRecords = threeRecords.map((item: any) => {
        const newRecord = {
          ...item,
          yearlyAmount,
          co2e: yearlyAmount * coefficient,
          carbonTonsPerYear: yearlyAmount * coefficient,
          kmAmount: formData?.kmAmount,
        }
        return newRecord
      })

      return [
        ...dataSource.slice(0, theRecordIndex),
        ...newThreeRecords,
        ...dataSource.slice(theRecordIndex + 3),
      ]
    }
    const ar5 =
      tkmData.find((item) => item.nameZh === formData?.tonKm)?.coe || 0

    const carbonTonsPerYear = yearlyAmount * formData.tonAmount * ar5

    const theFormatRecord: TYearlyDataType = {
      key: record?.key || nanoid(),
      sourceName: formData?.sourceName,
      gwp: record.gwp,
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
      kmAmount: formData?.kmAmount,
      tonAmount: formData?.tonAmount,
      tonKm: formData?.tonKm,
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

  return (
    <>
      <SlidersOutlined
        className="ml-4 text-[20px]"
        style={{ color: colorPrimary }}
        onClick={showModal(record)}
      />
      <Modal
        title={convertLanguage('編輯設備')}
        open={isModalOpen}
        onOk={handleModalOk}
        centered
        width={648}
        className="cc-modal"
        onCancel={handleCancel}
        okText={convertLanguage('編輯設備')}
        cancelText={convertLanguage('取消')}
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
                rules={[
                  {
                    required: validating,
                    message: convertLanguage('請輸入設備名稱'),
                  },
                ]}
              >
                <Input
                  className="mt-8"
                  addonBefore={convertLanguage('設備名稱')}
                />
              </Form.Item>
              <Form.Item
                name={[
                  scopesNumber,
                  groupIndex,
                  'period',
                ]}
                initialValue="fuel"
              >
                <Radio.Group className="w-full mt-8" buttonStyle="solid">
                  <Radio.Button className="w-1/2 text-center" value="fuel">
                    {convertLanguage('燃料排放')}
                  </Radio.Button>
                  <Radio.Button className="w-1/2 text-center" value="tonKm">
                    {convertLanguage('頓公里排放')}
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              {period === 'fuel' && (
                <KmFormItem
                  groupIndex={groupIndex}
                  validating={validating}
                  scopesNumber={scopesNumber}
                  scopes={scopes}
                />
              )}
              {period === 'tonKm' && (
                <TonsKmFormItem
                  groupIndex={groupIndex}
                  validating={validating}
                  scopesNumber={scopesNumber}
                  scopes={scopes}
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
