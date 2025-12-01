const inputs = ['currentPrice', 'hashrate', 'efficiency', 'kwhCost', 'fiatFactor', 'supply'];
const isManualMode = document.body.classList.contains('manual-mode');
const refreshBtn = document.getElementById('refreshBtn');
const CACHE_DURATION = 120000; 

// === DICCIONARIO (Viva el código espagueti)===
const translations = {
    es: { // Español
        title_auto: "BTC Energy <small>[ SISTEMA AUTO ]</small>",
        title_manual: "Simulador Manual <small>[ MODO SANDBOX ]</small>",
        lbl_price: "Precio ($)",
        lbl_hash: "Hashrate (EH/s)",
        lbl_eff: "Eficiencia (J/TH)",
        lbl_cost: "Costo Elec. ($/kWh)",
        lbl_supply: "Emisión Anual",
        lbl_fiat: "Factor Fiat (f)",
        th_buy: "Compra", th_fair: "Justo", th_sell: "Venta",
        res_label: "Valor Energético Justo",
        btn_init: ":: SISTEMA INICIANDO ::",
        btn_recalc: ":: RECALCULAR ::",
        legal_data: "Datos provistos por",
        legal_warn: "Herramienta educativa. No es consejo financiero.",
        don_title: "☕ Apoya el Proyecto",
        status_buy: "OPORTUNIDAD DE COMPRA",
        status_fair: "VALOR JUSTO",
        status_sell: "DISTRIBUCIÓN",
        status_bubble: "BURBUJA DE MERCADO",
        btn_manual: "⚙ MODO MANUAL",
        btn_auto: "📡 VOLVER A AUTO"
    },
    en: { // Inglés
        title_auto: "BTC Energy <small>[ AUTO SYSTEM ]</small>",
        title_manual: "Manual Simulator <small>[ SANDBOX MODE ]</small>",
        lbl_price: "Price ($)",
        lbl_hash: "Hashrate (EH/s)",
        lbl_eff: "Efficiency (J/TH)",
        lbl_cost: "Elec. Cost ($/kWh)",
        lbl_supply: "Annual Issuance",
        lbl_fiat: "Fiat Factor (f)",
        th_buy: "Buy", th_fair: "Fair", th_sell: "Sell",
        res_label: "Fair Energy Value",
        btn_init: ":: SYSTEM STARTING ::",
        btn_recalc: ":: RECALCULATE ::",
        legal_data: "Data provided by",
        legal_warn: "Educational tool. Not financial advice.",
        don_title: "☕ Support the Project",
        status_buy: "BUY OPPORTUNITY",
        status_fair: "FAIR VALUE",
        status_sell: "DISTRIBUTION",
        status_bubble: "MARKET BUBBLE",
        btn_manual: "⚙ MANUAL MODE",
        btn_auto: "📡 BACK TO AUTO"
    },
    zh: { // Chino Mandarín
        title_auto: "BTC 能源价值 <small>[ 自动系统 ]</small>",
        title_manual: "手动模拟器 <small>[ 沙盒模式 ]</small>",
        lbl_price: "市场价格 ($)",
        lbl_hash: "哈希率 (EH/s)",
        lbl_eff: "效率 (J/TH)",
        lbl_cost: "电费 ($/kWh)",
        lbl_supply: "年度发行量",
        lbl_fiat: "法币系数 (f)",
        th_buy: "购买", th_fair: "公平", th_sell: "出售",
        res_label: "公平能源价值",
        btn_init: ":: 系统启动中 ::",
        btn_recalc: ":: 重新计算 ::",
        legal_data: "数据提供方",
        legal_warn: "教育工具。非财务建议。",
        don_title: "☕ 支持项目",
        status_buy: "购买机会",
        status_fair: "公平价值",
        status_sell: "分销",
        status_bubble: "市场泡沫",
        btn_manual: "⚙ 手动模式",
        btn_auto: "📡 自动模式"
    },
    hi: { // Hindi
        title_auto: "BTC ऊर्जा मूल्य <small>[ ऑटो सिस्टम ]</small>",
        title_manual: "मैनुअल सिम्युलेटर <small>[ सैंडबॉक्स ]</small>",
        lbl_price: "बाजार मूल्य ($)",
        lbl_hash: "हैशरेट (EH/s)",
        lbl_eff: "दक्षता (J/TH)",
        lbl_cost: "बिजली लागत ($/kWh)",
        lbl_supply: "वार्षिक जारी",
        lbl_fiat: "फिएट फैक्टर (f)",
        th_buy: "खरीदें", th_fair: "निष्पक्ष", th_sell: "बेचें",
        res_label: "ऊर्जा उचित मूल्य",
        btn_init: ":: सिस्टम शुरू ::",
        btn_recalc: ":: पुनर्गणना ::",
        legal_data: "डेटा प्रदाता",
        legal_warn: "शैक्षिक उपकरण। वित्तीय सलाह नहीं।",
        don_title: "☕ परियोजना का समर्थन करें",
        status_buy: "खरीदने का अवसर",
        status_fair: "उचित मूल्य",
        status_sell: "वितरण",
        status_bubble: "बाजार बुलबुला",
        btn_manual: "⚙ मैनुअल मोड",
        btn_auto: "📡 ऑटो मोड"
    },
    fr: { // Francés
        title_auto: "Énergie BTC <small>[ SYSTÈME AUTO ]</small>",
        title_manual: "Simulateur Manuel <small>[ MODE SANDBOX ]</small>",
        lbl_price: "Prix Marché ($)",
        lbl_hash: "Hashrate (EH/s)",
        lbl_eff: "Efficacité (J/TH)",
        lbl_cost: "Coût Élec. ($/kWh)",
        lbl_supply: "Émission Annuelle",
        lbl_fiat: "Facteur Fiat (f)",
        th_buy: "Achat", th_fair: "Juste", th_sell: "Vente",
        res_label: "Valeur Énergétique",
        btn_init: ":: DÉMARRAGE ::",
        btn_recalc: ":: RECALCULER ::",
        legal_data: "Données fournies par",
        legal_warn: "Outil éducatif. Pas de conseil financier.",
        don_title: "☕ Soutenir le Projet",
        status_buy: "OPPORTUNITÉ D'ACHAT",
        status_fair: "VALEUR JUSTE",
        status_sell: "DISTRIBUTION",
        status_bubble: "BULLE DE MARCHÉ",
        btn_manual: "⚙ MODE MANUEL",
        btn_auto: "📡 RETOUR AUTO"
    },
    ar: { // Árabe
        title_auto: "طاقة البيتكوين <small>[ نظام تلقائي ]</small>",
        title_manual: "محاكي يدوي <small>[ وضع التجربة ]</small>",
        lbl_price: "سعر السوق ($)",
        lbl_hash: "معدل التجزئة (EH/s)",
        lbl_eff: "الكفاءة (J/TH)",
        lbl_cost: "تكلفة الكهرباء ($/kWh)",
        lbl_supply: "الإصدار السنوي",
        lbl_fiat: "عامل العملة (f)",
        th_buy: "شراء", th_fair: "عادل", th_sell: "بيع",
        res_label: "قيمة الطاقة العادلة",
        btn_init: ":: بدء النظام ::",
        btn_recalc: ":: إعادة الحساب ::",
        legal_data: "البيانات مقدمة من",
        legal_warn: "أداة تعليمية. ليست نصيحة مالية.",
        don_title: "☕ دعم المشروع",
        status_buy: "فرصة شراء",
        status_fair: "قيمة عادلة",
        status_sell: "توزيع",
        status_bubble: "فقاعة السوق",
        btn_manual: "⚙ الوضع اليدوي",
        btn_auto: "📡 الوضع التلقائي"
    },
    bn: { // Bengalí
        title_auto: "BTC শক্তি মান <small>[ অটো সিস্টেম ]</small>",
        title_manual: "ম্যানুয়াল সিমুলেটর <small>[ স্যান্ডবক্স ]</small>",
        lbl_price: "বাজার মূল্য ($)",
        lbl_hash: "হ্যাশরেট (EH/s)",
        lbl_eff: "দক্ষতা (J/TH)",
        lbl_cost: "বিদ্যুৎ খরচ ($/kWh)",
        lbl_supply: "বার্ষিক প্রদান",
        lbl_fiat: "ফিয়াট ফ্যাক্টর (f)",
        th_buy: "ক্রয়", th_fair: "ন্যায্য", th_sell: "বিক্রয়",
        res_label: "ন্যায্য শক্তি মূল্য",
        btn_init: ":: সিস্টেম শুরু ::",
        btn_recalc: ":: পুনঃগণনা ::",
        legal_data: "ডেটা প্রদানকারী",
        legal_warn: "শিক্ষামূলক সরঞ্জাম। আর্থিক পরামর্শ নয়।",
        don_title: "☕ প্রকল্প সমর্থন",
        status_buy: "ক্রয়ের সুযোগ",
        status_fair: "ন্যায্য মূল্য",
        status_sell: "বন্টন",
        status_bubble: "বাজারের বুদবুদ",
        btn_manual: "⚙ ম্যানুয়াল মোড",
        btn_auto: "📡 অটো মোড"
    },
    pt: { // Portugués
        title_auto: "Energia BTC <small>[ SISTEMA AUTO ]</small>",
        title_manual: "Simulador Manual <small>[ MODO SANDBOX ]</small>",
        lbl_price: "Preço Mercado ($)",
        lbl_hash: "Hashrate (EH/s)",
        lbl_eff: "Eficiência (J/TH)",
        lbl_cost: "Custo Eléc. ($/kWh)",
        lbl_supply: "Emissão Anual",
        lbl_fiat: "Fator Fiat (f)",
        th_buy: "Compra", th_fair: "Justo", th_sell: "Venda",
        res_label: "Valor Energético Justo",
        btn_init: ":: INICIANDO SISTEMA ::",
        btn_recalc: ":: RECALCULAR ::",
        legal_data: "Dados fornecidos por",
        legal_warn: "Ferramenta educacional. Não é conselho financeiro.",
        don_title: "☕ Apoiar o Projeto",
        status_buy: "OPORTUNIDADE DE COMPRA",
        status_fair: "VALOR JUSTO",
        status_sell: "DISTRIBUIÇÃO",
        status_bubble: "BOLHA DE MERCADO",
        btn_manual: "⚙ MODO MANUAL",
        btn_auto: "📡 VOLTAR P/ AUTO"
    },
    ru: { // Ruso
        title_auto: "BTC Energy <small>[ АВТО ]</small>",
        title_manual: "Симулятор <small>[ ПЕСОЧНИЦА ]</small>",
        lbl_price: "Цена рынка ($)",
        lbl_hash: "Хешрейт (EH/s)",
        lbl_eff: "Эфф-ть (J/TH)",
        lbl_cost: "Электр. ($/kWh)",
        lbl_supply: "Годовая эмиссия",
        lbl_fiat: "Фиат-фактор (f)",
        th_buy: "Покупка", th_fair: "Норма", th_sell: "Продажа",
        res_label: "Энергостоимость",
        btn_init: ":: ЗАПУСК СИСТЕМЫ ::",
        btn_recalc: ":: ПЕРЕСЧИТАТЬ ::",
        legal_data: "Данные от",
        legal_warn: "Не финансовый совет. Только для обучения.",
        don_title: "☕ Поддержать проект",
        status_buy: "ЗОНА ПОКУПКИ",
        status_fair: "СПРАВЕДЛИВАЯ ЦЕНА",
        status_sell: "РАСПРЕДЕЛЕНИЕ",
        status_bubble: "РЫНОЧНЫЙ ПУЗЫРЬ",
        btn_manual: "⚙ РУЧНОЙ РЕЖИМ",
        btn_auto: "📡 АВТО РЕЖИМ"
    },
    ja: { // Japonés
        title_auto: "BTC エネルギー価値 <small>[ 自動システム ]</small>",
        title_manual: "手動シミュレーター <small>[ サンドボックス ]</small>",
        lbl_price: "市場価格 ($)",
        lbl_hash: "ハッシュレート (EH/s)",
        lbl_eff: "効率 (J/TH)",
        lbl_cost: "電気代 ($/kWh)",
        lbl_supply: "年間発行量",
        lbl_fiat: "法定通貨係数 (f)",
        th_buy: "買い", th_fair: "適正", th_sell: "売り",
        res_label: "適正エネルギー価値",
        btn_init: ":: システム起動中 ::",
        btn_recalc: ":: 再計算 ::",
        legal_data: "データ提供",
        legal_warn: "教育ツール。投資助言ではありません。",
        don_title: "☕ プロジェクトを支援",
        status_buy: "買いの好機",
        status_fair: "適正価格",
        status_sell: "売り圧力",
        status_bubble: "市場バブル",
        btn_manual: "⚙ 手動モード",
        btn_auto: "📡 自動モード"
    }
};

