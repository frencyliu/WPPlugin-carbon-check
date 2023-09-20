import { Input, InputNumber, Form, Row, Col } from 'antd'
import { months, handleClearZero } from '@/utils'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'

const GWPMonthlyFormItem: React.FC<{
  groupIndex: number
  validating: boolean
  scopesNumber: string
}> = ({ groupIndex, validating, scopesNumber }) => {
  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={[
              scopesNumber,
              groupIndex,
              'gwp',
            ]}
            className="w-full"
            rules={[
              {
                required: validating,
                message: '請選擇溫室氣體',
              },
            ]}
          >
            <FormGWPSelect
              className="rounded-[6px]"
              name={[
                scopesNumber,
                groupIndex,
                'gwp',
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={[
              scopesNumber,
              groupIndex,
              'unit',
            ]}
            className="w-full"
            initialValue="kg"
            rules={[
              {
                required: validating,
                message: '請選擇單位',
              },
            ]}
          >
            <FormUnitSelect
              className="rounded-l-[6px]"
              name={[
                scopesNumber,
                groupIndex,
                'unit',
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          {months.map((month, index: number) =>
            index < 6 ? (
              <Input.Group
                compact
                className="mb-4"
                key={`month-${month.value}`}
              >
                <Form.Item
                  name={[
                    scopesNumber,
                    groupIndex,
                    'monthlyAmount',
                    month.value,
                  ]}
                  className="w-full mb-0"
                  initialValue={0}
                  rules={[
                    {
                      required: validating,
                      message: '請輸入月排放量',
                    },
                  ]}
                >
                  <InputNumber
                    addonBefore={<p className="m-0 w-16">{month.label}</p>}
                    className="w-full"
                    min={0}
                    onClick={handleClearZero}
                  />
                </Form.Item>
              </Input.Group>
            ) : null,
          )}
        </Col>
        <Col span={12}>
          {months.map((month, index: number) =>
            index > 5 ? (
              <Input.Group
                compact
                className="mb-4"
                key={`month-${month.value}`}
              >
                <Form.Item
                  name={[
                    scopesNumber,
                    groupIndex,
                    'monthlyAmount',
                    month.value,
                  ]}
                  className="w-full mb-0"
                  initialValue={0}
                  rules={[
                    {
                      required: validating,
                      message: '請輸入月排放量',
                    },
                  ]}
                >
                  <InputNumber
                    addonBefore={<p className="m-0 w-16">{month.label}</p>}
                    className="w-full"
                    min={0}
                    onClick={handleClearZero}
                  />
                </Form.Item>
              </Input.Group>
            ) : null,
          )}
        </Col>
      </Row>
    </>
  )
}

export default GWPMonthlyFormItem
