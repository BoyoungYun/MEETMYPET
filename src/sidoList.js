const sidoList =
[
    {
        id:0,
        name:'서울특별시',
        code:'6110000',
        detail:['강남구', '강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구',
        '성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구'],
        detail_code:['3220000','3240000','3080000','3150000','3200000','3040000','3160000','3170000','3100000','3090000','3050000','3190000',
        '3130000','3120000','3210000','3030000','3070000','3230000','3140000','3180000','3020000','3110000','3000000','3010000','3060000']
    },
    {
        id:1,
        name:'부산광역시',
        code:'6260000',
        detail:['강서구','금정구','기장군','남구','동구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구'],
        detail_code:['3360000','3350000','3400000','3310000','3270000','3300000','3290000','3320000','3390000','3340000','3260000','3380000',
    '3370000','3280000','3250000','3330000']
    },
    {
        id:2,
        name:'대구광역시',
        code:'6270000',
        detail:['남구','달서구','달성군','동구','북구','서구','수성구','중구'],
        detail_code:['3440000','3470000','3480000','3420000','3450000','3430000','3460000','3410000']
    },
    {
        id:3,
        name:'인천광역시',
        code:'6280000',
        detail:['강화군','계양구','남동구','동구','미추홀구','부평구','서구','연수구','옹진군','중구'],
        detail_code:['3570000','3550000','3530000','3500000','3510500','3540000','3560000','3520000','3580000','3490000']
    },
    {
        id:4,
        name:'광주광역시',
        code:'6290000',
        detail:['광산구','남구','동구','북구','서구'],
        detail_code:['3630000','3610000','3590000','3620000','3600000']
    },
    {
        id:5,
        name:'세종특별자치시',
        code:'5690000',
        detail:['세종특별자치시'],
        detail_code:['5690000']
    },
    {
        id:6,
        name:'대전광역시',
        code:'6300000',
        detail:['대덕구','동구','서구','유성구','중구'],
        detail_code:['3680000','3640000','3660000','3670000','3650000']
    },
    {
        id:7,
        name:'울산광역시',
        code:'6310000',
        detail:['남구','동구','북구','울주군','중구'],
        detail_code:['3700000','3710000','3720000','3730000','3690000']
    },
    {
        id:8,
        name:'경기도',
        code:'6410000',
        detail:['가평군','고양시','과천시','광명시','광주시','구리시','군포시','김포시','남양주시','동두천시','부천시','성남시','수원시','시흥시','안산시','안성시',
    '안양시','양주시','양평군','여주시','연천군','오산시','용인시','의왕시','의정부시','이천시','파주시','평택시','포천시','하남시','화성시'],
        detail_code:['4160000','3940000','3970000','3900000','5540000','3980000','4020000','4090000','3990000','3920000','3860000','3780000','3740000',
    '4010000','3930000','4080000','3830000','5590000','4170000','5700000','4140000','4000000','4050000','4030000','3820000','4070000','4060000','3910000',
    '5600000','4040000','5530000']
    },
    {
        id:9,
        name:'강원도',
        code:'6420000',
        detail:['강릉시','고성군','동해시','삼척시','속초시','양구군','양양군','영월군','원주시','인제군','정선군','철원군','춘천시','태백시','평창군','홍천군'
    ,'화천군','횡성군'],
        detail_code:['4200000','4340000','4210000','4240000','4230000','4320000','4350000','4270000','4190000','4330000','4290000','4300000','4180000',
        '4220000','4280000','4250000','4310000','4260000']
    },
    {
        id:10,
        name:'충청북도',
        code:'6430000',
        detail:['괴산군','단양군','보은군','영동군','옥천군','음성군','제천시','증평군','진천군','청주시','충주시'],
        detail_code:['4460000','4480000','4420000','4440000','4430000','4470000','4400000','5570000','4450000','5710000','4390000']
    },
    {
        id:11,
        name:'충청남도',
        code:'6440000',
        detail:['계룡시','공주시','금산군','논산시','당진시','보령시','부여군','서산시','서천군','아산시','예산군','천안시','청양군','태안군','홍성군'],
        detail_code:['5580000','4500000','4550000','4540000','5680000','4510000','4570000','4530000','4580000','4520000','4560000','4610000','4490000',
    '4590000','4620000','4600000']
    },
    {
        id:12,
        name:'전라북도',
        code:'6450000',
        detail:['고창군','군산시','김제시','남원시','부안군','완주군','익산시','임실군','장수군','전주시','정읍시','진안군'],
        detail_code:['4780000','4670000','4710000','4700000','4740000','4790000','4770000','4720000','4680000','4760000','4750000',
        '4640000','4690000','4730000']
    },
    {
        id:13,
        name:'전라남도',
        code:'6460000',
        detail:['강진군','고흥군','곡성군','광양시','구례군','나주시','담양군','목포시','무안군','보성군','순천시','신안군','여수시','영광군','영암군','완도군'
    ,'장성군','진도군','함평군','화순군'],
        detail_code:['4920000','4880000','4860000','4840000','4870000','4830000','4850000','4800000','4950000','4890000','4820000','5010000',
        '4810000','4970000','4940000','4990000','4980000','4910000','5000000','4960000','4930000','4900000']
    },
    {
        id:14,
        name:'경상북도',
        code:'6470000',
        detail:['경산시','경주시','고령군','구미시','김천시','문경시','상주시','성주군','안동시','영덕군','영양군','영주시','영천시','예천군','울진군','의성군'
    ,'청도군','청송군','칠곡군','포항시'],
        detail_code:['5130000','5050000','5200000','5080000','5140000','5060000','5120000','5240000','5110000','5210000','5070000','5180000',
    '5170000','5090000','5100000','5230000','5260000','5250000','5150000','5190000','5160000','5220000','5020000']
    },
    {
        id:15,
        name:'경상남도',
        code:'6480000',
        detail:['거제시','거창군','고성군','김해시','남해군','밀양시','사천시','산청군','양산시','의령군','진주시','창녕군','창원 마산합포회원구','창원 의창성산구'
    ,'창원 진해구','통영시','하동군','함안군','함양군','합천군'],
        detail_code:['5370000','5470000','5420000','5350000','5430000','5360000','5340000','5450000','5380000','5390000','5310000','5410000',
        '5280000','5670000','5320000','5330000','5440000','5400000','5460000','5480000']
    },
    {
        id:16,
        name:'제주특별자치도',
        code:'6500000',
        detail:['제주특별자치도'],
        detail_code:['6500000']
    }
]

export default sidoList;