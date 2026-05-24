import type { DemoDefinition } from "@/lib/demo-types";
import type { MenuCategory } from "@/lib/types";

// 共通: items[]に isPublished:true を一括付与
const items = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

// 共通: カテゴリも公開状態を一括true
const cats = (arr: Array<Omit<MenuCategory, "isPublished">>): MenuCategory[] =>
  arr.map((c) => ({ ...c, isPublished: true }));

// 写真URL（Picsum — seed指定で決定論的に同じ画像が返る）
const hero = (seed: string) => `https://picsum.photos/seed/${seed}/1600/900`;

// ===== 定食屋 =====
export const teishokuDemo: DemoDefinition = {
  id: "teishoku",
  industry: "restaurant",
  industryLabel: "定食屋",
  themeId: "teishoku",
  shortDescription: "木目の温かみ。家庭料理を、丁寧に。",
  initial: {
    type: "restaurant",
    info: { name: "Shop E", nameJa: "店舗 E", tagline: "炊きたて、出来たてを、毎日。" },
    categories: cats([
      { id: "today", name: "本日の定食", subName: "Today", items: items([
        { id: "saba", name: "鯖の塩焼き定食", price: 1100, description: "国産鯖、五穀米、味噌汁、小鉢二品。", badge: "看板", heroImageUrl: hero("teishoku-saba"),
          story: "築地の仲卸から毎朝届く、国産の鯖。じっくり塩を当てて余分な水分を抜き、強火で皮目をパリッと焼き上げます。\n\nご飯は五穀米。味噌汁は煮干しと昆布の合わせ出汁で、毎朝6時に仕込んでいます。" },
        { id: "kara", name: "鶏の唐揚げ定食", price: 980, badge: "人気" },
        { id: "shogayaki", name: "豚の生姜焼き定食", price: 1080 },
        { id: "aji", name: "鯵フライ定食", price: 980 },
      ])},
      { id: "tanpin", name: "単品", subName: "À la carte", items: items([
        { id: "hiyayakko", name: "冷奴", price: 380 },
        { id: "tsukemono", name: "本日の漬物三種", price: 480 },
        { id: "negitoro", name: "ねぎとろ小鉢", price: 580 },
      ])},
      { id: "drink", name: "お飲み物", subName: "Drink", items: items([
        { id: "ocha", name: "ほうじ茶", price: 0, description: "お替り無料" },
        { id: "beer", name: "瓶ビール", price: 580 },
        { id: "sake", name: "純米酒（一合）", price: 680 },
      ])},
    ]),
  },
};

// ===== 和菓子 =====
export const wagashiDemo: DemoDefinition = {
  id: "wagashi",
  industry: "bakery",
  industryLabel: "和菓子",
  themeId: "wagashi",
  shortDescription: "白×渋金。お品書きのような縦長レイアウト。",
  initial: {
    type: "restaurant",
    info: { name: "Shop W", nameJa: "店舗 W", tagline: "季のうつろいを、お菓子に映して。" },
    categories: cats([
      { id: "namagashi", name: "生菓子", subName: "Namagashi", items: items([
        { id: "sakuramochi", name: "桜餅", price: 380, badge: "春限定", heroImageUrl: hero("wagashi-sakura"),
          story: "桜葉は伊豆松崎産。塩漬けにして約半年寝かせ、香りが立ったものだけを使います。\n\n餡は北海道産小豆を職人が手返しで炊き上げました。" },
        { id: "uguisumochi", name: "うぐいす餅", price: 380 },
        { id: "mizuyokan", name: "水羊羹", price: 320 },
      ])},
      { id: "yakigashi", name: "焼菓子", subName: "Yakigashi", items: items([
        { id: "dorayaki", name: "どら焼き", price: 280, badge: "看板" },
        { id: "monaka", name: "最中（こしあん／粒あん）", price: 320 },
        { id: "kogetsu", name: "鼓月（自家製栗最中）", price: 480 },
      ])},
      { id: "matcha", name: "抹茶のお供に", subName: "With Matcha", items: items([
        { id: "namayatsuhashi", name: "生八つ橋 三種", price: 580 },
        { id: "rakugan", name: "落雁（季節の色）", price: 480 },
      ])},
    ]),
  },
};

// ===== 蕎麦 =====
export const sobaDemo: DemoDefinition = {
  id: "soba",
  industry: "restaurant",
  industryLabel: "蕎麦",
  themeId: "soba",
  shortDescription: "生成り×墨。素朴で凛とした手打ち蕎麦店。",
  initial: {
    type: "restaurant",
    info: { name: "Shop F", nameJa: "店舗 F", tagline: "石臼挽き、十割。" },
    categories: cats([
      { id: "tsumetai", name: "冷たい蕎麦", subName: "Cold", items: items([
        { id: "seiro", name: "せいろ", price: 1100, badge: "看板", heroImageUrl: hero("soba-seiro"),
          story: "信州産の玄蕎麦を石臼でゆっくりと挽き、つなぎを一切使わない十割で打っています。\n\n蕎麦汁はかつお節と本枯節を二段で引き、一晩寝かせて角を取りました。" },
        { id: "kakeseiro", name: "二枚せいろ", price: 1480 },
        { id: "ten", name: "天せいろ", price: 1980, badge: "人気" },
        { id: "kamo", name: "鴨せいろ", price: 1880 },
      ])},
      { id: "atatakai", name: "温かい蕎麦", subName: "Hot", items: items([
        { id: "kake", name: "かけ", price: 880 },
        { id: "tanuki", name: "たぬき", price: 980 },
        { id: "tempura", name: "天ぷら蕎麦", price: 1580 },
      ])},
      { id: "ippin", name: "一品", subName: "Side", items: items([
        { id: "sobamiso", name: "蕎麦味噌", price: 480 },
        { id: "dashimaki", name: "出汁巻き玉子", price: 780 },
        { id: "tenmori", name: "天ぷら盛り合わせ", price: 1280 },
      ])},
    ]),
  },
};

