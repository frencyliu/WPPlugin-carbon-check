import { Input, InputNumber, Form } from 'antd'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'
import { handleClearZero } from '@/utils'
import { convertLanguage } from '@/utils/i18n'

const GWPHourlyFormItem: React.FC<{
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
            'hourlyAmount',
          ]}
          className="w-[calc(100%-20rem)] mb-0"
          initialValue={0}
          rules={[
            {
              required: validating,
              message: convertLanguage('請輸入每小時排放量'),
            },
          ]}
        >
          <InputNumber
            addonBefore={convertLanguage('每小時排放')}
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
              message: convertLanguage('請選擇溫室氣體'),
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
              message: convertLanguage('請選擇單位'),
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
      <Input.Group compact className="mb-4">
        <Form.Item
          name={[
            scopesNumber,
            groupIndex,
            'hours',
          ]}
          className="w-full mb-0"
          initialValue={0}
          rules={[
            {
              required: validating,
              message: convertLanguage('請輸入此設備今年運轉了幾小時'),
            },
          ]}
        >
          <InputNumber
            addonBefore={convertLanguage('此設備今年運轉了')}
            addonAfter={convertLanguage('小時')}
            className="w-full"
            min={0}
            onClick={handleClearZero}
          />
        </Form.Item>
      </Input.Group>
    </>
  )
}

export default GWPHourlyFormItem
