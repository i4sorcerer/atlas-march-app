# GitHub 高 Star 开源方案清单（智能机器人 / AI / 平衡小车 / 飞控）

> 调研时间：2026-08-04 · 数据来自 GitHub API 实时抓取（star / 最近更新）
> 用途：配合 `balance-car` P0→P4 路线，提前锁定"后期整体规划"要认领的开源资产。

## ⚠️ 一个重要发现

**"平衡小车"在 GitHub 上没有高 star 的独立开源仓库。** 原因是这类项目大多以
视频教程 + 套件资料包形式传播（B站/平衡小车之家/立创开源），作者很少在 GitHub 沉淀高星工程。
实测：`sebnil/Selfbalancing-robot`（最老牌之一）仅 **32★**，2019 年停更；大量同名 repo 多为
课程作业/个人 fork，几百 star 封顶。

**结论：高 star 价值在"平台与框架层"，而不是"某个现成平衡小车工程"。**
所以下方按"和你路线的关联度"分层，而不是罗列零散小车仓库。

---

## 一、与 ESP32 直接同生态（P0 即可认领）
| 仓库 | Star | 最近更新 | 语言 | 为什么相关 |
|------|------|---------|------|-----------|
| [espressif/esp-drone](https://github.com/espressif/esp-drone) | 2089★ | 2026-06 | C | **你下一台四轴的方向**：ESP32 开源四轴，固件源自 Crazyflie，与平衡车同一块芯片 |
| [jrowberg/i2cdevlib](https://github.com/jrowberg/i2cdevlib) | 4265★ | 2025-08 | C++ | **P0 必用**：MPU6050 驱动事实标准，含 DMP 四元数示例 |
| [arduino/arduino-ide](https://github.com/arduino/arduino-ide) | 3202★ | 2026-07 | TS | 起步开发环境 |

## 二、飞控固件（P4 飞控预研主战场）
| 仓库 | Star | 最近更新 | 语言 | 为什么相关 |
|------|------|---------|------|-----------|
| [bitcraze/crazyflie-firmware](https://github.com/bitcraze/crazyflie-firmware) | 1521★ | 2026-07 | C | **飞控源码精读范本**：代码结构清晰、注释规范，串级 PID + 姿态解算最佳读物 |
| [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) | 12333★ | 2026-08 | C++ | 开源自驾仪双雄之一，EKF 状态估计 + 导航，长期研究终点站 |
| [betaflight/betaflight](https://github.com/betaflight/betaflight) | 11306★ | 2026-08 | C | 穿越机固件事实标准，工业级 PID / 滤波链 / 前馈实现 |
| [bitcraze/crazyflie-lib-python](https://github.com/bitcraze/crazyflie-lib-python) | 341★ | 2026-07 | Python | 用 Python 给小车/四轴写上位机、做数据可视化的库 |

## 三、仿真 / 感知 / 3D（给小车加"智能"时再上）
| 仓库 | Star | 最近更新 | 语言 | 为什么相关 |
|------|------|---------|------|-----------|
| [opencv/opencv](https://github.com/opencv/opencv) | 90290★ | 2026-08 | C++ | 视觉入门第一站，循迹/避障/识别都用它 |
| [isl-org/Open3D](https://github.com/isl-org/Open3D) | 13858★ | 2026-08 | C++ | 3D 点云，后续做 SLAM/环境建模 |
| [google-deepmind/mujoco](https://github.com/google-deepmind/mujoco) | 14432★ | 2026-08 | C++ | 物理仿真，调参先在仿真里炸，省硬件 |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | 14243★ | 2026-08 | C++ | 自动驾驶仿真，理解"感知→决策→控制"全链路 |
| [microsoft/airsim](https://github.com/microsoft/airsim) | 18358★ | 2026-06 | C++ | 无人机/车仿真，虚幻引擎里练飞控 |
| [unitreerobotics/unitree_rl_gym](https://github.com/unitreerobotics/unitree_rl_gym) | 3470★ | 2025-07 | Python | 宇树机器狗强化学习训练环境，具身 AI 样本 |
| [stanfordroboticsclub/StanfordQuadruped](https://github.com/stanfordroboticsclub/StanfordQuadruped) | 1773★ | 2024-10 | Python | 开源四足，从零理解腿式机器人控制 |

## 四、具身 AI / 大模型（后期整体规划的"智能"内核）
| 仓库 | Star | 最近更新 | 语言 | 为什么相关 |
|------|------|---------|------|-----------|
| [huggingface/lerobot](https://github.com/huggingface/lerobot) | 26367★ | 2026-08 | Python | **具身智能入门首选**：Hugging Face 机器人学习库，数据集+模型+仿真一条龙 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | 102165★ | 2026-08 | Python | 深度学习底座 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 196777★ | 2026-08 | C++ | 深度学习另一底座 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 143368★ | 2026-08 | Python | AI Agent 框架，让机器人"听懂话、能规划" |
| [commaai/openpilot](https://github.com/commaai/openpilot) | 63312★ | 2026-08 | Python | 开源 L2 自动驾驶，端到端控制的现实范本 |
| [home-assistant/core](https://github.com/home-assistant/core) | 89677★ | 2026-08 | Python | 智能家居中枢，理解"设备联网 + 自动化"的工程化 |

---

## 五、给你的认领建议（结合后期整体规划）

1. **P0 立刻装好**：arduino-ide + i2cdevlib（MPU6050 驱动）。这俩是地基。
2. **P1 站稳后**：把 esp-drone 的 README 和代码结构当"下一台"的预习材料，先只看不动手。
3. **P3 加智能**：小车避障/循迹先用 opencv（CPU 够）；想做"语音指挥小车"时上 whisper.cpp + 一个小模型本地跑。
4. **P4 飞控预研**：精读 crazyflie-firmware → 跑通 esp-drone 固件 → 横向看 betaflight（工业级 PID）和 PX4（自驾仪/状态估计）。
5. **长期"智能机器人"主线**：lerobot 是当前最对齐"具身智能 + 父子可玩"的入口；mujoco/carla/airsim 是仿真训练场；langchain 是让机器人"会思考会规划"的 Agent 层。
6. **避免的坑**：别花时间找"高 star 平衡小车开源工程"——基本没有，直接认领上面的平台层，小车本体照着自己的 SPEC 搓。

> 低 star 但有口碑的参考：厂商套件资料（平衡小车之家 MiniBalance、亚博智能）、立创开源平台上的个人工程、
> Joop Brokking（http://www.brokking.net/）的 Arduino 平衡车系列，这些不在 GitHub star 体系里但实战价值高，见本目录 `resources.html`。