// ===== 懐石 =====
export const kaisekiDemo: DemoDefinition = {
  id: "kaiseki",
  industry: "restaurant",
  industryLabel: "懐石",
  themeId: "kaiseki",
  shortDescription: "深緑×金。京の懐石を、最上格の佇まいで。",
  initial: {
    type: "restaurant",
    info: { name: "Shop J", nameJa: "店舗 J", tagline: "一期一会の、八寸を。" },
    categories: cats([
      { id: "course", name: "お献立", subName: "Course", items: items([
        { id: "tsuki", name: "おまかせ「月」", subName: "全九品", price: 16500, badge: "顔", heroImageUrl: hero("kaiseki-tsuki"),
          story: "先付・八寸・お椀・向附・焼八寸・煮物椀・強肴・御飯・水菓子。\n\n旬の素材を中心に、その日の良いものだけを組み上げます。八寸は季節の山海の幸を一皿に。御飯は土鍋で炊き上げます。" },
        { id: "ha", name: "おまかせ「葉」", subName: "全七品", price: 11000 },
        { id: "tsuyu", name: "おまかせ「露」", subName: "全五品", price: 7700 },
      ])},
      { id: "drink", name: "お飲み物", subName: "Drink", items: items([
        { id: "junmaidaiginjo", name: "純米大吟醸 黒龍 石田屋", price: 2200, badge: "稀少" },
        { id: "ginjo", name: "吟醸 而今", price: 1280 },
        { id: "ume", name: "自家製梅酒", price: 980 },
      ])},
    ]),
  },
};

// ===== 鉄板焼 =====
export const teppanyakiDemo: DemoDefinition = {
  id: "teppanyaki",
  industry: "yakiniku",
  industryLabel: "鉄板焼",
  themeId: "teppanyaki",
  shortDescription: "鉄板の質感。赤と黒の劇場のように。",
  initial: {
    type: "restaurant",
    info: { name: "Shop L", nameJa: "店舗 L", tagline: "目の前の、ライブを。" },
    categories: cats([
      { id: "steak", name: "ステーキ", subName: "Steak", items: items([
        { id: "chateau", name: "シャトーブリアン 100g", price: 12100, badge: "A5", heroImageUrl: hero("teppan-chateau"),
          story: "黒毛和牛A5のヒレ中央部、シャトーブリアン。\n\n表面は強火で香ばしく、中はミディアムレアに。岩塩・わさび・自家製ステーキソースの三種で召し上がりください。" },
        { id: "wagyu-sirloin", name: "和牛サーロイン 150g", price: 9900, badge: "人気" },
        { id: "fillet", name: "和牛フィレ 120g", price: 8800 },
      ])},
      { id: "seafood", name: "魚介", subName: "Seafood", items: items([
        { id: "abalone", name: "活鮑のステーキ", price: 5500 },
        { id: "lobster", name: "オマール海老", price: 6600 },
      ])},
      { id: "shime", name: "〆", subName: "Finish", items: items([
        { id: "garlicrice", name: "ガーリックライス", price: 1280, badge: "定番" },
        { id: "yakisoba", name: "和牛と季節野菜の焼そば", price: 1580 },
      ])},
    ]),
  },
};

// ===== フレンチ =====
export const frenchDemo: DemoDefinition = {
  id: "french",
  industry: "restaurant",
  industryLabel: "フレンチ",
  themeId: "french",
  shortDescription: "深い紺×金。クラシックなビストロ。",
  initial: {
    type: "restaurant",
    info: { name: "Shop M", nameJa: "店舗 M", tagline: "夜のパリへ、ひとっとび。" },
    categories: cats([
      { id: "entree", name: "前菜", subName: "Entrée", items: items([
        { id: "terrine", name: "田舎風テリーヌ", subName: "Terrine de Campagne", price: 1480, badge: "定番", heroImageUrl: hero("french-terrine"),
          story: "豚肩肉・豚レバー・パンチェッタを粗挽きにし、ブランデーと香草を効かせて型に詰め、湯煎で5時間。\n\n3日寝かせて味を馴染ませた、ビストロの定番です。" },
        { id: "escargot", name: "エスカルゴ ブルゴーニュ風", price: 1680 },
        { id: "rillette", name: "リエット", price: 1280 },
      ])},
      { id: "plat", name: "主菜", subName: "Plat Principal", items: items([
        { id: "confit", name: "鴨もも肉のコンフィ", price: 2480, badge: "人気" },
        { id: "boeuf", name: "牛ほほ肉の赤ワイン煮込み", price: 2880 },
        { id: "poisson", name: "本日の魚 ムニエル", price: 2680 },
      ])},
      { id: "dessert", name: "デザート", subName: "Dessert", items: items([
        { id: "creme", name: "クレームブリュレ", price: 780 },
        { id: "tarte", name: "タルトタタン", price: 880 },
      ])},
    ]),
  },
};

