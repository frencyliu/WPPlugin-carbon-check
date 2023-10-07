const data = [
  {
    nameZh: '自產煤',
    nameEn: 'Other Bituminous Coal',
    data: [
      { data: 2.3328598392, unit1: 'CO2', unit2: 'Kg' },
      { data: 2.4660252000000004e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 3.699037800000001e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '原料煤',
    nameEn: 'Other Bituminous Coal',
    data: [
      { data: 2.6932847040000003, unit1: 'CO2', unit2: 'Kg' },
      { data: 2.8470240000000003e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 4.270536000000001e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '燃料煤',
    nameEn: 'Other Bituminous Coal',
    data: [
      { data: 2.4081133824000003, unit1: 'CO2', unit2: 'Kg' },
      { data: 2.5455744e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 3.818361600000001e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '無煙煤',
    nameEn: 'Anthracite',
    data: [
      { data: 2.9220933240000004, unit1: 'CO2', unit2: 'Kg' },
      { data: 2.9726280000000002e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 4.458942000000001e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '焦煤',
    nameEn: 'Coking Coal',
    data: [
      { data: 2.6932847040000003, unit1: 'CO2', unit2: 'Kg' },
      { data: 2.8470240000000003e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 4.270536000000001e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '煙煤',
    nameEn: 'Other Bituminous Coal',
    data: [
      { data: 2.4081133824000003, unit1: 'CO2', unit2: 'Kg' },
      { data: 2.5455744e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 3.818361600000001e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '亞煙煤(發電)',
    nameEn: 'Sub-Bituminous Coal',
    data: [
      { data: 1.9715222520000002, unit1: 'CO2', unit2: 'Kg' },
      { data: 2.051532e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 3.077298000000001e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '亞煙煤(其他)',
    nameEn: 'Sub-Bituminous Coal',
    data: [
      { data: 2.2531682880000004, unit1: 'CO2', unit2: 'Kg' },
      { data: 2.344608e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 3.516912000000001e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '褐煤',
    nameEn: 'Lignite',
    data: [
      { data: 1.2026331792, unit1: 'CO2', unit2: 'Kg' },
      { data: 1.1907259200000001e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 1.7860888800000004e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '油頁岩',
    nameEn: 'Oil Shale and Tar Sands',
    data: [
      { data: 0.9528696252000001, unit1: 'CO2', unit2: 'Kg' },
      { data: 8.9053236e-6, unit1: 'CH4', unit2: 'Kg' },
      { data: 1.3357985400000004e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '泥煤',
    nameEn: 'Peat',
    data: [
      { data: 1.0353872664000001, unit1: 'CO2', unit2: 'Kg' },
      { data: 9.7678044e-6, unit1: 'CH4', unit2: 'Kg' },
      { data: 1.4651706600000003e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '煤球',
    nameEn: 'Patent Fuel',
    data: [
      { data: 1.5512094, unit1: 'CO2', unit2: 'Kg' },
      { data: 1.590984e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 2.3864760000000006e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '焦炭',
    nameEn: 'Coke Oven Coke and Lignite Coke',
    data: [
      { data: 3.1359132000000005, unit1: 'CO2', unit2: 'Kg' },
      { data: 2.9307600000000004e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 4.396140000000001e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '石油焦',
    nameEn: 'Petroleum Coke',
    data: [
      { data: 3.3473466000000003, unit1: 'CO2', unit2: 'Kg' },
      { data: 0.00010299528000000002, unit1: 'CH4', unit2: 'Kg' },
      { data: 2.0599056e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '航空汽油',
    nameEn: 'Aviation Gasoline\n(Jet Gasoline)',
    data: [
      { data: 2.19807, unit1: 'CO2', unit2: 'L' },
      { data: 9.420300000000002e-5, unit1: 'CH4', unit2: 'L' },
      { data: 1.88406e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '航空燃油',
    nameEn: 'Jet Kerosene',
    data: [
      { data: 2.3948496, unit1: 'CO2', unit2: 'L' },
      { data: 0.00010048320000000002, unit1: 'CH4', unit2: 'L' },
      { data: 2.009664e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '原油',
    nameEn: 'Crude Oil',
    data: [
      { data: 2.7620319600000003, unit1: 'CO2', unit2: 'L' },
      { data: 0.00011304360000000002, unit1: 'CH4', unit2: 'L' },
      { data: 2.2608719999999997e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '奧里油',
    nameEn: 'Orimulsion',
    data: [
      { data: 2.1190274028, unit1: 'CO2', unit2: 'Kg' },
      { data: 8.255950920000002e-5, unit1: 'CH4', unit2: 'Kg' },
      { data: 1.651190184e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '天然氣凝結油',
    nameEn: 'Natural Gas Liquids (NGLs)',
    data: [
      { data: 2.8395246038400006, unit1: 'CO2', unit2: 'M3' },
      { data: 0.00013268806560000004, unit1: 'CH4', unit2: 'M3' },
      { data: 2.6537613119999998e-5, unit1: 'N2O', unit2: 'M3' },
    ],
  },
  {
    nameZh: '煤油',
    nameEn: 'Other Kerosene',
    data: [
      { data: 2.5587628200000005, unit1: 'CO2', unit2: 'L' },
      { data: 0.00010676340000000002, unit1: 'CH4', unit2: 'L' },
      { data: 2.135268e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '頁岩油',
    nameEn: 'Shale Oil',
    data: [
      { data: 2.7945625586400005, unit1: 'CO2', unit2: 'Kg' },
      { data: 0.00010799431920000003, unit1: 'CH4', unit2: 'Kg' },
      { data: 2.159886384e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '柴油',
    nameEn: 'Gas/Diesel Oil',
    data: [
      { data: 2.6060317920000005, unit1: 'CO2', unit2: 'L' },
      { data: 0.00010550736000000003, unit1: 'CH4', unit2: 'L' },
      { data: 2.1101471999999998e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '車用汽油',
    nameEn: 'Motor Gasoline',
    data: [
      { data: 2.2631328720000004, unit1: 'CO2', unit2: 'L' },
      { data: 9.797112000000002e-5, unit1: 'CH4', unit2: 'L' },
      { data: 1.9594224e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '蒸餘油 (燃料油)',
    nameEn: 'Residual Fuel Oil',
    data: [
      { data: 3.1109598720000005, unit1: 'CO2', unit2: 'L' },
      { data: 0.00012057984000000003, unit1: 'CH4', unit2: 'L' },
      { data: 2.4115968e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '液化石油氣',
    nameEn: 'Liquefied Petroleum Gases (LPG)',
    data: [
      { data: 1.7528812758000003, unit1: 'CO2', unit2: 'L' },
      { data: 2.7779418000000003e-5, unit1: 'CH4', unit2: 'L' },
      { data: 2.7779418000000006e-6, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '石油腦',
    nameEn: 'Naphtha',
    data: [
      { data: 2.3937610320000005, unit1: 'CO2', unit2: 'L' },
      { data: 9.797112000000002e-5, unit1: 'CH4', unit2: 'L' },
      { data: 1.9594224e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '柏油',
    nameEn: 'Bitumen',
    data: [
      { data: 3.3787476000000005, unit1: 'CO2', unit2: 'L' },
      { data: 0.00012560400000000003, unit1: 'CH4', unit2: 'L' },
      { data: 2.51208e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '潤滑油',
    nameEn: 'Lubricants',
    data: [
      { data: 2.9461674240000004, unit1: 'CO2', unit2: 'L' },
      { data: 0.00012057984000000003, unit1: 'CH4', unit2: 'L' },
      { data: 2.4115968e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '其他油品',
    nameEn: 'Other Petroleum Products',
    data: [
      { data: 2.7620319600000003, unit1: 'CO2', unit2: 'L' },
      { data: 0.00011304360000000002, unit1: 'CH4', unit2: 'L' },
      { data: 2.2608719999999997e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '乙烷',
    nameEn: 'Ethane',
    data: [
      { data: 2.8601872992, unit1: 'CO2', unit2: 'L' },
      { data: 4.6431612000000004e-5, unit1: 'CH4', unit2: 'L' },
      { data: 4.643161200000001e-6, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '天然氣',
    nameEn: 'Natural Gas',
    data: [
      { data: 1.8790358400000002, unit1: 'CO2', unit2: 'M3' },
      { data: 3.34944e-5, unit1: 'CH4', unit2: 'M3' },
      { data: 3.3494400000000007e-6, unit1: 'N2O', unit2: 'M3' },
    ],
  },
  {
    nameZh: '煉油氣',
    nameEn: 'Refinery Gas',
    data: [
      { data: 2.1704371200000003, unit1: 'CO2', unit2: 'M3' },
      { data: 3.76812e-5, unit1: 'CH4', unit2: 'M3' },
      { data: 3.768120000000001e-6, unit1: 'N2O', unit2: 'M3' },
    ],
  },
  {
    nameZh: '焦爐氣',
    nameEn: 'Coke Oven Gas',
    data: [
      { data: 0.7807544640000001, unit1: 'CO2', unit2: 'M3' },
      { data: 1.758456e-5, unit1: 'CH4', unit2: 'M3' },
      { data: 1.7584560000000005e-6, unit1: 'N2O', unit2: 'M3' },
    ],
  },
  {
    nameZh: '高爐氣',
    nameEn: 'Blast Furnace Gas',
    data: [
      { data: 0.8458173360000001, unit1: 'CO2', unit2: 'M3' },
      { data: 3.2531436000000004e-6, unit1: 'CH4', unit2: 'M3' },
      { data: 3.253143600000001e-7, unit1: 'N2O', unit2: 'M3' },
    ],
  },
  {
    nameZh: '一般廢棄物',
    nameEn: 'Municipal Wastes',
    data: [
      { data: 0.7792272742716001, unit1: 'CO2', unit2: 'Kg' },
      { data: 0.00025492713444, unit1: 'CH4', unit2: 'Kg' },
      { data: 3.3990284592e-5, unit1: 'N2O', unit2: 'Kg' },
    ],
  },
  {
    nameZh: '事業廢棄物',
    nameEn: 'Industrial Wastes',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '其他非化石燃料',
    nameEn: 'Municipal Wastes (Biomass fraction)',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '木頭－固態',
    nameEn: 'Wood/Wood Waste',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '黑液',
    nameEn: 'Sulphite lyes (Black liquor)',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '木炭',
    nameEn: 'Charcoal',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '其他固體生質燃料',
    nameEn: 'Other Primary Solid Biomass',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '生質汽油',
    nameEn: 'Biogasoline',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '生質柴油',
    nameEn: 'Biodiesels',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '其他液態生質燃料',
    nameEn: 'Other Liquid Biofuels',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '掩埋場沼氣',
    nameEn: 'Landfill Gas',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '污泥沼氣',
    nameEn: 'Sludge Gas',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '其他氣態生質燃料',
    nameEn: 'Other Biogas',
    data: [
      { data: '-', unit1: 'CO2', unit2: '-' },
      { data: '-', unit1: 'CH4', unit2: '-' },
      { data: '-', unit1: 'N2O', unit2: '-' },
    ],
  },
  {
    nameZh: '航空汽油',
    nameEn: 'Aviation Gasoline (Jet Gasoline)',
    data: [
      { data: 2.19807, unit1: 'CO2', unit2: 'L' },
      { data: 9.420300000000002e-5, unit1: 'CH4', unit2: 'L' },
      { data: 1.88406e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '航空燃油',
    nameEn: 'Jet Kerosene',
    data: [
      { data: 2.3948496, unit1: 'CO2', unit2: 'L' },
      { data: 0.00010048320000000002, unit1: 'CH4', unit2: 'L' },
      { data: 2.009664e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '車用汽油',
    nameEn: 'Motor Gasoline',
    data: [
      { data: 2.2631328720000004, unit1: 'CO2', unit2: 'L' },
      { data: 0.0008164260000000001, unit1: 'CH4', unit2: 'L' },
      { data: 0.00026125632000000004, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '柴油',
    nameEn: 'Gas/Diesel Oil',
    data: [
      { data: 2.6060317920000005, unit1: 'CO2', unit2: 'L' },
      { data: 0.000137159568, unit1: 'CH4', unit2: 'L' },
      { data: 0.000137159568, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '煤油',
    nameEn: 'Kerosene',
    data: [
      { data: 2.5587628200000005, unit1: 'CO2', unit2: 'L' },
      { data: 0.00010676340000000002, unit1: 'CH4', unit2: 'L' },
      { data: 2.135268e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '潤滑油',
    nameEn: 'Lubricants',
    data: [
      { data: 2.9461674240000004, unit1: 'CO2', unit2: 'L' },
      { data: 0.00012057984000000003, unit1: 'CH4', unit2: 'L' },
      { data: 2.4115968e-5, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '液化石油氣',
    nameEn: 'Liquefied Petroleum Gases (LPG)',
    data: [
      { data: 1.7528812758000003, unit1: 'CO2', unit2: 'L' },
      { data: 0.0017223239160000002, unit1: 'CH4', unit2: 'L' },
      { data: 5.555883600000001e-6, unit1: 'N2O', unit2: 'L' },
    ],
  },
  {
    nameZh: '液化天然氣',
    nameEn: 'Liquefied Natural Gas (LNG)',
    data: [
      { data: 2.1139153200000003, unit1: 'CO2', unit2: 'M3' },
      { data: 0.0034666704000000004, unit1: 'CH4', unit2: 'M3' },
      { data: 0.00011304360000000002, unit1: 'N2O', unit2: 'M3' },
    ],
  },
]

export default data
