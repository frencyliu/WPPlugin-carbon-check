import React from 'react'
import { Select, Form } from 'antd'
import { tkmData } from '@/pages/Check/components/EditProjectButtons/Line/defaultData'
import { convertLanguage, getLanguage } from '@/utils/i18n'

const FormFuelSelect: React.FC<{
  name: string | Array<string | number>
  className?: string
}> = ({ name, className = 'rounded-none' }) => {
  const form = Form.useFormInstance()
  const gwp = Form.useWatch(name, form)

  const handleSelect = (value: string) => {
    form.setFieldValue(name, value)
    form.validateFields()
  }

  const handleClear = () => {
    form.setFieldValue(name, undefined)
  }

  const options: { value: string; label: string }[] = tkmData.map((data) => ({
    value: getLanguage() === 'zh' ? data.nameZh : data.nameEn,
    label: getLanguage() === 'zh' ? data.nameZh : data.nameEn,
  }))

  const uniqueOptions = Array.from(
    options.reduce((map, obj) => map.set(obj.value, obj), new Map()).values(),
  )

  return (
    <Select
      className={className}
      showSearch
      allowClear
      placeholder={convertLanguage('請選擇燃料')}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option!.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      options={uniqueOptions}
      value={gwp}
      onSelect={handleSelect}
      onClear={handleClear}
    />
  )
}

export default FormFuelSelect
