import React from 'react'
import { Select, Form } from 'antd'
import { convertChemicalToString } from '@/utils'
import { jsxData } from '@/pages/Check/components/EditProjectButtons/Line/defaultData'

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

  const options: { value: string; label: string }[] = jsxData.map((data) => ({
    value: data.nameZh,
    label: data.nameZh,
  }))

  return (
    <Select
      className={className}
      showSearch
      allowClear
      placeholder="請選擇燃料"
      optionFilterProp="children"
      filterOption={(input, option) =>
        convertChemicalToString(option?.label).includes(input.toLowerCase())
      }
      options={options}
      value={gwp}
      onSelect={handleSelect}
      onClear={handleClear}
    />
  )
}

export default FormFuelSelect
