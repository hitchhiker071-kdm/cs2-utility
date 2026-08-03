/* CS2 道具本 —— 数据文件（用 .js 而非 .json：保证 file:// 双击打开也能加载） */
window.ENTRIES = {
  /* 地图顺序（七张图铺开顺序，见 docs/adr/0004） */
  mapOrder: ["dust2", "mirage", "inferno", "ancient", "cache", "anubis", "nuke"],
  mapNames: {
    dust2: "Dust II", mirage: "Mirage", inferno: "Inferno",
    ancient: "Ancient", cache: "Cache", anubis: "Anubis", nuke: "Nuke"
  },
  /* 道具类型徽章 */
  typeNames: { smoke: "烟", flash: "闪", fire: "火", he: "雷", tactic: "战术" },
  /* 投掷方式 */
  throwNames: { jump: "跳投", run: "跑投", crouch: "蹲投", stand: "站投", walk: "走投", crouchjump: "蹲跳投", doublekey: "双键投掷" },

  /* ============ 条目 ============
   * 字段说明（ADR-0004）：
   *   id        唯一标识（英文短横线，如 dust2-a1-smoke）
   *   map       地图 key（见 mapOrder）
   *   site      点位（作用位置，如 "A1"）
   *   type      smoke | flash | fire | he | tactic
   *   name      展示名（如 "A1 烟"）
   *   throw     投掷方式：jump | run | crouch | stand | walk
   *   aim       瞄准点描述（纯文字快速复习）
   *   effect    效果（封住哪、闪到哪）
   *   source    来源视频标题
   *   url       视频链接
   *   timestamp 时间戳（如 "12:34"）
   *   media     动图路径（WebP/MP4，自动播放）
   *   verified  是否亲测有效
   *   note      备注（可选）
   */
  entries: [
    {
      id: "dust2-zhongmen-flash",
      map: "dust2",
      site: "中门",
      type: "flash",
      name: "出中闪",
      throw: "crouchjump",
      aim: "",
      effect: "对直架中门的敌人造成全白",
      source: "CS2 道具教学视频（B站）",
      url: "https://www.bilibili.com/video/BV1uDaGzSEAW/",
      timestamp: "00:01",
      media: "media/dust2/zhongmen-flash.webp",
      verified: false,
      note: "蹲跳投；瞄准点描述待补充，可回看视频 00:01 起"
    },
    {
      id: "dust2-jingjia-smoke",
      map: "dust2",
      site: "警家",
      type: "smoke",
      name: "警家烟",
      throw: "stand",
      aim: "第一点位对齐 → 走到第二点位 → 左键投掷",
      effect: "封住警家对沙地与B门的视野",
      source: "CS2 道具教学视频（B站）",
      url: "https://www.bilibili.com/video/BV1uDaGzSEAW/",
      timestamp: "00:15",
      media: "media/dust2/jingjia-smoke.webp",
      verified: false,
      note: ""
    },
    {
      id: "dust2-axiao-baimid-flash",
      map: "dust2",
      site: "A小",
      type: "flash",
      name: "A小白中路自助闪",
      throw: "doublekey",
      aim: "",
      effect: "对中路看A小的敌人全白（自助闪）",
      source: "CS2 道具教学视频（B站）",
      url: "https://www.bilibili.com/video/BV17vqqYNE3m/",
      timestamp: "00:06",
      media: "media/dust2/axiao-baimid-flash.webp",
      verified: false,
      note: "双键投掷（左右键同时按，弹墙短闪）"
    }
  ]
};
