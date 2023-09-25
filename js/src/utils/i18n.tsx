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
    zh: '如果您確認刪除此專案，請在下方輸入 ',
    en: 'If you are sure to delete this project, please enter ',
  },
  {
    zh: '確認修改來源',
    en: 'Confirm Modify Source',
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
]

export enum ELanguage {
  zh = 'zh',
  en = 'en',
}

export const getLanguage = () => {
  return (localStorage.getItem('language') as keyof I18n) || ELanguage.zh
}
export const setLanguage = (language: ELanguage) => {
  localStorage.setItem('language', language)
  window.location.reload()
}

export const convertLanguage = (text: string) => {
  const language = getLanguage()
  return constants.find((item) => item.zh === text)?.[language] || text
}
