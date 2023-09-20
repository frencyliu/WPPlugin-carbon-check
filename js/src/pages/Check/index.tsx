/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect } from 'react'
import { Row, Col, Tabs, Form, TabsProps } from 'antd'
import ScopeI from './ScopeI'
import ScopeII from './ScopeII'
import Chart from './Chart'
import Export from './Export'
import { useColor, useOne } from '@/hooks'
import { useLocation } from 'react-router-dom'
import { updateResource } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { TGroupData, TScopes } from '@/types'
import { isEqual } from 'lodash-es'
import { defaultScopes } from '@/utils'
import EditProjectModal from './components/EditProjectModal'
import EditProjectButtons from './components/EditProjectButtons'
import { Scrollbars } from 'react-custom-scrollbars-2'
import ScopeV from './ScopeV'
import { set } from 'zod'
import ScopeVI from './ScopeVI'

export const ProjectContext = createContext<{
  projectData: any
  scopes: TScopes
  setScopes: React.Dispatch<TScopes>
  printMode: boolean
  setIsDiff: React.Dispatch<boolean>
  scopesNumber: string
}>({
  projectData: null,
  scopes: defaultScopes,
  setScopes: () => {},
  printMode: false,
  setIsDiff: () => {},
  scopesNumber: 'scopeI',
})

const App: React.FC = () => {
  const [
    scopes,
    setScopes,
  ] = useState<TScopes>(defaultScopes)
  const [
    isDiff,
    setIsDiff,
  ] = useState(false)
  console.log('scopes', scopes)
  const [
    printMode,
    setPrintMode,
  ] = useState(false)

  const [
    scopesNumber,
    setScopesNumber,
  ] = useState('scopeI')

  const handlePrintMode = (enablePrintMode: boolean, number: string) => () => {
    setPrintMode(enablePrintMode)
    if (number) {
      setScopesNumber(number)
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span onClick={handlePrintMode(false, 'scopeI')}>SCOPE I</span>,
      children: <ScopeI />,
    },
    {
      key: '2',
      label: <span onClick={handlePrintMode(false, 'scopeII')}>SCOPE II</span>,
      children: <ScopeII />,
    },
    {
      key: '3',
      label: (
        <span onClick={handlePrintMode(false, 'scopeIII')}>SCOPE III</span>
      ),
      children: <ScopeI />,
    },
    {
      key: '4',
      label: <span onClick={handlePrintMode(false, 'scopeIV')}>SCOPE IV</span>,
      children: <ScopeI />,
    },
    {
      key: '5',
      label: <span onClick={handlePrintMode(false, 'scopeV')}>SCOPE V</span>,
      children: <ScopeV />,
    },
    {
      key: '6',
      label: <span onClick={handlePrintMode(false, 'scopeVI')}>SCOPE VI</span>,
      children: <ScopeVI />,
    },
    {
      key: '7',
      label: <span onClick={handlePrintMode(true, '')}>報表</span>,
      children: <Chart />,
    },
    {
      key: '8',
      label: <span onClick={handlePrintMode(true, '')}>匯出</span>,
      children: <Export />,
    },
  ]

  const { state } = useLocation()
  const [form] = Form.useForm()
  const id = state?.id
  const { colorPrimary } = useColor()
  const projectData = useOne({
    resource: 'carbon-project',
    id,
  })

  const queryClient = useQueryClient()

  const handleUpdate = async () => {
    const title = form.getFieldValue(['title'])
    const content = form.getFieldValue(['content'])
    const companyCategory = form.getFieldValue(['companyCategory'])
    const copyScopes = JSON.parse(JSON.stringify(scopes || defaultScopes))
    console.log('copyScopes', form.getFieldsValue() || {})
    const updateScope = (scopeString: string) => {
      return copyScopes[scopeString]?.map(
        (theGroup: TGroupData, groupIndex: number) => ({
          ...theGroup,
          groupName:
            form.getFieldValue([
              scopeString,
              groupIndex,
              'groupName',
            ]) || scopes[scopeString][0].groupName,
        }),
      )
    }

    const updateScopes = {
      ...copyScopes,
      scopeI: updateScope('scopeI'),
      scopeII: updateScope('scopeII'),
      scopeIII: updateScope('scopeIII'),
      scopeIV: updateScope('scopeIV'),
      scopeV: updateScope('scopeV'),
      scopeVI: updateScope('scopeVI'),
      info: {
        ...copyScopes.info,
        title,
        content,
        companyCategory,
      },
    }

    try {
      await updateResource({
        resource: 'carbon-project',
        id,
        args: {
          content,
          title,
          featured_media: updateScopes?.info?.imgData?.attachmentId || 0,
          meta: {
            project_data: JSON.stringify(updateScopes),
          },
        },
      })
      queryClient.invalidateQueries([
        'get_carbon-project',
        id,
      ])
      setIsDiff(false)
    } catch (error) {}
  }

  useEffect(() => {
    if (!!projectData) {
      const fectchScopes = JSON.parse(projectData.meta.project_data)
      console.log('fectchScopes', fectchScopes)
      setScopes(fectchScopes)
      form.setFieldValue(['title'], fectchScopes?.info?.title)
      form.setFieldValue(
        ['content'],
        (fectchScopes?.info?.content || '').replace(/<[^>]+>/g, ''),
      )
      form.setFieldValue(
        ['companyCategory'],
        (fectchScopes?.info?.companyCategory || '').replace(/<[^>]+>/g, ''),
      )
    }
  }, [projectData])

  useEffect(() => {
    if (!!projectData) {
      const fectchScopes = JSON.parse(projectData.meta.project_data)
      const isSame = isEqual(scopes, fectchScopes)
      setIsDiff(!isSame)
    }
  }, [scopes])

  useEffect(() => {
    const navigateInfo = {
      path: 'check',
      state: {
        id,
      },
    }
    sessionStorage.setItem('navigateInfo', JSON.stringify(navigateInfo))
  }, [])

  return (
    <>
      <Scrollbars
        style={{ width: '100%', height: '36rem', paddingBottom: '2rem' }}
      >
        <div className="min-w-[990px]">
          <ProjectContext.Provider
            value={{
              projectData,
              scopes,
              setScopes,
              printMode,
              setIsDiff,
              scopesNumber,
            }}
          >
            <Form form={form}>
              <hr style={{ borderColor: colorPrimary }} />

              <Row align="middle" className="my-8">
                <Col flex="auto">
                  <EditProjectModal />
                </Col>
                <Col flex="none">
                  <EditProjectButtons
                    isDiff={isDiff}
                    handleUpdate={handleUpdate}
                  />
                </Col>
              </Row>

              <div className="w-full border-2 border-gray-500">
                <Tabs tabPosition="left" items={items} />
              </div>
            </Form>
          </ProjectContext.Provider>
        </div>
      </Scrollbars>
    </>
  )
}

export default App
