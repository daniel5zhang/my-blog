# Daniel实验室 - 飞书运营主控台落地记录

## 一、主控台基本信息
- 主控台名称：`Daniel实验室-运营主控台`
- 创建时间：`2026-03-25 10:01 GMT+8`
- App Token：`Tv4WbaUjraZ3LismUhucwOTRnVh`
- 访问链接：`https://my.feishu.cn/base/Tv4WbaUjraZ3LismUhucwOTRnVh`
- 维护入口：当前默认使用飞书个人可写空间 / 默认空间，由 Daniel实验室 当前维护人直接管理

## 二、已创建表清单
1. `选题池`
   - table_id: `tblj9Bggj1xVq0jf`
2. `内容日历`
   - table_id: `tblJL8jM8m90dASG`
3. `待改写池`
   - table_id: `tbl3DEvQuFPtv9xu`
4. `待发布池`
   - table_id: `tblWMXvwJ2f7NlRX`
5. `审核记录`
   - table_id: `tblt3zHa0pKf51Dy`
6. `反馈复盘`
   - table_id: `tblWdghnRp9qnmz2`

## 三、与 GitHub 镜像的对应关系
- `选题池` ↔ `docs/operations/bitable-mirror/topic-pool-mirror.md`
- `内容日历` ↔ `docs/operations/bitable-mirror/content-calendar-mirror.md`
- `待改写池` ↔ `docs/operations/bitable-mirror/rewrite-queue-mirror.md`
- `待发布池` ↔ `docs/operations/bitable-mirror/publish-queue-mirror.md`
- `审核记录` ↔ `docs/operations/bitable-mirror/review-log-mirror.md`
- `反馈复盘` ↔ `docs/operations/bitable-mirror/feedback-retrospective-mirror.md`

## 四、字段落地口径
- 首版字段按仓库中的 GitHub 镜像模板原样落地
- 其中状态、优先级、审核结论等字段，已在飞书中用单选字段落地
- 其余描述性字段，当前以文本字段为主

## 五、后续维护口径
- 飞书多维表格：作为未来运营主控台，承接活状态与日常协作
- GitHub 镜像模板：作为资产备份层与结构留痕层
- 若后续飞书字段结构升级，应同步回写 GitHub 对应镜像模板与同步规则