let currentLang = localStorage.getItem('btc_lang') || 'es'; 


async function init() {
    
    const langSelect = document.getElementById('langSelect');
    if(langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('btc_lang', currentLang);
            updateLanguageUI();
            calcular(); 
        });
    }

    updateLanguageUI(); 

    if (isManualMode) {
        calcular();
        if(refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.style.cursor = "pointer";
            refreshBtn.addEventListener('click', calcular);
        }
    } else {
        await checkCacheAndFetch();
        setInterval(async () => { await checkCacheAndFetch(); }, 10000); 
    }
}


function updateLanguageUI() {
    const t = translations[currentLang];
    
   
    const mainTitle = document.getElementById('mainTitle');
    if(mainTitle) mainTitle.innerHTML = isManualMode ? t.title_manual : t.title_auto;

    
    setTxt('lbl_price', t.lbl_price);
    setTxt('lbl_hash', t.lbl_hash);
    setTxt('lbl_eff', t.lbl_eff);
    setTxt('lbl_cost', t.lbl_cost);
    setTxt('lbl_supply', t.lbl_supply);
    setTxt('lbl_fiat', t.lbl_fiat);
    
   
    setTxt('th_buy', t.th_buy);
    setTxt('th_fair', t.th_fair);
    setTxt('th_sell', t.th_sell);
    
    setTxt('res_label', t.res_label);
    setTxt('legal_data', t.legal_data);
    setTxt('legal_warn', t.legal_warn);
    setTxt('don_title', t.don_title);
    
    
    const navBtnText = document.querySelector('.mode-btn span');
    if(navBtnText) navBtnText.innerText = isManualMode ? t.btn_auto : t.btn_manual;
    
    if(refreshBtn && !isManualMode) refreshBtn.innerText = t.btn_init;
    if(refreshBtn && isManualMode) refreshBtn.innerText = t.btn_recalc;
}

