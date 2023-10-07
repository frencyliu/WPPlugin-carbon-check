import React from 'react'
import { Select, Form } from 'antd'
import { gwpOptions, convertChemicalToString } from '@/utils'
import { convertLanguage } from '@/utils/i18n'

const FormGWPSelect: React.FC<{
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

  return (
    <>
      {name[0] === 'scopeIII' || name[0] === 'scopeIV' ? (
        <Select
          className={className}
          showSearch
          allowClear
          placeholder={convertLanguage('請選擇或搜尋溫室氣體')}
          optionFilterProp="children"
          filterOption={(input, option) =>
            convertChemicalToString(option?.label).includes(input.toLowerCase())
          }
          options={gwpOptions[0].options}
          value={gwp}
          onSelect={handleSelect}
          onClear={handleClear}
        />
      ) : (
        <Select
          className={className}
          showSearch
          allowClear
          placeholder={convertLanguage('請選擇或搜尋溫室氣體')}
          optionFilterProp="children"
          filterOption={(input, option) =>
            convertChemicalToString(option?.label).includes(input.toLowerCase())
          }
          options={gwpOptions}
          value={gwp}
          onSelect={handleSelect}
          onClear={handleClear}
        />
      )}
    </>
  )
}

export default FormGWPSelect