// ===== 中華 =====
export const chineseDemo: DemoDefinition = {
  id: "chinese",
  industry: "restaurant",
  industryLabel: "中華",
  themeId: "chinese",
  shortDescription: "朱×金。本格中華の華やかさを前面に。",
  initial: {
    type: "restaurant",
    info: { name: "Shop N", nameJa: "店舗 N", tagline: "火力と香り、本場の本気。" },
    categories: cats([
      { id: "appetizer", name: "前菜", subName: "Appetizer", items: items([
        { id: "yodofu", name: "クラゲと胡瓜の冷菜", price: 880, badge: "定番" },
        { id: "kogi", name: "皮蛋豆腐", price: 780 },
        { id: "kuropipa", name: "黒酢の酢豚", price: 1480, heroImageUrl: hero("chinese-subuta"),
          story: "黒豚バラ肉を低温でじっくり下揚げし、もう一度高温でカリッと。\n\nタレは香港から取り寄せた黒酢に、ザラメと中国醤油を合わせて、最後に強火で一気に絡めます。" },
      ])},
      { id: "main", name: "主菜", subName: "Main", items: items([
        { id: "ebichili", name: "海老のチリソース", price: 1980, badge: "人気" },
        { id: "mapodofu", name: "本場四川式 麻婆豆腐", price: 1480 },
        { id: "kaisen", name: "海鮮三種の塩炒め", price: 2280 },
        { id: "peking", name: "北京ダック（ハーフ）", price: 4400, badge: "おすすめ" },
      ])},
      { id: "shime", name: "麺・飯", subName: "Noodle / Rice", items: items([
        { id: "tantan", name: "本格担々麺", price: 1180 },
        { id: "chahan", name: "上海風炒飯", price: 1080 },
      ])},
    ]),
  },
};

// ===== 大衆酒場 =====
export const taishuDemo: DemoDefinition = {
  id: "taishu",
  industry: "izakaya",
  industryLabel: "大衆酒場",
  themeId: "taishu",
  shortDescription: "昭和の酒場のような、太字と派手な価格表示。",
  initial: {
    type: "restaurant",
    info: { name: "Shop I", nameJa: "店舗 I", tagline: "ちょっと一杯、しっかり一杯。" },
    categories: cats([
      { id: "drink", name: "ドリンク", subName: "Drink", items: items([
        { id: "nama", name: "生ビール 中ジョッキ", price: 480, badge: "定番" },
        { id: "highball", name: "ハイボール", price: 380, badge: "看板", heroImageUrl: hero("taishu-highball"),
          story: "氷は大手氷店から仕入れた純氷。レモンは国産。\n\n炭酸は強めに、グラスはキンキンに冷やして提供します。何杯でも飲める一杯です。" },
        { id: "lemonsour", name: "生レモンサワー", price: 480 },
        { id: "shochu", name: "麦焼酎（ロック）", price: 480 },
      ])},
      { id: "ippin", name: "おつまみ", subName: "Otsumami", items: items([
        { id: "potato", name: "ポテトサラダ", price: 380 },
        { id: "horumon", name: "ホルモン煮込み", price: 580, badge: "看板" },
        { id: "menma", name: "自家製メンマ", price: 380 },
        { id: "kushikatsu", name: "串カツ盛り合わせ", price: 880 },
      ])},
      { id: "shime", name: "〆", subName: "Finish", items: items([
        { id: "ochazuke", name: "鮭茶漬け", price: 580 },
        { id: "yakionigiri", name: "焼きおにぎり 二個", price: 480 },
      ])},
    ]),
  },
};

// ===== お好み焼き =====
export const okonomiyakiDemo: DemoDefinition = {
  id: "okonomiyaki",
  industry: "restaurant",
  industryLabel: "お好み焼き",
  themeId: "okonomiyaki",
  shortDescription: "黒太罫×黄。関西ノリのライブ感。",
  initial: {
    type: "restaurant",
    info: { name: "Shop H", nameJa: "店舗 H", tagline: "焼くから旨い、その瞬間を。" },
    categories: cats([
      { id: "okonomi", name: "お好み焼き", subName: "Okonomiyaki", items: items([
        { id: "buta", name: "豚玉", price: 980, badge: "定番" },
        { id: "mix", name: "ミックス（豚・烏賊・海老）", price: 1380, badge: "人気", heroImageUrl: hero("okonomi-mix"),
          story: "山芋たっぷりのふんわり生地に、豚バラ・烏賊・海老。\n\n仕上げは特製ソース、青のり、削り立てのかつお節。最後にマヨネーズで一筆描いてお出しします。" },
        { id: "modan", name: "モダン焼（焼そば入り）", price: 1280 },
      ])},
      { id: "teppan", name: "鉄板料理", subName: "Teppan", items: items([
        { id: "yakisoba", name: "焼そば", price: 880 },
        { id: "negiyaki", name: "ねぎ焼", price: 980 },
        { id: "tonpei", name: "とん平焼", price: 780 },
      ])},
      { id: "drink", name: "ドリンク", subName: "Drink", items: items([
        { id: "nama", name: "生ビール", price: 480 },
        { id: "highball", name: "ハイボール", price: 380 },
      ])},
    ]),
  },
};

// ===== うどん =====
export const udonDemo: DemoDefinition = {
  id: "udon",
  industry: "restaurant",
  industryLabel: "うどん",
  themeId: "udon",
  shortDescription: "藍×白。讃岐うどんを潔く。",
  initial: {
    type: "restaurant",
    info: { name: "Shop G", nameJa: "店舗 G", tagline: "粉から、出汁から。" },
    categories: cats([
      { id: "udon", name: "うどん", subName: "Udon", items: items([
        { id: "kake", name: "かけ", price: 380, badge: "看板", heroImageUrl: hero("udon-kake"),
          story: "讃岐の小麦「さぬきの夢」を使い、塩水で寝かせて足踏み。\nつるんとした喉越し、力強いコシの自家製麺です。\n\n出汁はいりこ・かつお・昆布の合わせ出汁を毎朝引いています。" },
        { id: "bukkake", name: "ぶっかけ（冷／温）", price: 480 },
        { id: "kamatama", name: "釜玉", price: 580, badge: "人気" },
        { id: "niku", name: "肉うどん", price: 780 },
      ])},
      { id: "tempura", name: "天ぷら", subName: "Tempura", items: items([
        { id: "ebi", name: "海老天", price: 280 },
        { id: "chikuwa", name: "ちくわ天", price: 180 },
        { id: "hannjuku", name: "半熟玉子天", price: 150 },
      ])},
      { id: "side", name: "サイド", subName: "Side", items: items([
        { id: "inari", name: "いなり 二個", price: 280 },
        { id: "okara", name: "本日の小鉢", price: 200 },
      ])},
    ]),
  },
};

