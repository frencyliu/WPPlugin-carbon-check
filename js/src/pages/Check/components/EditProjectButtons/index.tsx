import React, { useState, useContext, ChangeEvent, useEffect } from 'react'
import { Button, Modal, Popover, Input, notification, FormInstance } from 'antd'
import { InfoCircleOutlined, WarningFilled } from '@ant-design/icons'
import { useColor } from '@/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import { deleteResource } from '@/api'
import { ProjectContext } from '@/pages/Check'
import LineComponent from './Line'
import { convertLanguage } from '@/utils/i18n'

const EditProjectButtons: React.FC<{
  isDiff: boolean
  handleUpdate: () => void
}> = ({ isDiff, handleUpdate }) => {
  const { colorInfo, colorError, colorErrorBg } = useColor()
  const {
    projectData,
    scopes,
    setScopes,
    printMode = false,
    scopesNumber,
  } = useContext(ProjectContext)
  const { state } = useLocation()
  const id = state?.id

  const [
    api,
    contextHolder,
  ] = notification.useNotification()

  const [
    deleteInputValue,
    setDeleteInputValue,
  ] = useState('')
  const [
    deleteInputValidateMsg,
    setDeleteInputValidateMsg,
  ] = useState('')
  const navigate = useNavigate()

  const [
    isDeleteProjectModalOpen,
    setIsDeleteProjectModalOpen,
  ] = useState(false)

  const showDeleteProjectModal = () => {
    setIsDeleteProjectModalOpen(true)
  }

  const handleDeleteProjectOk = async () => {
    if (deleteInputValue === projectData?.title?.rendered) {
      const deleteResult = await deleteResource({
        resource: 'carbon-project',
        id,
      })
      if (deleteResult?.status === 200) {
        setIsDeleteProjectModalOpen(false)
        navigate('/')
      } else {
        console.log('deleteResult', deleteResult)
      }
    } else {
      setDeleteInputValidateMsg(convertLanguage('輸入的專案名稱不正確'))
    }
  }

  const handleDeleteProjectCancel = () => {
    setIsDeleteProjectModalOpen(false)
  }

  const handleDeleteInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeleteInputValue(e?.target?.value || '')
  }

  useEffect(() => {
    if (isDiff) {
      api.warning({
        key: 'saveReminder',
        placement: 'bottomRight',
        message: convertLanguage('您有未儲存的變更'),
        description: convertLanguage('請記得到頁面上方更新專案資料'),
        duration: 4.5,
      })
    }
  }, [isDiff])

  const [
    isUpdateEmissionCoefficientOpen,
    setIsUpdateEmissionCoefficientOpen,
  ] = useState(false)

  const showUpdateEmissionCoefficientOpen = () => {
    setIsUpdateEmissionCoefficientOpen(true)
  }

  const handleUpdateEmissionCoefficientOk = () => {
    handleUpdate()
    setIsUpdateEmissionCoefficientOpen(false)
    setIsCoefficientDiff(false)
  }
  const handleUpdateEmissionCoefficientCancel = () => {
    const fectchScopes = JSON.parse(projectData.meta.project_data)
    setScopes(fectchScopes)
    setIsUpdateEmissionCoefficientOpen(false)
    setIsCoefficientDiff(false)
  }

  const [
    isCoefficientDiff,
    setIsCoefficientDiff,
  ] = useState(false)

  return (
    <>
      {!printMode ? (
        <>
          {contextHolder}
          <div className="flex justify-end align-middle">
            <Popover
              title={
                <>
                  <InfoCircleOutlined
                    style={{ color: colorInfo }}
                    className="mr-2"
                  />
                  {convertLanguage('記得儲存資料')}
                </>
              }
              open={isDiff}
            >
              <Button
                type="primary"
                className={`${isDiff ? 'animate-pulse' : ''} mr-2`}
                size="large"
                onClick={handleUpdate}
              >
                {convertLanguage('更新專案資料')}
              </Button>
            </Popover>

            <Button
              type="dashed"
              size="large"
              danger
              onClick={showDeleteProjectModal}
            >
              {convertLanguage('刪除專案')}
            </Button>
            <Modal
              title={
                <p
                  className="text-xl rounded-xl py-3 px-4"
                  style={{ color: colorError, backgroundColor: colorErrorBg }}
                >
                  <WarningFilled className="mr-2" />
                  {convertLanguage('確認刪除整個專案嗎？')}
                </p>
              }
              open={isDeleteProjectModalOpen}
              onOk={handleDeleteProjectOk}
              onCancel={handleDeleteProjectCancel}
              okButtonProps={{ danger: true }}
              centered
              okText={convertLanguage('確認刪除')}
              cancelText="取消"
            >
              <p>{convertLanguage('刪除專案後，所有資料將不可復原')}</p>
              <p>
                {convertLanguage('如果您確認刪除此專案，請在下方輸入')}「
                {projectData?.title?.rendered}」
              </p>
              <Input
                value={deleteInputValue}
                onChange={handleDeleteInputChange}
                size="large"
                placeholder={`${convertLanguage('請輸入')}「${
                  projectData?.title?.rendered
                }」`}
              />
              {deleteInputValidateMsg && (
                <p style={{ color: colorError }}>{deleteInputValidateMsg}</p>
              )}
            </Modal>
          </div>
          {scopesNumber === 'scopeI' ||
          scopesNumber === 'scopeIII' ||
          scopesNumber === 'scopeIV' ? (
            <Button
              className="mt-2"
              type="primary"
              size="large"
              onClick={showUpdateEmissionCoefficientOpen}
            >
              {convertLanguage('修改排放係數')}
            </Button>
          ) : null}
          <Modal
            title={convertLanguage('排放來源')}
            open={isUpdateEmissionCoefficientOpen}
            onOk={handleUpdateEmissionCoefficientOk}
            onCancel={handleUpdateEmissionCoefficientCancel}
            centered
            footer={
              <>
                <Button
                  className={`${isCoefficientDiff ? 'animate-pulse' : ''}`}
                  type="primary"
                  onClick={handleUpdateEmissionCoefficientOk}
                >
                  {convertLanguage('確認修改來源')}
                </Button>
                <Button onClick={handleUpdateEmissionCoefficientCancel}>
                  {convertLanguage('取消')}
                </Button>
              </>
            }
            width={650}
          >
            <div style={{ height: '500px', overflow: 'auto' }}>
              <LineComponent
                setIsCoefficientDiff={setIsCoefficientDiff}
                scopes={scopes}
                setScopes={setScopes}
              />
            </div>
          </Modal>
        </>
      ) : null}
    </>
  )
}

export default EditProjectButtons