function setTxt(id, text) {
    const el = document.getElementById(id);
    if(el) el.innerHTML = text; 
}

async function checkCacheAndFetch() {
    const lastUpdate = localStorage.getItem('btc_last_update_ts');
    const now = Date.now();

    if (lastUpdate && (now - lastUpdate < CACHE_DURATION)) {
        const cachedPrice = localStorage.getItem('btc_cached_price');
        const cachedHash = localStorage.getItem('btc_cached_hash');
        
        if(cachedPrice) document.getElementById('currentPrice').value = cachedPrice;
        if(cachedHash) document.getElementById('hashrate').value = cachedHash;
        
        calcular();
        updateButtonTime(parseInt(lastUpdate), true);
    } else {
        await fetchData();
    }
}

async function fetchData() {
    if (isManualMode) return;
    const actionText = document.getElementById('actionText');
    if(actionText) actionText.innerText = "...";
    
    try {
        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const priceData = await priceResponse.json();
        if(priceData.bitcoin && priceData.bitcoin.usd) {
            const p = priceData.bitcoin.usd;
            document.getElementById('currentPrice').value = p;
            localStorage.setItem('btc_cached_price', p);
        }

        try {
            const hashResponse = await fetch('https://blockchain.info/q/hashrate?cors=true');
            const h = parseFloat(await hashResponse.text());
            if (!isNaN(h)) {
                const hEH = (h / 1000000000).toFixed(2);
                document.getElementById('hashrate').value = hEH;
                localStorage.setItem('btc_cached_hash', hEH);
            }
        } catch (e) { 
            const old = localStorage.getItem('btc_cached_hash');
            if(old) document.getElementById('hashrate').value = old;
        }

        const now = Date.now();
        localStorage.setItem('btc_last_update_ts', now);
        calcular();
        updateButtonTime(now, false);

    } catch (error) {
        console.error(error);
        const btn = document.getElementById('refreshBtn');
        if(btn) btn.innerText = "Error...";
    }
}

