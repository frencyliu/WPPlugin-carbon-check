import { createContext, useContext, useState } from 'react'
import { Modal, Row, Col, Form, InputNumber } from 'antd'
import { SlidersOutlined } from '@ant-design/icons'
import type { TYearlyDataType } from '@/pages/Check/ScopeII/CheckScopeIITable/Table/types'
import { nanoid } from 'nanoid'
import { sourceNames } from '@/utils'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeII/CheckScopeIITable'
import { useColor } from '@/hooks'
import ExtendableSelect from '../ExtendableSelect'
import { round } from 'lodash-es'
import { convertLanguage } from '@/utils/i18n'

export const FormContext = createContext<any | null>(null)
const EditRecordButton: React.FC<{ record: TYearlyDataType }> = ({
  record,
}) => {
  const form = Form.useFormInstance()
  const { scopes, setScopes } = useContext(ProjectContext)
  const { groupIndex, groupKey } = useContext(TableDataContext)
  const scopeIIGroups = scopes?.scopeII || []
  const group = scopeIIGroups.find((theGroup) => theGroup.groupKey === groupKey)
  const dataSource = group?.dataSource || []
  const watchYearlyAmount = Form.useWatch(
    [
      'scopeII',
      groupIndex,
      'yearlyAmount',
    ],
    form,
  )
  const watchCo2Kwh = Form.useWatch(
    [
      'scopeII',
      groupIndex,
      'co2Kwh',
    ],
    form,
  )

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
    setIsModalOpen(true)
    const yearlyAmount = theRecord?.yearlyAmount || 0
    const co2Kwh = theRecord?.co2Kwh || 1
    const values = form.getFieldsValue()

    form.setFieldsValue({
      scopeII: {
        ...values?.scopeII,
        [groupIndex]: {
          groupName: group?.groupName || '',
          sourceName: theRecord?.sourceName,
          co2Kwh,
          yearlyAmount,
        },
      },
    })
  }

  const handleData = () => {
    const formData = form.getFieldsValue().scopeII[groupIndex]

    const yearlyAmount = formData?.yearlyAmount || 0
    const co2Kwh = formData.co2Kwh || 1
    const carbonTonsPerYear = (yearlyAmount * co2Kwh) / 1000

    const theFormatRecord: TYearlyDataType = {
      key: nanoid(),
      sourceName: formData?.sourceName,
      co2Kwh: formData.co2Kwh || 1,
      yearlyAmount,
      carbonTonsPerYear,
    }

    const theRecordIndex = dataSource.findIndex(
      (theRecord) => theRecord.key === record?.key,
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

        newScopes.scopeII[groupIndex].dataSource = newDataSource

        setScopes(newScopes)
      })
      .catch((err) => {
        console.log('Validate Failed:', err)
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleESSelect = (value: any) => {
    const isES = Object.keys(value[groupIndex]).includes('sourceName')

    const values = {
      ...form.getFieldsValue(),
    }
    if (isES) {
      const source = sourceNames.find(
        (s) => s.value === value[groupIndex].sourceName,
      ) || {
        co2Kwh: 1,
      }

      values[groupIndex].co2Kwh = source.co2Kwh

      form.setFieldsValue(values)
    }
  }

  return (
    <>
      <SlidersOutlined
        className="ml-4 text-[20px]"
        style={{ color: colorPrimary }}
        onClick={showModal(record)}
      />
      <Modal
        title={convertLanguage('編輯電力來源')}
        open={isModalOpen}
        onOk={handleModalOk}
        centered
        width={600}
        onCancel={handleCancel}
        okText={convertLanguage('編輯電力來源')}
        cancelText={convertLanguage('取消')}
      >
        <Form
          form={form}
          onFieldsChange={() => {
            setValidating(false)
          }}
          layout="vertical"
          onValuesChange={handleESSelect}
        >
          <Row gutter={16} className="mt-8">
            <Col span={12}>
              <ExtendableSelect
                groupIndex={groupIndex}
                validating={validating}
              />
            </Col>
            <Col span={12}>
              <Form.Item
                label={convertLanguage('使用度數(年)')}
                name={[
                  'scopeII',
                  groupIndex,
                  'yearlyAmount',
                ]}
                initialValue={0}
                rules={[
                  {
                    required: validating,
                    message: convertLanguage('請輸入年排放量'),
                  },
                ]}
              >
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    CO<sub>2</sub>(kg)/Kwh
                  </>
                }
                name={[
                  'scopeII',
                  groupIndex,
                  'co2Kwh',
                ]}
                initialValue={0}
                rules={[
                  {
                    required: validating,
                    message: `${convertLanguage('請輸入')}${(
                      <>
                        CO<sub>2</sub>(kg)/Kwh
                      </>
                    )}`,
                  },
                ]}
              >
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={convertLanguage('碳排(噸/年)')}>
                <InputNumber
                  value={(watchYearlyAmount * watchCo2Kwh) / 1000}
                  className="w-full"
                  min={0}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default EditRecordButton
