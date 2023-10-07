import { useContext } from 'react'
import CheckScopeIIITable from '@/pages/Check/ScopeIII/CheckScopeIIITable'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { ProjectContext } from '@/pages/Check'
import { TGroupData } from '@/types'
import { nanoid } from 'nanoid'
import { companyCategories } from '@/utils'
import { convertLanguage } from '@/utils/i18n'

const ScopeIVPage = () => {
  const { projectData, scopes, setScopes } = useContext(ProjectContext)
  const postId = projectData?.id

  const scopeIVGroups: TGroupData[] = scopes?.scopeIV || []

  const groupNames =
    companyCategories.find(
      (companyCategory) =>
        companyCategory.name === scopes?.info?.companyCategory,
    )?.scopeIDefaultValue || []

  const handleAddGroup = () => {
    setScopes({
      ...scopes,
      scopeIV: [
        ...scopeIVGroups,
        {
          groupKey: nanoid(),
          groupName: groupNames[0] || convertLanguage('辦公室'),
          dataSource: [],
        },
      ],
    })
  }

  const handleDeleteGroup = (theGroupKey: string) => {
    const newScopeVGroups = scopeIVGroups.filter(
      (theGroup) => theGroup?.groupKey !== theGroupKey,
    )
    setScopes({
      ...scopes,
      scopeIV: [
        ...newScopeVGroups,
      ],
    })
  }

  return (
    <>
      {scopeIVGroups.map((theGroup, index) => {
        const key = theGroup?.groupKey || nanoid()
        return (
          <CheckScopeIIITable
            key={key}
            groupKey={key}
            groupIndex={index}
            groupData={theGroup}
            postId={postId}
            onDelete={handleDeleteGroup}
          />
        )
      })}
      <Button
        className="w-full mt-8"
        type="primary"
        size="large"
        onClick={handleAddGroup}
      >
        <AppstoreAddOutlined className="mr-2" />
        {convertLanguage('新增群組')}
      </Button>
    </>
  )
}

export default ScopeIVPage