// ===== ワインバー =====
export const wineBarDemo: DemoDefinition = {
  id: "wine-bar",
  industry: "izakaya",
  industryLabel: "ワインバー",
  themeId: "wine-bar",
  shortDescription: "ボルドー×ベルベット。夜更けの一杯のために。",
  initial: {
    type: "restaurant",
    info: { name: "Shop P", nameJa: "店舗 P", tagline: "杯を、ゆっくりと。" },
    categories: cats([
      { id: "wine-red", name: "赤ワイン（グラス）", subName: "Vin Rouge", items: items([
        { id: "bordeaux", name: "ボルドー シャトー・ラリヴェ", subName: "France", price: 1480, badge: "本日", heroImageUrl: hero("wine-red"),
          story: "メドック格付け5級のシャトーから、当店オリジナルセレクション。\n\nカシスとブラックチェリーの香り、しなやかなタンニン。" },
        { id: "burgundy", name: "ブルゴーニュ ピノ・ノワール", subName: "France", price: 1280 },
        { id: "barolo", name: "バローロ 2018", subName: "Italy", price: 1880, badge: "稀少" },
      ])},
      { id: "wine-white", name: "白ワイン（グラス）", subName: "Vin Blanc", items: items([
        { id: "chablis", name: "シャブリ", subName: "France", price: 1280 },
        { id: "sancerre", name: "サンセール", subName: "France", price: 1480 },
        { id: "riesling", name: "リースリング", subName: "Germany", price: 1080 },
      ])},
      { id: "food", name: "おつまみ", subName: "Snacks", items: items([
        { id: "cheese", name: "チーズ三種盛り", price: 1480, badge: "人気" },
        { id: "charcuterie", name: "シャルキュトリ盛り合わせ", price: 1680 },
        { id: "olive", name: "マリネオリーブ", price: 580 },
      ])},
    ]),
  },
};

// ===== クラフトビール =====
export const craftBeerDemo: DemoDefinition = {
  id: "craft-beer",
  industry: "izakaya",
  industryLabel: "クラフトビール",
  themeId: "craft-beer",
  shortDescription: "ホップ茶×黒×ゴールド。インダストリアルな酒場。",
  initial: {
    type: "restaurant",
    info: { name: "Shop Q", nameJa: "店舗 Q", tagline: "今日の樽、12タップ。" },
    categories: cats([
      { id: "tap", name: "オンタップ", subName: "On Tap", items: items([
        { id: "ipa", name: "ヘイジーIPA", subName: "うちゅうブルーイング", price: 1080, badge: "看板", heroImageUrl: hero("craft-ipa"),
          story: "山梨「うちゅうブルーイング」のヘイジーIPA。\nシトラ・モザイクをふんだんに使い、トロピカルな香りと柔らかな苦味のバランス。\n\n樽が空いたら次の入荷をお楽しみに。" },
        { id: "pilsner", name: "ピルスナー", subName: "ベアレン醸造所", price: 880 },
        { id: "stout", name: "オートミールスタウト", subName: "志賀高原ビール", price: 1180 },
        { id: "saison", name: "セゾン", subName: "京都醸造", price: 1080 },
      ])},
      { id: "snack", name: "おつまみ", subName: "Snack", items: items([
        { id: "fritter", name: "本日のフリッター", price: 880 },
        { id: "sausage", name: "自家製ソーセージ三種", price: 1380, badge: "人気" },
        { id: "pretzel", name: "焼きたてプレッツェル", price: 580 },
      ])},
    ]),
  },
};

// ===== カクテルバー =====
export const cocktailBarDemo: DemoDefinition = {
  id: "cocktail-bar",
  industry: "izakaya",
  industryLabel: "カクテルバー",
  themeId: "cocktail-bar",
  shortDescription: "深紫×金。一杯ごとに物語のあるオーセンティック。",
  initial: {
    type: "restaurant",
    info: { name: "Shop R", nameJa: "店舗 R", tagline: "今宵の一杯、お選びください。" },
    categories: cats([
      { id: "signature", name: "シグネチャー", subName: "Signature", items: items([
        { id: "lune", name: "ルーヌ", subName: "Gin / Yuzu / Tonic", price: 1680, badge: "看板", heroImageUrl: hero("cocktail-lune"),
          story: "当店オリジナル。ボタニカルの香り高いジンに、高知県産の柚子を絞り、自家製トニックウォーターで割りました。\n\nグラスは香りを閉じ込める専用のもの。仕上げに檜のチップで燻香を。" },
        { id: "kasumi", name: "霞", subName: "Whisky / Smoke", price: 1880 },
        { id: "tsubaki", name: "椿", subName: "Vodka / Berry", price: 1580 },
      ])},
      { id: "classic", name: "クラシック", subName: "Classic", items: items([
        { id: "martini", name: "ドライ・マティーニ", price: 1480 },
        { id: "manhattan", name: "マンハッタン", price: 1480 },
        { id: "negroni", name: "ネグローニ", price: 1380 },
      ])},
      { id: "whisky", name: "シングルモルト", subName: "Single Malt", items: items([
        { id: "yamazaki", name: "山崎 12年", price: 2200 },
        { id: "lagavulin", name: "ラガヴーリン 16年", price: 1980, badge: "おすすめ" },
      ])},
    ]),
  },
};

