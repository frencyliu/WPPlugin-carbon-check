import { ITKData } from './defaultData'

const data = [
  {
    nameZh: '自用小貨車(汽油)',
    nameEn: 'Private Light Goods Vehicle (Petrol)',
    coe: 0.739,
    unit: '延頓公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2014,
  },
  {
    nameZh: '自用小貨車(柴油)',
    nameEn: 'Private Light Goods Vehicle (Diesel)',
    coe: 0.693,
    unit: '延頓公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2014,
  },
  {
    nameZh: '營業小貨車(汽油)',
    nameEn: 'Commercial Light Goods Vehicle (Petrol)',
    coe: 0.626,
    unit: '延頓公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2014,
  },
  {
    nameZh: '營業小貨車(柴油)',
    nameEn: 'Commercial Light Goods Vehicle (Diesel)',
    coe: 0.647,
    unit: '延頓公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2014,
  },
  {
    nameZh: '自用大貨車(柴油)',
    nameEn: 'Private Heavy Goods Vehicle (Diesel)',
    coe: 0.224,
    unit: '延頓公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2014,
  },
  {
    nameZh: '營業大貨車(柴油)',
    nameEn: 'Commercial Heavy Goods Vehicle (Diesel)',
    coe: 0.235,
    unit: '延頓公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2014,
  },
  {
    nameZh: '國內海運-貨運，柴油動力',
    nameEn: 'Domestic Shipping - Cargo, Diesel Powered',
    coe: 0.0334,
    unit: '延頓公里(tkm)',
    departmentname: '行政院環境保護署',
    announcementyear: 2016,
  },
  {
    nameZh: '國際海運-貨運，燃料油動力',
    nameEn: 'International Shipping - Cargo, Fuel Oil Powered',
    coe: 0.0354,
    unit: '延頓公里(tkm)',
    departmentname: '行政院環境保護署',
    announcementyear: 2016,
  },
  {
    nameZh: '國內海運-貨運，燃料油動力',
    nameEn: 'Domestic Shipping - Cargo, Fuel Oil Powered',
    coe: 0.0198,
    unit: '延頓公里(tkm)',
    departmentname: '行政院環境保護署',
    announcementyear: 2016,
  },
  {
    nameZh: '航空貨物運輸服務',
    nameEn: 'Air Cargo Transport Service',
    coe: 1.16,
    unit: '延頓公里(tkm)',
    departmentname: '行政院環境保護署',
    announcementyear: 2017,
  },
  {
    nameZh: '3.49噸常溫貨車服務(裝載率31%，包含營業據點排放，2016)',
    nameEn:
      '3.49-Ton Normal Temperature Goods Truck Service (Load Rate 31%, Including Business Location Emissions, 2016)',
    coe: 2.18,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '3.49噸常溫貨車服務(裝載率84%，包含營業據點排放，2016)',
    nameEn:
      '3.49-Ton Normal Temperature Goods Truck Service (Load Rate 84%, Including Business Location Emissions, 2016)',
    coe: 0.833,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '3.5~7.4噸常溫貨車服務(裝載率82%，包含營業據點排放，2016)',
    nameEn:
      '3.5-7.4-Ton Normal Temperature Goods Truck Service (Load Rate 82%, Including Business Location Emissions, 2016)',
    coe: 0.316,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '7.5~16噸常溫貨車服務(裝載率80%，包含營業據點排放，2016)',
    nameEn:
      '7.5-16-Ton Normal Temperature Goods Truck Service (Load Rate 80%, Including Business Location Emissions, 2016)',
    coe: 0.276,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '3.49噸低溫貨車服務(裝載率32%，包含營業據點排放，2016)',
    nameEn:
      '3.49-Ton Low Temperature Goods Truck Service (Load Rate 32%, Including Business Location Emissions, 2016)',
    coe: 2.71,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '3.49噸低溫貨車服務(裝載率77%，包含營業據點排放，2016)',
    nameEn:
      '3.49-Ton Low Temperature Goods Truck Service (Load Rate 77%, Including Business Location Emissions, 2016)',
    coe: 1.55,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '3.5~7.4噸低溫貨車服務(裝載率41%，包含營業據點排放，2016)',
    nameEn:
      '3.5-7.4-Ton Low Temperature Goods Truck Service (Load Rate 41%, Including Business Location Emissions, 2016)',
    coe: 1.15,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '3.5~7.4噸低溫貨車服務(裝載率69%，包含營業據點排放，2016)',
    nameEn:
      '3.5-7.4-Ton Low Temperature Goods Truck Service (Load Rate 69%, Including Business Location Emissions, 2016)',
    coe: 0.959,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '7.5~16噸低溫貨車服務(裝載率65%，包含營業據點排放，2016)',
    nameEn:
      '7.5-16-Ton Low Temperature Goods Truck Service (Load Rate 65%, Including Business Location Emissions, 2016)',
    coe: 0.961,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '3.49噸多溫貨車服務(包含營業據點排放，2016)',
    nameEn:
      '3.49-Ton Multi-Temperature Goods Truck Service (Including Business Location Emissions, 2016)',
    coe: 1.66,
    unit: '延噸公里(tkm)',
    departmentname: '交通部運輸研究所',
    announcementyear: 2017,
  },
  {
    nameZh: '以柴油動力垃圾車清除運輸一般廢棄物',
    nameEn: 'Transport of General Waste by Diesel-Powered Garbage Truck',
    coe: 1.31,
    unit: '延噸公里(tkm)',
    departmentname: '行政院環境保護署',
    announcementyear: 2018,
  },
  {
    nameZh: '營業大貨車(柴油)',
    nameEn: 'Commercial Heavy Goods Vehicle (Diesel)',
    coe: 0.131,
    unit: '延噸公里(tkm)',
    departmentname: '行政院環境保護署',
    announcementyear: 2022,
  },
  {
    nameZh: '營業小貨車(柴油)',
    nameEn: 'Commercial Light Goods Vehicle (Diesel)',
    coe: 0.587,
    unit: '延噸公里(tkm)',
    departmentname: '行政院環境保護署',
    announcementyear: 2022,
  },
  {
    nameZh: '營業小貨車(汽油)',
    nameEn: 'Commercial Light Goods Vehicle (Petrol)',
    coe: 0.683,
    unit: '延噸公里(tkm)',
    departmentname: '行政院環境保護署',
    announcementyear: 2022,
  },
]

function filterMaxAnnouncementYear(d: ITKData[]): ITKData[] {
  // 创建一个对象来存储每个唯一的'name'的最大'announcementyear'
  const maxAnnouncementYears: { [name: string]: number } = {}

  // 遍历数据数组
  d.forEach((item) => {
    const { nameZh, announcementyear } = item

    // 如果当前'name'已存在于maxAnnouncementYears中
    // 并且当前'announcementyear'大于已存储的值，则更新它
    if (
      maxAnnouncementYears[nameZh] === undefined ||
      announcementyear > maxAnnouncementYears[nameZh]
    ) {
      maxAnnouncementYears[nameZh] = announcementyear
    }
  })

  // 使用筛选函数过滤出具有最大'announcementyear'的项
  const filteredData = data.filter((item) => {
    return item.announcementyear === maxAnnouncementYears[item.nameZh]
  })

  return filteredData
}

// 使用示例
const filteredArray = filterMaxAnnouncementYear(data)

export default filteredArray
