import { locale } from './env'

interface I18n {
  zh: string
  en: string
}

const constants: I18n[] = [
  {
    zh: '所有專案',
    en: 'All Projects',
  },
  {
    zh: '選擇你的公司分類',
    en: 'Select your company category',
  },
  {
    zh: '碳盤查',
    en: 'Carbon Inventory',
  },
  {
    zh: '○○○○股份有限公司',
    en: '○○○○ Co., Ltd.',
  },
  {
    zh: '一般辦公室',
    en: 'General Office',
  },
  {
    zh: '石化業',
    en: 'Petrochemical Industry',
  },
  {
    zh: '建築',
    en: 'Construction',
  },
  {
    zh: '娛樂界',
    en: 'Entertainment',
  },
  {
    zh: '能源業',
    en: 'Energy Industry',
  },
  {
    zh: '教育產業',
    en: 'Education Industry',
  },
  {
    zh: '軟體資通',
    en: 'Software and Information Technology',
  },
  {
    zh: '運輸',
    en: 'Transportation',
  },
  {
    zh: '零售業',
    en: 'Retail Industry',
  },
  {
    zh: '製造業',
    en: 'Manufacturing Industry',
  },
  {
    zh: '餐廳',
    en: 'Restaurant',
  },
  {
    zh: '醫療系統',
    en: 'Medical System',
  },
  {
    zh: '觀光旅遊',
    en: 'Tourism',
  },
  {
    zh: '農牧業',
    en: 'Agriculture and Animal Husbandry',
  },
  {
    zh: '物流',
    en: 'Logistics',
  },
  {
    zh: '找不到所屬的產業嗎',
    en: 'Can’t find your industry?',
  },
  {
    zh: '自行輸入',
    en: 'Enter your industry',
  },
  {
    zh: '更新專案資料',
    en: 'Update Project',
  },
  {
    zh: '刪除專案',
    en: 'Delete Project',
  },
  {
    zh: '確認刪除整個專案嗎？',
    en: 'Are you sure you want to delete this project?',
  },
  {
    zh: '新增群組',
    en: 'Add Group',
  },
  {
    zh: '新增公司資料',
    en: 'Add Company',
  },
  {
    zh: '新增設備',
    en: 'Add Equipment',
  },
  {
    zh: '取消',
    en: 'Cancel',
  },
  {
    zh: '新增電力來源',
    en: 'Add Electricity Source',
  },
  {
    zh: '新增',
    en: 'Add',
  },
  {
    zh: '使用 JSON 檔案上傳',
    en: 'Upload JSON File',
  },
  {
    zh: '匯入專案 JSON 數據',
    en: 'Import Project JSON Data',
  },
  {
    zh: '確認匯入 JSON',
    en: 'Confirm Import JSON',
  },
  {
    zh: '已成功創建專案',
    en: 'Project created successfully',
  },
  {
    zh: '立即查看專案',
    en: 'View Project',
  },
  {
    zh: '送出',
    en: 'Submit',
  },
  {
    zh: '創建專案 - 分類:',
    en: 'Create Project - Category:',
  },
  {
    zh: '按下確認後會創建專案，下一頁可以填寫更多資訊',
    en: 'Click confirm to create a project, you can fill in more information on the next page',
  },
  {
    zh: '再想想',
    en: 'Think again',
  },
  {
    zh: '確認創建專案',
    en: 'Confirm Create Project',
  },
  {
    zh: '刪除群組',
    en: 'Delete Group',
  },
  {
    zh: '確認',
    en: 'Confirm',
  },
  {
    zh: '確認刪除群組?',
    en: 'Are you sure you want to delete this group?',
  },
  {
    zh: '確認刪除',
    en: 'Confirm Delete',
  },
  {
    zh: '記得儲存資料',
    en: 'Remember to save data',
  },
  {
    zh: '刪除專案後，所有資料將不可復原',
    en: 'After deleting the project, all data will not be recoverable',
  },
  {
    zh: '如果您確認刪除此專案，請在下方輸入',
    en: 'If you are sure to delete this project, please enter ',
  },
  {
    zh: '確認修改來源',
    en: 'Confirm Modify Source',
  },
  {
    zh: '輸入的專案名稱不正確',
    en: 'The project name entered is incorrect',
  },
  {
    zh: '修改排放係數',
    en: 'Modify Emission Coefficient',
  },
  {
    zh: '排放來源',
    en: 'Emission Source',
  },
  {
    zh: '請輸入',
    en: 'Please enter ',
  },
  {
    zh: '確認刪除?',
    en: 'Confirm Delete?',
  },
  {
    zh: '報表',
    en: 'Report',
  },
  {
    zh: '匯出',
    en: 'Export',
  },
  {
    zh: '排碳設備',
    en: 'Carbon Equipment',
  },
  {
    zh: '溫室氣體',
    en: 'Greenhouse Gas',
  },
  {
    zh: '溫室氣體排放量 (噸/年)',
    en: 'Greenhouse Gas Emissions (t/year)',
  },
  {
    zh: 'GPT係數',
    en: 'GPT Coefficient',
  },
  {
    zh: '二氧化碳當量(CO2e, carbon dioxide equivalent)是測量碳足跡(carbon footprints)的標準單位',
    en: 'Carbon dioxide equivalent (CO2e) is the standard unit for measuring carbon footprints',
  },
  {
    zh: '動作',
    en: 'Action',
  },
  {
    zh: '碳排 (噸/年)',
    en: 'Emissions (t/year)',
  },
  {
    zh: '辦公室',
    en: 'Office',
  },
  {
    zh: '辦公室 #1',
    en: 'Office #1',
  },
  {
    zh: '工廠',
    en: 'Factory',
  },
  {
    zh: '餐廳',
    en: 'Restaurant',
  },
  {
    zh: '醫院',
    en: 'Hospital',
  },
  {
    zh: '旅館',
    en: 'Hotel',
  },
  {
    zh: '農場',
    en: 'Farm',
  },
  {
    zh: '車隊',
    en: 'Fleet',
  },
  {
    zh: '年碳排放',
    en: 'Annual Carbon Emissions',
  },
  {
    zh: '燃料排放',
    en: 'Fuel Emissions',
  },
  {
    zh: '頓公里排放',
    en: 'Tonne-km Emissions',
  },
  {
    zh: '公里',
    en: 'km',
  },
  {
    zh: '頓',
    en: 'tonne',
  },
  {
    zh: '月碳排放',
    en: 'Monthly Carbon Emissions',
  },
  {
    zh: '每小時碳排放',
    en: 'Hourly Carbon Emissions',
  },
  {
    zh: '年排放',
    en: 'Annual Emissions',
  },
  {
    zh: '請輸入年排放量',
    en: 'Please enter annual emissions',
  },
  {
    zh: '請選擇溫室氣體',
    en: 'Please select a greenhouse gas',
  },
  {
    zh: '請選擇單位',
    en: 'Please select a unit',
  },
  {
    zh: '排放量',
    en: 'Emissions',
  },
  {
    zh: '請選擇燃料',
    en: 'Please select a fuel',
  },
  {
    zh: '編輯電力來源',
    en: 'Edit Electricity Source',
  },
  {
    zh: '使用度數(年)',
    en: 'Usage (year)',
  },
  {
    zh: '請輸入年排放量',
    en: 'Please enter annual emissions',
  },
  {
    zh: '碳排(噸/年)',
    en: 'Emissions (t/year)',
  },
  {
    zh: '噸/年',
    en: 't/year',
  },
  {
    zh: '成功',
    en: 'Success',
  },
  {
    zh: '編輯專案基本資料',
    en: 'Edit Project Basic Information',
  },
  {
    zh: '公司/專案名稱:',
    en: 'Company/Project Name:',
  },
  {
    zh: '公司/專案分類:',
    en: 'Company/Project Category:',
  },
  {
    zh: '公司/專案說明:',
    en: 'Company/Project Description:',
  },
  {
    zh: '編輯設備',
    en: 'Edit Equipment',
  },
  {
    zh: '刪除群組',
    en: 'Delete Group',
  },
  {
    zh: '一月',
    en: 'January',
  },
  {
    zh: '二月',
    en: 'February',
  },
  {
    zh: '三月',
    en: 'March',
  },
  {
    zh: '四月',
    en: 'April',
  },
  {
    zh: '五月',
    en: 'May',
  },
  {
    zh: '六月',
    en: 'June',
  },
  {
    zh: '七月',
    en: 'July',
  },
  {
    zh: '八月',
    en: 'August',
  },
  {
    zh: '九月',
    en: 'September',
  },
  {
    zh: '十月',
    en: 'October',
  },
  {
    zh: '十一月',
    en: 'November',
  },
  {
    zh: '十二月',
    en: 'December',
  },
  {
    zh: '獲取',
    en: 'Get ',
  },
  {
    zh: '更新',
    en: 'Update ',
  },
  {
    zh: '刪除',
    en: 'Delete ',
  },
  {
    zh: '更新',
    en: 'Update ',
  },
  {
    zh: '專案',
    en: 'Project ',
  },
  {
    zh: '圖片',
    en: 'Image',
  },
  {
    zh: '圖片上傳',
    en: 'Image Upload',
  },
  {
    zh: '創建',
    en: 'Create ',
  },
  {
    zh: '請輸入設備名稱',
    en: 'Please enter equipment name',
  },
  {
    zh: '設備名稱',
    en: 'Equipment Name',
  },
  {
    zh: '每小時排放',
    en: 'Hourly Emissions',
  },
  {
    zh: '請輸入每小時排放量',
    en: 'Please enter hourly emissions',
  },
  {
    zh: '請選擇溫室氣體',
    en: 'Please select a greenhouse gas',
  },
  {
    zh: '請輸入此設備今年運轉了幾小時',
    en: 'Please enter the number of hours this equipment has been running this year',
  },
  {
    zh: '此設備今年運轉了',
    en: 'This equipment has been running for ',
  },
  {
    zh: '小時',
    en: 'hours',
  },
  {
    zh: '請選擇燃料',
    en: 'Please select a fuel',
  },
  {
    zh: '請選擇或搜尋溫室氣體',
    en: 'Please select or search for greenhouse gases',
  },
  {
    zh: '請選擇溫室氣體',
    en: 'Please select a greenhouse gas',
  },
  {
    zh: '請選擇單位',
    en: 'Please select a unit',
  },
  {
    zh: '請輸入月排放量',
    en: 'Please enter monthly emissions',
  },
  {
    zh: '沒有資料',
    en: 'No data',
  },
  {
    zh: '分析事項',
    en: 'Analysis',
  },
  {
    zh: '建議事項',
    en: 'Suggestion',
  },
  {
    zh: '月份',
    en: 'Month',
  },
  {
    zh: '溫室氣體',
    en: 'Greenhouse Gas',
  },
  {
    zh: '碳排(噸/月)',
    en: 'Emissions (t/month)',
  },
  {
    zh: 'GPT係數',
    en: 'GPT Coefficient',
  },
  {
    zh: '溫室氣體排放量 (噸/月)',
    en: 'Greenhouse Gas Emissions (t/month)',
  },
  {
    zh: '溫室氣體',
    en: 'Greenhouse Gas',
  },
  {
    zh: '運輸設備',
    en: 'Transportation Equipment',
  },
  {
    zh: '上傳中...',
    en: 'Uploading...',
  },
  {
    zh: '上傳圖片',
    en: 'Upload Image',
  },
  {
    zh: '建議尺寸: 400 X 225 px',
    en: 'Suggested size: 400 X 225 px',
  },
  {
    zh: '支援檔名:',
    en: 'Supported file names:',
  },
  {
    zh: '您有未儲存的變更',
    en: 'You have unsaved changes',
  },
  {
    zh: '請記得到頁面上方更新專案資料',
    en: 'Remember to update the project data at the top of the page',
  },
  {
    zh: '電力來源',
    en: 'Electricity Source',
  },
  {
    zh: '請輸入電力來源',
    en: 'Please enter electricity source',
  },
  {
    zh: '選擇電力來源',
    en: 'Select electricity source',
  },
  {
    zh: '使用度數 (年)',
    en: 'Usage (year)',
  },
  {
    zh: '匯出為 JSON 數據',
    en: 'Export as JSON data',
  },
  {
    zh: '匯出為 PDF',
    en: 'Export as PDF',
  },
  {
    zh: '調整格式中...',
    en: 'Adjusting format...',
  },
  {
    zh: '請稍候...',
    en: 'Please wait...',
  },
  {
    zh: '碳盤查 JSON 數據',
    en: 'Carbon Inventory JSON Data',
  },
  {
    zh: '下載',
    en: 'Download',
  },
  {
    zh: '複製',
    en: 'Copy',
  },
  {
    zh: '請輸入使用度數',
    en: 'Please enter usage',
  },
]

export enum ELanguage {
  zh = 'zh_TW',
  en = 'en_US',
}

export const getLanguage = () => {
  switch (locale) {
    case ELanguage.zh:
      return 'zh'
    case ELanguage.en:
      return 'en'
    default:
      return 'zh'
  }
}

export const convertLanguage = (text: string) => {
  const language = getLanguage()
  return constants.find((item) => item.zh === text)?.[language] || text
}
