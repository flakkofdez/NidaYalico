/**
 * CONFIGURACIÓN CENTRAL Y BASE DE DATOS DE PROPIEDADES
 * Nida Yalico - Asesoría Inmobiliaria (Cono Norte de Lima)
 */

const SITE_CONFIG = {
    agent: {
        name: "Nida Yalico",
        title: "Asesora Inmobiliaria Profesional",
        agency: "Yalimak Inmobiliaria",
        zone: "Especialista en Cono Norte de Lima (Los Olivos, SMP, Comas, Carabayllo)",
        phone: "+51 937 076 066",
        phoneRaw: "51937076066",
        email: "nidayalicoyalimakinmobiliaria@gmail.com",
        facebook: "https://www.facebook.com/nida.yalico.9/",
        tiktok: "https://www.tiktok.com/@nidayalico",
        experienceYears: "8+",
        propertiesSold: "150+",
        satisfiedClients: "200+",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
    },
    exchangeRate: 3.75 // USD to PEN referencial
};

const PROPERTIES_DATA = [
    {
        id: "casa-los-olivos-palmeras",
        code: "NY-101",
        title: "Moderna Casa de 3 Pisos en Las Palmeras",
        type: "Casa",
        operation: "Venta",
        district: "Los Olivos",
        address: "Urb. Las Palmeras, a espaldas de Av. Antúnez de Mayolo",
        priceUSD: 245000,
        pricePEN: 918750,
        areaM2: 220,
        builtAreaM2: 340,
        bedrooms: 5,
        bathrooms: 4,
        parking: 2,
        floors: 3,
        antiquity: "4 años",
        featured: true,
        badge: "Oportunidad Exclusiva",
        description: "Impecable residencia multifamiliar ubicada en una de las zonas más residenciales, seguras y comerciales de Los Olivos. Cuenta con acabados de primera, sala y comedor amplios con iluminación natural, cocina con reposteros altos y bajos en granito, terraza social en el tercer piso con área de parrilla (BBQ) y cochera para 2 camionetas. Cerca de colegios, centros comerciales (MegaPlaza y Plaza Norte) y principales avenidas.",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
        ],
        features: [
            "Terraza con zona BBQ",
            "Portón levadizo automático",
            "Cisterna y tanque elevado",
            "Habitación principal con jacuzzi y walk-in closet",
            "Frente a parque cerrado con seguridad 24/7",
            "Documentación 100% en regla, inscrita en Registros Públicos (Sunarp)"
        ]
    },
    {
        id: "dpto-los-olivos-covida",
        code: "NY-102",
        title: "Departamento de Estreno con Ascensor en Covida",
        type: "Departamento",
        operation: "Venta",
        district: "Los Olivos",
        address: "Urb. Covida, 4to Piso con vista a la calle",
        priceUSD: 98000,
        pricePEN: 367500,
        areaM2: 88,
        builtAreaM2: 88,
        bedrooms: 3,
        bathrooms: 2,
        parking: 1,
        floors: 1,
        antiquity: "Estreno (Sin pago de Alcabala)",
        featured: true,
        badge: "Estreno",
        description: "Hermoso departamento de estreno con excelente distribución y luz natural en Covida, Los Olivos. Edificio moderno y antisísmico con ascensor de última generación. Sala-comedor con balcón exterior, cocina estilo americano con tablero de cuarzo, 3 amplios dormitorios con closets empotrados y lavandería independiente. Ubicación céntrica a 3 minutos de Av. Carlos Izaguirre.",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
        ],
        features: [
            "Ascensor directo",
            "Balcón con vista exterior",
            "Conexión a Gas Natural (Cálidda)",
            "Intercomunicador con videocámara",
            "Lobby de recepción moderno",
            "Acepta crédito hipotecario con todos los bancos"
        ]
    },
    {
        id: "casa-comas-condorcanqui",
        code: "NY-103",
        title: "Amplia Casa Comercial y Multifamiliar en Comas",
        type: "Casa",
        operation: "Venta",
        district: "Comas",
        address: "Av. Túpac Amaru cruce con Av. Belaúnde, Comas",
        priceUSD: 185000,
        pricePEN: 693750,
        areaM2: 160,
        builtAreaM2: 290,
        bedrooms: 6,
        bathrooms: 4,
        parking: 1,
        floors: 3,
        antiquity: "8 años",
        featured: true,
        badge: "Potencial Comercial",
        description: "Estratégica propiedad ubicada en zona de alto tránsito comercial y residencial en Comas. Primer piso ideal para negocio, bodega, consultorio o local comercial con almacén. Segundo y tercer piso configurados como 2 departamentos independientes que generan rentabilidad inmediata por alquileres. ¡Excelente oportunidad para inversionistas o familias numerosas!",
        images: [
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
        ],
        features: [
            "Zonificación Comercial / Residencial",
            "Entradas totalmente independientes por piso",
            "Medidores de luz y agua independientes",
            "Cerca al Metropolitano y bancos principales",
            "Retorno de inversión garantizado por rentas"
        ]
    },
    {
        id: "terreno-carabayllo-san-pedro",
        code: "NY-104",
        title: "Terreno Urbano en Carabayllo - Urb. San Antonio",
        type: "Terreno",
        operation: "Venta",
        district: "Carabayllo",
        address: "Urb. San Antonio de Carabayllo, Etapa 3",
        priceUSD: 46000,
        pricePEN: 172500,
        areaM2: 120,
        builtAreaM2: 0,
        bedrooms: 0,
        bathrooms: 0,
        parking: 0,
        floors: 0,
        antiquity: "Nuevo",
        featured: false,
        badge: "Precio de Ocasión",
        description: "Lote urbano de 120 m² (6 metros de frente por 20 metros de fondo) totalmente plano en moderna urbanización cerrada de Carabayllo con pórtico de ingreso, áreas verdes, parques infantiles y seguridad 24 horas. Cuenta con todas las obras completas: pistas asfaltadas, veredas, luz subterránea, agua y desagüe.",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80"
        ],
        features: [
            "Título de propiedad independizado en Sunarp",
            "Habilitación urbana 100% aprobada",
            "Parámetros para 4 pisos + azotea",
            "Condominio cerrado con cámaras de vigilancia",
            "Listo para construir de inmediato"
        ]
    },
    {
        id: "dpto-smp-fiori",
        code: "NY-105",
        title: "Departamento Familiar frente a Parque en SMP",
        type: "Departamento",
        operation: "Venta",
        district: "San Martín de Porres",
        address: "Urb. Fiori / Tomás Valle, frente a Parque San Martín",
        priceUSD: 78000,
        pricePEN: 292500,
        areaM2: 76,
        builtAreaM2: 76,
        bedrooms: 3,
        bathrooms: 2,
        parking: 0,
        floors: 1,
        antiquity: "3 años",
        featured: false,
        badge: "Frente a Parque",
        description: "Cálido departamento en 3er piso con vista privilegiada a parque arbolado. Zona muy tranquila y segura de San Martín de Porres, con acceso rápido a Av. Panamericana Norte, Tomás Valle y Centro Comercial Plaza Norte. Distribución funcional con sala comedor iluminada, cocina con gas natural Cálidda instalado y dormitorios con pisos laminados de alta resistencia.",
        images: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
        ],
        features: [
            "Conexión a Gas Natural Cálidda",
            "Vista directa y despejada a parque",
            "Zona residencial cerrada con rejas de seguridad",
            "Bajo costo de mantenimiento mensual",
            "A 5 minutos de Plaza Norte y Terminal Terrestre"
        ]
    },
    {
        id: "alquiler-local-olivos-universitaria",
        code: "NY-106",
        title: "Local Comercial Estratégico en Av. Universitaria",
        type: "Comercial",
        operation: "Alquiler",
        district: "Los Olivos",
        address: "Av. Universitaria cruce con Av. Marañón",
        priceUSD: 1400,
        pricePEN: 52500,
        areaM2: 145,
        builtAreaM2: 145,
        bedrooms: 1,
        bathrooms: 2,
        parking: 2,
        floors: 1,
        antiquity: "2 años",
        featured: true,
        badge: "Alquiler Comercial",
        description: "Local comercial a puerta de calle en el corazón comercial de Los Olivos. Ideal para farmacias, consultorios médicos, laboratorios, minimarkets, franquicias o academias. Amplio salón diáfano con piso de porcelanato de alto tránsito, 2 baños (damas/caballeros), puerta enrollable metálica y frente de 9 metros con retiro para estacionar clientes.",
        images: [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
        ],
        features: [
            "Zonificación CZ (Comercio Zonal)",
            "Pozo a tierra y corriente trifásica",
            "Estacionamiento frontal para 2 vehículos",
            "Alto tránsito peatonal y vehicular permanente",
            "Licencia municipal inmediata para diversos rubros"
        ]
    }
];

// Helper para formatear precios
function formatCurrency(amount, currency = 'USD') {
    if (currency === 'USD') {
        return '$' + Number(amount).toLocaleString('en-US');
    }
    return 'S/ ' + Number(amount).toLocaleString('es-PE');
}

// Generador de enlaces de WhatsApp personalizados
function generateWhatsAppLink(text) {
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${SITE_CONFIG.agent.phoneRaw}?text=${encoded}`;
}
