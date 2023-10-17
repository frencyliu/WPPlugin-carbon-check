import { useContext, useState, useRef, useEffect } from 'react'
import { Row, Col, Button, Modal, Input, Empty, notification } from 'antd'
import CheckChartColumn from '@/components/CheckChartColumn'
import CheckChartPie from '@/components/CheckChartPie'
import CheckScopeITable from '@/pages/Check/ScopeI/CheckScopeITable'
import CheckScopeIITable from '@/pages/Check/ScopeII/CheckScopeIITable'
import CheckScopeIIITable from '@/pages/Check/ScopeIII/CheckScopeIIITable'

import { ProjectContext } from '@/pages/Check'
import { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { TGroupData } from '@/types'
import ClipboardJS from 'clipboard'
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons'
import { flatten } from 'lodash-es'
import { useReactToPrint } from 'react-to-print'
import { getCopyableJson, gwpMapping, removeKey } from '@/utils'
import { convertLanguage } from '@/utils/i18n'

new ClipboardJS('.button')

const Export = () => {
  const [
    api,
    contextHolder,
  ] = notification.useNotification()
  const { projectData, scopes } = useContext(ProjectContext)
  const postId = projectData?.id
  const scopeIGroups: TGroupData[] = scopes?.scopeI || []
  const scopeIIGroups: TGroupData[] = scopes?.scopeII || []
  const scopeIIIGroups: TGroupData[] = scopes?.scopeIII || []
  const scopeIVGroups: TGroupData[] = scopes?.scopeIV || []
  const scopeVGroups: TGroupData[] = scopes?.scopeV || []
  const scopeVIGroups: TGroupData[] = scopes?.scopeVI || []

  const coefficient = (tYearlyDataType: TYearlyDataType) => {
    return (
      scopes.coefficientDiff
        .find((item) => item.nameZh === tYearlyDataType?.km)
        ?.data.find(
          (i) =>
            i.unit1 ===
            gwpMapping
              .find((item) => item.value === tYearlyDataType.gwp)
              ?.value.toLocaleUpperCase(),
        )?.data || 0
    )
  }

  const calculateCarbonTons = (group: TGroupData, name: string) =>
    group?.dataSource.map((record: TYearlyDataType) => ({
      ...record,
      scopeName: name,
    })) || []

  const calculateCarbonTons34 = (group: TGroupData, name: string) =>
    group?.dataSource.map((record: TYearlyDataType) => ({
      ...record,
      carbonTonsPerYear: (record.kmAmount || 0) * coefficient(record),
      scopeName: name,
    })) || []

  const mergedDataSource: TYearlyDataType[] = flatten([
    ...(scopeIGroups.map((group) => calculateCarbonTons(group, 'SCOPE I')) ||
      []),
    ...(scopeIIGroups.map((group) => calculateCarbonTons(group, 'SCOPE II')) ||
      []),
    ...(scopeIIIGroups.map((group) =>
      calculateCarbonTons34(group, 'SCOPE III'),
    ) || []),
    ...(scopeIVGroups.map((group) =>
      calculateCarbonTons34(group, 'SCOPE IV'),
    ) || []),
    ...(scopeVGroups.map((group) => calculateCarbonTons(group, 'SCOPE V')) ||
      []),
    ...(scopeVIGroups.map((group) => calculateCarbonTons(group, 'SCOPE VI')) ||
      []),
  ])

  const [
    isPrinting,
    setIsPrinting,
  ] = useState(false)
  const printRef = useRef(null)
  const promiseResolveRef = useRef<null | any>(null)

  useEffect(() => {
    if (isPrinting) {
      api.info({
        key: 'pleaseWaitForPrint',
        placement: 'bottomRight',
        message: convertLanguage('調整格式中...'),
        description: convertLanguage('請稍候...'),
        duration: 2,
      })
    }
    const timer = setTimeout(() => {
      if (isPrinting && promiseResolveRef.current) {
        promiseResolveRef.current()
        // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      }
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [isPrinting])

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve
        setIsPrinting(true)
      })
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null
      setIsPrinting(false)
    },
  })

  const [
    isExportModalOpen,
    setIsExportModalOpen,
  ] = useState(false)

  const showExportModal = () => {
    setIsExportModalOpen(true)
  }

  //TODO scopeII remove key
  //remove key
  const scopesForDownload = removeKey(scopes)

  const jsonString = getCopyableJson(scopesForDownload || '{}')

  const download = (text: string) => () => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `${convertLanguage('碳盤查 JSON 數據')} - ${
      projectData?.title?.rendered || ''
    }.json`
    link.href = url
    link.click()
  }

  return (
    <>
      {contextHolder}
      <div ref={printRef} className={isPrinting ? 'w-[277mm]' : 'w-full'}>
        <Row gutter={24}>
          {mergedDataSource.length > 0 ? (
            <>
              <Col
                span={24}
                lg={{ span: 18 }}
                className="mb-12 mx-auto text-center lg:text-left"
              >
                <CheckChartColumn mergedDataSource={mergedDataSource} />
              </Col>
              <Col
                span={24}
                lg={{ span: 12 }}
                className="mb-12 mx-auto text-center lg:text-left"
              >
                <CheckChartPie
                  mergedDataSource={mergedDataSource}
                  pieType="group"
                />
              </Col>
              <Col
                span={24}
                lg={{ span: 12 }}
                className="mb-12 mx-auto text-center lg:text-left"
              >
                <CheckChartPie
                  mergedDataSource={mergedDataSource}
                  pieType="scope"
                />
              </Col>
            </>
          ) : (
            <div className="w-full px-2">
              <div className="flex justify-center items-center w-full aspect-video bg-slate-100 rounded-xl">
                <Empty description={convertLanguage('沒有資料')} />
              </div>
            </div>
          )}
        </Row>
        <div>
          <div>SCOPE I</div>
          {scopeIGroups.map((theGroup, index) => {
            return (
              <CheckScopeITable
                key={theGroup?.groupKey}
                groupKey={theGroup?.groupKey}
                groupIndex={index}
                groupData={theGroup}
                postId={postId}
                scopesNumberForPrint="scopeI"
              />
            )
          })}
        </div>
        <div>
          <div>SCOPE II</div>
          {scopeIIGroups.map((theGroup, index) => {
            return (
              <CheckScopeIITable
                key={theGroup?.groupKey}
                groupKey={theGroup?.groupKey}
                groupIndex={index}
                groupData={theGroup}
                postId={postId}
              />
            )
          })}
        </div>
        <div>
          <div>SCOPE III</div>
          {scopeIIIGroups.map((theGroup, index) => {
            return (
              <CheckScopeIIITable
                key={theGroup?.groupKey}
                groupKey={theGroup?.groupKey}
                groupIndex={index}
                groupData={theGroup}
                postId={postId}
                scopesNumberForPrint="scopeIII"
              />
            )
          })}
        </div>
        <div>
          <div>SCOPE IV</div>
          {scopeIVGroups.map((theGroup, index) => {
            return (
              <CheckScopeIIITable
                key={theGroup?.groupKey}
                groupKey={theGroup?.groupKey}
                groupIndex={index}
                groupData={theGroup}
                postId={postId}
                scopesNumberForPrint="scopeIV"
              />
            )
          })}
        </div>
        <div>
          <div>SCOPE V</div>
          {scopeVGroups.map((theGroup, index) => {
            return (
              <CheckScopeITable
                key={theGroup?.groupKey}
                groupKey={theGroup?.groupKey}
                groupIndex={index}
                groupData={theGroup}
                postId={postId}
                scopesNumberForPrint="scopeV"
              />
            )
          })}
        </div>
        <div>
          <div>SCOPE VI</div>
          {scopeVIGroups.map((theGroup, index) => {
            return (
              <CheckScopeITable
                key={theGroup?.groupKey}
                groupKey={theGroup?.groupKey}
                groupIndex={index}
                groupData={theGroup}
                postId={postId}
                scopesNumberForPrint="scopeVI"
              />
            )
          })}
        </div>
      </div>
      <Row className="my-8" gutter={24}>
        <Col className="my-2" span={24} lg={{ span: 12 }}>
          <Button
            type="primary"
            size="large"
            className="w-full"
            onClick={handlePrint}
          >
            {convertLanguage('匯出為 PDF')}
          </Button>
        </Col>
        <Col className="my-2" span={24} lg={{ span: 12 }}>
          <Button
            type="default"
            size="large"
            className="w-full"
            onClick={showExportModal}
          >
            {convertLanguage('匯出為 JSON 數據')}
          </Button>
          <Modal
            title={convertLanguage('匯出為 JSON 數據')}
            centered
            open={isExportModalOpen}
            footer={null}
            onCancel={() => setIsExportModalOpen(false)}
          >
            <Input.TextArea value={jsonString} rows={6} />
            <div className="flex justify-end mt-4">
              <Button
                type="default"
                onClick={download(jsonString)}
                className="mr-2"
              >
                <DownloadOutlined className="mr-2" />
                {convertLanguage('下載')}
              </Button>
              <Button
                type="primary"
                className="button"
                data-clipboard-text={jsonString}
              >
                <CopyOutlined className="mr-2" />
                {convertLanguage('複製')}
              </Button>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  )
}

export default Export
