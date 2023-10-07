import office from '@/static/office.jpg'
import petroleum from '@/static/petroleum.jpg'
import construction from '@/static/construction.jpg'
import entertainment from '@/static/entertainment.jpg'
import energy_sector from '@/static/energy_sector.jpg'
import education from '@/static/education.jpg'
import infotech from '@/static/infotech.jpg'
import transportation from '@/static/transportation.jpg'
import retail from '@/static/retail.jpg'
import manufacturing from '@/static/manufacturing.jpg'
import restaraunts from '@/static/restaraunts.jpg'
import medical_service from '@/static/medical_service.jpg'
import tourism from '@/static/tourism.jpg'
import agriculture from '@/static/agriculture.jpg'
import logistics from '@/static/logistics.jpg'
import { convertLanguage } from './i18n'

export const companyCategories = [
  {
    key: '1',
    name: convertLanguage('一般辦公室'),
    image: office,
    scopeIDefaultValue: [],
    scopeIIDefaultValue: [convertLanguage('辦公室')],
  },
  {
    key: '2',
    name: convertLanguage('石化業'),
    image: petroleum,
    scopeIDefaultValue: [convertLanguage('工廠')],
    scopeIIDefaultValue: [
      convertLanguage('辦公室'),
      convertLanguage('工廠'),
    ],
  },
  {
    key: '3',
    name: convertLanguage('建築'),
    image: construction,
    scopeIDefaultValue: [],
    scopeIIDefaultValue: [convertLanguage('辦公室')],
  },
  {
    key: '4',
    name: convertLanguage('娛樂界'),
    image: entertainment,
    scopeIDefaultValue: [],
    scopeIIDefaultValue: [convertLanguage('辦公室')],
  },
  {
    key: '5',
    name: convertLanguage('能源業'),
    image: energy_sector,
    scopeIDefaultValue: [convertLanguage('辦公室')],
    scopeIIDefaultValue: [convertLanguage('辦公室')],
  },
  {
    key: '6',
    name: convertLanguage('教育產業'),
    image: education,
    scopeIDefaultValue: [convertLanguage('辦公室')],
    scopeIIDefaultValue: [convertLanguage('辦公室')],
  },
  {
    key: '7',
    name: convertLanguage('軟體資通'),
    image: infotech,
    scopeIDefaultValue: [convertLanguage('辦公室')],
    scopeIIDefaultValue: [convertLanguage('辦公室')],
  },
  {
    key: '8',
    name: convertLanguage('運輸'),
    image: transportation,
    scopeIDefaultValue: [convertLanguage('辦公室')],
    scopeIIDefaultValue: [convertLanguage('辦公室')],
  },
  {
    key: '9',
    name: convertLanguage('零售業'),
    image: retail,
    scopeIDefaultValue: [],
    scopeIIDefaultValue: ['店面'],
  },
  {
    key: '10',
    name: convertLanguage('製造業'),
    image: manufacturing,
    scopeIDefaultValue: [convertLanguage('工廠')],
    scopeIIDefaultValue: [convertLanguage('工廠')],
  },
  {
    key: '11',
    name: convertLanguage(convertLanguage('餐廳')),
    image: restaraunts,
    scopeIDefaultValue: [convertLanguage('餐廳')],
    scopeIIDefaultValue: [convertLanguage('餐廳')],
  },
  {
    key: '12',
    name: convertLanguage('醫療系統'),
    image: medical_service,
    scopeIDefaultValue: [convertLanguage('醫院')],
    scopeIIDefaultValue: [convertLanguage('醫院')],
  },
  {
    key: '13',
    name: convertLanguage('觀光旅遊'),
    image: tourism,
    scopeIDefaultValue: [convertLanguage('旅館')],
    scopeIIDefaultValue: [convertLanguage('旅館')],
  },
  {
    key: '14',
    name: convertLanguage('農牧業'),
    image: agriculture,
    scopeIDefaultValue: [convertLanguage('農場')],
    scopeIIDefaultValue: [convertLanguage('農場')],
  },
  {
    key: '15',
    name: convertLanguage('物流'),
    image: logistics,
    scopeIDefaultValue: [convertLanguage('車隊')],
    scopeIIDefaultValue: [convertLanguage('辦公室')],
  },
]