function updateButtonTime(timestamp, isCached) {
    const btn = document.getElementById('refreshBtn');
    if(!btn) return;

    const t = new Date(timestamp).toLocaleTimeString();
    const txt = isCached ? `CACHE: ${t}` : `LIVE: ${t}`;
    btn.innerText = `:: ${txt} ::`;
    
    if (!isCached) {
        btn.style.borderColor = "#10b981";
        setTimeout(() => btn.style.borderColor = "transparent", 2000);
    }
}

function calcular() {
    let hashrateEH = parseFloat(document.getElementById('hashrate').value) || 0;
    let efficiencyJTH = parseFloat(document.getElementById('efficiency').value) || 0;
    let kwhCost = parseFloat(document.getElementById('kwhCost').value) || 0;
    let annualSupply = parseFloat(document.getElementById('supply').value) || 1;
    let fiatFactor = parseFloat(document.getElementById('fiatFactor').value) || 1;
    let marketPrice = parseFloat(document.getElementById('currentPrice').value) || 0;

    let fairPrice = (hashrateEH * efficiencyJTH * 1000000 / 1000 * 24 * 365 * kwhCost * fiatFactor) / annualSupply;

    const fairValueEl = document.getElementById('fairValue');
    if(fairValueEl) fairValueEl.innerText = "$" + fairPrice.toLocaleString('en-US', {maximumFractionDigits: 0});

    actualizarTermometro(marketPrice, fairPrice);
}

