import { Input, InputNumber, Form } from 'antd'
import { handleClearZero } from '@/utils'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'

const GWPYearlyFormItem: React.FC<{
  groupIndex: number
  validating: boolean
  scopesNumber: string
}> = ({ groupIndex, validating, scopesNumber }) => {
  return (
    <>
      <Input.Group compact className="mb-4">
        <Form.Item
          name={[
            scopesNumber,
            groupIndex,
            'yearlyAmount',
          ]}
          className="w-[calc(100%-20rem)] mb-0"
          initialValue={0}
          rules={[
            {
              required: validating,
              message: '請輸入年排放量',
            },
          ]}
        >
          <InputNumber
            addonBefore="年排放"
            className="w-full rounded-r-none"
            min={0}
            onClick={handleClearZero}
          />
        </Form.Item>
        <Form.Item
          name={[
            scopesNumber,
            groupIndex,
            'gwp',
          ]}
          className="w-60 mb-0"
          rules={[
            {
              required: validating,
              message: '請選擇溫室氣體',
            },
          ]}
        >
          <FormGWPSelect
            name={[
              scopesNumber,
              groupIndex,
              'gwp',
            ]}
          />
        </Form.Item>
        <Form.Item
          name={[
            scopesNumber,
            groupIndex,
            'unit',
          ]}
          className="w-20 mb-0"
          initialValue="kg"
          rules={[
            {
              required: validating,
              message: '請選擇單位',
            },
          ]}
        >
          <FormUnitSelect
            name={[
              scopesNumber,
              groupIndex,
              'unit',
            ]}
          />
        </Form.Item>
      </Input.Group>
    </>
  )
}

export default GWPYearlyFormItem
