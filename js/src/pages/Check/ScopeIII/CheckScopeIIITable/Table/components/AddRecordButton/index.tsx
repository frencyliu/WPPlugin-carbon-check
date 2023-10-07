import { createContext, useContext, useState } from 'react'
import { Button, Modal, Input, Radio, Form } from 'antd'
import { FolderAddFilled } from '@ant-design/icons'
import KmFormItem from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/components/KmFormItem'
import type { TYearlyDataType } from '@/pages/Check/ScopeIII/CheckScopeIIITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, convertUnitToTons } from '@/utils'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeIII/CheckScopeIIITable'
import { TScopes } from '@/types'
import { convertLanguage } from '@/utils/i18n'
import { round } from 'lodash-es'

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
      return round(theFormData.kmAmount, 3)
    }

    const yearlyAmount = getYearlyAmount(formData)
    const ar5 = gwpMapping.find((gwp) => gwp?.value === formData?.gwp)?.ar5 || 0

    const coefficient =
      scopes.coefficientDiff
        .find((item) => item.nameZh === formData?.km)
        ?.data.find(
          (i) =>
            i.unit1 ===
            gwpMapping
              .find((item) => item.value === formData.gwp)
              ?.value.toLocaleUpperCase(),
        )?.data || 0
    const carbonTonsPerYear = yearlyAmount * coefficient
    const theFormatRecord: TYearlyDataType = {
      km: formData?.km,
      kmAmount: formData?.kmAmount,
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
              <KmFormItem
                groupIndex={groupIndex}
                validating={validating}
                scopesNumber={scopesNumber}
                scopes={scopes}
              />
            </Form>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddRecordButton
