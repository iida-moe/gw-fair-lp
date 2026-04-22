// scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }});
}, { threshold:.1 });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// 店舗検索
const SHOPS = [
  { name:'アイメガネ本店', zip:'331', addr:'〒331-8760 埼玉県さいたま市北区宮原町1-505-1', web:'https://www.aimegane.com/qualification/6395/', tel:'048-668-0001', lat:35.937226, lng:139.613603, img:'images/shops/honntenn-shop.jpg' },
  { name:'アイメガネ与野イオン店', zip:'338', addr:'〒338-0004 埼玉県さいたま市中央区本町西5-2-9', web:'https://www.aimegane.com/qualification/6938/', tel:'048-851-0001', lat:35.890863, lng:139.612513, img:'images/shops/yonoion.png' },
  { name:'アイメガネ与野本町店', zip:'338', addr:'〒338-0003 さいたま市中央区本町東1-6-3', web:'https://www.aimegane.com/qualification/7355/', tel:'048-852-0001', lat:35.878821, lng:139.622358, img:'images/shops/yonohonnmadhi.png' },
  { name:'アイメガネ南浦和店', zip:'336', addr:'〒336-0017 埼玉県さいたま市南区南浦和3-2-5', web:'https://www.aimegane.com/qualification/6340/', tel:'048-885-0001', lat:35.846721, lng:139.669621, img:'images/shops/minamiurawa.jpg' },
  { name:'アイメガネ岩槻駅前通り店', zip:'339', addr:'〒339-0055 埼玉県さいたま市岩槻区東町1-12', web:'https://www.aimegane.com/qualification/7356/', tel:'048-757-0001', lat:35.947905, lng:139.695562, img:'images/shops/iwatuki.png' },
  { name:'アイメガネ上尾東口駅前店', zip:'362', addr:'〒362-0036 埼玉県上尾市宮本町4-18', web:'https://www.aimegane.com/qualification/7153/', tel:'048-773-0001', lat:35.97386, lng:139.587324, img:'images/shops/ageo.png' },
  { name:'アイメガネ鴻巣東駅通り店', zip:'365', addr:'〒365-0039 埼玉県鴻巣市東2-6-2', web:'https://www.aimegane.com/qualification/6939/', tel:'048-542-0001', lat:36.0637, lng:139.5241, img:'images/shops/kounosuhigasi.png' },
  { name:'アイメガネ鴻巣ウニクス店', zip:'369', addr:'〒369-0116 埼玉県鴻巣市北新宿225-1', web:'https://www.aimegane.com/qualification/7358/', tel:'048-547-0001', lat:36.112509, lng:139.436912, img:'images/shops/kounousuunikusu.png' },
  { name:'アイメガネ熊谷ティアラ店', zip:'360', addr:'〒360-0037 埼玉県熊谷市筑波3-202', web:'https://www.aimegane.com/qualification/7359/', tel:'048-525-0001', lat:36.139479, lng:139.389063, img:'images/shops/kumagaya.png' },
  { name:'アイメガネ深谷上柴西店', zip:'366', addr:'〒366-0052 埼玉県深谷市上柴町西3-7-9', web:'https://www.aimegane.com/qualification/6681/', tel:'048-572-0001', lat:36.18414, lng:139.300285, img:'images/shops/fukaya.png' },
  { name:'アイメガネ本庄南大通り店', zip:'367', addr:'〒367-0044 埼玉県本庄市見福3-13-12', web:'https://www.aimegane.com/shop/', tel:'0495-21-0001', lat:36.22822, lng:139.178223, img:'images/shops/honjo.webp' },
  { name:'アイメガネ富士見鶴馬店', zip:'354', addr:'〒354-0021 埼玉県富士見市鶴馬1-25-1', web:'https://www.aimegane.com/qualification/7158/', tel:'049-251-0001', lat:35.851697, lng:139.541735, img:'images/shops/fuzimi.png' },
  { name:'アイメガネ川越的場店', zip:'350', addr:'〒350-1101 埼玉県川越市的場823-1', web:'https://www.aimegane.com/qualification/7159/', tel:'049-233-0001', lat:35.914154, lng:139.42809, img:'images/shops/kawagoe.png' },
  { name:'アイメガネ坂戸にっさい店', zip:'350', addr:'〒350-0269 埼玉県坂戸市にっさい花みず木3-11-2', web:'https://www.aimegane.com/qualification/6940/', tel:'049-280-0001', lat:35.969359, lng:139.368666, img:'images/shops/sakado.png' },
  { name:'アイメガネ東松山松本町店', zip:'355', addr:'〒355-0014 埼玉県東松山市松本町2-7-1', web:'https://www.aimegane.com/qualification/7361/', tel:'0493-27-0001', lat:36.039377, lng:139.41351, img:'images/shops/higasimatuyama.png' },
  { name:'アイメガネ嵐山バイパス店', zip:'355', addr:'〒355-0215 埼玉県比企郡嵐山町平澤2610', web:'https://www.aimegane.com/qualification/7362/', tel:'0493-61-0001', lat:36.044584, lng:139.314798, img:'images/shops/rannzann.png' },
  { name:'アイメガネ小川大塚店', zip:'355', addr:'〒355-0328 埼玉県比企郡小川町大塚541-1', web:'https://www.aimegane.com/qualification/7363/', tel:'0493-73-0001', lat:36.058609, lng:139.254464, img:'images/shops/ogawaootuka.png' },
  { name:'アイメガネ寄居店', zip:'369', addr:'〒369-1203 埼玉県大里郡寄居町寄居1615-1', web:'https://www.aimegane.com/qualification/7364/', tel:'048-580-0001', lat:36.120921, lng:139.186708, img:'images/shops/yorii.webp' },
  { name:'アイメガネ日高店', zip:'350', addr:'〒350-1231 埼玉県日高市鹿山301-6', web:'https://www.aimegane.com/qualification/5078/', tel:'042-986-0001', lat:35.896285, lng:139.337031, img:'images/shops/hidaka.png' },
  { name:'アイメガネイオンタウン毛呂山店', zip:'350', addr:'〒350-0436 埼玉県入間郡毛呂山町川角58-3', web:'https://www.aimegane.com/qualification/6941/', tel:'049-293-0001', lat:35.946429, lng:139.311799, img:'images/shops/moroyama.png' },
  { name:'アイメガネ秩父中宮地店', zip:'368', addr:'〒368-0022 埼玉県秩父市中宮地町5-7', web:'https://www.aimegane.com/qualification/6682/', tel:'0494-21-0001', lat:36.0043, lng:139.08865, img:'images/shops/titibu.png' },
  { name:'アイメガネ川口赤井店', zip:'334', addr:'〒334-0073 埼玉県川口市赤井4-16-19', web:'https://www.aimegane.com/qualification/7154/', tel:'048-280-0001', lat:35.829315, lng:139.738067, img:'images/shops/kawaguti.png' },
  { name:'アイメガネエキア谷塚店', zip:'340', addr:'〒340-0028 埼玉県草加市谷塚1-1-23', web:'https://www.aimegane.com/qualification/7156/', tel:'048-924-0001', lat:35.81447, lng:139.799081, img:'images/shops/yatuka.png' },
  { name:'アイメガネ三郷南口駅前通り店', zip:'341', addr:'〒341-0024 埼玉県三郷市三郷1-27-7', web:'https://www.aimegane.com/qualification/7360/', tel:'048-949-0002', lat:35.841637, lng:139.881253, img:'images/shops/misato.png' },
  { name:'アイメガネ新越谷店', zip:'343', addr:'〒343-0857 埼玉県越谷市新越谷1-70-1', web:'https://www.aimegane.com/qualification/6133/', tel:'048-990-0001', lat:35.872129, lng:139.781357, img:'images/shops/sinnkosi.png' },
  { name:'アイメガネ蓮田関山店', zip:'349', addr:'〒349-0121 埼玉県蓮田市関山2-6-13', web:'https://www.aimegane.com/qualification/7152/', tel:'048-764-0001', lat:35.989131, lng:139.646368, img:'images/shops/hasuda.png' },
  { name:'アイメガネ幸手エムズタウン店', zip:'340', addr:'〒340-0155 埼玉県幸手市上高野824', web:'https://www.aimegane.com/qualification/7157/', tel:'0480-44-0001', lat:36.066043, lng:139.71615, img:'images/shops/sattte.png' },
  { name:'アイメガネ羽生店', zip:'348', addr:'〒348-0053 埼玉県羽生市南7-1-1', web:'https://www.aimegane.com/qualification/6937/', tel:'048-563-0001', lat:36.166224, lng:139.537497, img:'images/shops/hanyuu.png' },
  { name:'アイメガネ小平小川町店', zip:'187', addr:'〒187-0032 東京都小平市小川町2-1328', web:'https://www.aimegane.com/qualification/6683/', tel:'042-347-6877', lat:35.73041, lng:139.473441, img:'images/shops/kodaira.png' },
  { name:'アイメガネザ・マーケットプレイス東大和店', zip:'207', addr:'〒207-0021 東京都東大和市立野3-1344-1', web:'https://www.aimegane.com/qualification/6684/', tel:'042-843-7011', lat:35.751, lng:139.442, img:'images/shops/yamato.png' },
  { name:'アイメガネ町田木曽店', zip:'194', addr:'〒194-0036 東京都町田市木曽東3-8-1', web:'https://www.aimegane.com/qualification/7679/', tel:'042-724-0201', lat:35.561476, lng:139.425796, img:'images/shops/matida.png' },
  { name:'アイメガネおもちゃのまち西口店', zip:'321', addr:'〒321-0206 栃木県下都賀郡壬生町あけぼの町5-5', web:'https://www.aimegane.com/qualification/7678/', tel:'0282-85-0001', lat:36.47107, lng:139.825802, img:'images/shops/omotya.png' },
  { name:'アイメガネ宇都宮錦店', zip:'321', addr:'〒321-0967 栃木県宇都宮市錦3-9-11', web:'https://www.aimegane.com/qualification/7433/', tel:'028-627-0001', lat:36.574698, lng:139.89493, img:'images/shops/nisiki.png' },
  { name:'アイメガネ今市センショープラザ店', zip:'321', addr:'〒321-2405 栃木県日光市芹沼1448-1', web:'https://www.aimegane.com/qualification/6680/', tel:'0288-23-0001', lat:36.741119, lng:139.70774, img:'images/shops/imaiti.png' },
  { name:'アイメガネ八千代台ユアエルム店', zip:'276', addr:'〒276-0032 千葉県八千代市八千代台東1-1-10', web:'https://www.aimegane.com/qualification/7365/', tel:'047-485-0001', lat:35.700303, lng:140.073005, img:'images/shops/yatio.png' },
  { name:'アイメガネ古河イオン店', zip:'306', addr:'〒306-0012 茨城県古河市旭町1-2-17', web:'https://www.aimegane.com/qualification/7366/', tel:'0280-33-0001', lat:36.197244, lng:139.716929, img:'images/shops/kogaionn.png' },
  { name:'アイメガネ藤岡店', zip:'375', addr:'〒375-0024 群馬県藤岡市藤岡937-1', web:'https://www.aimegane.com/qualification/7367/', tel:'0274-22-0001', lat:36.253775, lng:139.074382, img:'images/shops/fuzioka.png' },
  { name:'アイメガネ焼津石津店', zip:'425', addr:'〒425-0041 静岡県焼津市石津3-19-16', web:'https://www.aimegane.com/qualification/7369/', tel:'054-656-0001', lat:34.843318, lng:138.31291, img:'images/shops/yaizu.png' },
];

