import { useState, useEffect } from 'react'
import { Row, Col, Modal, Alert } from 'antd'
import CreatCompanyCategoryCard from '@/pages/Create/CreatCompanyCategoryCard'
import CreatCompanyCategoryInput from '@/pages/Create/CreatCompanyCategoryInput'
import { companyCategories, defaultScopes } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { createResource } from '@/api'
import { convertLanguage } from '@/utils/i18n'

const Create = () => {
  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false)
  const [
    confirmLoading,
    setConfirmLoading,
  ] = useState(false)

  const [
    companyCategoryName,
    setCompanyCategoryName,
  ] = useState('')
  const navigate = useNavigate()

  const showModal = (theCompanyCategoryName: string) => () => {
    setIsModalOpen(true)
    setCompanyCategoryName(theCompanyCategoryName)
  }

  const handleOk = async () => {
    setConfirmLoading(true)
    // const scopeIGroupNames =
    //   companyCategories.find(
    //     (companyCategory) => companyCategory.name === companyCategoryName,
    //   )?.scopeIDefaultValue || []

    // const scopeIIGroupNames =
    //   companyCategories.find(
    //     (companyCategory) => companyCategory.name === companyCategoryName,
    //   )?.scopeIIDefaultValue || []

    // defaultScopes.scopeI = scopeIGroupNames.map((group) => ({
    //   groupKey: `${group}#1`,
    //   groupName: group,
    //   dataSource: [],
    // }))
    // defaultScopes.scopeII = scopeIIGroupNames.map((group) => ({
    //   groupKey: `${group}#1`,
    //   groupName: group,
    //   dataSource: [],
    // }))

    const theScopes = {
      ...defaultScopes,
      info: {
        ...defaultScopes.info,
        companyCategory: companyCategoryName,
      },
    }

    try {
      const createResult = await createResource({
        resource: 'carbon-project',
        args: {
          title: convertLanguage('○○○○股份有限公司'),
          status: 'publish',
          meta: {
            project_data: JSON.stringify(theScopes),
          },
        },
      })

      setIsModalOpen(false)
      setConfirmLoading(false)
      navigate('/check', {
        state: {
          id: createResult.data?.id || 0,
          defaultScopes,
        },
      })
    } catch (error) {
      setIsModalOpen(false)
      setConfirmLoading(false)
      console.log('catch error', error)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Row
      gutter={[
        24,
        24,
      ]}
    >
      {companyCategories.map((companyCategory) => (
        <Col
          key={companyCategory.key}
          xl={{ span: 6 }}
          lg={{ span: 8 }}
          sm={{ span: 12 }}
          xs={{ span: 24 }}
        >
          <CreatCompanyCategoryCard
            option={{
              name: companyCategory.name,
              key: companyCategory.key,
              image: companyCategory.image,
            }}
            showModal={showModal}
          />
        </Col>
      ))}

      <Col
        xl={{ span: 6 }}
        lg={{ span: 8 }}
        sm={{ span: 12 }}
        xs={{ span: 24 }}
      >
        <CreatCompanyCategoryInput
          showModal={showModal}
          setCompanyCategoryName={setCompanyCategoryName}
        />
      </Col>
      <Modal
        title={
          <>
            {convertLanguage('創建專案 - 分類:')} {companyCategoryName}
          </>
        }
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={convertLanguage('確認創建專案')}
        cancelText={convertLanguage('再想想')}
        confirmLoading={confirmLoading}
      >
        <Alert
          className="my-8"
          message={convertLanguage(
            '按下確認後會創建專案，下一頁可以填寫更多資訊',
          )}
          type="info"
          showIcon
        />
      </Modal>
    </Row>
  )
}

export default Create
