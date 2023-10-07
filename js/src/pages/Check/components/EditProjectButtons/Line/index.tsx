import React, {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from 'react'
import { Col, Input, Row } from 'antd'
import { IDefaultData, IDefaultDataData, jsxData } from './defaultData'
import './index.css'
import { nanoid } from 'nanoid'
import { TScopes } from '@/types'
import { getLanguage } from '@/utils/i18n'

const showData = (d: IDefaultDataData) => {
  return (
    <>
      {d.unit1
        .split('')
        .map(
          (
            char:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined,
            index: Key | null | undefined,
          ) => {
            // char type is number
            return !isNaN(Number(char)) ? <sub key={index}>{char}</sub> : char
          },
        )}
    </>
  )
}

const LineComponents: React.FC<{
  setIsCoefficientDiff: React.Dispatch<React.SetStateAction<boolean>>
  scopes: TScopes
  setScopes: React.Dispatch<TScopes>
}> = ({ setIsCoefficientDiff, scopes, setScopes }) => {
  scopes.coefficientDiff = scopes.coefficientDiff
    ? scopes.coefficientDiff
    : jsxData

  return scopes.coefficientDiff.map((item) => (
    <Row key={nanoid()}>
      <h2 className="nameZh">
        {getLanguage() === 'zh' ? item.nameZh : item.nameEn}
      </h2>
      {item.data.map((ii, index) => (
        <Col key={index}>
          <div>
            <Row>
              <div className="ml-4">
                {showData(ii)}
                {`/${ii.unit2}`}
                {/* TODO */}
              </div>
            </Row>
            <Input
              className="w-[120px] inline-block ml-3"
              size="small"
              defaultValue={ii.data}
              onChange={(e) => {
                scopes.coefficientDiff.map(
                  // eslint-disable-next-line array-callback-return
                  (itm: IDefaultData) => {
                    if (itm.nameZh === item.nameZh) {
                      // eslint-disable-next-line array-callback-return
                      itm.data.map((d) => {
                        if (d.unit1 === ii.unit1) {
                          // TODO: set isCoefficientDiff
                          // setIsCoefficientDiff(true)
                          d.data = Number(e.target.value)
                        }
                      })
                    }
                  },
                )
                setScopes(scopes)
              }}
            />
          </div>
        </Col>
      ))}
    </Row>
  ))
}

export default LineComponents
