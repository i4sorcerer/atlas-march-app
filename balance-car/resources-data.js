/*
 * ============================================================
 *  手搓小车 · 参考资源库 — 数据源（★ 你日常只维护这一个文件）
 * ============================================================
 *  如何新增 / 修改：
 *    1. sections 里找到对应分类（或照格式新加一个分类）。
 *    2. 在 groups[].items 里照已有格式加一个 {...} 对象（逗号隔开）。
 *    3. 保存刷新页面即可，无需重启任何服务。
 *
 *  字段说明（item 均为可选字段，缺了不显示）：
 *    name      名称
 *    platforms 平台/形式数组，如 ["B站","GitHub"]
 *    lang      语言说明（右上角小胶囊）
 *    desc      一句话简介
 *    tags      标签数组（可被搜索）
 *    use       "适合用来做什么"（绿色高亮条）
 *    note      补充说明（紫色小字）
 *    link      外部链接（有则标题可点击，新窗口打开）
 *
 *  sections[] 字段：
 *    id/emoji/title/tag/intro  分类元信息（tab 按钮自动生成）
 *    groups[]                  子分组 { title, items[] }，只有一组时 title 可留 ""
 *  guide[]：选用指引 { scenario, pick }
 * ============================================================
 */

window.RESOURCE_DATA = {

  sections: [

    /* ===================== 一、视频教程 & UP主 ===================== */
    {
      id: "videos", emoji: "🎬", title: "视频教程 & UP主", tag: "B站为主 · 从零到进阶",
      intro: "跟着视频最不容易劝退。控制理论认准 DR_CAN，装配调参认准平衡小车之家，孩子一起看的放最后。",
      groups: [
        {
          title: "🧑‍🏫 主线教程（爸爸精学）",
          items: [
            {
              name: "DR_CAN", platforms: ["B站", "YouTube"], lang: "中文",
              desc: "控制理论第一 UP。《PID 控制器》《卡尔曼滤波器》系列把公式讲成人话，平衡车两大核心算法全靠他。",
              tags: ["PID", "卡尔曼滤波", "控制理论", "现代控制"],
              use: "P1 调 PID 前、P3 上卡尔曼前必看",
              link: "https://space.bilibili.com/230105574",
            },
            {
              name: "平衡小车之家（MiniBalance）", platforms: ["B站", "淘宝"], lang: "中文",
              desc: "老牌平衡车套件商，全套装配 + 直立环/速度环/转向环调参视频，配原理图和源码，是最接近'参考答案'的存在。",
              tags: ["装配", "串级PID", "调参", "套件"],
              use: "装配阶段与调参卡住时按图索骥",
              link: "https://space.bilibili.com/391186974",
            },
            {
              name: "江协科技", platforms: ["B站"], lang: "中文",
              desc: "STM32 零基础入门口碑第一，讲解节奏极稳，配套平衡车套件课程。走 STM32 路线（P3+）时的第一课。",
              tags: ["STM32", "零基础", "外设"],
              use: "P3 之后想平移 STM32 路线时系统学习",
              link: "https://space.bilibili.com/383400717",
            },
            {
              name: "Joop Brokking", platforms: ["YouTube"], lang: "英文",
              desc: "经典《Auto Balancing Robot》《MPU6050 angle》系列，从零推导互补滤波与平衡控制，代码全开源。",
              tags: ["互补滤波", "MPU6050", "Arduino"],
              use: "理解互补滤波原理的最佳英文教程",
              link: "http://www.brokking.net/",
            },
            {
              name: "正点原子", platforms: ["B站", "官网论坛"], lang: "中文",
              desc: "嵌入式老牌培训，STM32 / 平衡车 / 四轴飞行器全套免费课程与开发板资料。",
              tags: ["STM32", "四轴", "全套课程"],
              use: "体系化补课与四轴预研",
              link: "https://space.bilibili.com/394620890",
            },
          ],
        },
        {
          title: "👨‍👦 亲子一起看（点燃兴趣）",
          items: [
            {
              name: "稚晖君", platforms: ["B站"], lang: "中文",
              desc: "硬核创客天花板：自平衡自行车、迷你机械臂……不教入门，但一条视频能让父子俩热血一个月。",
              tags: ["创客", "自平衡", "灵感"],
              use: "周末父子灵感放映会",
              link: "https://space.bilibili.com/20259914",
            },
            {
              name: "Mark Rober", platforms: ["YouTube", "B站搬运"], lang: "英文/双语字幕",
              desc: "前 NASA 工程师的趣味工程视频，5 岁孩子也看得目不转睛，工程思维启蒙神器。",
              tags: ["趣味工程", "儿童友好"],
              use: "让孩子觉得'工程师超酷'",
            },
            {
              name: "GreatScott!", platforms: ["YouTube"], lang: "英文",
              desc: "电子 DIY 频道，元器件与电路基础短平快，爸爸补电子常识用。",
              tags: ["电子基础", "DIY"],
              use: "10 分钟搞懂一个元器件",
            },
          ],
        },
      ],
    },

    /* ===================== 二、开源项目 & 资料包 ===================== */
    {
      id: "projects", emoji: "💻", title: "开源项目 & 资料包", tag: "代码 · 原理图 · 仿真",
      intro: "先抄后改再自创。资料包当参考答案，开源工程当代码范本，仿真器让你没到货就能先跑起来。",
      groups: [
        {
          title: "⚖️ 平衡车工程",
          items: [
            {
              name: "MiniBalance 开源资料包", platforms: ["网盘", "GitHub 镜像"], lang: "中文",
              desc: "平衡小车之家全套：原理图、PCB、互补滤波版与卡尔曼版源码、上位机。买套件附赠，网上也有镜像流传。",
              tags: ["原理图", "源码", "卡尔曼", "上位机"],
              use: "P1~P3 全程参考答案",
            },
            {
              name: "立创开源硬件平台（oshwhub）", platforms: ["网站"], lang: "中文",
              desc: "搜索'平衡车'有数百个完整工程：原理图 + PCB + 代码 + 制作说明，可一键下单打样，白嫖电路设计。",
              tags: ["PCB", "开源工程", "打样"],
              use: "P3 想自己画一块控制板时",
              link: "https://oshwhub.com/search?wd=平衡车",
            },
            {
              name: "GitHub: ESP32 self-balancing 项目群", platforms: ["GitHub"], lang: "英文为主",
              desc: "搜 'esp32 self-balancing robot'，大量 Arduino/PlatformIO 工程，重点看 PID 结构与 MPU6050 DMP 用法。",
              tags: ["ESP32", "Arduino", "PlatformIO"],
              use: "代码架构参考、抄作业防跑偏",
              link: "https://github.com/search?q=esp32+self+balancing+robot",
            },
            {
              name: "SimpleFOC", platforms: ["GitHub", "官网"], lang: "英文",
              desc: "开源无刷电机 FOC 控制库。平衡车进阶玩法：把有刷 N20 换成无刷云台电机，丝滑度飞跃。",
              tags: ["无刷", "FOC", "进阶"],
              use: "P4 平行支线：无刷平衡车",
              link: "https://simplefoc.com/",
            },
          ],
        },
        {
          title: "🧰 库 & 工具",
          items: [
            {
              name: "i2cdevlib / MPU6050 库", platforms: ["GitHub"], lang: "英文",
              desc: "jrowberg 的经典 MPU6050 驱动，含 DMP 四元数输出示例，Arduino 生态事实标准。",
              tags: ["MPU6050", "DMP", "驱动库"],
              use: "P0 读传感器直接上",
              link: "https://github.com/jrowberg/i2cdevlib",
            },
            {
              name: "Wokwi 在线仿真器", platforms: ["网站"], lang: "英文界面",
              desc: "浏览器里仿真 ESP32/Arduino，快递没到就能先写点灯和 I2C 代码，孩子也能拖元件连线。",
              tags: ["仿真", "ESP32", "零成本"],
              use: "下单等快递的那几天",
              link: "https://wokwi.com/",
            },
            {
              name: "Betaflight Configurator（提前认识）", platforms: ["桌面应用"], lang: "多语言",
              desc: "穿越机地面站。P2 做自己的调参面板前，先看看'工业级'长什么样，理解地面站概念。",
              tags: ["地面站", "调参", "飞控"],
              use: "P2 设计 Web 调参面板前找对标",
              link: "https://github.com/betaflight/betaflight-configurator",
            },
          ],
        },
      ],
    },

    /* ===================== 三、社群 ===================== */
    {
      id: "community", emoji: "👥", title: "活跃社群", tag: "卡住了去这里喊人",
      intro: "调参卡三天不如群里问一句。按活跃度与友好度排序，新手问题先搜再问，附上现象视频最容易被捞。",
      groups: [
        {
          title: "🇨🇳 国内",
          items: [
            {
              name: "平衡小车之家 QQ 群", platforms: ["QQ"], lang: "中文",
              desc: "买套件即送群，群友多是正在调车的同路人，直立环调不稳这种问题响应最快。",
              tags: ["答疑", "调参", "新手友好"],
              use: "P1/P2 调参卡壳首选",
            },
            {
              name: "立创开源硬件平台社区", platforms: ["网站", "QQ群"], lang: "中文",
              desc: "工程作者大多留了联系方式，跟帖提问命中率高；还有月度开源项目活动可投稿。",
              tags: ["开源工程", "投稿", "PCB"],
              use: "抄工程遇到问题直接问作者",
              link: "https://oshwhub.com/",
            },
            {
              name: "正点原子论坛（openedv）", platforms: ["网站"], lang: "中文",
              desc: "嵌入式老论坛，STM32/平衡车/四轴板块沉淀了十几年帖子，搜索比提问更有用。",
              tags: ["STM32", "沉淀帖", "四轴"],
              use: "搜历史帖解决疑难杂症",
              link: "http://www.openedv.com/forum.php",
            },
            {
              name: "电子发烧友 / EEWorld 论坛", platforms: ["网站"], lang: "中文",
              desc: "综合电子论坛，元器件选型、电源问题、EMC 类问题受众更广。",
              tags: ["选型", "电源", "综合"],
              use: "硬件层面的疑难问题",
            },
            {
              name: "DFRobot 社区（造物记）", platforms: ["网站"], lang: "中文",
              desc: "创客教育向社区，大量亲子/校园项目案例，适合找'带孩子做'的呈现方式灵感。",
              tags: ["创客教育", "亲子", "案例"],
              use: "找亲子项目玩法与展示灵感",
              link: "https://mc.dfrobot.com.cn/",
            },
          ],
        },
        {
          title: "🌍 国际",
          items: [
            {
              name: "Reddit r/arduino · r/robotics", platforms: ["Reddit"], lang: "英文",
              desc: "晒项目 + 提问都很活跃，self-balancing 是常青话题，发视频容易获得具体建议。",
              tags: ["晒车", "提问", "活跃"],
              use: "英文世界晒成果、找思路",
              link: "https://www.reddit.com/r/arduino/",
            },
            {
              name: "Arduino 官方论坛", platforms: ["网站"], lang: "英文",
              desc: "库用法、板子疑难的权威去处，回帖质量高。",
              tags: ["Arduino", "官方", "库"],
              use: "库和板子本身的问题",
              link: "https://forum.arduino.cc/",
            },
            {
              name: "Hackaday.io", platforms: ["网站"], lang: "英文",
              desc: "全球创客项目日志平台，搜 balancing robot 能看到别人完整的踩坑记录。",
              tags: ["项目日志", "踩坑记录"],
              use: "看别人完整的迭代过程",
              link: "https://hackaday.io/",
            },
          ],
        },
      ],
    },

    /* ===================== 四、飞控进阶 ===================== */
    {
      id: "flight", emoji: "🚁", title: "飞控进阶（P4）", tag: "平衡车毕业后的下一站",
      intro: "平衡车串级 PID 调明白后，这些就是通向飞控的正门。顺序建议：ESP-Drone 上手 → Crazyflie 读源码 → Betaflight/ArduPilot 跟社区。",
      groups: [
        {
          title: "",
          items: [
            {
              name: "ESP-Drone（乐鑫官方）", platforms: ["GitHub", "官方文档"], lang: "中英双语",
              desc: "ESP32 开源四轴，WiFi 手机遥控，硬件 ¥200 级，固件源自 Crazyflie。与平衡车同一块 ESP32 生态，P4 首选落地项目。",
              tags: ["ESP32", "四轴", "官方开源"],
              use: "第一台自己刷固件的四轴",
              link: "https://github.com/espressif/esp-drone",
            },
            {
              name: "Crazyflie（Bitcraze）", platforms: ["GitHub", "官方论坛"], lang: "英文",
              desc: "教科书级开源微型四轴，代码结构清晰、注释规范，姿态解算与串级 PID 是最佳读物，社区论坛活跃。",
              tags: ["源码研读", "姿态解算", "串级PID"],
              use: "飞控源码精读范本",
              link: "https://github.com/bitcraze/crazyflie-firmware",
            },
            {
              name: "匿名科创", platforms: ["淘宝", "QQ群", "B站"], lang: "中文",
              desc: "国内学习型飞控代表，拓空者等开源飞控资料全中文，上位机好用，适合中文环境系统学飞控。",
              tags: ["学习型飞控", "中文资料", "上位机"],
              use: "中文体系学飞控",
            },
            {
              name: "Betaflight", platforms: ["GitHub"], lang: "英文",
              desc: "穿越机固件事实标准，Rate/Angle 模式、滤波链、PID 前馈都能在这找到工业级实现。",
              tags: ["穿越机", "滤波链", "前馈"],
              use: "看工业级 PID/滤波怎么写",
              link: "https://github.com/betaflight/betaflight",
            },
            {
              name: "ArduPilot / PX4", platforms: ["GitHub", "官方文档"], lang: "英文",
              desc: "开源自驾仪双雄：EKF 状态估计、导航、任务规划，文档极全。长期跟进研究的终点站。",
              tags: ["EKF", "导航", "自驾仪"],
              use: "长期跟进的研究方向",
              link: "https://ardupilot.org/",
            },
            {
              name: "Madgwick / Mahony 姿态解算论文与实现", platforms: ["论文", "GitHub"], lang: "英文",
              desc: "四元数姿态解算两大经典算法，开源 C 实现随处可得，把平衡车的'一个倾角'升级成'三维姿态'。",
              tags: ["四元数", "姿态解算", "IMU融合"],
              use: "P4 算法升级的理论基础",
              link: "https://github.com/xioTechnologies/Fusion",
            },
          ],
        },
      ],
    },
  ],

  /* ===================== 五、选用指引 ===================== */
  guide: [
    { scenario: "完全零基础，第一次点亮 ESP32", pick: "Wokwi 仿真 + B站 ESP32 Arduino 入门" },
    { scenario: "P1 车站不稳，想真正搞懂 PID", pick: "DR_CAN《PID》系列 + 平衡小车之家调参视频" },
    { scenario: "想要一份靠谱的电路 / 代码参考答案", pick: "MiniBalance 资料包 + 立创开源平台工程" },
    { scenario: "卡住三天没人答", pick: "平衡小车之家 QQ 群 / 正点原子论坛（带现象视频提问）" },
    { scenario: "孩子兴趣有点降温", pick: "周末放映会：Mark Rober / 稚晖君" },
    { scenario: "平衡车毕业，准备进军飞控", pick: "ESP-Drone 上手 → Crazyflie 源码 → DR_CAN 现代控制" },
    { scenario: "想自己画一块控制板", pick: "立创开源平台参考工程 + 嘉立创免费打样" },
  ],
};