// ===== パティスリー =====
export const patisserieDemo: DemoDefinition = {
  id: "patisserie",
  industry: "bakery",
  industryLabel: "パティスリー",
  themeId: "patisserie",
  shortDescription: "ピンクゴールド×アイボリー。宝石のようなケーキ。",
  initial: {
    type: "restaurant",
    info: { name: "Shop X", nameJa: "店舗 X", tagline: "毎日が、ちいさなお祝い。" },
    categories: cats([
      { id: "cake", name: "ケーキ", subName: "Gâteaux", items: items([
        { id: "fraisier", name: "フレジエ", subName: "苺のショートケーキ", price: 680, badge: "人気", heroImageUrl: hero("patisserie-fraisier"),
          story: "栃木県産「とちあいか」を贅沢に。\n\n卵黄たっぷりのジェノワーズと、軽やかなクレーム・ムースリーヌ。仕上げにマジパンで一輪の花を。" },
        { id: "montblanc", name: "モンブラン", subName: "和栗使用", price: 780, badge: "看板" },
        { id: "opera", name: "オペラ", price: 720 },
        { id: "tartecitron", name: "タルト・シトロン", price: 680 },
      ])},
      { id: "petit", name: "焼菓子", subName: "Petits Gâteaux", items: items([
        { id: "canele", name: "カヌレ", price: 380 },
        { id: "madeleine", name: "マドレーヌ（5個入）", price: 980 },
        { id: "financier", name: "フィナンシェ（5個入）", price: 980 },
      ])},
      { id: "drink", name: "お飲み物", subName: "Boisson", items: items([
        { id: "tea", name: "ロンネフェルト紅茶", price: 580 },
        { id: "espresso", name: "エスプレッソ", price: 480 },
      ])},
    ]),
  },
};

// ===== ジェラート =====
export const gelatoDemo: DemoDefinition = {
  id: "gelato",
  industry: "bakery",
  industryLabel: "ジェラート",
  themeId: "gelato",
  shortDescription: "パステルポップ。カラフルで楽しげに。",
  initial: {
    type: "restaurant",
    info: { name: "Shop Y", nameJa: "店舗 Y", tagline: "今日のフレーバー、何にする？" },
    categories: cats([
      { id: "cat-milk", name: "ミルク系", subName: "Milk", items: items([
        { id: "milk-hokkaido", name: "北海道ミルク", price: 480, badge: "定番", heroImageUrl: hero("gelato-milk"),
          story: "北海道の契約牧場から、低温殺菌のノンホモ生乳。\n\nミルク本来の甘さを最大限に引き出すため、砂糖はぎりぎりまで控えています。" },
          { id: "pistachio", name: "シチリア産ピスタチオ", price: 680, badge: "人気" },
        { id: "tiramisu", name: "ティラミス", price: 580 },
      ])},
      { id: "fruit", name: "フルーツ系（ソルベ）", subName: "Sorbet", items: items([
        { id: "mango", name: "完熟マンゴー", price: 580 },
        { id: "strawberry", name: "あまおう苺", price: 580 },
        { id: "lemon", name: "瀬戸内レモン", price: 480 },
      ])},
      { id: "set", name: "サイズ", subName: "Size", items: items([
        { id: "single", name: "シングル", price: 480 },
        { id: "double", name: "ダブル", price: 680, badge: "おすすめ" },
        { id: "triple", name: "トリプル", price: 880 },
      ])},
    ]),
  },
};

// ===== バーガー =====
export const burgerDemo: DemoDefinition = {
  id: "burger",
  industry: "restaurant",
  industryLabel: "バーガー",
  themeId: "burger",
  shortDescription: "赤×白×太枠。レトロアメリカン。",
  initial: {
    type: "restaurant",
    info: { name: "Shop O", nameJa: "店舗 O", tagline: "JUICY. ALWAYS." },
    categories: cats([
      { id: "burger", name: "BURGERS", subName: "Burgers", items: items([
        { id: "classic", name: "クラシック チーズバーガー", price: 1380, badge: "看板", heroImageUrl: hero("burger-classic"),
          story: "ビーフは100%国産黒毛和牛の粗挽き。180gのパティを鉄板で強火短時間、肉汁を逃さず焼き上げます。\n\nバンズは契約ベーカリーで毎朝焼きたて。チーズはチェダーとモッツァレラのミックス。" },
        { id: "bbq", name: "BBQベーコンバーガー", price: 1680, badge: "人気" },
        { id: "avocado", name: "アボカドバーガー", price: 1580 },
        { id: "double", name: "ダブル モンスター", price: 1980 },
      ])},
      { id: "side", name: "SIDES", subName: "Sides", items: items([
        { id: "fries", name: "ハンドカットフライ", price: 580 },
        { id: "onion", name: "オニオンリング", price: 680 },
        { id: "wings", name: "バッファローウィング", price: 880 },
      ])},
      { id: "drink", name: "DRINKS", subName: "Drinks", items: items([
        { id: "shake", name: "クラフトミルクシェイク", price: 680 },
        { id: "craftbeer", name: "クラフトビール（瓶）", price: 880 },
      ])},
    ]),
  },
};

