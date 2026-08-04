/* =========================================================
   TADAT MODULE
   Excel jadvali asosida: 9 ta POA + 35 ta indikator
========================================================= */

const TADAT_SUMMARY = [
  {
    poa: "POA 1",
    descriptionUz: "Ro‘yxatdan o‘tgan soliq to‘lovchilar bazasining mukammalligi",
    descriptionEn: "Integrity of Registered Taxpayer Base",
    range: "P1-1 - P1-2",
    statusUz: "To‘liq kiritildi",
    statusEn: "Complete"
  },
  {
    poa: "POA 2",
    descriptionUz: "Riskni samarali boshqarish",
    descriptionEn: "Effective Risk Management",
    range: "P2-3 - P2-7",
    statusUz: "To‘liq kiritildi",
    statusEn: "Complete"
  },
  {
    poa: "POA 3",
    descriptionUz: "Ixtiyoriy rioya etishni qo‘llab-quvvatlash",
    descriptionEn: "Supporting Voluntary Compliance",
    range: "P3-8 - P3-12",
    statusUz: "To‘liq kiritildi",
    statusEn: "Complete"
  },
  {
    poa: "POA 4",
    descriptionUz: "Soliq deklaratsiyalarini o‘z vaqtida taqdim etish",
    descriptionEn: "Timely Filing of Tax Declarations",
    range: "P4-13 - P4-15",
    statusUz: "To‘liq kiritildi",
    statusEn: "Complete"
  },
  {
    poa: "POA 5",
    descriptionUz: "Soliqlarni o‘z vaqtida to‘lash",
    descriptionEn: "Timely Payment of Taxes",
    range: "P5-16 - P5-20",
    statusUz: "To‘liq kiritildi",
    statusEn: "Complete"
  },
  {
    poa: "POA 6",
    descriptionUz: "Deklaratsiyalardagi ma’lumotlarning to‘g‘riligi",
    descriptionEn: "Accurate Reporting in Declarations",
    range: "P6-21 - P6-24",
    statusUz: "To‘liq kiritildi",
    statusEn: "Complete"
  },
  {
    poa: "POA 7",
    descriptionUz: "Soliq nizolarini samarali hal etish",
    descriptionEn: "Effective Tax Dispute Resolution",
    range: "P7-25 - P7-27",
    statusUz: "To‘liq kiritildi",
    statusEn: "Complete"
  },
  {
    poa: "POA 8",
    descriptionUz: "Samarali faoliyat va daromadlarni oqilona boshqarish",
    descriptionEn: "Efficient Revenue Management",
    range: "P8-28 - P8-31",
    statusUz: "To‘liq kiritildi",
    statusEn: "Complete"
  },
  {
    poa: "POA 9",
    descriptionUz: "Hisobdorlik va shaffoflik",
    descriptionEn: "Accountability and Transparency",
    range: "P9-32 - P9-35",
    statusUz: "To‘liq kiritildi",
    statusEn: "Complete"
  }
];
const TADAT_INDICATORS = [
  {
    "poa": "POA 1",
    "code": "P1-1",
    "nameUz": "Soliq to'lovchilar ma'lumotlar bazasining aniqligi va ishonchliligi.",
    "nameEn": "Accuracy and integrity of the registered taxpayer base.",
    "dimension": "The registry maintenance and verification procedures.",
    "criteriaUz": "(i) Soliq idorasi soliq to'lovchilar reyestrini muntazam tozalash va yangilash bo'yicha tasdiqlangan reglamentga ega.\n(ii) Kamida har chorakda uchinchi tomon ma'lumotlari (banklar, kadastr, adliya) bilan avtomatlashtirilgan o'zaro solishtirish (cross-checking) o'tkaziladi.\n(iii) IFUT, manzillar va aloqa ma'lumotlari 100% aniqlik bilan yuritiladi.\n(iv) Nofaol subyektlar avtomatik ravishda 'Arxiv' yoki 'Nofaol' maqomiga o'tkaziladi.",
    "criteriaEn": "(i) The tax administration has approved regulations for systematic cleaning and updating of the taxpayer registry.\n(ii) At least on a quarterly basis, large-scale automated cross-checking is conducted with third-party data (banks, cadastre, justice ministry).\n(iii) ISIC economic activities, addresses, and contact info are maintained with 100% accuracy.\n(iv) Inactive entities are automatically moved to 'Archive' or 'Inactive' status without manual intervention.",
    "status": "Complete"
  },
  {
    "poa": "POA 1",
    "code": "P1-2",
    "nameUz": "Ro'yxatdan o'tish jarayonining qulayligi va xizmatlar qamrovi.",
    "nameEn": "Facilitating registration and coverage of services.",
    "dimension": "Online registration capabilities and interoperability.",
    "criteriaUz": "(i) Ro'yxatdan o'tish jarayoni 100% onlayn, masofaviy va bepul (24/7).\n(ii) Davlat xizmatlari tizimlari bilan API integratsiyasi joriy qilingan bo'lib, STIR va shaxsiy kabinet avtomatik ochiladi.\n(iii) Hech qanday qog'oz hujjat talab etilmaydi.",
    "criteriaEn": "(i) Registration is 100% online, remote, and free of charge (24/7).\n(ii) Full API integration with government service registries automatically assigns a TIN and opens a personal account instantly.\n(iii) No physical paperwork or in-person visit is required.",
    "status": "Complete"
  },
  {
    "poa": "POA 2",
    "code": "P2-3",
    "nameUz": "Tashqi rioya etmaslik risklarini aniqlash va tahlil qilish tizimi.",
    "nameEn": "Identification and analysis of external compliance risks.",
    "dimension": "Macro and micro-level risk analysis and profiling.",
    "criteriaUz": "(i) Risklar Big Data va intellektual tahlil (Data Analytics) tizimlari orqali aniqlanadi.\n(ii) Tahlil barcha to'rtta soliq majburiyatlari va asosiy soliqlar kesimida o'tkaziladi.\n(iii) Rasmiy Risk Registri har yili yangilanadi.",
    "criteriaEn": "(i) Compliance risks are identified via central Big Data and advanced smart analytics systems.\n(ii) Assessment covers all four core obligations across major tax types.\n(iii) An official Risk Register is comprehensively updated and approved by senior management at least annually.",
    "status": "Complete"
  },
  {
    "poa": "POA 2",
    "code": "P2-4",
    "nameUz": "Riskni kamaytirish va yumshatish dasturlarining samaradorligi.",
    "nameEn": "Effectiveness of risk mitigation and reduction programs.",
    "dimension": "Compliance Improvement Plans implementation.",
    "criteriaUz": "(i) Yuqori riskli sohalar uchun maxsus maqsadli 'Roya etishni yaxshilash rejalari' (CIP) ishlab chiqilgan.\n(ii) Dasturlar faqat audit bilan cheklanmay, proaktiv ogohlantirish va elektron xizmatlarni o'z ichiga oladi.\n(iii) Ta'sir doimiy baholanadi va ijobiy o'zgarish dalillari mavjud.",
    "criteriaEn": "(i) Targeted 'Compliance Improvement Plans' (CIP) are implemented for highest risk segments.\n(ii) Mitigation actions go beyond auditing, incorporating proactive alerts, educational campaigns, and automated services.\n(iii) Program impact is strictly measured with clear evidence of positive compliance behavior shift.",
    "status": "Complete"
  },
  {
    "poa": "POA 2",
    "code": "P2-5",
    "nameUz": "Soliq firibgarliklari va qasddan bo'yin tovlashni aniqlash.",
    "nameEn": "Detection of tax fraud and evasion.",
    "dimension": "Specialized tax crimes intelligence and international exchange.",
    "criteriaUz": "(i) Og'ir soliq firibgarliklari va shubhali sxemalarni aniqlash bo'yicha maxsus tezkor tahlil bo'linmalari mavjud.\n(ii) Grafik tahlil (Graph Analytics) qo'llaniladi.\n(iii) Xalqaro avtomatik ma'lumot almashish tizimlari (CRS, FATCA) to'liq ishlaydi.",
    "criteriaEn": "(i) Specialized intelligence and operational analysis units investigate tax fraud and evasion schemes.\n(ii) Network graph analytics are utilized to trace artificial transactions.\n(iii) International automatic exchange of information frameworks (CRS, FATCA, CbC) are fully operational.",
    "status": "Complete"
  },
  {
    "poa": "POA 2",
    "code": "P2-6",
    "nameUz": "Institutsional va operatsion risklarni boshqarish.",
    "nameEn": "Institutional and operational risk management.",
    "dimension": "Business Continuity and IT Security Infrastructure.",
    "criteriaUz": "(i) Favqulodda vaziyatlar uchun 'Biznes uzluksizligi rejasi' (BCP) va 'Tizimni tiklash rejasi' (DRP) mavjud.\n(ii) Axborot xavfsizligi ISO/IEC 27001 xalqaro standartlariga to'liq mos keladi.\n(iii) Geografik uzoqlikda joylashgan zaxira serverlar markazi ishlaydi.",
    "criteriaEn": "(i) Officially approved and periodically tested Business Continuity (BCP) and Disaster Recovery (DRP) plans exist.\n(ii) IT infrastructure security fully aligns with ISO/IEC 27001 standards.\n(iii) A geographically separated backup Data Center ensures near real-time data synchronization and 100% failover capacity.",
    "status": "Complete"
  },
  {
    "poa": "POA 2",
    "code": "P2-7",
    "nameUz": "Inson resurslari va ichki operatsiyalar risklarini nazorat qilish.",
    "nameEn": "Control of human resources and internal operations risks.",
    "dimension": "HR mitigation strategies and corruption risk profiling.",
    "criteriaUz": "(i) Kadrlar qo'nimsizligi, malaka yetishmovchiligi va korrupsion xavflarni boshqarish strategiyasi mavjud.\n(ii) Lavozimlarga tayinlash inson omilisiz, shaffof KPI va elektron tanlov orqali amalga oshiriladi.\n(iii) Xodimlarning majburiy davriy rotatsiya tizimi yo'lga qo'yilgan.",
    "criteriaEn": "(i) An integrated HR risk strategy mitigates staff turnover, skill gaps, and internal corruption.\n(ii) Recruitment, promotions, and bonuses are managed without human bias via digital transparent merit/KPI platforms.\n(iii) Periodic mandatory job rotation is strictly enforced for high corruption-risk positions.",
    "status": "Complete"
  },
  {
    "poa": "POA 3",
    "code": "P3-8",
    "nameUz": "Soliq to'lovchilarga ma'lumot taqdim etish kanallari samaradorligi.",
    "nameEn": "Effectiveness of information channels to taxpayers.",
    "dimension": "Availability, accessibility, and update of digital information.",
    "criteriaUz": "(i) Qonunchilik va tartiblar barcha raqamli platformalarda (veb-sayt, mobil ilova) 100% ochiq va mutlaqo bepul.\n(ii) Materiallar qonun o'zgarganda real vaqtda yangilanadi.\n(iii) Segmentlar uchun soddalashtirilgan interaktiv qo'llanmalar mavjud.",
    "criteriaEn": "(i) Tax laws, return forms, and administrative rules are 100% public, transparent, and completely free on all key digital channels.\n(ii) Explanatory materials are updated in real time whenever legislation changes.\n(iii) Targeted interactive manuals are provided for specific taxpayer segments.",
    "status": "Complete"
  },
  {
    "poa": "POA 3",
    "code": "P3-9",
    "nameUz": "Soliq maslahatlari va rasmiy tushuntirishlarning sifati.",
    "nameEn": "Quality of tax advice and official rulings.",
    "dimension": "Certainty and legal binding of tax administration rulings.",
    "criteriaUz": "(i) Rasmiy soliq maslahatlari va yuridik xulosalar qonuniy jihatdan qat'iy va ziddiyatlardan xoli.\n(ii) Soliq to'lovchi rasmiy tushuntirishga asosan ish tutsa, unga jarima va penya qo'llanilmasligi kafolatlangan.\n(iii) Advance Tax Rulings instituti mavjud.",
    "criteriaEn": "(i) Official tax advice and rulings are legally consistent, definitive, and free of contradictions.\n(ii) Taxpayers acting in good faith based on written official advice are legally protected from penalties and interest.\n(iii) A robust Advance Tax Rulings system is available for major investments.",
    "status": "Complete"
  },
  {
    "poa": "POA 3",
    "code": "P3-10",
    "nameUz": "So'rovlar va murojaatlarni ko'rib chiqish muddatlari.",
    "nameEn": "Timeliness of responding to requests and inquiries.",
    "dimension": "Turnaround time for written and electronic communication.",
    "criteriaUz": "(i) Soliq to'lovchilarning barcha so'rovlariga javob berishning o'rtacha muddati 10 ish kunidan oshmaydi.\n(ii) Call-markazda qo'ng'iroqqa javob berish vaqti 2 daqiqadan kam.\n(iii) Avtomatlashtirilgan standart ma'lumotnomalar 5 daqiqada beriladi.",
    "criteriaEn": "(i) The average turnaround time for responding to all written and electronic inquiries does not exceed 10 business days.\n(ii) Call center response time is under 2 minutes with a First Contact Resolution rate above 85%.\n(iii) Standard digital certificates are issued automatically within 5 minutes.",
    "status": "Complete"
  },
  {
    "poa": "POA 3",
    "code": "P3-11",
    "nameUz": "Soliq to'lovchilar uchun ma'muriy xarajatlarni kamaytirish vositalari.",
    "nameEn": "Reducing administrative compliance costs for taxpayers.",
    "dimension": "Simplification of return forms and pre-filled systems.",
    "criteriaUz": "(i) Hisobot shakllari va talab qilinadigan hujjatlar minimal darajaga keltirilgan.\n(ii) Kichik tadbirkorlar va aholi uchun 'avtomatik to'ldiriladigan deklaratsiyalar' (pre-filled returns) tizimi keng joriy etilgan.",
    "criteriaEn": "(i) Administrative requirements and paperwork costs are minimized through constant format reviews.\n(ii) Pre-filled tax returns are extensively rolled out for small businesses and individuals using automated third-party source data stream inputs.",
    "status": "Complete"
  },
  {
    "poa": "POA 3",
    "code": "P3-12",
    "nameUz": "Soliq to'lovchilar fikri va qoniqish darajasini o'rganish.",
    "nameEn": "Monitoring taxpayer perception and satisfaction level.",
    "dimension": "Independent perception surveys and structured feedback loops.",
    "criteriaUz": "(i) Mustaqil tashqi tashkilotlar tomonidan har yili anonim va reprezentativ so'rovnomalar o'tkaziladi.\n(ii) Natijalar va tanqidiy fikrlar to'liq ochiq e'lon qilinadi.\n(iii) Aniqlangan salbiy holatlarni bartaraf etish bo'yicha muddatli Action Plan bajariladi.",
    "criteriaEn": "(i) Anonymous and representative perception surveys are conducted annually by independent external polling institutions.\n(ii) Complete survey results and critical findings are published openly.\n(iii) Time-bound remedial Action Plans are strictly implemented to resolve detected bottlenecks.",
    "status": "Complete"
  },
  {
    "poa": "POA 4",
    "code": "P4-13",
    "nameUz": "Yirik soliq to'lovchilar tomonidan deklaratsiyalarni topshirish intizomi.",
    "nameEn": "Filing rate of tax declarations by large taxpayers.",
    "dimension": "On-time filing performance for core taxes in the large segment.",
    "criteriaUz": "(i) Yirik soliq to'lovchilar segmentida barcha asosiy soliqlar (QQS, Foyda, JShODS) bo'yicha deklaratsiyalarni belgilangan muddatda topshirish darajasi kamida 95% ni tashkil etadi.\n(ii) Elektron kalendarlar orqali muddatidan oldin eslatmalar yuboriladi.",
    "criteriaEn": "(i) The on-time filing rate for all core taxes (VAT, CIT, PIT) in the large taxpayer segment is at least 95%.\n(ii) Large taxpayer offices monitor deadlines via electronic calendars and issue automated notifications prior to due dates.",
    "status": "Complete"
  },
  {
    "poa": "POA 4",
    "code": "P4-14",
    "nameUz": "Boshqa soliq to'lovchilar toifalari tomonidan deklaratsiyalarni topshirish darajasi.",
    "nameEn": "Filing rate of declarations by other taxpayer categories.",
    "dimension": "On-time filing performance for small, medium, and individuals.",
    "criteriaUz": "(i) Kichik, o'rta tadbirkorlik subyektlari va jismoniy shaxslar tomonidan deklaratsiyalarni o'z vaqtida topshirish darajasi kamida 90% ni tashkil etadi.\n(ii) Muddat o'tganda tizimli elektron ogohlantirishlar avtomat yuboriladi.",
    "criteriaEn": "(i) The average on-time filing rate for small, medium enterprises, and individuals required to file is at least 90%.\n(ii) System-generated electronic alerts are automatically dispatched immediately following statutory due dates.",
    "status": "Complete"
  },
  {
    "poa": "POA 4",
    "code": "P4-15",
    "nameUz": "Elektron deklaratsiyalash tizimining qamrovi va sifati.",
    "nameEn": "Scope and quality of electronic filing systems.",
    "dimension": "Percentage of returns filed digitally and logical controls.",
    "criteriaUz": "(i) Barcha asosiy soliq turlari bo'yicha soliq deklaratsiyalari 100% to'liq elektron ko'rinishda qabul qilinadi.\n(ii) Qog'oz ko'rinishida qabul qilish cheklangan.\n(iii) Tizim ichida avtomatlashtirilgan mantiqiy va arifmetik nazorat xatolarni joyida ko'rsatadi.",
    "criteriaEn": "(i) 100% of tax declarations for core taxes are received exclusively via digital portals using secure e-signatures.\n(ii) Physical paper return filing is legally and technically phased out.\n(iii) Portals feature built-in dynamic logical and mathematical error checks preventing submission of flawed returns.",
    "status": "Complete"
  },
  {
    "poa": "POA 5",
    "code": "P5-16",
    "nameUz": "Soliqlarni ixtiyoriy va o'z vaqtida to'lash ko'rsatkichi.",
    "nameEn": "On-time voluntary payment of taxes.",
    "dimension": "Percentage of self-assessed liabilities paid by the due date.",
    "criteriaUz": "(i) Hisoblangan joriy soliq majburiyatlarining kamida 90% i soliq to'lovchilar tomonidan majburiy undirish choralarsiz, mustaqil va o'z vaqtida davlat budjetiga to'lanadi.\n(ii) Avtomatlashtirilgan billing tizimidan foydalaniladi.",
    "criteriaEn": "(i) At least 90% of self-assessed current tax liabilities are paid into the state budget on time voluntarily, without requiring enforcement actions.\n(ii) The tax body utilizes automated dynamic billing codes for effortless matching.",
    "status": "Complete"
  },
  {
    "poa": "POA 5",
    "code": "P5-17",
    "nameUz": "Elektron to'lov tizimlarining ulushi va qulayligi.",
    "nameEn": "Proportion and accessibility of electronic payments.",
    "dimension": "Digital payment transaction volumes and channels.",
    "criteriaUz": "(i) Jami soliq to'lovlarining kamida 75% dan ortig'i elektron to'lov tizimlari va internet-banking orqali amalga oshiriladi.\n(ii) Shaxsiy kabinetda 'Yagona hisobvaraq' tizimi joriy etilgan.\n(iii) To'lov real vaqtda aks etib, taqiqlar yechiladi.",
    "criteriaEn": "(i) Over 75% of total tax collections (by value and volume) are processed via digital banking channels or unified automated clearing ports.\n(ii) A Single Account system consolidates all taxes into one dashboard.\n(iii) Payment matching happens in real-time, instantly clearing administrative holds.",
    "status": "Complete"
  },
  {
    "poa": "POA 5",
    "code": "P5-18",
    "nameUz": "Soliq qarzlarining umumiy hajmini nazorat qilish samaradorligi.",
    "nameEn": "Effectiveness of managing the total tax debt stock.",
    "dimension": "Ratio of total tax debt stock to annual gross revenue.",
    "criteriaUz": "(i) Soliq qarzlarining jami qoldig'i (undirilishi to'xtatilganlardan tashqari) yillik yalpi soliq tushumlari umumiy hajmining 10% idan kam qismini tashkil etadi.\n(ii) Qarzlar tarkibi muddati va risk darajasi bo'yicha segmentatsiyalanadi.",
    "criteriaEn": "(i) The total stock of overdue tax debt (excluding legally stayed or under dispute) is less than 10% of total annual gross tax revenue collections.\n(ii) Outstanding stock is aged and segmented automatically by risk and value duration.",
    "status": "Complete"
  },
  {
    "poa": "POA 5",
    "code": "P5-19",
    "nameUz": "Eski va muddati o'tgan qarzlarni boshqarish tizimi.",
    "nameEn": "Management of older and chronic tax debt.",
    "dimension": "Proportion of old debt in the stock and write-off policies.",
    "criteriaUz": "(i) Muddati 1 yildan oshgan eski qarzlarning jami soliq qarzi qoldig'idagi ulushi minimal (5% dan past) darajada saqlanadi.\n(ii) Umidsiz qarzlarni hisobdan chiqarishning (write-off) shaffof va qonuniy mexanizmlari amalda qo'llaniladi.",
    "criteriaEn": "(i) Older debt (aged over 12 months) constitutes less than 5% of the total tax debt stock.\n(ii) Clear, transparent, and legally binding criteria for the writing off of uncollectible/insolvent tax debt are actively applied.",
    "status": "Complete"
  },
  {
    "poa": "POA 5",
    "code": "P5-20",
    "nameUz": "Majburiy undirish choralarining samaradorligi va qonuniyligi.",
    "nameEn": "Efficiency of debt enforcement and collection tools.",
    "dimension": "Automation of enforcement tools and recovery rates.",
    "criteriaUz": "(i) Soliq qarzdorligini majburiy tartibda undirish jarayonlari (inkasso, hisobni muzlatish, xatlash) to'liq avtomatlashtirilgan.\n(ii) Inkasso topshiriqnomalari elektron yuborilib, to'lov bo'lishi bilan taqiqlar 5 daqiqada yechiladi.",
    "criteriaEn": "(i) Legal debt collection and enforcement actions (bank attachment, freezing orders, asset seizure) are fully automated and trigger dynamically based on system rules.\n(ii) Liens are sent electronically and automatically lift within 5 minutes of debt satisfaction.",
    "status": "Complete"
  },
  {
    "poa": "POA 6",
    "code": "P6-21",
    "nameUz": "Soliq auditi va tekshirishlar uchun subyektlarni tanlash tizimi.",
    "nameEn": "Tax audit and verification case selection process.",
    "dimension": "Risk-based automated selection versus subjective intervention.",
    "criteriaUz": "(i) Audit qilinadigan subyektlar 100% faqat inson aralashuvisiz, avtomatlashtirilgan Riskni tahlil qilish tizimi ballari asosida tanlanadi.\n(ii) Subyektiv rejaviy tekshirishlar taqiqlangan.\n(iii) Audit samaradorligi kamida 85% ni tashkil etadi.",
    "criteriaEn": "(i) 100% of tax audit and field verification cases are selected strictly by centralized automated risk-scoring engines without human intervention.\n(ii) Subjective ad-hoc selection by staff or executives is legally and technically blocked.\n(iii) Audit hit-rate yields positive adjustment findings in at least 85% of cases.",
    "status": "Complete"
  },
  {
    "poa": "POA 6",
    "code": "P6-22",
    "nameUz": "Uchinchi tomon ma'lumotlaridan foydalanish ko'lami va sifati.",
    "nameEn": "Scope and quality of third-party data utilization.",
    "dimension": "Cross-matching automation with external databases.",
    "criteriaUz": "(i) Bojxona, bank aylanmalari, davlat xaridlari va kadastr ma'lumotlari real vaqtda kelib tushadi.\n(ii) Tizim deklaratsiya ma'lumotlarini ushbu tashqi manbalar bilan avtomatik o'zaro solishtiradi va tafovvutlarni aniqlaydi.",
    "criteriaEn": "(i) Comprehensive real-time data feeds are integrated from customs, commercial bank wires, land titles, and procurement nodes.\n(ii) The data architecture cross-matches return disclosures automatically with third-party sources, auto-flagging discrepancies instantly.",
    "status": "Complete"
  },
  {
    "poa": "POA 6",
    "code": "P6-23",
    "nameUz": "Yashirin iqtisodiyot va norasmiy aylanmaga qarshi kurash vositalari.",
    "nameEn": "Countering shadow economy and informal market transactions.",
    "dimension": "Implementation of digital transaction trace tools.",
    "criteriaUz": "(i) Chakana savdoda onlayn-NKM 100% joriy etilgan.\n(ii) Elektron hisob-fakturalar (EHF) va tovarlarni markalash zanjiri majburiy joriy etilgan.\n(iii) Xarid cheklari uchun keshbek (cashback) va jamoatchilik nazorati vositalari ishlamoqda.",
    "criteriaEn": "(i) Online cash registers (e-NKM) secure 100% coverage of B2C transactions in retail/hospitality.\n(ii) Mandatory electronic invoicing (EHF) and digital track-and-trace product labeling secure full visibility of supply chains.\n(iii) Cashback incentives maximize citizen whistleblower engagement.",
    "status": "Complete"
  },
  {
    "poa": "POA 6",
    "code": "P6-24",
    "nameUz": "Soliq bo'shlig'ini (Tax Gap) baholash metodologiyasi.",
    "nameEn": "Tax Gap analysis and estimation methodologies.",
    "dimension": "Econometric modeling of uncollected potential revenue.",
    "criteriaUz": "(i) Yirik soliq turlari bo'yicha Soliq bo'shlig'i (Tax Gap) xalqaro metodologiyalar (masalan, XVFning RA-GAP modeli) asosida har yili rasman hisoblab boriladi.\n(ii) Hisobotlar va uning natijalari hukumatga va jamoatchilikka ochiq taqdim etiladi.",
    "criteriaEn": "(i) Tax Gap metrics for all major revenue streams are calculated annually utilizing top international models (e.g., IMF RA-GAP).\n(ii) Detailed gap analysis findings are documented transparently and presented openly to parliament and the general public.",
    "status": "Complete"
  },
  {
    "poa": "POA 7",
    "code": "P7-25",
    "nameUz": "Soliq nizolarini ko'rib chiqish tizimining mustaqilligi.",
    "nameEn": "Independence of the tax dispute resolution mechanism.",
    "dimension": "Organizational and functional independence of pre-court appeals.",
    "criteriaUz": "(i) Sudgacha bo'lgan shikoyatlarni ko'rib chiquvchi Apellyatsiya kengashi audit departamentlaridan ham funksional, ham tashkiliy jihatdan mutlaqo mustaqil.\n(ii) Nizoli holatlarda soliq to'lovchining huquqlari prezyumsiyasi ta'minlanadi.",
    "criteriaEn": "(i) The administrative pre-court tax appeal board operates completely separate, both functionally and organizationally, from audit and operational execution commands.\n(ii) Legal presumptions favor the taxpayer in ambiguous grey areas.",
    "status": "Complete"
  },
  {
    "poa": "POA 7",
    "code": "P7-26",
    "nameUz": "Nizolarni ko'rib chiqish jarayonining shaffofligi va ochiqligi.",
    "nameEn": "Transparency and openness of the dispute resolution process.",
    "dimension": "Taxpayer rights, online visibility, and precedent databases.",
    "criteriaUz": "(i) Nizolarni ko'rib chiqish tartibi, muddatlari ochiq va e'lon qilingan.\n(ii) Soliq to'lovchi o'z shikoyatining holatini elektron kabinet orqali real vaqtda kuzatadi.\n(iii) Anonimlashtirilgan qarorlar reyestri ochiq joylashtiriladi.",
    "criteriaEn": "(i) Appeal regulations, processing tracks, and deadlines are transparently accessible online.\n(ii) Taxpayers can trace their active case status and assigned adjudicators dynamically inside personal e-cabinets.\n(iii) Anonymized case law precedents are published for public view.",
    "status": "Complete"
  },
  {
    "poa": "POA 7",
    "code": "P7-27",
    "nameUz": "Shikoyat va arizalarni hal qilish tezkorligi va samaradorligi.",
    "nameEn": "Timeliness and promptness of resolving tax disputes.",
    "dimension": "Adherence to legal response deadlines for administrative appeals.",
    "criteriaUz": "(i) Ma'muriy shikoyat va arizalarning kamida 90% i qonunchilikda belgilangan muddatlarda yoki maksimal 30 kalendar kuni ichida to'liq hal qilinadi.\n(ii) Kechikishlar elektron nazorat tizimi orqali jazolanadi.",
    "criteriaEn": "(i) At least 90% of administrative tax appeals are fully finalized and resolved within legal statutory limits or a maximum of 30 calendar days.\n(ii) Delays automatically trigger automated red alerts within the internal CRM for management audit.",
    "status": "Complete"
  },
  {
    "poa": "POA 8",
    "code": "P8-28",
    "nameUz": "Tashkiliy faoliyatni boshqarish samaradorligi va monitoringi.",
    "nameEn": "Effectiveness of organizational performance management.",
    "dimension": "Senior leadership monitoring of key strategic performance areas.",
    "criteriaUz": "(i) Yuqori rahbariyat yutuqlarni: (a) har oyda: tushumlar, rioya etish darajasi, AKT va kadrlar, xarajatlar; (b) har yilda: jamoatchilik fikri va xodimlar sodiqligi bo'yicha baholaydi.\n(ii) Yutuqlar strategik maqsadlarga mos keladi.\n(iii) Tuzatish choralari monitoring qilinadi.",
    "criteriaEn": "(i) Senior leadership reviews progress across strategic domains: (a) Monthly: revenue, filing/payment compliance, IT availability/HR turnover, cost; (b) Annually: perception and staff engagement.\n(ii) Milestones align with core objectives.\n(iii) Corrective action plans are monitored.",
    "status": "Complete"
  },
  {
    "poa": "POA 8",
    "code": "P8-29",
    "nameUz": "Soliq tushumlari hisobini yuritishning mukammalligi.",
    "nameEn": "Integrity of tax revenue accounting systems.",
    "dimension": "Integration of tax ledger accounting with state treasury systems.",
    "criteriaUz": "(i) Soliq hisobi dasturiy ta'minotda xalqaro standartlar asosida yuritiladi.\n(ii) Davlat g'aznachiligi va Markaziy bank bilan real vaqt (real-time) integratsiyasi joriy qilingan.\n(iii) G'aznachilik va soliq idorasi o'rtasida avtomatlashtirilgan o'zaro solishtirish yo'lga qo'yilgan.",
    "criteriaEn": "(i) Financial recording of assessments, collections, and write-offs follows international double-entry standards via unified general ledger software.\n(ii) Seamless real-time interfaces run with central bank and state treasury.\n(iii) Automated reconciliation happens without human touch.",
    "status": "Complete"
  },
  {
    "poa": "POA 8",
    "code": "P8-30",
    "nameUz": "Soliq tushumlarini prognozlash salohiyati.",
    "nameEn": "Capacity and precision of tax revenue forecasting.",
    "dimension": "Utilization of advanced macroeconomic modeling tools and error rates.",
    "criteriaUz": "(i) Prognoz qilishda zamonaviy ekonometrik va statistik modellardan foydalaniladi.\n(ii) Haqiqiy yillik tushum va tasdiqlangan prognoz o'rtasidagi farq yillik miqyosda 3% dan oshmaydi.\n(iii) Soliq qonunchiligi o'zgarishining budjetga ta'siri baholanadi.",
    "criteriaEn": "(i) Tax receipts are modeled via micro-simulation and macro-econometric formulas factoring in elasticity matrices.\n(ii) The margin of variation between actual annual gross collections and the budgeted forecast is strictly within a 3% threshold.\n(iii) Elasticity reports inform fiscal policy changes.",
    "status": "Complete"
  },
  {
    "poa": "POA 8",
    "code": "P8-31",
    "nameUz": "Ortiqcha to'langan soliqlarni qaytarish (Refund) tizimi tezkorligi.",
    "nameEn": "Timeliness of processing and issuing tax refunds.",
    "dimension": "Turnaround speed for VAT and overpayment refund disbursements.",
    "criteriaUz": "(i) Ortiqcha to'langan soliqlar va QQSni qaytarish so'rovlarining kamida 90% i 30 kun ichida to'liq ijro etiladi.\n(ii) QQSni qaytarish jarayoni avtomatlashtirilgan risk-tahlil tizimi orqali o'tkaziladi.\n(iii) Intizomli subyektlar uchun tezlashtirilgan (7 kunlik) tartib ishlaydi.",
    "criteriaEn": "(i) At least 90% of valid overpaid tax and input VAT refund claims are processed and fully paid out to bank accounts within 30 days.\n(ii) Auditing of claims uses automated risk profiling engines.\n(iii) Fast-track green lanes execute refunds for low-risk filers inside 7 days.",
    "status": "Complete"
  },
  {
    "poa": "POA 9",
    "code": "P9-32",
    "nameUz": "Mustaqil tashqi davlat auditi nazorati.",
    "nameEn": "Independent external audit of financial operations.",
    "dimension": "Oversight by supreme audit institutions and publication of findings.",
    "criteriaUz": "(i) Soliq organining moliyaviy va operatsion faoliyati har yili Hisob palatasi tomonidan tekshiriladi.\n(ii) Tashqi audit INTOSAI xalqaro standartlari asosida o'tkaziladi.\n(iii) Batafsil hisobotlar va kamchiliklar jamoatchilik uchun ochiq e'lon qilinadi.",
    "criteriaEn": "(i) Operations undergo annual financial and performance compliance audits by the Supreme Audit Institution (e.g., Chamber of Accounts).\n(ii) Auditing strictly adheres to INTOSAI global benchmarks.\n(iii) Complete raw audit audit reports, observations, and recommendations are public.",
    "status": "Complete"
  },
  {
    "poa": "POA 9",
    "code": "P9-33",
    "nameUz": "Yillik faoliyat hisobotlarining jamoatchilikka ochiqligi.",
    "nameEn": "Public accountability and publication of annual performance.",
    "dimension": "Timeliness of releasing comprehensive corporate annual reports.",
    "criteriaUz": "(i) Yillik faoliyat hisoboti moliya yili tugagandan keyin keyingi 6 oy ichida rasmiy veb-saytda ochiq e'lon qilinadi.\n(ii) Hisobotda strategik rejaning bajarilishi, KPI ko'rsatkichlari, tushumlar, audit natijalari va xarajatlar aks etadi.",
    "criteriaEn": "(i) A detailed comprehensive annual performance review document is public within 6 months of the financial year close.\n(ii) Disclosures detail targeted vs actual KPI achievements, collections data, audit performance metrics, and administrative delivery cost breakdowns.",
    "status": "Complete"
  },
  {
    "poa": "POA 9",
    "code": "P9-34",
    "nameUz": "Strategik rejalashtirish va uning tizimli monitoringi.",
    "nameEn": "Strategic planning frameworks and systemic monitoring.",
    "dimension": "Presence of multi-year operational strategic plans and milestones.",
    "criteriaUz": "(i) Yaqin 3-5 yillik rivojlanish va raqamlashtirishni belgilovchi rasmiy 'Strategik Rivojlanish Rejasi' mavjud.\n(ii) Rejada o'lchanadigan maqsadli ko'rsatkichlar (Targets) va muddatlar belgilangan.\n(iii) Ijrosi har chorakda monitoring qilinadi.",
    "criteriaEn": "(i) A formal multi-year (3-5 years) Corporate Strategic Plan detailing modernization goals and digitalization maps is public.\n(ii) Frameworks spell out quantified milestone metrics connected to annual operational blueprints.\n(iii) Status updates are reviewed quarterly.",
    "status": "Complete"
  },
  {
    "poa": "POA 9",
    "code": "P9-35",
    "nameUz": "Ichki nazorat va korrupsiyaga qarshi kurashish tizimlari.",
    "nameEn": "Internal controls and anti-corruption frameworks.",
    "dimension": "Integrity units, secure whistleblower lines, and ethical management.",
    "criteriaUz": "(i) To'g'ridan-to'g'ri birinchi rahbarga bo'ysunadigan mustaqil Ichki xavfsizlik va korrupsiyaga qarshi kurashish departamenti mavjud.\n(ii) Anonim xabar berish imkonini beruvchi Whistleblowing tizimi himoyalangan.\n(iii) ISO 37001 standarti joriy etilgan.",
    "criteriaEn": "(i) A fully ring-fenced Internal Anti-Corruption and Integrity Assurance Command reports directly to the agency Head.\n(ii) Secure, anonymous digital whistleblowing intake channels guarantee informant data protection under legal penalty.\n(iii) ISO 37001 system standard is certified.",
    "status": "Complete"
  }
];


