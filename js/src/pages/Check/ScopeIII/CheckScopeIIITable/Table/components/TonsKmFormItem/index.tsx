import { Input, Form, InputNumber } from 'antd'
import FormFuelSelect from '@/components/FormFuelSelect'
import { handleClearZero } from '@/utils'
import { TScopes } from '@/types'
import { convertLanguage } from '@/utils/i18n'
import FormTKmSelect from '@/components/FormTKmSelect'

const TonsKmFormItem: React.FC<{
  groupIndex: number
  validating: boolean
  scopesNumber: string
  scopes: TScopes
}> = ({ groupIndex, validating, scopesNumber }) => {
  return (
    <>
      <Input.Group compact className="mb-4">
        <Form.Item
          name={[
            scopesNumber,
            groupIndex,
            'tonAmount',
          ]}
        >
          <InputNumber
            addonBefore={convertLanguage('頓')}
            className="w-48 mr-1"
            placeholder={convertLanguage('頓')}
            min={0}
            onClick={handleClearZero}
          />
        </Form.Item>
        <Form.Item
          name={[
            scopesNumber,
            groupIndex,
            'kmAmount',
          ]}
        >
          <InputNumber
            addonBefore={convertLanguage('公里')}
            className="w-48 mr-1"
            placeholder={convertLanguage('公里')}
            min={0}
            onClick={handleClearZero}
          />
        </Form.Item>
        <Form.Item
          name={[
            scopesNumber,
            groupIndex,
            'tonKm',
          ]}
          className="w-[calc(100%-25rem)] mb-0"
          rules={[
            {
              required: validating,
              message: convertLanguage('請選擇燃料'),
            },
          ]}
        >
          <FormTKmSelect
            name={[
              scopesNumber,
              groupIndex,
              'tonKm',
            ]}
          />
        </Form.Item>
      </Input.Group>
    </>
  )
}

export default TonsKmFormItem
