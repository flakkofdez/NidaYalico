/**
 * LOGICA PRINCIPAL DEL PORTAL - NIDA YALICO
 * index.html
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPropertiesGrid();
    initHeroSearch();
    initLeadForms();
    initWhatsAppWidget();
});

// ESTADO GLOBAL DE FILTROS
let currentFilterState = {
    category: 'all',
    operation: '',
    type: '',
    district: ''
};

// 1. NAVEGACIÓN Y MENÚ MÓVIL
function initNavigation() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer clic en enlaces móviles
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // Efecto scroll en cabecera
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-xl', 'bg-navy-950/98');
        } else {
            header.classList.remove('shadow-xl');
        }
    });
}

// 2. RENDERIZADO DEL CATÁLOGO DE PROPIEDADES
function initPropertiesGrid() {
    const grid = document.getElementById('propertiesGrid');
    const filterPills = document.querySelectorAll('.filter-pill');

    // Manejar clics en las píldoras de filtro
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => {
                p.classList.remove('active', 'bg-navy-950', 'text-white', 'shadow');
                p.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
            });

            pill.classList.add('active', 'bg-navy-950', 'text-white', 'shadow');
            pill.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');

            const filterValue = pill.getAttribute('data-filter');
            currentFilterState.category = filterValue;
            applyFilters();
        });
    });

    renderProperties(PROPERTIES_DATA);
}

// Función para pintar las tarjetas de propiedades
function renderProperties(properties) {
    const grid = document.getElementById('propertiesGrid');
    const noResults = document.getElementById('noResultsMsg');
    
    if (!grid) return;

    if (properties.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.classList.remove('hidden');
        return;
    }

    if (noResults) noResults.classList.add('hidden');

    grid.innerHTML = properties.map(prop => {
        const waDirectMsg = encodeURIComponent(`Hola Nida Yalico, me interesa información de la propiedad: ${prop.title} (Código: ${prop.code})`);
        const waUrl = `https://wa.me/${SITE_CONFIG.agent.phoneRaw}?text=${waDirectMsg}`;

        return `
            <article class="property-card bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 flex flex-col justify-between">
                <div>
                    <!-- IMAGEN Y BADGES -->
                    <div class="relative overflow-hidden aspect-[16/10] bg-slate-100">
                        <img src="${prop.images[0]}" alt="${prop.title}" class="property-img w-full h-full object-cover" loading="lazy">
                        
                        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-950/90 text-white backdrop-blur-sm">
                                ${prop.operation}
                            </span>
                            ${prop.badge ? `
                                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500 text-navy-950 shadow-sm">
                                    ${prop.badge}
                                </span>
                            ` : ''}
                        </div>

                        <div class="absolute top-3 right-3">
                            <span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-white/90 text-slate-800 shadow-sm">
                                ${prop.code}
                            </span>
                        </div>

                        <div class="absolute bottom-3 left-3">
                            <span class="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                                <i class="fa-solid fa-camera"></i> ${prop.images.length} fotos
                            </span>
                        </div>
                    </div>

                    <!-- CONTENIDO DE LA TARJETA -->
                    <div class="p-6">
                        <div class="flex items-center gap-1.5 text-xs text-gold-600 font-bold uppercase tracking-wider mb-1.5">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>${prop.district} • Cono Norte</span>
                        </div>

                        <h3 class="font-serif font-bold text-xl text-navy-950 line-clamp-1 hover:text-gold-600 transition">
                            <a href="propiedad.html?id=${prop.id}">${prop.title}</a>
                        </h3>
                        <p class="text-xs text-slate-500 line-clamp-1 mt-1 mb-4">
                            ${prop.address}
                        </p>

                        <!-- PRECIOS -->
                        <div class="flex items-baseline justify-between mb-5 pb-4 border-b border-slate-100">
                            <div>
                                <div class="text-xs text-slate-400 font-medium">Precio</div>
                                <div class="text-2xl font-serif font-bold text-navy-950">
                                    ${formatCurrency(prop.priceUSD, 'USD')}
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
                                    ${formatCurrency(prop.pricePEN, 'PEN')}
                                </span>
                            </div>
                        </div>

                        <!-- CARACTERÍSTICAS TÉCNICAS (SPECS) -->
                        <div class="grid grid-cols-4 gap-2 text-center text-slate-600 text-xs py-2">
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <i class="fa-solid fa-ruler-combined text-gold-600 block mb-1"></i>
                                <span class="font-bold text-navy-950">${prop.areaM2} m²</span>
                            </div>
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <i class="fa-solid fa-bed text-gold-600 block mb-1"></i>
                                <span class="font-bold text-navy-950">${prop.bedrooms > 0 ? prop.bedrooms : '-'}</span>
                            </div>
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <i class="fa-solid fa-bath text-gold-600 block mb-1"></i>
                                <span class="font-bold text-navy-950">${prop.bathrooms > 0 ? prop.bathrooms : '-'}</span>
                            </div>
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <i class="fa-solid fa-car text-gold-600 block mb-1"></i>
                                <span class="font-bold text-navy-950">${prop.parking > 0 ? prop.parking : '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BOTONES DE ACCIÓN -->
                <div class="px-6 pb-6 pt-2 flex items-center gap-3">
                    <a href="propiedad.html?id=${prop.id}" class="flex-1 py-3 text-center rounded-xl bg-navy-950 hover:bg-navy-800 text-white font-bold text-xs tracking-wider uppercase transition">
                        Ver Detalles
                    </a>
                    <a href="${waUrl}" target="_blank" rel="noopener" class="w-12 h-11 rounded-xl bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-200 flex items-center justify-center transition text-lg" title="Consultar por WhatsApp">
                        <i class="fa-brands fa-whatsapp"></i>
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

// 3. APLICACIÓN COMBINADA DE FILTROS
function applyFilters() {
    let results = PROPERTIES_DATA;

    // Filtro por píldora (categoría)
    if (currentFilterState.category !== 'all') {
        const cat = currentFilterState.category;
        results = results.filter(p => p.operation === cat || p.type === cat);
    }

    // Filtro por formulario hero
    if (currentFilterState.operation) {
        results = results.filter(p => p.operation.toLowerCase() === currentFilterState.operation.toLowerCase());
    }
    if (currentFilterState.type) {
        results = results.filter(p => p.type.toLowerCase() === currentFilterState.type.toLowerCase());
    }
    if (currentFilterState.district) {
        results = results.filter(p => p.district.toLowerCase() === currentFilterState.district.toLowerCase());
    }

    renderProperties(results);
}

// 4. BUSCADOR EN EL HERO
function initHeroSearch() {
    const searchForm = document.getElementById('heroSearchForm');
    if (!searchForm) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        currentFilterState.operation = document.getElementById('heroSearchOperation').value;
        currentFilterState.type = document.getElementById('heroSearchType').value;
        currentFilterState.district = document.getElementById('heroSearchDistrict').value;

        applyFilters();

        // Scroll suave hacia la sección del catálogo
        const catalogo = document.getElementById('catalogo');
        if (catalogo) {
            catalogo.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Función auxiliar para filtrar por distrito desde el footer
window.filterByDistrict = function(districtName) {
    currentFilterState.district = districtName;
    const districtSelect = document.getElementById('heroSearchDistrict');
    if (districtSelect) districtSelect.value = districtName;
    applyFilters();
};

window.resetFilters = function() {
    currentFilterState = { category: 'all', operation: '', type: '', district: '' };
    const searchForm = document.getElementById('heroSearchForm');
    if (searchForm) searchForm.reset();

    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        if (pill.getAttribute('data-filter') === 'all') {
            pill.classList.add('active', 'bg-navy-950', 'text-white', 'shadow');
            pill.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');
        } else {
            pill.classList.remove('active', 'bg-navy-950', 'text-white', 'shadow');
            pill.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
        }
    });

    renderProperties(PROPERTIES_DATA);
};

// 5. FORMULARIOS DE CONTACTO Y CAPTACIÓN (CONVERSIÓN DIRECTA A WHATSAPP)
function initLeadForms() {
    // Formulario de propietarios (Vende con Nida)
    const ownerForm = document.getElementById('ownerLeadForm');
    if (ownerForm) {
        ownerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('ownerName').value;
            const phone = document.getElementById('ownerPhone').value;
            const propType = document.getElementById('ownerPropType').value;
            const district = document.getElementById('ownerDistrict').value;
            const goal = document.getElementById('ownerGoal').value;

            const text = `Hola Nida Yalico, mi nombre es ${name}. Deseo asesoría para *${goal}* mi *${propType}* ubicado en el distrito de *${district}*. Mi número es ${phone}.`;
            window.open(generateWhatsAppLink(text), '_blank');
        });
    }

    // Formulario de consulta rápida
    const qcForm = document.getElementById('quickContactForm');
    if (qcForm) {
        qcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('qcName').value;
            const phone = document.getElementById('qcPhone').value;
            const msg = document.getElementById('qcMessage').value || 'Deseo información de propiedades.';

            const text = `Hola Nida Yalico, soy ${name} (Tel: ${phone}). ${msg}`;
            window.open(generateWhatsAppLink(text), '_blank');
        });
    }
}

// 6. BOTÓN FLOTANTE INTELIGENTE DE WHATSAPP
function initWhatsAppWidget() {
    const toggleBtn = document.getElementById('toggleWaBtn');
    const waMenu = document.getElementById('waMenu');
    const closeBtn = document.getElementById('closeWaMenu');

    if (toggleBtn && waMenu) {
        toggleBtn.addEventListener('click', () => {
            waMenu.classList.toggle('hidden');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                waMenu.classList.add('hidden');
            });
        }

        // Cerrar si hace clic fuera
        document.addEventListener('click', (e) => {
            if (!toggleBtn.contains(e.target) && !waMenu.contains(e.target)) {
                waMenu.classList.add('hidden');
            }
        });
    }
}