// ===== 北欧モダンカフェ =====
export const modernCafeDemo: DemoDefinition = {
  id: "modern-cafe",
  industry: "cafe",
  industryLabel: "モダンカフェ",
  themeId: "modern-cafe",
  shortDescription: "白×黒×サンセリフ。北欧ミニマルな佇まい。",
  initial: {
    type: "restaurant",
    info: { name: "Shop T", nameJa: "店舗 T", tagline: "Less, but better." },
    categories: cats([
      { id: "coffee", name: "COFFEE", subName: "Espresso & Filter", items: items([
        { id: "espresso", name: "ESPRESSO", price: 380 },
        { id: "americano", name: "AMERICANO", price: 480 },
        { id: "latte", name: "LATTE", price: 580, badge: "POPULAR", heroImageUrl: hero("modern-latte"),
          story: "エチオピア・イルガチェフェのスペシャルティビーンズを浅煎りで。\nミルクは低温殺菌ノンホモ。エスプレッソの果実感とミルクの甘さが綺麗に重なります。" },
        { id: "filter", name: "FILTER COFFEE", subName: "本日の豆", price: 580, badge: "TODAY" },
      ])},
      { id: "matcha", name: "TEA", subName: "Tea", items: items([
        { id: "matcha", name: "MATCHA LATTE", price: 620 },
        { id: "houji", name: "HOUJICHA LATTE", price: 580 },
      ])},
      { id: "food", name: "FOOD", subName: "Food", items: items([
        { id: "granola", name: "GRANOLA BOWL", price: 880 },
        { id: "avocado", name: "AVOCADO TOAST", price: 1080, badge: "BRUNCH" },
        { id: "cookie", name: "BROWN BUTTER COOKIE", price: 380 },
      ])},
    ]),
  },
};

// ===== 茶房 =====
export const teahouseDemo: DemoDefinition = {
  id: "teahouse",
  industry: "cafe",
  industryLabel: "茶房・抹茶",
  themeId: "teahouse",
  shortDescription: "抹茶緑×竹。心落ち着く和の喫茶。",
  initial: {
    type: "restaurant",
    info: { name: "Shop U", nameJa: "店舗 U", tagline: "一服の、間を。" },
    categories: cats([
      { id: "matcha", name: "抹茶", subName: "Matcha", items: items([
        { id: "usucha", name: "薄茶 上生菓子付き", price: 1280, badge: "看板", heroImageUrl: hero("teahouse-usucha"),
          story: "宇治の老舗茶舗から取り寄せた抹茶を、その場で石臼で挽きます。\n\n上生菓子は隣町の和菓子店との季節の共作。お抹茶の前に、ひと口どうぞ。" },
        { id: "koicha", name: "濃茶 上生菓子付き", price: 1880, badge: "稀少" },
        { id: "matchalatte", name: "抹茶ラテ", price: 780 },
      ])},
      { id: "tea", name: "日本茶", subName: "Japanese Tea", items: items([
        { id: "gyokuro", name: "玉露", price: 980 },
        { id: "sencha", name: "煎茶", price: 580 },
        { id: "houjicha", name: "ほうじ茶", price: 480 },
      ])},
      { id: "sweets", name: "甘味", subName: "Sweets", items: items([
        { id: "warabi", name: "わらび餅", price: 780 },
        { id: "anmitsu", name: "クリームあんみつ", price: 880, badge: "人気" },
        { id: "matchaparfait", name: "抹茶パフェ", price: 1280 },
      ])},
    ]),
  },
};

// ===== まつエク =====
export const eyelashDemo: DemoDefinition = {
  id: "eyelash",
  industry: "salon",
  industryLabel: "まつエク",
  themeId: "eyelash",
  shortDescription: "黒×ローズゴールド。ラグジュアリーで繊細に。",
  initial: {
    type: "salon",
    info: { name: "Salon AB", nameJa: "サロン AB", tagline: "目もとから、明日を。" },
    categories: cats([
      { id: "extension", name: "エクステンション", subName: "Extension", items: items([
        { id: "single80", name: "シングルラッシュ 80本", subName: "Single 80", price: 5500, badge: "ベーシック" },
        { id: "single120", name: "シングルラッシュ 120本", price: 7700 },
        { id: "volume", name: "ボリュームラッシュ", subName: "Volume", price: 9900, badge: "人気", heroImageUrl: hero("eyelash-volume"),
          story: "極細毛を扇形に束ねて装着する技法。\n軽くて自然な仕上がりながら、密度のある印象的な目もとに。\n\n持ちは3〜4週間。1〜2ヶ月に一度のメンテナンスをおすすめします。" },
        { id: "flat", name: "フラットラッシュ", subName: "Flat", price: 8800 },
      ])},
      { id: "perm", name: "ラッシュリフト", subName: "Lash Lift", items: items([
        { id: "lift", name: "ラッシュリフト", price: 6600 },
        { id: "liftcolor", name: "ラッシュリフト＋カラー", price: 8800, badge: "おすすめ" },
      ])},
      { id: "option", name: "オプション", subName: "Option", items: items([
        { id: "off-other", name: "他店オフ", price: 1100 },
        { id: "treatment", name: "まつ毛トリートメント", price: 1650 },
      ])},
    ]),
  },
};