function actualizarTermometro(marketPrice, fairPrice) {
    const pointer = document.getElementById('pointer');
    const text = document.getElementById('actionText');
    const t = translations[currentLang]; 

    if (marketPrice <= 0 || fairPrice <= 0) return;

    const ratio = marketPrice / fairPrice;
    
    let percentage = 50;
    if (ratio <= 1) {
        percentage = ((ratio - 0.5) / 0.5) * 50;
    } else {
        percentage = 50 + ((ratio - 1) / 2) * 50;
    }
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    
    if(pointer) pointer.style.left = percentage + "%";
    
    if(text) {
        if (ratio < 0.8) {
            text.innerText = t.status_buy; 
            text.style.color = "#10b981"; 
        } else if (ratio >= 0.8 && ratio < 1.2) {
            text.innerText = t.status_fair; 
            text.style.color = "#fbbf24"; 
        } else if (ratio >= 1.2 && ratio < 2.5) {
            text.innerText = t.status_sell; 
            text.style.color = "#ef4444"; 
        } else {
            text.innerText = t.status_bubble; 
            text.style.color = "#ff0000"; 
        }
    }
}

const ids = ['currentPrice', 'hashrate', 'efficiency', 'kwhCost', 'fiatFactor', 'supply'];
ids.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.addEventListener('input', calcular);
});

window.onload = init;