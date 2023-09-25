import { useContext } from 'react'
import CheckScopeVITable from '@/pages/Check/ScopeI/CheckScopeITable'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { ProjectContext } from '@/pages/Check'
import { TGroupData } from '@/types'
import { nanoid } from 'nanoid'
import { companyCategories } from '@/utils'
import { convertLanguage } from '@/utils/i18n'

const ScopeVIPage = () => {
  const { projectData, scopes, setScopes } = useContext(ProjectContext)
  const postId = projectData?.id

  const scopeVIGroups: TGroupData[] = scopes?.scopeVI || []

  const groupNames =
    companyCategories.find(
      (companyCategory) =>
        companyCategory.name === scopes?.info?.companyCategory,
    )?.scopeIDefaultValue || []

  const handleAddGroup = () => {
    setScopes({
      ...scopes,
      scopeVI: [
        ...scopeVIGroups,
        {
          groupKey: nanoid(),
          groupName: groupNames[0] || '辦公室',
          dataSource: [],
        },
      ],
    })
  }

  const handleDeleteGroup = (theGroupKey: string) => {
    const newScopeVIGroups = scopeVIGroups.filter(
      (theGroup) => theGroup?.groupKey !== theGroupKey,
    )
    setScopes({
      ...scopes,
      scopeVI: [
        ...newScopeVIGroups,
      ],
    })
  }

  return (
    <>
      {scopeVIGroups.map((theGroup, index) => {
        const key = theGroup?.groupKey || nanoid()
        return (
          <CheckScopeVITable
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

export default ScopeVIPage
