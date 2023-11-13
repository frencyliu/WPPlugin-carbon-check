import { Input, Form, InputNumber, Select } from 'antd'
import FormFuelSelect from '@/components/FormFuelSelect'
import { handleClearZero } from '@/utils'
import { TScopes } from '@/types'
import { useEffect, useState } from 'react'
import { convertLanguage } from '@/utils/i18n'

const KmFormItem: React.FC<{
  groupIndex: number
  validating: boolean
  scopesNumber: string
  scopes: TScopes
}> = ({ groupIndex, validating, scopesNumber, scopes }) => {
  const form = Form.useFormInstance()
  const gwp = Form.useWatch(
    [
      scopesNumber,
      groupIndex,
      'gwp',
    ],
    form,
  )
  const km = Form.useWatch(
    [
      scopesNumber,
      groupIndex,
      'km',
    ],
    form,
  )

  const showUnitValue = km

  const [
    unitValue,
    setUnitValue,
  ] = useState('')

  const changeUnit = () => {
    // 在這個效應函式中，設定 unitValue 的值
    // 檢查 showUnitValue 是否為真
    if (showUnitValue) {
      // 使用 scopes.coefficientDiff 陣列的 find 方法尋找符合條件的元素
      const foundItem = scopes.coefficientDiff.find(
        (item) =>
          item.nameZh ===
            form.getFieldValue([
              scopesNumber,
              groupIndex,
              'km',
            ]) ||
          (item.nameEn ===
            form.getFieldValue([
              scopesNumber,
              groupIndex,
              'km',
            ]) &&
            item.data),
      )

      if (foundItem) {
        // 如果找到符合條件的元素，則使用 data.find 方法尋找符合條件的子元素
        // const foundDataItem = foundItem.data.find(
        //   (i) =>
        //     i.unit1 ===
        //     form
        //       .getFieldValue([
        //         scopesNumber,
        //         groupIndex,
        //         'gwp',
        //       ])
        //       .toLocaleUpperCase(),
        // )
        setUnitValue(foundItem.data[0].unit2)
        // 如果找到符合條件的子元素，則將 unitValue 設定為它的 unit1 屬性
        // if (foundDataItem) {
        //   setUnitValue(foundDataItem.unit2)
        // } else {
        //   // 如果找不到符合條件的子元素，則設定 unitValue 為 '123'
        //   setUnitValue('')
        // }
      } else {
        // 如果找不到符合條件的元素，則設定 unitValue 為 '123'
        setUnitValue('')
      }
    } else {
      // 如果 showUnitValue 不為真，則設定 unitValue 為 '456'
      setUnitValue('')
    }
  }

  useEffect(() => {
    changeUnit()
  }, [
    gwp,
    km,
  ])

  return (
    <div className="text-center">
      <Input.Group compact className="mb-4 inline-block">
        <Form.Item
          name={[
            scopesNumber,
            groupIndex,
            'kmAmount',
          ]}
          className="inline-block"
        >
          <InputNumber
            addonBefore={convertLanguage('排放量')}
            className="w-48 mr-1"
            placeholder={convertLanguage('排放量')}
            min={0}
            onClick={handleClearZero}
          />
        </Form.Item>
        <Form.Item
          name={[
            scopesNumber,
            groupIndex,
            'km',
          ]}
          className="inline-block w-[calc(100%-25rem)] mb-0"
          rules={[
            {
              required: validating,
              message: convertLanguage('請選擇燃料'),
            },
          ]}
        >
          <FormFuelSelect
            name={[
              scopesNumber,
              groupIndex,
              'km',
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Select className={'rounded-l-none'} value={unitValue} disabled />
        </Form.Item>
      </Input.Group>
    </div>
  )
}

export default KmFormItem
