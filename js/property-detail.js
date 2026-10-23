/**
 * LÓGICA DE LA PÁGINA DE DETALLE DE PROPIEDAD
 * propiedad.html
 */

let currentProperty = null;
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadPropertyData();
    initMortgageCalculator();
    initDetailForms();
});

// 1. CARGA DE INFORMACIÓN DE LA PROPIEDAD
function loadPropertyData() {
    const params = new URLSearchParams(window.location.search);
    const propId = params.get('id');

    // Buscar la propiedad o usar la primera por defecto
    currentProperty = PROPERTIES_DATA.find(p => p.id === propId) || PROPERTIES_DATA[0];

    if (!currentProperty) return;

    // Actualizar metadatos de la página
    document.title = `${currentProperty.title} (${currentProperty.code}) | Nida Yalico Inmobiliaria`;
    const metaDesc = document.getElementById('pageMetaDesc');
    if (metaDesc) {
        metaDesc.content = `${currentProperty.title} en ${currentProperty.district}, Cono Norte. ${currentProperty.areaM2} m², ${currentProperty.bedrooms} dorms. Asesoría directa con Nida Yalico.`;
    }

    // Cabecera y textos
    document.getElementById('breadcrumbTitle').textContent = currentProperty.title;
    document.getElementById('propTitle').textContent = currentProperty.title;
    document.getElementById('propAddress').innerHTML = `<i class="fa-solid fa-location-dot text-gold-600 mr-1.5"></i> ${currentProperty.address}, ${currentProperty.district}`;
    document.getElementById('propCode').textContent = `Ref: ${currentProperty.code}`;
    document.getElementById('propOperation').textContent = currentProperty.operation;

    // Badge
    const badgeEl = document.getElementById('propBadge');
    if (currentProperty.badge) {
        badgeEl.textContent = currentProperty.badge;
        badgeEl.classList.remove('hidden');
    } else {
        badgeEl.classList.add('hidden');
    }

    // Precios
    document.getElementById('propPriceUSD').textContent = formatCurrency(currentProperty.priceUSD, 'USD');
    document.getElementById('propPricePEN').textContent = `Aprox. ${formatCurrency(currentProperty.pricePEN, 'PEN')}`;

    // Specs principales
    document.getElementById('specArea').textContent = `${currentProperty.areaM2} m²`;
    document.getElementById('specBedrooms').textContent = currentProperty.bedrooms > 0 ? currentProperty.bedrooms : 'N/A';
    document.getElementById('specBathrooms').textContent = currentProperty.bathrooms > 0 ? currentProperty.bathrooms : 'N/A';
    document.getElementById('specParking').textContent = currentProperty.parking > 0 ? currentProperty.parking : 'N/A';

    // Specs secundarias
    document.getElementById('specBuiltArea').textContent = currentProperty.builtAreaM2 > 0 ? `${currentProperty.builtAreaM2} m²` : 'N/A (Terreno)';
    document.getElementById('specFloors').textContent = currentProperty.floors > 0 ? currentProperty.floors : '1 Nivel';
    document.getElementById('specAntiquity').textContent = currentProperty.antiquity || 'Por consultar';

    // Descripción
    const descEl = document.getElementById('propFullDescription');
    descEl.innerHTML = `<p>${currentProperty.description}</p>`;

    // Beneficios / Características
    const featuresEl = document.getElementById('propFeaturesList');
    featuresEl.innerHTML = currentProperty.features.map(feat => `
        <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-700">
            <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs">
                <i class="fa-solid fa-check"></i>
            </div>
            <span>${feat}</span>
        </div>
    `).join('');

    // Galería de imágenes
    setupGallery(currentProperty.images);

    // Enlace de WhatsApp directo para agendar visita
    const waVisitMsg = `Hola Nida Yalico, estoy interesado(a) en agendar una visita para la propiedad: *${currentProperty.title}* (Ref: *${currentProperty.code}*). ¿Cuándo estaría disponible?`;
    const waUrl = generateWhatsAppLink(waVisitMsg);

    const btnDirectWhatsApp = document.getElementById('btnDirectWhatsApp');
    if (btnDirectWhatsApp) btnDirectWhatsApp.href = waUrl;

    const floatingWa = document.getElementById('floatingWaDetailBtn');
    if (floatingWa) floatingWa.href = waUrl;

    // Renderizar propiedades similares
    renderRelatedProperties();
}

// 2. CONFIGURACIÓN DE LA GALERÍA FOTOGRÁFICA
function setupGallery(images) {
    const mainImg = document.getElementById('mainGalleryImage');
    const thumbsContainer = document.getElementById('thumbnailsContainer');
    const counter = document.getElementById('photoCounter');

    if (!images || images.length === 0) return;

    currentImageIndex = 0;
    mainImg.src = images[0];
    counter.textContent = `1 / ${images.length} Fotos`;

    thumbsContainer.innerHTML = images.map((imgSrc, idx) => `
        <button onclick="selectPhoto(${idx})" class="thumb-btn rounded-xl overflow-hidden aspect-[16/10] border-2 transition ${idx === 0 ? 'border-gold-500 shadow-md ring-2 ring-gold-400/40' : 'border-transparent opacity-70 hover:opacity-100'}">
            <img src="${imgSrc}" alt="Foto ${idx + 1}" class="w-full h-full object-cover">
        </button>
    `).join('');
}

