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
  throwNames: { jump: "跳投", run: "跑投", crouch: "蹲投", stand: "站投", walk: "走投" },

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
      id: "dust2-example-smoke",
      map: "dust2",
      site: "A1",
      type: "smoke",
      name: "A1 烟（示例）",
      throw: "jump",
      aim: "这是示例条目：站位与瞄准点文字将在此处描述。",
      effect: "示例效果描述：封住 A1 过点视线。",
      source: "（示例来源，等你投递第一条真实素材后替换）",
      url: "",
      timestamp: "00:00",
      media: "media/dust2/test-demo.webp",
      verified: false,
      note: "示例条目，用于展示页面效果；真实条目由你投递视频+时间戳后录入。"
    }
  ]
};