let tadatEventsBound = false;
let tadatOpenPoaSet = new Set();
let tadatEditingRowKey = null;
let tadatIndicatorTargetPoa = null;

function tadatSafeText(value) {
  if (typeof escapeHTML === "function") {
    return escapeHTML(value);
  }

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


const TADAT_TEXT = {
  all: {
    searchPlaceholder: "POA, indikator kodi, nomi yoki mezon bo‘yicha qidirish",
    allPoa: "Barcha POA",
    clear: "Tozalash",
    summaryTitle: "Natija sohalari (POA) bo‘yicha umumiy ko‘rinish",
    summarySubtitle: "Har bir qator ustiga bossangiz, shu POA ga tegishli indikatorlar va “A” bahosi mezonlari ochiladi",
    thArea: "Natija sohasi",
    thRange: "Indikator oralig‘i",
    thCount: "Soni",
    thStatus: "Holat",
    thOpen: "Ochish",
    thAction: "Action",
    emptyPoa: "Qidiruv bo‘yicha POA topilmadi",
    emptyIndicator: "Ushbu POA bo‘yicha ko‘rinadigan indikator topilmadi",
    noData: "Ma’lumot yo‘q",
    dimension: "Baholash o‘lchovi / Dimension",
    criteriaUz: "“A” bahosi mezonlari (UZ)",
    criteriaEn: "Scoring criteria for “A” (EN)",
    addRow: "Qator qo‘shish",
    rowModalLabel: "Yangi POA qatori",
    rowModalTitle: "Qator qo‘shish",
    rowPoa: "POA kodi",
    rowNameUz: "Natija sohasi (UZ)",
    rowNameEn: "Result area (EN)",
    rowRange: "Indikator oralig‘i",
    rowCount: "Soni",
    rowStatus: "Holat",
    rowCancel: "Bekor qilish",
    rowSave: "Saqlash",
    customBadge: "Yangi",
    editRow: "Tahrirlash",
    deleteRow: "O‘chirish",
    deleteRowConfirm: "Bu qatorni o‘chirasizmi?",
    addIndicator: "Mezon qo‘shish",
    deleteIndicator: "Indikatorni o‘chirish",
    deleteIndicatorConfirm: "Bu indikatorni o‘chirasizmi?",
    indicatorModalLabel: "POA ichiga indikator qo‘shish",
    indicatorModalTitle: "Mezonlar qatorini yaratish",
    indicatorPoa: "POA",
    indicatorCode: "Indikator kodi",
    indicatorNameUz: "Indikator nomi (UZ)",
    indicatorNameEn: "Indicator name (EN)",
    indicatorDimension: "Baholash o‘lchovi / Dimension",
    indicatorCriteriaUz: "“A” bahosi mezonlari (UZ)",
    indicatorCriteriaEn: "Scoring criteria for “A” (EN)",
    indicatorCancel: "Bekor qilish",
    indicatorSave: "Qo‘shish",
    indicatorRequired: "Indikator kodi, nomi va kamida bitta mezon kiritilishi kerak",
    customIndicatorBadge: "Yangi indikator",
    rowRequired: "POA kodi va natija sohasi kiritilishi kerak"
  },
  uz: {
    searchPlaceholder: "POA, indikator kodi, nomi yoki mezon bo‘yicha qidirish",
    allPoa: "Barcha POA",
    clear: "Tozalash",
    summaryTitle: "Natija sohalari (POA) bo‘yicha umumiy ko‘rinish",
    summarySubtitle: "Har bir qator ustiga bossangiz, shu POA ga tegishli indikatorlar va “A” bahosi mezonlari ochiladi",
    thArea: "Natija sohasi",
    thRange: "Indikator oralig‘i",
    thCount: "Soni",
    thStatus: "Holat",
    thOpen: "Ochish",
    thAction: "Action",
    emptyPoa: "Qidiruv bo‘yicha POA topilmadi",
    emptyIndicator: "Ushbu POA bo‘yicha ko‘rinadigan indikator topilmadi",
    noData: "Ma’lumot yo‘q",
    dimension: "Baholash o‘lchovi",
    criteriaUz: "“A” bahosi mezonlari",
    addRow: "Qator qo‘shish",
    rowModalLabel: "Yangi POA qatori",
    rowModalTitle: "Qator qo‘shish",
    rowPoa: "POA kodi",
    rowNameUz: "Natija sohasi",
    rowNameEn: "Inglizcha nomi",
    rowRange: "Indikator oralig‘i",
    rowCount: "Soni",
    rowStatus: "Holat",
    rowCancel: "Bekor qilish",
    rowSave: "Saqlash",
    customBadge: "Yangi",
    editRow: "Tahrirlash",
    deleteRow: "O‘chirish",
    deleteRowConfirm: "Bu qatorni o‘chirasizmi?",
    addIndicator: "Mezon qo‘shish",
    deleteIndicator: "Indikatorni o‘chirish",
    deleteIndicatorConfirm: "Bu indikatorni o‘chirasizmi?",
    indicatorModalLabel: "POA ichiga indikator qo‘shish",
    indicatorModalTitle: "Mezonlar qatorini yaratish",
    indicatorPoa: "POA",
    indicatorCode: "Indikator kodi",
    indicatorNameUz: "Indikator nomi",
    indicatorNameEn: "Inglizcha nomi",
    indicatorDimension: "Baholash o‘lchovi",
    indicatorCriteriaUz: "“A” bahosi mezonlari",
    indicatorCriteriaEn: "Inglizcha mezonlar",
    indicatorCancel: "Bekor qilish",
    indicatorSave: "Qo‘shish",
    indicatorRequired: "Indikator kodi, nomi va kamida bitta mezon kiritilishi kerak",
    customIndicatorBadge: "Yangi indikator",
    rowRequired: "POA kodi va natija sohasi kiritilishi kerak"
  },
  en: {
    searchPlaceholder: "Search by POA, indicator code, name or criteria",
    allPoa: "All POA",
    clear: "Clear",
    summaryTitle: "General overview by Performance Outcome Areas (POA)",
    summarySubtitle: "Click a row to open related indicators and scoring criteria for “A”",
    thArea: "Result area",
    thRange: "Indicator range",
    thCount: "Count",
    thStatus: "Status",
    thOpen: "Open",
    thAction: "Action",
    emptyPoa: "No POA found for the search query",
    emptyIndicator: "No visible indicators found for this POA",
    noData: "No data",
    dimension: "Dimension",
    criteriaEn: "Scoring criteria for “A”",
    addRow: "Add row",
    rowModalLabel: "New POA row",
    rowModalTitle: "Add row",
    rowPoa: "POA code",
    rowNameUz: "Result area (UZ)",
    rowNameEn: "Result area (EN)",
    rowRange: "Indicator range",
    rowCount: "Count",
    rowStatus: "Status",
    rowCancel: "Cancel",
    rowSave: "Save",
    customBadge: "New",
    editRow: "Edit",
    deleteRow: "Delete",
    deleteRowConfirm: "Delete this row?",
    addIndicator: "Add criteria",
    deleteIndicator: "Delete indicator",
    deleteIndicatorConfirm: "Delete this indicator?",
    indicatorModalLabel: "Add indicator into POA",
    indicatorModalTitle: "Create criteria rows",
    indicatorPoa: "POA",
    indicatorCode: "Indicator code",
    indicatorNameUz: "Indicator name (UZ)",
    indicatorNameEn: "Indicator name (EN)",
    indicatorDimension: "Dimension",
    indicatorCriteriaUz: "Scoring criteria for “A” (UZ)",
    indicatorCriteriaEn: "Scoring criteria for “A” (EN)",
    indicatorCancel: "Cancel",
    indicatorSave: "Add",
    indicatorRequired: "Indicator code, name and at least one criterion are required",
    customIndicatorBadge: "New indicator",
    rowRequired: "POA code and result area are required"
  }
};

const TADAT_CRITERIA_STORAGE_KEY = "strategiya_tadat_criteria_controls_v1";
const TADAT_CUSTOM_ROWS_STORAGE_KEY = "strategiya_tadat_custom_poa_rows_v1";
const TADAT_ROW_OVERRIDES_STORAGE_KEY = "strategiya_tadat_row_overrides_v1";
const TADAT_DELETED_ROWS_STORAGE_KEY = "strategiya_tadat_deleted_rows_v1";
const TADAT_CUSTOM_INDICATORS_STORAGE_KEY = "strategiya_tadat_custom_indicators_v1";
const TADAT_CUSTOM_CRITERIA_ROWS_STORAGE_KEY = "strategiya_tadat_custom_criteria_rows_v1";

function normalizeTadatCustomRow(row = {}) {
  const poa = String(row.poa || "").trim();
  const descriptionUz = String(row.descriptionUz || row.description || "").trim();
  const descriptionEn = String(row.descriptionEn || "").trim();
  const range = String(row.range || "").trim();
  const count = Math.max(0, Number(row.count) || 0);
  const statusType = ["complete", "process", "draft"].includes(row.statusType) ? row.statusType : "complete";

  return {
    id: row.id || `custom_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    poa,
    descriptionUz,
    descriptionEn: descriptionEn || descriptionUz,
    range,
    count,
    statusType,
    statusUz: statusType === "process" ? "Jarayonda" : statusType === "draft" ? "Qoralama" : "To‘liq kiritildi",
    statusEn: statusType === "process" ? "In progress" : statusType === "draft" ? "Draft" : "Complete",
    custom: true,
    createdAt: row.createdAt || new Date().toISOString(),
    updatedAt: row.updatedAt || new Date().toISOString()
  };
}

function getTadatCustomRows() {
  try {
    const raw = localStorage.getItem(TADAT_CUSTOM_ROWS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(normalizeTadatCustomRow).filter(row => row.poa && row.descriptionUz) : [];
  } catch (error) {
    console.error("TADAT custom rows read error:", error);
    return [];
  }
}

function saveTadatCustomRows(rows) {
  localStorage.setItem(TADAT_CUSTOM_ROWS_STORAGE_KEY, JSON.stringify(rows || []));
}

function getTadatDeletedRows() {
  try {
    const raw = localStorage.getItem(TADAT_DELETED_ROWS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch (error) {
    console.error("TADAT deleted rows read error:", error);
    return [];
  }
}

function saveTadatDeletedRows(rows) {
  localStorage.setItem(TADAT_DELETED_ROWS_STORAGE_KEY, JSON.stringify(rows || []));
}

function getTadatRowOverrides() {
  try {
    const raw = localStorage.getItem(TADAT_ROW_OVERRIDES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("TADAT row overrides read error:", error);
    return {};
  }
}

function saveTadatRowOverrides(overrides) {
  localStorage.setItem(TADAT_ROW_OVERRIDES_STORAGE_KEY, JSON.stringify(overrides || {}));
}

function getTadatRowKey(item) {
  return item.custom ? item.id : item.poa;
}

function applyTadatSummaryOverride(item) {
  const overrides = getTadatRowOverrides();
  const override = overrides[item.poa];

  if (!override) return item;

  const statusType = ["complete", "process", "draft"].includes(override.statusType) ? override.statusType : null;

  return {
    ...item,
    ...override,
    poa: item.poa,
    custom: false,
    statusType: statusType || item.statusType,
    statusUz: statusType === "process" ? "Jarayonda" : statusType === "draft" ? "Qoralama" : statusType === "complete" ? "To‘liq kiritildi" : item.statusUz,
    statusEn: statusType === "process" ? "In progress" : statusType === "draft" ? "Draft" : statusType === "complete" ? "Complete" : item.statusEn,
    updatedAt: override.updatedAt || item.updatedAt
  };
}

function getAllTadatSummary() {
  const deleted = new Set(getTadatDeletedRows());
  const baseRows = TADAT_SUMMARY
    .map(applyTadatSummaryOverride)
    .filter(item => !deleted.has(item.poa));

  return [...baseRows, ...getTadatCustomRows()];
}

function addTadatCustomRow(row) {
  const rows = getTadatCustomRows();
  const normalized = normalizeTadatCustomRow(row);

  if (!normalized.poa || !normalized.descriptionUz) {
    alert(tadatText("rowRequired"));
    return null;
  }

  const exists = getAllTadatSummary().some(item => item.poa.toLowerCase() === normalized.poa.toLowerCase());
  if (exists) {
    const ok = confirm("Bu POA kodi mavjud. Baribir qo‘shilsinmi?");
    if (!ok) return null;
  }

  rows.push(normalized);
  saveTadatCustomRows(rows);
  return normalized;
}

function updateTadatSummaryRow(rowKey, patch) {
  const rows = getTadatCustomRows();
  const customIndex = rows.findIndex(row => row.id === rowKey);

  if (customIndex !== -1) {
    rows[customIndex] = normalizeTadatCustomRow({
      ...rows[customIndex],
      ...patch,
      id: rows[customIndex].id,
      createdAt: rows[customIndex].createdAt,
      updatedAt: new Date().toISOString()
    });
    saveTadatCustomRows(rows);
    return rows[customIndex];
  }

  const base = TADAT_SUMMARY.find(item => item.poa === rowKey);
  if (!base) return null;

  const overrides = getTadatRowOverrides();
  const statusType = ["complete", "process", "draft"].includes(patch.statusType) ? patch.statusType : "complete";

  overrides[rowKey] = {
    descriptionUz: String(patch.descriptionUz || base.descriptionUz || "").trim(),
    descriptionEn: String(patch.descriptionEn || base.descriptionEn || "").trim(),
    range: String(patch.range || base.range || "").trim(),
    count: Math.max(0, Number(patch.count) || 0),
    statusType,
    statusUz: statusType === "process" ? "Jarayonda" : statusType === "draft" ? "Qoralama" : "To‘liq kiritildi",
    statusEn: statusType === "process" ? "In progress" : statusType === "draft" ? "Draft" : "Complete",
    updatedAt: new Date().toISOString()
  };

  saveTadatRowOverrides(overrides);
  return applyTadatSummaryOverride(base);
}

function deleteTadatSummaryRow(rowKey) {
  const rows = getTadatCustomRows();
  const customRow = rows.find(row => row.id === rowKey);

  if (customRow) {
    saveTadatCustomRows(rows.filter(row => row.id !== rowKey));
    tadatOpenPoaSet.delete(customRow.poa);
    return;
  }

  const base = TADAT_SUMMARY.find(item => item.poa === rowKey);
  if (!base) return;

  const deletedRows = getTadatDeletedRows();
  if (!deletedRows.includes(base.poa)) {
    deletedRows.push(base.poa);
    saveTadatDeletedRows(deletedRows);
  }

  tadatOpenPoaSet.delete(base.poa);
}


function normalizeTadatCustomIndicator(item = {}) {
  const poa = String(item.poa || "").trim();
  const code = String(item.code || "").trim();
  const nameUz = String(item.nameUz || item.name || "").trim();
  const nameEn = String(item.nameEn || "").trim();
  const dimension = String(item.dimension || "").trim();
  const criteriaUz = String(item.criteriaUz || "").trim();
  const criteriaEn = String(item.criteriaEn || "").trim();

  return {
    id: item.id || `indicator_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    poa,
    code,
    nameUz,
    nameEn: nameEn || nameUz,
    dimension,
    criteriaUz,
    criteriaEn: criteriaEn || criteriaUz,
    status: "Complete",
    custom: true,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString()
  };
}

function getTadatCustomIndicators() {
  try {
    const raw = localStorage.getItem(TADAT_CUSTOM_INDICATORS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.map(normalizeTadatCustomIndicator).filter(item => item.poa && item.code && item.nameUz)
      : [];
  } catch (error) {
    console.error("TADAT custom indicators read error:", error);
    return [];
  }
}

function saveTadatCustomIndicators(items) {
  localStorage.setItem(TADAT_CUSTOM_INDICATORS_STORAGE_KEY, JSON.stringify(items || []));
}

function getAllTadatIndicators() {
  return [...TADAT_INDICATORS, ...getTadatCustomIndicators()];
}

function addTadatCustomIndicator(item) {
  const normalized = normalizeTadatCustomIndicator(item);

  if (!normalized.poa || !normalized.code || !normalized.nameUz || !normalized.criteriaUz) {
    alert(tadatText("indicatorRequired"));
    return null;
  }

  const items = getTadatCustomIndicators();
  const duplicate = getAllTadatIndicators().some(indicator => indicator.code.toLowerCase() === normalized.code.toLowerCase());
  if (duplicate) {
    const ok = confirm("Bu indikator kodi mavjud. Baribir qo‘shilsinmi?");
    if (!ok) return null;
  }

  items.push(normalized);
  saveTadatCustomIndicators(items);
  return normalized;
}

function deleteTadatCustomIndicator(indicatorId) {
  const items = getTadatCustomIndicators();
  const target = items.find(item => item.id === indicatorId);

  if (!target) return;

  saveTadatCustomIndicators(items.filter(item => item.id !== indicatorId));
}


function getTadatCustomCriteriaState() {
  try {
    const raw = localStorage.getItem(TADAT_CUSTOM_CRITERIA_ROWS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("TADAT custom criteria rows read error:", error);
    return {};
  }
}

function saveTadatCustomCriteriaState(state) {
  localStorage.setItem(TADAT_CUSTOM_CRITERIA_ROWS_STORAGE_KEY, JSON.stringify(state || {}));
}

function makeTadatCustomCriteriaGroupKey(code, lang) {
  return `${code}__${lang}`;
}

function normalizeTadatCustomCriteriaRow(row = {}) {
  return {
    id: row.id || `criteria_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    text: String(row.text || "").trim(),
    createdAt: row.createdAt || new Date().toISOString(),
    updatedAt: row.updatedAt || new Date().toISOString()
  };
}

function getTadatCustomCriteriaRows(code, lang) {
  const state = getTadatCustomCriteriaState();
  const key = makeTadatCustomCriteriaGroupKey(code, lang);
  const rows = Array.isArray(state[key]) ? state[key] : [];

  return rows
    .map(normalizeTadatCustomCriteriaRow)
    .filter(row => row.text);
}

function addTadatCustomCriteriaRow(code, lang) {
  const labels = getTadatCriteriaTableLabels(lang);
  const next = prompt(labels.addCriteriaPrompt || "Yangi mezon matnini kiriting");

  if (next === null) return;

  const text = String(next || "").trim();
  if (!text) return;

  const state = getTadatCustomCriteriaState();
  const groupKey = makeTadatCustomCriteriaGroupKey(code, lang);
  const rows = Array.isArray(state[groupKey]) ? state[groupKey] : [];

  rows.push(normalizeTadatCustomCriteriaRow({ text }));
  state[groupKey] = rows;

  saveTadatCustomCriteriaState(state);
}

function getTadatCriteriaState() {
  try {
    const raw = localStorage.getItem(TADAT_CRITERIA_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("TADAT criteria state read error:", error);
    return {};
  }
}

function saveTadatCriteriaState(state) {
  try {
    localStorage.setItem(TADAT_CRITERIA_STORAGE_KEY, JSON.stringify(state || {}));
  } catch (error) {
    console.error("TADAT criteria state save error:", error);
    alert("Fayl yoki ma'lumot browser xotirasiga saqlanmadi. Fayl hajmi katta bo'lishi mumkin.");
  }
}

function makeTadatCriteriaKey(code, lang, index) {
  return `${code}__${lang}__${index}`;
}

function getTadatCriteriaRecord(key) {
  const state = getTadatCriteriaState();
  return state[key] || { status: "", note: "", file: null, text: "" };
}

function getTadatOriginalCriteriaText(key) {
  const parts = String(key || "").split("__");
  if (parts.length < 3) return "";

  const [code, lang, indexText] = parts;
  const index = Number(indexText);
  const item = getAllTadatIndicators().find(indicator => indicator.code === code);

  if (!item || Number.isNaN(index)) return "";

  const list = splitTadatCriteria(lang === "en" ? item.criteriaEn : item.criteriaUz);
  return list[index] || "";
}

function getTadatCriteriaDisplayText(key, fallbackText) {
  const record = getTadatCriteriaRecord(key);
  return String(record.text || fallbackText || "");
}

function editTadatCriteriaText(key) {
  const labels = getTadatCriteriaTableLabels("uz");
  const current = getTadatCriteriaDisplayText(key, getTadatOriginalCriteriaText(key));
  const next = prompt(labels.editPrompt || "Mezon matnini tahrirlang", current);

  if (next === null) return;

  updateTadatCriteriaRecord(key, {
    text: String(next).trim() || current
  });
}

function updateTadatCriteriaRecord(key, patch) {
  const state = getTadatCriteriaState();
  state[key] = {
    ...(state[key] || { status: "", note: "", file: null }),
    ...patch,
    updatedAt: new Date().toISOString()
  };
  saveTadatCriteriaState(state);
}

function removeTadatCriteriaFile(key) {
  const state = getTadatCriteriaState();
  if (!state[key]) return;
  state[key] = {
    ...state[key],
    file: null,
    updatedAt: new Date().toISOString()
  };
  saveTadatCriteriaState(state);
}

function getTadatCriteriaStatusOptions(currentValue) {
  const mode = getTadatLangMode();
  const labels = mode === "en"
    ? [
      ["", "Select"],
      ["mavjud", "Available"],
      ["mavjud_emas", "Not available"],
      ["jarayonda", "In progress"]
    ]
    : [
      ["", "Tanlang"],
      ["mavjud", "Mavjud"],
      ["mavjud_emas", "Mavjud emas"],
      ["jarayonda", "Jarayonda"]
    ];

  return labels.map(([value, label]) => `
    <option value="${value}" ${currentValue === value ? "selected" : ""}>${label}</option>
  `).join("");
}

function getTadatCriteriaTableLabels(lang) {
  const mode = getTadatLangMode();

  if (mode === "en" || lang === "en") {
    return {
      criteria: "Criteria",
      status: "Status",
      note: "Comment",
      action: "Action",
      upload: "Upload",
      download: "Download",
      edit: "Edit",
      delete: "Delete",
      notePlaceholder: "Enter comment",
      fileMissing: "No uploaded file",
      editPrompt: "Edit criterion text",
      addCriteriaRow: "Add row",
      addCriteriaPrompt: "Enter new criterion text"
    };
  }

  return {
    criteria: "Mezonlar",
    status: "Holat",
    note: "Izoh",
    action: "Action",
    upload: "Upload",
    download: "Download",
    edit: "Tahrirlash",
    delete: "Delete",
    notePlaceholder: "Izoh kiriting",
    fileMissing: "Yuklangan fayl yo‘q",
    editPrompt: "Mezon matnini tahrirlang",
    addCriteriaRow: "Qator qo‘shish",
    addCriteriaPrompt: "Yangi mezon matnini kiriting"
  };
}

function getTadatCriteriaSectionTitle(lang) {
  const mode = getTadatLangMode();

  if (mode === "en" || lang === "en") {
    return "Scoring criteria for “A”";
  }

  return "“A” bahosi mezonlari";
}

function getTadatFileInputId(key) {
  return `tadatFile_${String(key).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}

function downloadTadatCriteriaFile(key) {
  const record = getTadatCriteriaRecord(key);

  if (!record.file || !record.file.data) {
    alert(getTadatCriteriaTableLabels("uz").fileMissing);
    return;
  }

  const link = document.createElement("a");
  link.href = record.file.data;
  link.download = record.file.name || "tadat-file";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function readTadatFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getShortTadatFileName(name) {
  const value = String(name || "");
  return value.length > 22 ? value.slice(0, 19) + "..." : value;
}

function getTadatLangMode() {
  const mode = document.getElementById("tadatLangFilter")?.value || "uz";
  return ["uz", "en"].includes(mode) ? mode : "uz";
}

function tadatText(key) {
  const mode = getTadatLangMode();
  return TADAT_TEXT[mode]?.[key] || TADAT_TEXT.all[key] || key;
}

function getTadatSummaryDescription(item) {
  const mode = getTadatLangMode();

  if (mode === "uz") return item.descriptionUz || item.description || "";
  if (mode === "en") return item.descriptionEn || item.description || "";

  return `${item.descriptionUz || ""} / ${item.descriptionEn || ""}`.trim();
}

function getTadatSummaryStatus(item) {
  const mode = getTadatLangMode();

  if (mode === "uz") return item.statusUz || item.status || "";
  if (mode === "en") return item.statusEn || item.status || "";

  return `${item.statusUz || ""} / ${item.statusEn || ""}`.trim();
}

function applyTadatTexts() {
  const els = getTadatEls();

  if (els.searchInput) els.searchInput.placeholder = tadatText("searchPlaceholder");
  if (els.clearText) els.clearText.textContent = tadatText("clear");
  if (els.summaryTitle) els.summaryTitle.textContent = tadatText("summaryTitle");
  if (els.summarySubtitle) els.summarySubtitle.textContent = tadatText("summarySubtitle");
  if (els.summaryThArea) els.summaryThArea.textContent = tadatText("thArea");
  if (els.summaryThRange) els.summaryThRange.textContent = tadatText("thRange");
  if (els.summaryThCount) els.summaryThCount.textContent = tadatText("thCount");
  if (els.summaryThStatus) els.summaryThStatus.textContent = tadatText("thStatus");
  if (els.summaryThOpen) els.summaryThOpen.textContent = tadatText("thOpen");
  if (els.summaryThAction) els.summaryThAction.textContent = tadatText("thAction");

  if (els.addRowText) els.addRowText.textContent = tadatText("addRow");
  if (els.rowModalLabel) els.rowModalLabel.textContent = tadatText("rowModalLabel");
  if (els.rowModalTitle) els.rowModalTitle.textContent = tadatText("rowModalTitle");
  if (els.rowPoaLabel) els.rowPoaLabel.textContent = tadatText("rowPoa");
  if (els.rowNameUzLabel) els.rowNameUzLabel.textContent = tadatText("rowNameUz");
  if (els.rowNameEnLabel) els.rowNameEnLabel.textContent = tadatText("rowNameEn");
  if (els.rowRangeLabel) els.rowRangeLabel.textContent = tadatText("rowRange");
  if (els.rowCountLabel) els.rowCountLabel.textContent = tadatText("rowCount");
  if (els.rowStatusLabel) els.rowStatusLabel.textContent = tadatText("rowStatus");
  if (els.rowCancel) els.rowCancel.textContent = tadatText("rowCancel");
  if (els.rowSave) els.rowSave.textContent = tadatText("rowSave");

  if (els.indicatorModalLabel) els.indicatorModalLabel.textContent = tadatText("indicatorModalLabel");
  if (els.indicatorModalTitle) els.indicatorModalTitle.textContent = tadatText("indicatorModalTitle");
  if (els.indicatorPoaViewLabel) els.indicatorPoaViewLabel.textContent = tadatText("indicatorPoa");
  if (els.indicatorCodeLabel) els.indicatorCodeLabel.textContent = tadatText("indicatorCode");
  if (els.indicatorNameUzLabel) els.indicatorNameUzLabel.textContent = tadatText("indicatorNameUz");
  if (els.indicatorNameEnLabel) els.indicatorNameEnLabel.textContent = tadatText("indicatorNameEn");
  if (els.indicatorDimensionLabel) els.indicatorDimensionLabel.textContent = tadatText("indicatorDimension");
  if (els.indicatorCriteriaUzLabel) els.indicatorCriteriaUzLabel.textContent = tadatText("indicatorCriteriaUz");
  if (els.indicatorCriteriaEnLabel) els.indicatorCriteriaEnLabel.textContent = tadatText("indicatorCriteriaEn");
  if (els.indicatorCancel) els.indicatorCancel.textContent = tadatText("indicatorCancel");
  if (els.indicatorSave) els.indicatorSave.textContent = tadatText("indicatorSave");
}

function getTadatEls() {
  return {
    section: document.getElementById("tadatSection"),

    totalCount: document.getElementById("tadatTotalCount"),
    poaCount: document.getElementById("tadatPoaCount"),
    completeCount: document.getElementById("tadatCompleteCount"),
    visibleCount: document.getElementById("tadatVisibleCount"),

    searchInput: document.getElementById("tadatSearchInput"),
    poaFilter: document.getElementById("tadatPoaFilter"),
    langFilter: document.getElementById("tadatLangFilter"),
    clearBtn: document.getElementById("tadatClearBtn"),
    clearText: document.getElementById("tadatClearText"),

    addRowBtn: document.getElementById("tadatAddRowBtn"),
    addRowText: document.getElementById("tadatAddRowText"),
    rowModal: document.getElementById("tadatRowModal"),
    rowForm: document.getElementById("tadatRowForm"),
    rowClose: document.getElementById("tadatRowClose"),
    rowCancel: document.getElementById("tadatRowCancel"),
    rowSave: document.getElementById("tadatRowSave"),
    rowModalLabel: document.getElementById("tadatRowModalLabel"),
    rowModalTitle: document.getElementById("tadatRowModalTitle"),
    rowPoaLabel: document.getElementById("tadatRowPoaLabel"),
    rowNameUzLabel: document.getElementById("tadatRowNameUzLabel"),
    rowNameEnLabel: document.getElementById("tadatRowNameEnLabel"),
    rowRangeLabel: document.getElementById("tadatRowRangeLabel"),
    rowCountLabel: document.getElementById("tadatRowCountLabel"),
    rowStatusLabel: document.getElementById("tadatRowStatusLabel"),
    rowPoaInput: document.getElementById("tadatRowPoaInput"),
    rowNameUzInput: document.getElementById("tadatRowNameUzInput"),
    rowNameEnInput: document.getElementById("tadatRowNameEnInput"),
    rowRangeInput: document.getElementById("tadatRowRangeInput"),
    rowCountInput: document.getElementById("tadatRowCountInput"),
    rowStatusInput: document.getElementById("tadatRowStatusInput"),

    indicatorModal: document.getElementById("tadatIndicatorModal"),
    indicatorForm: document.getElementById("tadatIndicatorForm"),
    indicatorClose: document.getElementById("tadatIndicatorClose"),
    indicatorCancel: document.getElementById("tadatIndicatorCancel"),
    indicatorSave: document.getElementById("tadatIndicatorSave"),
    indicatorModalLabel: document.getElementById("tadatIndicatorModalLabel"),
    indicatorModalTitle: document.getElementById("tadatIndicatorModalTitle"),
    indicatorPoaInput: document.getElementById("tadatIndicatorPoaInput"),
    indicatorPoaView: document.getElementById("tadatIndicatorPoaView"),
    indicatorPoaViewLabel: document.getElementById("tadatIndicatorPoaViewLabel"),
    indicatorCodeLabel: document.getElementById("tadatIndicatorCodeLabel"),
    indicatorNameUzLabel: document.getElementById("tadatIndicatorNameUzLabel"),
    indicatorNameEnLabel: document.getElementById("tadatIndicatorNameEnLabel"),
    indicatorDimensionLabel: document.getElementById("tadatIndicatorDimensionLabel"),
    indicatorCriteriaUzLabel: document.getElementById("tadatIndicatorCriteriaUzLabel"),
    indicatorCriteriaEnLabel: document.getElementById("tadatIndicatorCriteriaEnLabel"),
    indicatorCodeInput: document.getElementById("tadatIndicatorCodeInput"),
    indicatorNameUzInput: document.getElementById("tadatIndicatorNameUzInput"),
    indicatorNameEnInput: document.getElementById("tadatIndicatorNameEnInput"),
    indicatorDimensionInput: document.getElementById("tadatIndicatorDimensionInput"),
    indicatorCriteriaUzInput: document.getElementById("tadatIndicatorCriteriaUzInput"),
    indicatorCriteriaEnInput: document.getElementById("tadatIndicatorCriteriaEnInput"),

    summaryTitle: document.getElementById("tadatSummaryTitle"),
    summarySubtitle: document.getElementById("tadatSummarySubtitle"),
    summaryThArea: document.getElementById("tadatSummaryThArea"),
    summaryThRange: document.getElementById("tadatSummaryThRange"),
    summaryThCount: document.getElementById("tadatSummaryThCount"),
    summaryThStatus: document.getElementById("tadatSummaryThStatus"),
    summaryThOpen: document.getElementById("tadatSummaryThOpen"),
    summaryThAction: document.getElementById("tadatSummaryThAction"),

    summaryGrid: document.getElementById("tadatSummaryGrid"),
    tableBody: document.getElementById("tadatTableBody"),
    tableInfo: document.getElementById("tadatTableInfo"),

    detailPanel: document.getElementById("tadatDetailPanel"),
    detailClose: document.getElementById("tadatDetailClose"),
    detailPoa: document.getElementById("tadatDetailPoa"),
    detailCode: document.getElementById("tadatDetailCode"),
    detailNameUz: document.getElementById("tadatDetailNameUz"),
    detailNameEn: document.getElementById("tadatDetailNameEn"),
    detailDimension: document.getElementById("tadatDetailDimension"),
    detailCriteriaUz: document.getElementById("tadatDetailCriteriaUz"),
    detailCriteriaEn: document.getElementById("tadatDetailCriteriaEn")
  };
}

function splitTadatCriteria(text) {
  return String(text || "")
    .split(/\n+/)
    .map(item => item.trim())
    .filter(Boolean);
}

function tadatCriteriaPreview(text) {
  const parts = splitTadatCriteria(text);
  const first = parts[0] || "";

  if (first.length <= 170) {
    return first;
  }

  return first.slice(0, 170).trim() + "...";
}

function getTadatIndicatorCountByPoa(poa) {
  return getAllTadatIndicators().filter(item => item.poa === poa).length;
}

function getTadatIndicatorsByPoa(poa, sourceItems = getAllTadatIndicators()) {
  return sourceItems.filter(item => item.poa === poa);
}

function renderTadatPoaOptions() {
  const els = getTadatEls();
  if (!els.poaFilter) return;

  const current = els.poaFilter.value || "all";

  els.poaFilter.innerHTML = `<option value="all">${tadatText("allPoa")}</option>`;

  getAllTadatSummary().forEach(item => {
    const option = document.createElement("option");
    option.value = item.poa;
    option.textContent = `${item.poa} — ${item.range || ""}`;
    els.poaFilter.appendChild(option);
  });

  const allowed = ["all", ...getAllTadatSummary().map(item => item.poa)];

  if (allowed.includes(current)) {
    els.poaFilter.value = current;
  }
}

function getFilteredTadatIndicators() {
  const els = getTadatEls();

  const search = (els.searchInput?.value || "").trim().toLowerCase();
  const poa = els.poaFilter?.value || "all";

  return getAllTadatIndicators().filter(item => {
    const haystack = [
      item.poa,
      item.code,
      item.nameUz,
      item.nameEn,
      item.dimension,
      item.criteriaUz,
      item.criteriaEn
    ].join(" ").toLowerCase();

    const matchesSearch = !search || haystack.includes(search);
    const matchesPoa = poa === "all" || item.poa === poa;

    return matchesSearch && matchesPoa;
  });
}

function getVisibleTadatSummary(items) {
  const els = getTadatEls();
  const visiblePoaSet = new Set(items.map(item => item.poa));
  const activePoa = els.poaFilter?.value || "all";
  const search = (els.searchInput?.value || "").trim().toLowerCase();

  return getAllTadatSummary().filter(summary => {
    if (activePoa !== "all" && summary.poa !== activePoa) {
      return false;
    }

    if (summary.custom) {
      const haystack = [
        summary.poa,
        summary.descriptionUz,
        summary.descriptionEn,
        summary.range,
        summary.statusUz,
        summary.statusEn
      ].join(" ").toLowerCase();

      return !search || haystack.includes(search) || visiblePoaSet.has(summary.poa);
    }

    return visiblePoaSet.has(summary.poa);
  });
}

function renderTadatStats(visibleItems) {
  const els = getTadatEls();

  if (els.totalCount) els.totalCount.textContent = getAllTadatIndicators().length;
  if (els.poaCount) els.poaCount.textContent = getAllTadatSummary().length;
  if (els.completeCount) els.completeCount.textContent = getAllTadatSummary().length;
  if (els.visibleCount) els.visibleCount.textContent = visibleItems.length;
}

function renderTadatCriteriaControlTable(item, lang, criteriaText) {
  const originalParts = splitTadatCriteria(criteriaText);
  const customParts = getTadatCustomCriteriaRows(item.code, lang).map(row => row.text);
  const parts = [...originalParts, ...customParts];
  const labels = getTadatCriteriaTableLabels(lang);

  const rows = parts.length ? parts.map((part, index) => {
    const key = makeTadatCriteriaKey(item.code, lang, index);
    const record = getTadatCriteriaRecord(key);
    const inputId = getTadatFileInputId(key);
    const hasFile = Boolean(record.file && record.file.data);
    const displayText = getTadatCriteriaDisplayText(key, part);

    return `
      <tr>
        <td class="tadat-criteria-main-cell">
          <div class="tadat-criteria-number">${index + 1}</div>
          <div class="tadat-criteria-text">${tadatSafeText(displayText)}</div>
        </td>
        <td class="tadat-criteria-status-cell">
          <select class="tadat-criteria-status-select" data-tadat-criteria-key="${tadatSafeText(key)}">
            ${getTadatCriteriaStatusOptions(record.status || "")}
          </select>
        </td>
        <td class="tadat-criteria-note-cell">
          <input
            type="text"
            class="tadat-criteria-note-input"
            data-tadat-criteria-key="${tadatSafeText(key)}"
            value="${tadatSafeText(record.note || "")}"
            placeholder="${tadatSafeText(labels.notePlaceholder)}"
          >
        </td>
        <td class="tadat-criteria-action-cell">
          <div class="tadat-criteria-actions">
            <input
              type="file"
              id="${tadatSafeText(inputId)}"
              class="tadat-criteria-file-input"
              data-tadat-criteria-key="${tadatSafeText(key)}"
              hidden
            >
            <button type="button" class="tadat-criteria-action-btn upload" data-tadat-file-trigger="${tadatSafeText(inputId)}" title="${tadatSafeText(labels.upload)}" aria-label="${tadatSafeText(labels.upload)}">
              <i class="ri-upload-cloud-2-line"></i>
            </button>
            <button type="button" class="tadat-criteria-action-btn download" data-tadat-file-download="${tadatSafeText(key)}" ${hasFile ? "" : "disabled"} title="${tadatSafeText(hasFile ? record.file.name : labels.fileMissing)}" aria-label="${tadatSafeText(labels.download)}">
              <i class="ri-download-2-line"></i>
            </button>
            <button type="button" class="tadat-criteria-action-btn edit" data-tadat-criteria-edit="${tadatSafeText(key)}" title="${tadatSafeText(labels.edit)}" aria-label="${tadatSafeText(labels.edit)}">
              <i class="ri-edit-2-line"></i>
            </button>
            <button type="button" class="tadat-criteria-action-btn delete" data-tadat-file-delete="${tadatSafeText(key)}" ${hasFile ? "" : "disabled"} title="${tadatSafeText(labels.delete)}" aria-label="${tadatSafeText(labels.delete)}">
              <i class="ri-delete-bin-6-line"></i>
            </button>
          </div>
          <div class="tadat-criteria-file-name ${hasFile ? "has-file" : ""}">
            ${hasFile ? `<i class="ri-attachment-2"></i> ${tadatSafeText(getShortTadatFileName(record.file.name))}` : ""}
          </div>
        </td>
      </tr>
    `;
  }).join("") : `
    <tr>
      <td colspan="4">
        <div class="tadat-summary-detail-empty">${tadatSafeText(tadatText("noData"))}</div>
      </td>
    </tr>
  `;

  return `
    <div class="tadat-criteria-control-block">
      <div class="tadat-criteria-control-toolbar">
        <button
          type="button"
          class="tadat-add-criteria-row-btn"
          data-tadat-add-criteria-row="${tadatSafeText(item.code)}"
          data-tadat-add-criteria-lang="${tadatSafeText(lang)}"
        >
          <i class="ri-add-line"></i>
          <span>${tadatSafeText(labels.addCriteriaRow || "Qator qo‘shish")}</span>
        </button>
      </div>

      <div class="tadat-criteria-control-scroll">
        <table class="tadat-criteria-control-table">
          <thead>
            <tr>
              <th>${tadatSafeText(labels.criteria)}</th>
              <th class="tadat-criteria-status-head">${tadatSafeText(labels.status)}</th>
              <th class="tadat-criteria-note-head">${tadatSafeText(labels.note)}</th>
              <th class="tadat-criteria-action-head">${tadatSafeText(labels.action)}</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTadatSummaryIndicator(item) {
  const mode = getTadatLangMode();

  const titleHtml = mode === "uz"
    ? `<h4 class="tadat-summary-indicator-title">${tadatSafeText(item.nameUz)}</h4>`
    : mode === "en"
      ? `<h4 class="tadat-summary-indicator-title">${tadatSafeText(item.nameEn)}</h4>`
      : `
        <h4 class="tadat-summary-indicator-title tadat-col-uz">${tadatSafeText(item.nameUz)}</h4>
        <h4 class="tadat-summary-indicator-title tadat-col-en">${tadatSafeText(item.nameEn)}</h4>
      `;

  const criteriaHtml = mode === "uz"
    ? renderTadatCriteriaControlTable(item, "uz", item.criteriaUz)
    : mode === "en"
      ? renderTadatCriteriaControlTable(item, "en", item.criteriaEn)
      : `
        <div class="tadat-criteria-control-wrap">
          ${renderTadatCriteriaControlTable(item, "uz", item.criteriaUz)}
          ${renderTadatCriteriaControlTable(item, "en", item.criteriaEn)}
        </div>
      `;

  return `
    <article class="tadat-summary-indicator">
      <div class="tadat-summary-indicator-top">
        <div>
          <span class="tadat-summary-indicator-code">${tadatSafeText(item.code)}</span>
          ${item.custom ? `<span class="tadat-summary-custom-badge">${tadatSafeText(tadatText("customIndicatorBadge"))}</span>` : ""}
        </div>
        ${item.custom ? `
          <button type="button" class="tadat-summary-delete tadat-indicator-delete" data-tadat-delete-indicator="${tadatSafeText(item.id)}" title="${tadatSafeText(tadatText("deleteIndicator"))}">
            <i class="ri-delete-bin-6-line"></i>
          </button>
        ` : ""}
      </div>

      ${titleHtml}

      <div class="tadat-summary-dimension">
        <span>${tadatSafeText(tadatText("dimension"))}</span>
        <p>${tadatSafeText(item.dimension)}</p>
      </div>

      ${criteriaHtml}
    </article>
  `;
}

function renderTadatSummary(items) {
  const els = getTadatEls();
  if (!els.summaryGrid) return;

  const summaryItems = getVisibleTadatSummary(items);

  if (!summaryItems.length) {
    els.summaryGrid.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="tadat-empty">
            <i class="ri-search-2-line"></i><br>
            ${tadatSafeText(tadatText("emptyPoa"))}
          </div>
        </td>
      </tr>
    `;
    return;
  }

  els.summaryGrid.innerHTML = summaryItems.map(item => {
    const poaIndicators = getTadatIndicatorsByPoa(item.poa, items);
    const displayCount = poaIndicators.length || Number(item.count || 0);
    const isOpen = tadatOpenPoaSet.has(item.poa);

    return `
      <tr class="tadat-summary-row ${isOpen ? "open" : ""}" data-tadat-poa="${tadatSafeText(item.poa)}" aria-expanded="${isOpen ? "true" : "false"}">
        <td>
          <span class="tadat-poa-code">${tadatSafeText(item.poa)}</span>
        </td>
        <td>
          <div class="tadat-summary-desc">
            ${tadatSafeText(getTadatSummaryDescription(item))}
            ${item.custom ? `<span class="tadat-summary-custom-badge">${tadatSafeText(tadatText("customBadge"))}</span>` : ""}
          </div>
        </td>
        <td>
          <div class="tadat-summary-range">${tadatSafeText(item.range)}</div>
        </td>
        <td>
          <span class="tadat-summary-count">${displayCount}</span>
        </td>
        <td>
          <span class="tadat-summary-status">
            <i class="ri-check-line"></i>
            ${tadatSafeText(getTadatSummaryStatus(item))}
          </span>
        </td>
        <td>
          <span class="tadat-summary-toggle">
            <i class="ri-arrow-down-s-line"></i>
          </span>
        </td>
        <td>
          <div class="tadat-summary-row-actions">
            <button type="button" class="tadat-summary-edit" data-tadat-edit-row="${tadatSafeText(getTadatRowKey(item))}" title="${tadatSafeText(tadatText("editRow"))}">
              <i class="ri-edit-2-line"></i>
            </button>
            <button type="button" class="tadat-summary-delete" data-tadat-delete-row="${tadatSafeText(getTadatRowKey(item))}" title="${tadatSafeText(tadatText("deleteRow"))}">
              <i class="ri-delete-bin-6-line"></i>
            </button>
          </div>
        </td>
      </tr>
      <tr class="tadat-summary-detail-row" ${isOpen ? "" : "hidden"}>
        <td colspan="7">
          <div class="tadat-summary-detail">
            <div class="tadat-summary-detail-toolbar">
              <div>
                <strong>${tadatSafeText(item.poa)}</strong>
                <span>${tadatSafeText(getTadatSummaryDescription(item))}</span>
              </div>
              <button type="button" class="tadat-add-indicator-btn" data-tadat-add-indicator="${tadatSafeText(item.poa)}">
                <i class="ri-add-line"></i>
                ${tadatSafeText(tadatText("addIndicator"))}
              </button>
            </div>
            ${poaIndicators.length ? `
              <div class="tadat-summary-detail-grid">
                ${poaIndicators.map(renderTadatSummaryIndicator).join("")}
              </div>
            ` : `
              <div class="tadat-summary-detail-empty">
                ${tadatSafeText(tadatText("emptyIndicator"))}
                <br>
                <button type="button" class="tadat-add-indicator-empty-btn" data-tadat-add-indicator="${tadatSafeText(item.poa)}">
                  <i class="ri-add-line"></i>
                  ${tadatSafeText(tadatText("addIndicator"))}
                </button>
              </div>
            `}
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function applyTadatLanguageMode() {
  const els = getTadatEls();
  if (!els.section) return;

  const mode = els.langFilter?.value || "uz";

  els.section.classList.toggle("tadat-hide-uz", mode === "en");
  els.section.classList.toggle("tadat-hide-en", mode === "uz");
}

function renderTadatTable(items) {
  const els = getTadatEls();
  if (!els.tableBody) return;

  if (!items.length) {
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="tadat-empty">
            <i class="ri-search-2-line"></i><br>
            Qidiruv bo‘yicha indikator topilmadi
          </div>
        </td>
      </tr>
    `;

    if (els.tableInfo) els.tableInfo.textContent = "0 qator";
    return;
  }

  els.tableBody.innerHTML = items.map(item => `
    <tr>
      <td>
        <span class="tadat-poa-pill">${tadatSafeText(item.poa)}</span>
      </td>

      <td>
        <span class="tadat-code-pill">${tadatSafeText(item.code)}</span>
      </td>

      <td class="tadat-col-uz">
        <div class="tadat-name-uz">${tadatSafeText(item.nameUz)}</div>
      </td>

      <td class="tadat-col-en">
        <div class="tadat-name-en">${tadatSafeText(item.nameEn)}</div>
      </td>

      <td>
        <div class="tadat-dimension">${tadatSafeText(item.dimension)}</div>
      </td>

      <td>
        <div class="tadat-criteria-preview">
          <p class="tadat-col-uz"><strong>UZ:</strong> ${tadatSafeText(tadatCriteriaPreview(item.criteriaUz))}</p>
          <p class="tadat-col-en"><strong>EN:</strong> ${tadatSafeText(tadatCriteriaPreview(item.criteriaEn))}</p>
        </div>
      </td>

      <td>
        <button type="button" class="tadat-detail-btn" data-tadat-code="${tadatSafeText(item.code)}">
          <i class="ri-eye-line"></i>
          Batafsil
        </button>
      </td>
    </tr>
  `).join("");

  if (els.tableInfo) {
    els.tableInfo.textContent = `${items.length} qator`;
  }
}

function renderTadatCriteriaList(target, text) {
  if (!target) return;

  const parts = splitTadatCriteria(text);

  target.innerHTML = parts.map(part => `
    <div class="tadat-criteria-item">${tadatSafeText(part)}</div>
  `).join("");
}

function openTadatDetail(code) {
  const els = getTadatEls();
  const item = getAllTadatIndicators().find(indicator => indicator.code === code);

  if (!item || !els.detailPanel) return;

  if (els.detailPoa) els.detailPoa.textContent = item.poa;
  if (els.detailCode) els.detailCode.textContent = item.code;
  if (els.detailNameUz) els.detailNameUz.textContent = item.nameUz;
  if (els.detailNameEn) els.detailNameEn.textContent = item.nameEn;
  if (els.detailDimension) els.detailDimension.textContent = item.dimension;

  renderTadatCriteriaList(els.detailCriteriaUz, item.criteriaUz);
  renderTadatCriteriaList(els.detailCriteriaEn, item.criteriaEn);

  els.detailPanel.classList.add("open");
  els.detailPanel.setAttribute("aria-hidden", "false");
}

function closeTadatDetail() {
  const els = getTadatEls();

  if (!els.detailPanel) return;

  els.detailPanel.classList.remove("open");
  els.detailPanel.setAttribute("aria-hidden", "true");
}

function fillTadatRowModal(row) {
  const els = getTadatEls();
  if (!row) return;

  if (els.rowPoaInput) {
    els.rowPoaInput.value = row.poa || "";
    els.rowPoaInput.disabled = !row.custom;
  }

  if (els.rowNameUzInput) els.rowNameUzInput.value = row.descriptionUz || row.description || "";
  if (els.rowNameEnInput) els.rowNameEnInput.value = row.descriptionEn || "";
  if (els.rowRangeInput) els.rowRangeInput.value = row.range || "";
  if (els.rowCountInput) els.rowCountInput.value = Number(row.count ?? getTadatIndicatorCountByPoa(row.poa) ?? 0);
  if (els.rowStatusInput) els.rowStatusInput.value = row.statusType || "complete";
}

function openTadatRowModal(rowKey = null) {
  const els = getTadatEls();
  if (!els.rowModal) return;

  if (els.rowForm) els.rowForm.reset();

  tadatEditingRowKey = rowKey;

  if (rowKey) {
    const row = getAllTadatSummary().find(item => getTadatRowKey(item) === rowKey);
    if (!row) return;

    if (els.rowModalLabel) els.rowModalLabel.textContent = tadatText("editRow");
    if (els.rowModalTitle) els.rowModalTitle.textContent = tadatText("editRow");
    if (els.rowSave) els.rowSave.textContent = tadatText("rowSave");
    fillTadatRowModal(row);
  } else {
    if (els.rowModalLabel) els.rowModalLabel.textContent = tadatText("rowModalLabel");
    if (els.rowModalTitle) els.rowModalTitle.textContent = tadatText("rowModalTitle");
    if (els.rowSave) els.rowSave.textContent = tadatText("rowSave");

    const nextNumber = getAllTadatSummary().length + 1;
    if (els.rowPoaInput) {
      els.rowPoaInput.disabled = false;
      els.rowPoaInput.value = `POA ${nextNumber}`;
    }
    if (els.rowCountInput) els.rowCountInput.value = "0";
    if (els.rowStatusInput) els.rowStatusInput.value = "complete";
  }

  els.rowModal.classList.add("open");
  els.rowModal.setAttribute("aria-hidden", "false");

  setTimeout(() => els.rowNameUzInput?.focus(), 50);
}

function closeTadatRowModal() {
  const els = getTadatEls();
  if (!els.rowModal) return;

  els.rowModal.classList.remove("open");
  els.rowModal.setAttribute("aria-hidden", "true");
  tadatEditingRowKey = null;
  if (els.rowPoaInput) els.rowPoaInput.disabled = false;
}

function submitTadatRowForm(event) {
  event.preventDefault();

  const els = getTadatEls();
  const payload = {
    poa: els.rowPoaInput?.value || "",
    descriptionUz: els.rowNameUzInput?.value || "",
    descriptionEn: els.rowNameEnInput?.value || "",
    range: els.rowRangeInput?.value || "",
    count: els.rowCountInput?.value || 0,
    statusType: els.rowStatusInput?.value || "complete"
  };

  if (tadatEditingRowKey) {
    const updated = updateTadatSummaryRow(tadatEditingRowKey, payload);
    if (!updated) return;

    tadatOpenPoaSet.add(updated.poa);
    closeTadatRowModal();
    renderTadatSection();
    return;
  }

  const added = addTadatCustomRow(payload);

  if (!added) return;

  tadatOpenPoaSet.add(added.poa);
  closeTadatRowModal();
  renderTadatSection();
}


function openTadatIndicatorModal(poa) {
  const els = getTadatEls();
  if (!els.indicatorModal || !poa) return;

  tadatIndicatorTargetPoa = poa;

  if (els.indicatorForm) els.indicatorForm.reset();
  if (els.indicatorPoaInput) els.indicatorPoaInput.value = poa;
  if (els.indicatorPoaView) els.indicatorPoaView.value = poa;

  const existingCount = getTadatIndicatorCountByPoa(poa);
  const poaNumber = String(poa).replace(/[^0-9]/g, "") || "X";
  if (els.indicatorCodeInput) els.indicatorCodeInput.value = `P${poaNumber}-${existingCount + 1}`;

  els.indicatorModal.classList.add("open");
  els.indicatorModal.setAttribute("aria-hidden", "false");

  setTimeout(() => els.indicatorNameUzInput?.focus(), 50);
}

function closeTadatIndicatorModal() {
  const els = getTadatEls();
  if (!els.indicatorModal) return;

  els.indicatorModal.classList.remove("open");
  els.indicatorModal.setAttribute("aria-hidden", "true");
  tadatIndicatorTargetPoa = null;
}

function submitTadatIndicatorForm(event) {
  event.preventDefault();

  const els = getTadatEls();
  const poa = els.indicatorPoaInput?.value || tadatIndicatorTargetPoa || "";

  const added = addTadatCustomIndicator({
    poa,
    code: els.indicatorCodeInput?.value || "",
    nameUz: els.indicatorNameUzInput?.value || "",
    nameEn: els.indicatorNameEnInput?.value || "",
    dimension: els.indicatorDimensionInput?.value || "",
    criteriaUz: els.indicatorCriteriaUzInput?.value || "",
    criteriaEn: els.indicatorCriteriaEnInput?.value || ""
  });

  if (!added) return;

  tadatOpenPoaSet.add(added.poa);
  closeTadatIndicatorModal();
  renderTadatSection();
}

function resetTadatFilters() {
  const els = getTadatEls();

  if (els.searchInput) els.searchInput.value = "";
  if (els.poaFilter) els.poaFilter.value = "all";
  if (els.langFilter) els.langFilter.value = "uz";

  tadatOpenPoaSet = new Set();
  renderTadatSection();
}

function toggleTadatSummaryRow(poa) {
  if (!poa) return;

  if (tadatOpenPoaSet.has(poa)) {
    tadatOpenPoaSet.delete(poa);
  } else {
    tadatOpenPoaSet.add(poa);
  }

  renderTadatSection();
}

function bindTadatEvents() {
  if (tadatEventsBound) return;

  const els = getTadatEls();

  if (els.searchInput) {
    els.searchInput.addEventListener("input", renderTadatSection);
  }

  if (els.poaFilter) {
    els.poaFilter.addEventListener("change", renderTadatSection);
  }

  if (els.langFilter) {
    els.langFilter.addEventListener("change", renderTadatSection);
  }

  if (els.clearBtn) {
    els.clearBtn.addEventListener("click", resetTadatFilters);
  }

  if (els.addRowBtn) {
    els.addRowBtn.addEventListener("click", () => openTadatRowModal());
  }

  if (els.rowForm) {
    els.rowForm.addEventListener("submit", submitTadatRowForm);
  }

  if (els.indicatorForm) {
    els.indicatorForm.addEventListener("submit", submitTadatIndicatorForm);
  }

  if (els.indicatorClose) {
    els.indicatorClose.addEventListener("click", closeTadatIndicatorModal);
  }

  if (els.indicatorCancel) {
    els.indicatorCancel.addEventListener("click", closeTadatIndicatorModal);
  }

  if (els.indicatorModal) {
    els.indicatorModal.addEventListener("click", event => {
      if (event.target === els.indicatorModal) {
        closeTadatIndicatorModal();
      }
    });
  }

  if (els.rowClose) {
    els.rowClose.addEventListener("click", closeTadatRowModal);
  }

  if (els.rowCancel) {
    els.rowCancel.addEventListener("click", closeTadatRowModal);
  }

  if (els.rowModal) {
    els.rowModal.addEventListener("click", event => {
      if (event.target === els.rowModal) {
        closeTadatRowModal();
      }
    });
  }

  if (els.summaryGrid) {
    els.summaryGrid.addEventListener("click", event => {
      const addIndicatorBtn = event.target.closest("[data-tadat-add-indicator]");
      if (addIndicatorBtn) {
        openTadatIndicatorModal(addIndicatorBtn.dataset.tadatAddIndicator);
        return;
      }

      const deleteIndicatorBtn = event.target.closest("[data-tadat-delete-indicator]");
      if (deleteIndicatorBtn) {
        const ok = confirm(tadatText("deleteIndicatorConfirm"));
        if (ok) {
          deleteTadatCustomIndicator(deleteIndicatorBtn.dataset.tadatDeleteIndicator);
          renderTadatSection();
        }
        return;
      }

      const addCriteriaRowBtn = event.target.closest("[data-tadat-add-criteria-row]");
      if (addCriteriaRowBtn) {
        addTadatCustomCriteriaRow(
          addCriteriaRowBtn.dataset.tadatAddCriteriaRow,
          addCriteriaRowBtn.dataset.tadatAddCriteriaLang || getTadatLangMode()
        );
        renderTadatSection();
        return;
      }

      const uploadBtn = event.target.closest("[data-tadat-file-trigger]");
      if (uploadBtn) {
        const input = document.getElementById(uploadBtn.dataset.tadatFileTrigger);
        if (input) input.click();
        return;
      }

      const downloadBtn = event.target.closest("[data-tadat-file-download]");
      if (downloadBtn && !downloadBtn.disabled) {
        downloadTadatCriteriaFile(downloadBtn.dataset.tadatFileDownload);
        return;
      }

      const editCriteriaBtn = event.target.closest("[data-tadat-criteria-edit]");
      if (editCriteriaBtn) {
        editTadatCriteriaText(editCriteriaBtn.dataset.tadatCriteriaEdit);
        renderTadatSection();
        return;
      }

      const deleteBtn = event.target.closest("[data-tadat-file-delete]");
      if (deleteBtn && !deleteBtn.disabled) {
        removeTadatCriteriaFile(deleteBtn.dataset.tadatFileDelete);
        renderTadatSection();
        return;
      }

      const editRowBtn = event.target.closest("[data-tadat-edit-row]");
      if (editRowBtn) {
        openTadatRowModal(editRowBtn.dataset.tadatEditRow);
        return;
      }

      const deleteRowBtn = event.target.closest("[data-tadat-delete-row]");
      if (deleteRowBtn) {
        const ok = confirm(tadatText("deleteRowConfirm"));
        if (ok) {
          deleteTadatSummaryRow(deleteRowBtn.dataset.tadatDeleteRow);
          renderTadatSection();
        }
        return;
      }

      const blocked = event.target.closest(
        ".tadat-criteria-status-select, .tadat-criteria-note-input, .tadat-criteria-file-input, .tadat-add-criteria-row-btn, .tadat-add-indicator-btn, .tadat-add-indicator-empty-btn"
      );
      if (blocked) return;

      const summaryRow = event.target.closest(".tadat-summary-row");
      if (!summaryRow) return;

      toggleTadatSummaryRow(summaryRow.dataset.tadatPoa);
    });


    els.summaryGrid.addEventListener("change", async event => {
      const statusSelect = event.target.closest(".tadat-criteria-status-select");
      if (statusSelect) {
        updateTadatCriteriaRecord(statusSelect.dataset.tadatCriteriaKey, {
          status: statusSelect.value
        });
        return;
      }

      const fileInput = event.target.closest(".tadat-criteria-file-input");
      if (fileInput) {
        const file = fileInput.files && fileInput.files[0];
        if (!file) return;

        try {
          const data = await readTadatFileAsDataUrl(file);
          updateTadatCriteriaRecord(fileInput.dataset.tadatCriteriaKey, {
            file: {
              name: file.name,
              type: file.type || "application/octet-stream",
              size: file.size,
              data
            }
          });
          renderTadatSection();
        } catch (error) {
          console.error("TADAT file upload error:", error);
          alert("Faylni yuklashda xatolik yuz berdi");
        } finally {
          fileInput.value = "";
        }
      }
    });

    els.summaryGrid.addEventListener("input", event => {
      const noteInput = event.target.closest(".tadat-criteria-note-input");
      if (!noteInput) return;

      updateTadatCriteriaRecord(noteInput.dataset.tadatCriteriaKey, {
        note: noteInput.value
      });
    });
  }

  if (els.tableBody) {
    els.tableBody.addEventListener("click", event => {
      const btn = event.target.closest("[data-tadat-code]");
      if (!btn) return;

      openTadatDetail(btn.dataset.tadatCode);
    });
  }

  if (els.detailClose) {
    els.detailClose.addEventListener("click", closeTadatDetail);
  }

  if (els.detailPanel) {
    els.detailPanel.addEventListener("click", event => {
      if (event.target === els.detailPanel) {
        closeTadatDetail();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeTadatDetail();
      closeTadatRowModal();
      closeTadatIndicatorModal();
    }
  });

  tadatEventsBound = true;
}

function renderTadatSection() {
  applyTadatTexts();
  renderTadatPoaOptions();
  applyTadatLanguageMode();

  const items = getFilteredTadatIndicators();

  renderTadatStats(items);
  renderTadatSummary(items);
  renderTadatTable(items);
  bindTadatEvents();
}

window.renderTadatSection = renderTadatSection;
window.openTadatDetail = openTadatDetail;
window.closeTadatDetail = closeTadatDetail;