// ===== ファミリーレストラン（大規模メニュー） =====
export const familyDemo: DemoDefinition = {
  id: "family",
  industry: "restaurant",
  industryLabel: "ファミレス",
  themeId: "family",
  shortDescription: "11カテゴリ・80品超の大規模メニュー。多品目の店舗でも一覧性を保つ実例。",
  initial: {
    type: "restaurant",
    info: { name: "Shop AD", nameJa: "店舗 AD", tagline: "毎日のごはん、いつもの一皿。" },
    categories: cats([
      { id: "appetizer", name: "前菜・サラダ", subName: "Starters", items: items([
        { id: "edamame", name: "枝豆", price: 280, tags: ["ベジタリアン"] },
        { id: "potato", name: "ポテトフライ", price: 380, tags: ["ベジタリアン", "人気"] },
        { id: "ceasar", name: "シーザーサラダ", price: 580, badge: "人気", tags: ["人気", "サラダ"] },
        { id: "garden", name: "ガーデンサラダ", price: 480, tags: ["ベジタリアン", "サラダ"] },
        { id: "chicken-salad", name: "チキンシーザー", price: 780, tags: ["サラダ", "肉"] },
        { id: "tuna-salad", name: "シーフードサラダ", price: 780, tags: ["サラダ", "魚介"] },
        { id: "carpaccio-beef", name: "牛のカルパッチョ", price: 880, tags: ["肉"] },
        { id: "soup", name: "本日のスープ", price: 380 },
      ])},
      { id: "pasta", name: "パスタ", subName: "Pasta", items: items([
        { id: "fmly-carbonara", name: "カルボナーラ", price: 880, badge: "看板", tags: ["人気", "肉"] },
        { id: "fmly-bolognese", name: "ボロネーゼ", price: 880, tags: ["肉"] },
        { id: "fmly-pepero", name: "ペペロンチーノ", price: 680, tags: ["ベジタリアン"] },
        { id: "fmly-amatriciana", name: "アマトリチャーナ", price: 880, tags: ["肉"] },
        { id: "fmly-vongole", name: "ボンゴレビアンコ", price: 980, tags: ["魚介"] },
        { id: "fmly-arrabbiata", name: "アラビアータ", price: 780, tags: ["ベジタリアン", "辛い"] },
        { id: "fmly-cream-mushroom", name: "きのこのクリームパスタ", price: 880, tags: ["ベジタリアン"] },
        { id: "fmly-tarako", name: "たらこスパゲッティ", price: 880, badge: "人気", tags: ["人気", "魚介"] },
        { id: "fmly-genovese", name: "ジェノベーゼ", price: 880, tags: ["ベジタリアン"] },
        { id: "fmly-meatsauce", name: "ミートソース", price: 780, tags: ["肉"] },
      ])},
      { id: "pizza", name: "ピッツァ", subName: "Pizza", items: items([
        { id: "fmly-margherita", name: "マルゲリータ", price: 999, badge: "定番", tags: ["ベジタリアン", "定番"] },
        { id: "fmly-quattro", name: "クアトロフォルマッジ", price: 1280, tags: ["ベジタリアン", "チーズ"] },
        { id: "fmly-salami", name: "サラミピッツァ", price: 1180, tags: ["肉"] },
        { id: "fmly-seafood", name: "シーフードピッツァ", price: 1380, tags: ["魚介"] },
        { id: "fmly-bbq", name: "BBQチキン", price: 1280, tags: ["肉"] },
        { id: "fmly-tonno", name: "ツナとオニオン", price: 1080, tags: ["魚介"] },
      ])},
      { id: "grill", name: "グリル・メイン", subName: "Grill", items: items([
        { id: "fmly-hamburg", name: "炭火焼ハンバーグ 200g", price: 1080, badge: "看板", tags: ["人気", "肉"] },
        { id: "fmly-hamburg-cheese", name: "チーズハンバーグ", price: 1280, tags: ["肉", "チーズ"] },
        { id: "fmly-sirloin", name: "サーロインステーキ", price: 1980, badge: "おすすめ", tags: ["おすすめ", "肉"] },
        { id: "fmly-pork-ginger", name: "豚の生姜焼き", price: 1080, tags: ["肉"] },
        { id: "fmly-chicken-grilled", name: "若鶏のグリル", price: 980, tags: ["肉"] },
        { id: "fmly-salmon", name: "サーモンのグリル", price: 1280, tags: ["魚介"] },
        { id: "fmly-fish-tomato", name: "白身魚のトマト煮込み", price: 1180, tags: ["魚介"] },
        { id: "fmly-shrimp-fry", name: "海老フライ 4本", price: 1080, tags: ["魚介", "人気"] },
        { id: "fmly-mixfry", name: "ミックスフライ", price: 1180, tags: ["人気"] },
        { id: "fmly-roastbeef", name: "ローストビーフ丼", price: 1280, tags: ["肉"] },
      ])},
      { id: "rice", name: "ライス・ドリア", subName: "Rice", items: items([
        { id: "fmly-rice", name: "ライス", price: 220 },
        { id: "fmly-garlic-rice", name: "ガーリックライス", price: 480 },
        { id: "fmly-paella", name: "シーフードパエリア", price: 1280, tags: ["魚介"] },
        { id: "fmly-doria", name: "ミラノ風ドリア", price: 680, badge: "看板", tags: ["定番"] },
        { id: "fmly-doria-seafood", name: "シーフードドリア", price: 880, tags: ["魚介"] },
        { id: "fmly-omurice", name: "オムライス", price: 880, tags: ["人気"] },
        { id: "fmly-omu-hayashi", name: "オムハヤシ", price: 1080, tags: ["人気", "肉"] },
        { id: "fmly-cheese-risotto", name: "チーズリゾット", price: 980, tags: ["ベジタリアン", "チーズ"] },
      ])},
      { id: "curry", name: "カレー", subName: "Curry", items: items([
        { id: "fmly-beef-curry", name: "ビーフカレー", price: 880, tags: ["肉"] },
        { id: "fmly-chicken-curry", name: "チキンカレー", price: 780, tags: ["肉"] },
        { id: "fmly-vege-curry", name: "野菜カレー", price: 780, tags: ["ベジタリアン"] },
        { id: "fmly-seafood-curry", name: "シーフードカレー", price: 980, tags: ["魚介"] },
        { id: "fmly-keema", name: "キーマカレー", price: 880, tags: ["肉", "辛い"] },
      ])},
      { id: "set", name: "セットメニュー", subName: "Set", items: items([
        { id: "fmly-set-pasta", name: "パスタ＆ピッツァセット", price: 1480, badge: "お得", tags: ["おすすめ"] },
        { id: "fmly-set-hamburg", name: "ハンバーグ＆海老フライ", price: 1580, tags: ["人気", "肉"] },
        { id: "fmly-set-grill", name: "肉と魚のグリルセット", price: 1880, tags: ["おすすめ", "肉", "魚介"] },
        { id: "fmly-set-light", name: "サラダ＆スープセット", price: 880, tags: ["ベジタリアン"] },
      ])},
      { id: "kids", name: "キッズメニュー", subName: "Kids", items: items([
        { id: "fmly-kids-plate", name: "キッズプレート", price: 580, badge: "人気", tags: ["キッズ"] },
        { id: "fmly-kids-hamburg", name: "キッズハンバーグ", price: 580, tags: ["キッズ"] },
        { id: "fmly-kids-spagh", name: "キッズスパゲッティ", price: 480, tags: ["キッズ"] },
        { id: "fmly-kids-omurice", name: "キッズオムライス", price: 480, tags: ["キッズ"] },
      ])},
      { id: "dessert", name: "デザート", subName: "Dessert", items: items([
        { id: "fmly-tiramisu", name: "ティラミス", price: 380, tags: ["ベジタリアン"] },
        { id: "fmly-pannacotta", name: "パンナコッタ", price: 380, tags: ["ベジタリアン"] },
        { id: "fmly-gateau", name: "ガトーショコラ", price: 480, badge: "人気", tags: ["人気", "ベジタリアン"] },
        { id: "fmly-vanilla", name: "バニラアイス", price: 280, tags: ["ベジタリアン"] },
        { id: "fmly-icecream-3", name: "アイスクリーム三種", price: 580, tags: ["ベジタリアン"] },
        { id: "fmly-honey", name: "ハニートースト", price: 680, badge: "シェア向け", tags: ["シェア"] },
        { id: "fmly-parfait", name: "ベリーパフェ", price: 680, tags: ["ベジタリアン"] },
        { id: "fmly-pudding", name: "なめらかプリン", price: 380, tags: ["ベジタリアン"] },
      ])},
      { id: "drink", name: "ドリンク", subName: "Drink", items: items([
        { id: "fmly-drinkbar", name: "ドリンクバー", price: 380, badge: "定番", tags: ["定番"] },
        { id: "fmly-coffee", name: "コーヒー", price: 280 },
        { id: "fmly-latte", name: "カフェラテ", price: 380 },
        { id: "fmly-tea", name: "紅茶", price: 280 },
        { id: "fmly-juice", name: "オレンジジュース", price: 280 },
        { id: "fmly-soda", name: "メロンソーダ", price: 280 },
      ])},
      { id: "alcohol", name: "アルコール", subName: "Alcohol", items: items([
        { id: "fmly-draft", name: "生ビール", price: 480, tags: ["アルコール"] },
        { id: "fmly-wine-red-glass", name: "赤ワイン（グラス）", price: 380, tags: ["アルコール"] },
        { id: "fmly-wine-white-glass", name: "白ワイン（グラス）", price: 380, tags: ["アルコール"] },
        { id: "fmly-highball", name: "ハイボール", price: 380, tags: ["アルコール"] },
        { id: "fmly-sour", name: "レモンサワー", price: 380, tags: ["アルコール"] },
      ])},
    ]),
  },
};

