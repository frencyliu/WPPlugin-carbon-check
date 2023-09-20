import { useState, useEffect, useContext } from 'react'
import { Typography, Form } from 'antd'
import HiddenInput from '@/components/HiddenInput'
import { FormInstance } from 'antd/lib/form'
import { ProjectContext } from '@/pages/Check'

const useEditableTitle = ({
  form,
  name,
  required,
  initialValue,
  title,
  printMode = false,
}: {
  form: FormInstance<any>
  name: (string | number)[]
  required?: boolean
  initialValue?: string | number
  title: {
    theTitle: string
    level: 1 | 2 | 3 | 4 | 5 | undefined
  }
  printMode?: boolean
}) => {
  const [
    editableStr,
    setEditableStr,
  ] = useState(initialValue)
  const { setIsDiff, scopes } = useContext(ProjectContext)
  const initValue = name.reduce((acc: any, cur: any) => acc[cur], scopes)

  const handleChange = (str: string) => {
    setEditableStr(str)
    form.setFieldValue(name, str)
    setIsDiff(!(str === editableStr))
  }

  useEffect(() => {
    setEditableStr(title.theTitle)
    form.setFieldValue(name, title.theTitle)
  }, [title.theTitle])

  const renderTitle = () => (
    <>
      <Typography.Title
        editable={printMode ? false : { onChange: handleChange }}
        level={title.level}
      >
        {editableStr}
      </Typography.Title>
      {!printMode ? (
        <HiddenInput name={name} required={required} initialValue={initValue} />
      ) : null}
    </>
  )

  return {
    element: renderTitle(),
  }
}

export default useEditableTitle
