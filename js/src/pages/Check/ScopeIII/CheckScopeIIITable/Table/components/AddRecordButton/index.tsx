import { createContext, useContext, useState } from 'react'
import { Button, Modal, Input, Radio, Form } from 'antd'
import { FolderAddFilled } from '@ant-design/icons'
import KmFormItem from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/components/KmFormItem'
import TonsKmFormItem from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/components/TonsKmFormItem'
import type { TYearlyDataType } from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping } from '@/utils'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeIII/CheckScopeIIITable'
import { TScopes } from '@/types'
import { convertLanguage } from '@/utils/i18n'
import { round } from 'lodash-es'
import { tkmData } from '@/pages/Check/components/EditProjectButtons/Line/defaultData'

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

  const period = Form.useWatch(
    [
      scopesNumber,
      groupIndex,
      'period',
    ],
    form,
  )

  const handleData = () => {
    const formData = form.getFieldsValue()?.[scopesNumber][groupIndex]
    const getYearlyAmount = (theFormData: any) => {
      return round(theFormData.kmAmount, 3)
    }

    const yearlyAmount = getYearlyAmount(formData)
    const ar5 = gwpMapping.find((gwp) => gwp?.value === formData?.gwp)?.ar5 || 0

    if (period === 'fuel') {
      const kmValue = formData?.km
      const coefficientData =
        scopes.coefficientDiff.find((item) => item.nameZh === kmValue)?.data ??
        []
      const co2Data =
        coefficientData.find((item) => item.unit1 === 'CO2')?.data ?? 0
      const carbonTonsPerYearCO2 = yearlyAmount * co2Data
      const coefficientCH4 =
        coefficientData.find((item) => item.unit1 === 'CH4')?.data ?? 0
      const carbonTonsPerYearCH4 = yearlyAmount * coefficientCH4
      const coefficientN2O =
        coefficientData.find((item) => item.unit1 === 'N2O')?.data ?? 0
      const carbonTonsPerYearN2O = yearlyAmount * coefficientN2O

      const theFormatRecordCO2: TYearlyDataType = {
        km: formData?.km,
        kmAmount: formData?.kmAmount,
        key: nanoid(),
        sourceName: formData?.sourceName,
        gwp: 'co2',
        yearlyAmount,
        ar5,
        co2e: carbonTonsPerYearCO2,
        carbonTonsPerYear: carbonTonsPerYearCO2,
        period: formData?.period,
        monthlyAmount:
          formData?.period === 'fuel' ? formData.monthlyAmount : [],
        hourlyAmount: formData?.period === 'hourly' ? formData.hourlyAmount : 0,
        unit: formData.unit,
      }

      const theFormatRecordCH4: TYearlyDataType = {
        km: formData?.km,
        kmAmount: formData?.kmAmount,
        key: nanoid(),
        sourceName: formData?.sourceName,
        gwp: 'ch4',
        yearlyAmount,
        ar5,
        co2e: carbonTonsPerYearCH4,
        carbonTonsPerYear: carbonTonsPerYearCH4,
        period: formData?.period,
        monthlyAmount:
          formData?.period === 'fuel' ? formData.monthlyAmount : [],
        hourlyAmount: formData?.period === 'hourly' ? formData.hourlyAmount : 0,
        unit: formData.unit,
      }

      const theFormatRecordN2O: TYearlyDataType = {
        km: formData?.km,
        kmAmount: formData?.kmAmount,
        key: nanoid(),
        sourceName: formData?.sourceName,
        gwp: 'n2o',
        yearlyAmount,
        ar5,
        co2e: carbonTonsPerYearN2O,
        carbonTonsPerYear: carbonTonsPerYearN2O,
        period: formData?.period,
        monthlyAmount:
          formData?.period === 'fuel' ? formData.monthlyAmount : [],
        hourlyAmount: formData?.period === 'hourly' ? formData.hourlyAmount : 0,
        unit: formData.unit,
      }
      return [
        ...dataSource,
        theFormatRecordCO2,
        theFormatRecordCH4,
        theFormatRecordN2O,
      ]
    } else if (period === 'tonKm') {
      console.log(formData)
      const coefficientData =
        tkmData.find((item) => item.nameZh === formData?.tonKm)?.coe || 0

      // 頓公里排放量 = 頓 * 公里 * 係數
      const carbonTonsPerYear =
        yearlyAmount * formData?.tonAmount * coefficientData

      const theFormatRecord: TYearlyDataType = {
        km: coefficientData.toString(),
        kmAmount: formData?.kmAmount,
        key: nanoid(),
        sourceName: formData?.sourceName,
        gwp: formData?.gwp,
        yearlyAmount,
        ar5: coefficientData,
        co2e: carbonTonsPerYear,
        carbonTonsPerYear,
        period: formData?.period,
        monthlyAmount:
          formData?.period === 'fuel' ? formData.monthlyAmount : [],
        hourlyAmount: formData?.period === 'hourly' ? formData.hourlyAmount : 0,
        unit: formData.unit,
        tonAmount: formData?.tonAmount,
        tonKm: formData?.tonKm,
      }
      return [
        ...dataSource,
        theFormatRecord,
      ]
    }
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

  return (
    <>
      <Button onClick={showModal} type="primary" className="mt-4">
        <FolderAddFilled className="mr-2" />
        {convertLanguage('新增設備')}
      </Button>
      <Modal
        title={convertLanguage('新增設備')}
        open={isModalOpen}
        onOk={handleModalOk}
        centered
        width={648}
        className="cc-modal"
        onCancel={handleCancel}
        okText={convertLanguage('新增設備')}
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

export default AddRecordButton