window.selectPhoto = function(index) {
    if (!currentProperty || !currentProperty.images[index]) return;
    currentImageIndex = index;

    const mainImg = document.getElementById('mainGalleryImage');
    const counter = document.getElementById('photoCounter');

    mainImg.src = currentProperty.images[index];
    counter.textContent = `${index + 1} / ${currentProperty.images.length} Fotos`;

    // Actualizar estilos activos de los thumbnails
    const thumbBtns = document.querySelectorAll('.thumb-btn');
    thumbBtns.forEach((btn, idx) => {
        if (idx === index) {
            btn.classList.add('border-gold-500', 'shadow-md', 'ring-2', 'ring-gold-400/40');
            btn.classList.remove('border-transparent', 'opacity-70');
        } else {
            btn.classList.remove('border-gold-500', 'shadow-md', 'ring-2', 'ring-gold-400/40');
            btn.classList.add('border-transparent', 'opacity-70');
        }
    });
};

// 3. SIMULADOR DE CUOTA HIPOTECARIA INTERACTIVO
function initMortgageCalculator() {
    const downSelect = document.getElementById('calcDownPaymentPct');
    const yearsSelect = document.getElementById('calcLoanYears');
    const rateInput = document.getElementById('calcInterestRate');

    if (!downSelect || !yearsSelect || !rateInput) return;

    function recalculate() {
        if (!currentProperty) return;

        const price = currentProperty.priceUSD;
        const downPct = Number(downSelect.value) / 100;
        const loanAmount = price * (1 - downPct);
        const years = Number(yearsSelect.value);
        const annualRate = Number(rateInput.value) / 100;

        const months = years * 12;
        const monthlyRate = annualRate / 12;

        let monthlyPaymentUSD = 0;
        if (monthlyRate > 0) {
            monthlyPaymentUSD = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        } else {
            monthlyPaymentUSD = loanAmount / months;
        }

        const monthlyPaymentPEN = monthlyPaymentUSD * SITE_CONFIG.exchangeRate;

        document.getElementById('calcMonthlyPaymentUSD').textContent = `$${Math.round(monthlyPaymentUSD).toLocaleString('en-US')} / mes`;
        document.getElementById('calcMonthlyPaymentPEN').textContent = `Aprox. S/ ${Math.round(monthlyPaymentPEN).toLocaleString('es-PE')} / mes`;
    }

    downSelect.addEventListener('change', recalculate);
    yearsSelect.addEventListener('change', recalculate);
    rateInput.addEventListener('input', recalculate);

    // Cálculo inicial
    recalculate();
}

window.consultMortgageWithNida = function() {
    if (!currentProperty) return;
    const downSelect = document.getElementById('calcDownPaymentPct').value;
    const yearsSelect = document.getElementById('calcLoanYears').value;
    const estCuota = document.getElementById('calcMonthlyPaymentUSD').textContent;

    const text = `Hola Nida Yalico, estuve calculando la cuota hipotecaria para *${currentProperty.title}* (Ref: *${currentProperty.code}*). Con ${downSelect}% de inicial a ${yearsSelect} años me sale aprox. ${estCuota}. ¿Me puedes asesorar con los bancos para la precalificación?`;
    window.open(generateWhatsAppLink(text), '_blank');
};

// 4. FORMULARIO DE DETALLE
function initDetailForms() {
    const form = document.getElementById('detailContactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('dfName').value;
            const phone = document.getElementById('dfPhone').value;

            const text = `Hola Nida Yalico, mi nombre es ${name} (Tel: ${phone}). Solicito que te comuniques conmigo para coordinar una visita y más detalles del inmueble: *${currentProperty.title}* (Ref: *${currentProperty.code}*).`;
            window.open(generateWhatsAppLink(text), '_blank');
        });
    }
}

// 5. PROPIEDADES SIMILARES
function renderRelatedProperties() {
    const grid = document.getElementById('relatedPropertiesGrid');
    if (!grid) return;

    // Filtrar para no mostrar la propiedad actual
    const related = PROPERTIES_DATA.filter(p => p.id !== currentProperty.id).slice(0, 3);

    grid.innerHTML = related.map(prop => `
        <article class="property-card bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
                <div class="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img src="${prop.images[0]}" alt="${prop.title}" class="property-img w-full h-full object-cover">
                    <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-navy-950 text-white">
                        ${prop.operation}
                    </span>
                    <span class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-white text-slate-800">
                        ${prop.code}
                    </span>
                </div>
                <div class="p-4">
                    <div class="text-[11px] font-bold text-gold-600 uppercase mb-1">${prop.district}</div>
                    <h4 class="font-serif font-bold text-sm text-navy-950 line-clamp-1 hover:text-gold-600">
                        <a href="propiedad.html?id=${prop.id}">${prop.title}</a>
                    </h4>
                    <div class="font-serif font-bold text-base text-navy-950 mt-2">
                        ${formatCurrency(prop.priceUSD, 'USD')}
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <a href="propiedad.html?id=${prop.id}" class="block w-full py-2 text-center rounded-xl bg-slate-100 hover:bg-navy-950 hover:text-white font-bold text-xs transition">
                    Ver Inmueble
                </a>
            </div>
        </article>
    `).join('');
}

// 6. FUNCIONES DE COMPARTIR
window.shareOnWhatsApp = function() {
    const shareText = `Mira este inmueble en Cono Norte con Nida Yalico: ${currentProperty.title} - ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
};

window.copyPropertyLink = function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('¡Enlace de la propiedad copiado al portapapeles!');
    }).catch(() => {
        prompt('Copia este enlace:', window.location.href);
    });
};