// ===== バーバー =====
export const barberDemo: DemoDefinition = {
  id: "barber",
  industry: "salon",
  industryLabel: "バーバー",
  themeId: "barber",
  shortDescription: "赤白青ストライプ。ヴィンテージなメンズグルーミング。",
  initial: {
    type: "salon",
    info: { name: "Salon AC", nameJa: "サロン AC", tagline: "GENTLEMAN'S GROOMING. SINCE 2014." },
    categories: cats([
      { id: "cut", name: "CUT", subName: "Cut", items: items([
        { id: "haircut", name: "ヘアカット", subName: "Haircut", price: 4400, badge: "BASIC" },
        { id: "skinfade", name: "スキンフェード", subName: "Skin Fade", price: 5500, badge: "POPULAR", heroImageUrl: hero("barber-fade"),
          story: "サイドからトップにかけて、肌からのグラデーションで刈り上げる技法。\nバリカンとハサミ、最後にレーザーで仕上げます。\n\n本場アメリカで研修を積んだスタイリストが担当。" },
        { id: "businesscut", name: "ビジネスカット", price: 4400 },
      ])},
      { id: "shave", name: "SHAVE", subName: "Shave", items: items([
        { id: "shave", name: "シェービング", subName: "Royal Shave", price: 3300, badge: "BASIC" },
        { id: "hotshave", name: "ホットタオルシェービング", price: 5500, badge: "RECOMMEND" },
        { id: "beard", name: "髭の形整え", price: 2200 },
      ])},
      { id: "spa", name: "SPA", subName: "Spa", items: items([
        { id: "headspa", name: "ヘッドスパ 30分", price: 4400 },
        { id: "facial", name: "メンズフェイシャル", price: 6600 },
      ])},
    ]),
  },
};