// 画像パス解決: WordPress環境では window.LP_ASSETS（絶対URL）でimages/部分を置換
const _LP_BASE = (typeof window.LP_ASSETS === 'string' && window.LP_ASSETS) ? window.LP_ASSETS : 'images';
SHOPS.forEach(s => { if (s.img) s.img = s.img.replace(/^images\//, _LP_BASE + '/'); });

// 郵便番号3桁プレフィックス → [緯度, 経度] 概算マップ（ユーザー入力位置推定用）
// 店舗所在地以外の関東近郊もカバー
const ZIP_CENTERS = {
  '100':[35.685,139.753],'101':[35.698,139.770],'102':[35.689,139.744],'103':[35.685,139.781],'104':[35.669,139.769],'105':[35.658,139.751],'106':[35.655,139.730],'107':[35.663,139.729],'108':[35.642,139.750],'110':[35.712,139.777],'111':[35.710,139.800],'112':[35.721,139.745],'113':[35.720,139.762],'114':[35.751,139.733],'115':[35.775,139.720],'116':[35.736,139.762],'120':[35.776,139.804],'121':[35.786,139.822],'130':[35.703,139.814],'131':[35.711,139.821],'132':[35.708,139.878],'133':[35.709,139.868],'134':[35.677,139.875],'135':[35.652,139.819],'136':[35.669,139.826],'140':[35.609,139.731],'141':[35.625,139.729],'142':[35.611,139.715],'143':[35.605,139.729],'144':[35.561,139.716],'145':[35.587,139.688],'146':[35.562,139.675],'150':[35.658,139.702],'151':[35.677,139.701],'152':[35.633,139.699],'153':[35.640,139.693],'154':[35.648,139.670],'155':[35.659,139.659],'156':[35.641,139.643],'157':[35.653,139.629],'158':[35.608,139.643],'160':[35.694,139.703],'161':[35.708,139.715],'162':[35.699,139.725],'163':[35.690,139.692],'164':[35.694,139.666],'165':[35.706,139.665],'166':[35.700,139.640],'167':[35.705,139.622],'168':[35.684,139.634],'169':[35.704,139.702],'170':[35.733,139.712],'171':[35.728,139.714],'173':[35.751,139.709],'174':[35.752,139.686],'175':[35.777,139.686],'176':[35.736,139.652],'177':[35.734,139.627],'178':[35.731,139.605],'179':[35.757,139.616],'180':[35.705,139.580],'181':[35.684,139.568],'182':[35.651,139.545],'183':[35.680,139.479],'184':[35.698,139.481],'185':[35.702,139.464],'186':[35.738,139.438],'187':[35.729,139.478],'188':[35.722,139.455],'189':[35.763,139.477],'190':[35.696,139.414],'191':[35.659,139.339],'192':[35.663,139.338],'193':[35.640,139.339],'194':[35.559,139.437],'195':[35.635,139.441],'196':[35.800,139.386],'197':[35.795,139.348],'198':[35.799,139.210],'201':[35.697,139.546],'202':[35.714,139.548],'203':[35.756,139.544],'204':[35.799,139.478],'205':[35.785,139.391],'206':[35.650,139.442],'207':[35.754,139.436],'208':[35.717,139.407],'211':[35.571,139.664],'212':[35.538,139.697],'213':[35.606,139.577],'214':[35.592,139.556],'215':[35.559,139.563],'216':[35.579,139.542],'220':[35.453,139.634],'221':[35.485,139.605],'222':[35.504,139.627],'223':[35.539,139.635],'224':[35.537,139.592],'225':[35.531,139.545],'226':[35.515,139.522],'227':[35.544,139.495],'230':[35.521,139.702],'231':[35.442,139.642],'232':[35.430,139.620],'233':[35.393,139.586],'234':[35.398,139.553],'235':[35.384,139.615],'236':[35.365,139.638],'237':[35.339,139.657],'238':[35.275,139.661],'239':[35.281,139.678],'240':[35.451,139.582],'241':[35.493,139.508],'243':[35.438,139.343],'245':[35.475,139.527],'250':[35.265,139.154],'252':[35.530,139.387],'253':[35.331,139.406],'254':[35.322,139.341],'257':[35.301,139.148],'270':[35.771,139.918],'271':[35.781,139.901],'272':[35.724,139.932],'273':[35.697,139.983],'274':[35.697,140.027],'275':[35.687,140.027],'276':[35.722,140.101],'277':[35.864,139.962],'278':[35.820,139.912],'279':[35.642,139.900],'290':[35.495,140.124],'295':[35.082,140.111],'296':[35.168,140.166],'298':[35.134,140.283],'299':[35.519,140.222],'300':[35.976,140.140],'301':[35.908,140.027],'302':[35.931,139.989],'305':[36.103,140.117],'306':[36.178,139.698],'307':[36.193,139.742],'308':[36.177,139.997],'309':[36.108,140.136],'310':[36.343,140.448],'311':[36.373,140.408],'312':[36.384,140.478],'313':[36.385,140.540],'314':[36.028,140.487],'315':[36.118,140.407],'316':[36.383,140.564],'317':[36.517,140.663],'318':[36.569,140.651],'319':[36.394,140.443],'320':[36.553,139.876],'321':[36.554,139.889],'322':[36.726,139.853],'323':[36.370,139.731],'324':[36.962,139.910],'325':[36.979,139.919],'326':[36.380,139.605],'327':[36.333,139.569],'328':[36.381,139.671],'329':[36.575,139.799],'330':[35.903,139.665],'331':[35.942,139.623],'332':[35.828,139.743],'333':[35.861,139.748],'334':[35.823,139.765],'335':[35.796,139.685],'336':[35.847,139.671],'337':[35.924,139.701],'338':[35.883,139.635],'339':[35.949,139.686],'340':[35.813,139.803],'341':[35.819,139.866],'342':[35.987,139.799],'343':[35.875,139.795],'344':[35.899,139.716],'345':[36.075,139.741],'346':[36.080,139.657],'347':[36.140,139.600],'348':[36.171,139.549],'349':[35.994,139.674],'350':[35.931,139.471],'351':[35.795,139.591],'352':[35.796,139.570],'353':[35.814,139.578],'354':[35.846,139.543],'355':[36.032,139.408],'356':[35.869,139.557],'357':[35.850,139.317],'358':[35.878,139.534],'359':[35.784,139.432],'360':[36.139,139.395],'361':[36.056,139.497],'362':[35.974,139.596],'363':[36.008,139.566],'364':[35.994,139.554],'365':[36.066,139.522],'366':[36.185,139.288],'367':[36.248,139.199],'368':[36.007,139.085],'369':[36.117,139.203],'370':[36.322,139.006],'371':[36.390,139.061],'372':[36.311,139.325],'373':[36.302,139.371],'374':[36.256,139.192],'375':[36.256,139.077],'376':[36.402,139.333],'377':[36.480,138.996],'378':[36.644,139.061],'379':[36.467,138.879],'380':[36.649,138.195],'381':[36.605,138.195],'400':[35.664,138.568],'410':[35.119,138.906],'411':[35.117,138.907],'412':[35.240,138.937],'413':[34.975,138.934],'414':[34.968,139.099],'415':[34.761,138.946],'416':[35.121,138.685],'417':[35.172,138.610],'418':[35.216,138.612],'419':[35.315,138.252],'420':[34.975,138.383],'421':[34.866,138.274],'422':[34.944,138.425],'423':[34.974,138.485],'424':[35.012,138.488],'425':[34.863,138.318],'426':[34.897,138.260],'427':[34.816,138.232],'428':[34.987,138.149],'429':[34.761,137.961],'430':[34.710,137.727],'431':[34.712,137.721],'432':[34.710,137.714],'433':[34.760,137.751],'434':[34.776,137.811],'435':[34.720,137.775],'436':[34.801,137.999],'437':[34.786,138.039],'438':[34.728,137.852],'439':[34.790,138.012],'440':[34.773,137.389]
};

// Haversine距離計算（km）
function haversineKm(lat1,lng1,lat2,lng2){
  const toRad=d=>d*Math.PI/180;
  const R=6371;
  const dLat=toRad(lat2-lat1);
  const dLng=toRad(lng2-lng1);
  const a=Math.sin(dLat/2)**2+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
}
function renderShops(list){
  return list.map(s=>`
    <div class="shop-card">
      <p class="shop-card-name">${s.name}</p>
      <p class="shop-card-addr">${s.addr}</p>
      ${s.distanceKm!=null?`<p class="shop-card-distance">お住まいから約 <strong>${s.distanceKm.toFixed(1)} km</strong></p>`:''}
      <div class="shop-card-btns">
        <a href="${s.web}" target="_blank" rel="noopener" class="shop-btn-web">
          <span class="shop-btn-web-main">WEB予約</span>
          <span class="shop-btn-w-badge"><span class="shop-btn-w-initial">W</span>チャンス！</span>
        </a>
        <a href="tel:${s.tel.replace(/-/g,'')}" class="shop-btn-tel">電話予約</a>
      </div>
    </div>
  `).join('');
}
function renderHeroShop(s,userZip){
  const photoHtml=s.img?`<img src="${s.img}" alt="${s.name}店舗写真">`:`<div class="shop-hero-photo-ph"><span>📷 店舗写真</span></div>`;
  return `
    <div class="shop-hero-card">
      <div class="shop-hero-photo">${photoHtml}</div>
      <div class="shop-hero-body">
        <p class="shop-hero-badge">お客様に最も近い店舗</p>
        <h3 class="shop-hero-name">${s.name}</h3>
        <p class="shop-hero-addr">${s.addr}</p>
        ${s.distanceKm!=null?`<p class="shop-hero-distance">お住まいから約 <strong>${s.distanceKm.toFixed(1)} km</strong></p>`:''}
        <div class="shop-hero-btns">
          <a href="${s.web}" target="_blank" rel="noopener" class="shop-hero-btn shop-hero-btn-web">
            <span class="shop-btn-web-main">WEB予約</span>
            <span class="shop-btn-w-badge"><span class="shop-btn-w-initial">W</span>チャンス！</span>
          </a>
          <a href="tel:${s.tel.replace(/-/g,'')}" class="shop-hero-btn shop-hero-btn-tel">電話予約</a>
        </div>
      </div>
    </div>
  `;
}
function showInitialShops(){
  const resEl=document.getElementById('shop-results');
  const countEl=document.getElementById('shop-count');
  const initial=SHOPS.slice(0,6);
  const rest=SHOPS.slice(6);
  countEl.style.display='none';
  resEl.innerHTML=`
    <div class="shop-initial">${renderShops(initial)}</div>
    ${rest.length>0?`
    <div class="shop-more-wrap">
      <div class="shop-more-list-outer">
        <div class="shop-more-list" id="shopMoreList">${renderShops(rest)}</div>
        <div class="shop-back-rail" id="shopBackRail"><a href="#shop-search" class="shop-back-top"><span class="shop-back-arrows">«</span>検索に戻る</a></div>
      </div>
      <button type="button" class="shop-more-btn" id="shopMoreBtn" onclick="toggleMoreShops()">
        <span class="shop-more-btn-text">もっと見る</span>
      </button>
    </div>
    `:''}
  `;
}
let shopAccordionOpen=false;
function updateBackBtnPos(){
  const fb=document.getElementById('shopBackFixed');
  if(!fb)return;
  const results=document.getElementById('shop-results');
  if(!results)return;
  const rr=results.getBoundingClientRect();
  fb.style.right=(window.innerWidth-rr.right-52)+'px';
}
function toggleMoreShops(){
  const list=document.getElementById('shopMoreList');
  const outer=list.closest('.shop-more-list-outer');
  const btn=document.getElementById('shopMoreBtn');
  const fb=document.getElementById('shopBackFixed');
  const textEl=btn.querySelector('.shop-more-btn-text');
  const isOpen=outer.classList.toggle('open');
  list.classList.toggle('open',isOpen);
  textEl.textContent=isOpen?'閉じる':'もっと見る';
  btn.classList.toggle('open',isOpen);
  shopAccordionOpen=isOpen;
  if(fb){
    if(isOpen){
      updateBackBtnPos();
      // アコーディオン開いたら少し待って表示判定を実行
      setTimeout(checkBackBtnVisibility,200);
    } else {
      fb.classList.remove('visible');
    }
  }
}
function checkBackBtnVisibility(){
  const fb=document.getElementById('shopBackFixed');
  if(!fb||!shopAccordionOpen)return;
  const list=document.getElementById('shopMoreList');
  if(!list)return;
  const cards=list.querySelectorAll('.shop-card');
  if(!cards.length)return;
  const listRect=list.getBoundingClientRect();
  const lastRect=cards[cards.length-1].getBoundingClientRect();
  const vh=window.innerHeight;
  const show=listRect.top<vh*0.8&&lastRect.top>vh*0.4;
  fb.classList.toggle('visible',show);
  updateBackBtnPos();
}
window.addEventListener('scroll',checkBackBtnVisibility,{passive:true});
window.addEventListener('resize',updateBackBtnPos);
// HeartRails APIで7桁郵便番号→緯度経度を取得(建物レベル精度)
async function fetchZipCoord(zip7){
  try{
    const res=await fetch(`https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${zip7}`);
    const data=await res.json();
    const loc=data?.response?.location?.[0];
    if(loc && loc.x && loc.y){
      return {lat:parseFloat(loc.y),lng:parseFloat(loc.x),addr:`${loc.prefecture}${loc.city}${loc.town}`};
    }
  }catch(e){}
  return null;
}
function renderSearchResult(userLat,userLng,labelHtml){
  const resEl=document.getElementById('shop-results');
  const countEl=document.getElementById('shop-count');
  const ranked=SHOPS.map(s=>({
    ...s,
    distanceKm:haversineKm(userLat,userLng,s.lat,s.lng)
  })).sort((a,b)=>a.distanceKm-b.distanceKm);
  countEl.style.display='block';
  countEl.innerHTML=`${labelHtml}<br><small class="shop-count-note">※表示される距離は直線距離です。<br class="br-sp">実際の道のりとは異なる場合があります。</small>`;
  const hero=ranked[0];
  const others=ranked.slice(1,5);
  const rest=ranked.slice(5);
  resEl.innerHTML=`
    ${renderHeroShop(hero)}
    <div class="shop-others-grid">${renderShops(others)}</div>
    ${rest.length>0?`
    <div class="shop-more-wrap">
      <div class="shop-more-list-outer">
        <div class="shop-more-list" id="shopMoreList">${renderShops(rest)}</div>
      </div>
      <button type="button" class="shop-more-btn" id="shopMoreBtn" onclick="toggleMoreShops()">
        <span class="shop-more-btn-text">もっと見る</span>
      </button>
    </div>
    `:''}
  `;
}
async function searchShop(){
  const z1=document.getElementById('zip1').value.trim();
  const z2=document.getElementById('zip2').value.trim();
  const zip=z1+z2;
  const countEl=document.getElementById('shop-count');
  const resEl=document.getElementById('shop-results');
  if(zip.length<3){
    showInitialShops();
    return;
  }
  // 7桁揃ってたら外部APIで精密座標を取得
  if(zip.length===7){
    countEl.style.display='block';
    countEl.textContent='位置情報を取得中…';
    resEl.innerHTML='';
    const coord=await fetchZipCoord(zip);
    if(coord){
      renderSearchResult(coord.lat,coord.lng,
        `<span class="shop-count-zip">〒${z1}-${z2}</span>（${coord.addr}）から近い順`);
      return;
    }
  }
  // フォールバック: 3桁プレフィックスで推定
  const center=ZIP_CENTERS[z1];
  if(!center){
    countEl.style.display='block';
    countEl.textContent='この郵便番号の位置情報が見つかりませんでした。';
    resEl.innerHTML='<p class="shop-empty">別の番号を試すか、下の「店舗一覧を見る」からお近くの店舗をお探しください。</p>';
    return;
  }
  renderSearchResult(center[0],center[1],
    `<span class="shop-count-zip">〒${z1}${z2?'-'+z2:''}</span> から近い順`);
}
document.getElementById('zip1').addEventListener('input',function(){if(this.value.length>=3)document.getElementById('zip2').focus();});
document.getElementById('zip1').addEventListener('keydown',function(e){
  if(e.key!=='Enter')return;
  e.preventDefault();
  if(this.value.trim().length>=3)searchShop();
  else document.getElementById('zip2').focus();
});
document.getElementById('zip2').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();searchShop();}});

// デフォルトで6店舗表示 + アコーディオン
showInitialShops();

// フローティングCTA: ヒーロー通過後〜最終CTA到達前まで表示
const fc = document.getElementById('floatCta');
const hero = document.getElementById('hero');
const fctaEl = document.getElementById('fcta');
window.addEventListener('scroll', () => {
  const passedHero = window.scrollY > hero.offsetHeight - 100;
  const fctaTop = fctaEl ? fctaEl.getBoundingClientRect().top : Infinity;
  const beforeFcta = fctaTop > window.innerHeight;
  fc.classList.toggle('visible', passedHero && beforeFcta);
}, { passive: true });
