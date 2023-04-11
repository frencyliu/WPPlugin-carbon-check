import { useContext } from 'react'
import CheckScopeITable from '@/pages/Check/ScopeI/CheckScopeITable'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { ProjectContext } from '@/pages/Check'
import { TGroupData } from '@/types'
import { nanoid } from 'nanoid'
import { companyCategories } from '@/utils'

const ScopeIPage = () => {
  const { projectData, scopes, setScopes } = useContext(ProjectContext)
  const postId = projectData?.id

  const scopeIGroups: TGroupData[] = scopes?.scopeI || []

  const groupNames =
    companyCategories.find(
      (companyCategory) =>
        companyCategory.name === scopes?.info?.companyCategory,
    )?.scopeIDefaultValue || []

  const handleAddGroup = () => {
    setScopes({
      ...scopes,
      scopeI: [
        ...scopeIGroups,
        {
          groupKey: nanoid(),
          groupName: groupNames[0] || '辦公室',
          dataSource: [],
        },
      ],
    })
  }

  const handleDeleteGroup = (theGroupKey: string) => {
    const newScopeIGroups = scopeIGroups.filter(
      (theGroup) => theGroup?.groupKey !== theGroupKey,
    )
    setScopes({
      ...scopes,
      scopeI: [
        ...newScopeIGroups,
      ],
    })
  }

  return (
    <>
      {scopeIGroups.map((theGroup, index) => {
        const key = theGroup?.groupKey || nanoid()
        return (
          <CheckScopeITable
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
        新增群組
      </Button>
    </>
  )
}

export default ScopeIPage
