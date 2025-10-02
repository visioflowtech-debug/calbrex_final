 // --- LÓGICA DE LA INTERFAZ ---

// --- CONFIGURACIÓN ---
const API_BASE_URL = '';
let myChart = null;

// --- LÓGICA DE LA INTERFAZ ---

function changeTab(tabIndex) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabIndex}`).classList.add('active');
    document.querySelector(`button[onclick="changeTab(${tabIndex})"]`).classList.add('active');
}

const testData = {
    header: {
        nombre_cliente: "Facultad de Química - UNAM",
        fecha_recepcion: "2025-09-24",
        fecha_calibracion: "2025-09-26",
        descripcion_instrumento: "PIPETA DE PISTÓN",
        clase_instrumento: "N.A.",
        tipo_instrumento: "ANALOGICO",
        marca_instrumento: "GILSON",
        vol_nominal: 20,
        tipo_volumen: "VARIABLE",
        t_descarga: "N.A.",
        modelo_instrumento: "PIPETMAN",
        unidades: "µL",
        tipo_calibracion: "TD",
        cuello_instrumento: "N.A.",
        serie_instrumento: "B-84-19726",
        div_min_valor: 0.02,
        div_min_unidad: "µL",
        puntas_valor: 20,
        puntas_unidad: "µL",
        id_instrumento: "S / ID",
        tolerancia: "N.A.",
        material: "PP",
        numero_servicio: "0046/2025/VOL",
        numero_certificado: "CAL-0216-2025/VOL",
        patron_seleccionado: "CAL-VO-002",
        auxiliar_ta: "CAL-VO-005",
        auxiliar_ca: "CAL-VO-051",
        limpieza: "OK",
        direccion_cliente_reporte: "Cto. Escolar S/N, C.U., Coyoacán",
        correo_cliente_reporte: "contacto@quimica.unam.mx",
        telefono_cliente_reporte: "5622-3696",
        contacto_reporte_directo: "Dr. J. de Jesús García",
        intervalo_min_reporte: 2,
        intervalo_max_reporte: 20,
        cotizacion: "COT-00500-01",
        observaciones: "Se realizó limpieza y lubricación del instrumento.",
        ajuste_realizado: "N",
    },
    condiciones_iniciales: {
        promedio1: 2.01,
        promedio2: 9.99,
        promedio3: 19.95,
        promedio4: 39.9,
    },
    aforos: [
        { punta: "20 µL", pasos: "1", mediciones: [
            { vacio: 0.0000, lleno: 0.001985, temp_agua: 19.0, temp_amb: 19.1, presion: 783.4, humedad: 53.1 },
            { vacio: 0.0000, lleno: 0.001982, temp_agua: 19.0, temp_amb: 19.1, presion: 783.4, humedad: 53.2 },
            { vacio: 0.0000, lleno: 0.002018, temp_agua: 19.0, temp_amb: 19.0, presion: 783.4, humedad: 53.3 },
            { vacio: 0.0000, lleno: 0.001990, temp_agua: 19.0, temp_amb: 19.0, presion: 783.4, humedad: 53.4 },
            { vacio: 0.0000, lleno: 0.002069, temp_agua: 19.0, temp_amb: 19.1, presion: 783.4, humedad: 53.5 },
            { vacio: 0.0000, lleno: 0.001941, temp_agua: 19.0, temp_amb: 19.1, presion: 783.4, humedad: 53.4 },
            { vacio: 0.0000, lleno: 0.002028, temp_agua: 19.0, temp_amb: 19.1, presion: 783.4, humedad: 53.2 },
            { vacio: 0.0000, lleno: 0.002036, temp_agua: 19.0, temp_amb: 19.1, presion: 783.4, humedad: 53.3 },
            { vacio: 0.0000, lleno: 0.002038, temp_agua: 19.0, temp_amb: 19.1, presion: 783.4, humedad: 53.4 },
            { vacio: 0.0000, lleno: 0.001942, temp_agua: 19.0, temp_amb: 19.1, presion: 783.4, humedad: 53.2 },
        ]},
        { punta: "20 µL", pasos: "1", mediciones: [
            { vacio: 0.0000, lleno: 0.009920, temp_agua: 19.0, temp_amb: 19.1, presion: 783.3, humedad: 53.5 },
            { vacio: 0.0000, lleno: 0.009931, temp_agua: 19.0, temp_amb: 19.1, presion: 783.3, humedad: 53.5 },
            { vacio: 0.0000, lleno: 0.010010, temp_agua: 19.1, temp_amb: 19.1, presion: 783.3, humedad: 53.6 },
            { vacio: 0.0000, lleno: 0.010019, temp_agua: 19.0, temp_amb: 19.1, presion: 783.3, humedad: 53.6 },
            { vacio: 0.0000, lleno: 0.009957, temp_agua: 19.1, temp_amb: 19.1, presion: 783.3, humedad: 53.7 },
            { vacio: 0.0000, lleno: 0.010059, temp_agua: 19.0, temp_amb: 19.1, presion: 783.2, humedad: 53.8 },
            { vacio: 0.0000, lleno: 0.010038, temp_agua: 19.0, temp_amb: 19.2, presion: 783.2, humedad: 53.8 },
            { vacio: 0.0000, lleno: 0.009977, temp_agua: 19.1, temp_amb: 19.1, presion: 783.2, humedad: 53.9 },
            { vacio: 0.0000, lleno: 0.009973, temp_agua: 19.0, temp_amb: 19.2, presion: 783.2, humedad: 53.9 },
            { vacio: 0.0000, lleno: 0.010015, temp_agua: 19.0, temp_amb: 19.1, presion: 783.2, humedad: 54.0 },
        ]},
        { punta: "20 µL", pasos: "1", mediciones: [
            { vacio: 0.0000, lleno: 0.020041, temp_agua: 19.1, temp_amb: 19.4, presion: 783.1, humedad: 54.0 },
            { vacio: 0.0000, lleno: 0.020001, temp_agua: 19.1, temp_amb: 19.4, presion: 783.1, humedad: 54.0 },
            { vacio: 0.0000, lleno: 0.019860, temp_agua: 19.1, temp_amb: 19.4, presion: 783.1, humedad: 54.1 },
            { vacio: 0.0000, lleno: 0.019826, temp_agua: 19.1, temp_amb: 19.3, presion: 783.1, humedad: 54.2 },
            { vacio: 0.0000, lleno: 0.019852, temp_agua: 19.1, temp_amb: 19.3, presion: 783.1, humedad: 54.2 },
            { vacio: 0.0000, lleno: 0.019860, temp_agua: 19.1, temp_amb: 19.3, presion: 783.1, humedad: 54.1 },
            { vacio: 0.0000, lleno: 0.019906, temp_agua: 19.1, temp_amb: 19.4, presion: 783.0, humedad: 54.2 },
            { vacio: 0.0000, lleno: 0.019905, temp_agua: 19.1, temp_amb: 19.4, presion: 783.0, humedad: 54.3 },
            { vacio: 0.0000, lleno: 0.019963, temp_agua: 19.1, temp_amb: 19.5, presion: 783.0, humedad: 54.4 },
            { vacio: 0.0000, lleno: 0.019954, temp_agua: 19.1, temp_amb: 19.4, presion: 783.0, humedad: 54.4 },
        ]},
        { punta: "20 µL", pasos: "1", mediciones: [
            { vacio: 0.0000, lleno: 0.039900, temp_agua: 19.1, temp_amb: 19.4, presion: 783.1, humedad: 54.0 },
            { vacio: 0.0000, lleno: 0.039950, temp_agua: 19.1, temp_amb: 19.4, presion: 783.1, humedad: 54.0 },
            { vacio: 0.0000, lleno: 0.039880, temp_agua: 19.1, temp_amb: 19.4, presion: 783.1, humedad: 54.1 },
            { vacio: 0.0000, lleno: 0.039920, temp_agua: 19.1, temp_amb: 19.3, presion: 783.1, humedad: 54.2 },
            { vacio: 0.0000, lleno: 0.039860, temp_agua: 19.1, temp_amb: 19.3, presion: 783.1, humedad: 54.2 },
            { vacio: 0.0000, lleno: 0.039870, temp_agua: 19.1, temp_amb: 19.3, presion: 783.1, humedad: 54.1 },
            { vacio: 0.0000, lleno: 0.039910, temp_agua: 19.1, temp_amb: 19.4, presion: 783.0, humedad: 54.2 },
            { vacio: 0.0000, lleno: 0.039905, temp_agua: 19.1, temp_amb: 19.4, presion: 783.0, humedad: 54.3 },
            { vacio: 0.0000, lleno: 0.039965, temp_agua: 19.1, temp_amb: 19.5, presion: 783.0, humedad: 54.4 },
            { vacio: 0.0000, lleno: 0.039955, temp_agua: 19.1, temp_amb: 19.4, presion: 783.0, humedad: 54.4 },
        ]}
    ]
};

function clearForm() {
    document.getElementById('main-form').reset();
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('certificate-container').classList.add('hidden');
    document.getElementById('status-message').textContent = '';
    document.getElementById('export-buttons-container').classList.add('hidden');
    changeTab(1);
    generateAforoContent('tab-1', 1);
    generateAforoContent('tab-2', 2);
    generateAforoContent('tab-3', 3);
    updateAforoHeaders();
    if (myChart) {
        myChart.destroy();
    }
    // Resetear fechas a valores por defecto
    document.getElementById('fecha_calibracion').valueAsDate = new Date();
    const fechaRecepcion = new Date();
    fechaRecepcion.setDate(fechaRecepcion.getDate() - 2);
    document.getElementById('fecha_recepcion').valueAsDate = fechaRecepcion;
    document.getElementById('div_min_valor').dispatchEvent(new Event('input'));
}

function autocompleteWithTestData() {
    // Autocompletar encabezado y otras secciones
    const headerData = testData.header;
    for (const key in headerData) {
        const el = document.getElementById(key);
        if (el) {
            el.value = headerData[key];
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
    
    // Autocompletar mediciones de aforos
    for (let a = 1; a <= 3; a++) {
        const aforoData = testData.aforos[a-1];
        document.getElementById(`aforo${a}-punta`).value = aforoData.punta;
        document.getElementById(`aforo${a}-pasos`).value = aforoData.pasos;

        for (let i = 1; i <= 10; i++) {
            const med = aforoData.mediciones[i - 1];
            document.getElementById(`aforo${a}-vacio-${i}`).value = med.vacio.toFixed(4);
            document.getElementById(`aforo${a}-lleno-${i}`).value = med.lleno.toFixed(6);
            document.getElementById(`aforo${a}-lleno-${i}`).dispatchEvent(new Event('input'));

            document.getElementById(`aforo${a}-temp_agua-${i}`).value = med.temp_agua.toFixed(1);
            document.getElementById(`aforo${a}-temp_amb-${i}`).value = med.temp_amb.toFixed(1);
            document.getElementById(`aforo${a}-presion-${i}`).value = med.presion.toFixed(1);
            document.getElementById(`aforo${a}-humedad-${i}`).value = med.humedad.toFixed(1);
        }
    }

    // Autocompletar tabla de condiciones iniciales
    document.getElementById('inicial-promedio-1').value = testData.condiciones_iniciales.promedio1;
    document.getElementById('inicial-promedio-2').value = testData.condiciones_iniciales.promedio2;
    document.getElementById('inicial-promedio-3').value = testData.condiciones_iniciales.promedio3;
}

async function loadSiteConfig() {
    try {
        const response = await fetch('/static/config/site_config.json');
        const config = await response.json();
        document.getElementById('firma_nombre').value = config.firma_gerente?.nombre || 'No configurado';
        document.getElementById('firma_cargo').value = config.firma_gerente?.cargo || 'No configurado';
    } catch (error) {
        console.error('Error al cargar la configuración del sitio:', error);
    }
}

function updateAforoHeaders() {
    const volNominal = parseFloat(document.getElementById('vol_nominal').value) || 0;
    const aforo1_nom = (volNominal / 10).toFixed(2);
    const aforo2_nom = (volNominal / 2).toFixed(2);
    const aforo3_nom = (volNominal).toFixed(2);

    document.getElementById('aforo1-vol_nom').value = aforo1_nom;
    document.getElementById('aforo2-vol_nom').value = aforo2_nom;
    document.getElementById('aforo3-vol_nom').value = aforo3_nom;

    document.getElementById('inicial-nominal-1-display').value = aforo1_nom;
    document.getElementById('inicial-nominal-2-display').value = aforo2_nom;
    document.getElementById('inicial-nominal-3-display').value = aforo3_nom;
}

function generateAforoContent(containerId, aforoIndex) {
    const container = document.getElementById(containerId);
    
    // Crear encabezado del aforo
    const headerHtml = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded-md bg-gray-50">
            <div>
                <label for="aforo${aforoIndex}-vol_nom" class="block text-sm font-medium text-gray-700">VOL. NOM.</label>
                <input type="text" id="aforo${aforoIndex}-vol_nom" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-200 sm:text-sm" readonly>
            </div>
            <div>
                <label for="aforo${aforoIndex}-punta" class="block text-sm font-medium text-gray-700">PUNTA</label>
                <input type="text" id="aforo${aforoIndex}-punta" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">
            </div>
            <div>
                <label for="aforo${aforoIndex}-pasos" class="block text-sm font-medium text-gray-700">PASOS</label>
                <input type="text" id="aforo${aforoIndex}-pasos" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">
            </div>
        </div>
    `;

    // Crear tabla
    let tableHtml = `
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">VACÍO (g)</th>
                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">LLENO (g)</th>
                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">MASA (g)</th>
                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">TEMP. AGUA (°C)</th>
                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">TEMP. AMB. (°C)</th>
                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">PRESIÓN (hPa)</th>
                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">HUMEDAD (%)</th>
                </tr>
            </thead>
            <tbody id="aforo${aforoIndex}-mediciones" class="bg-white divide-y divide-gray-200">
    `;
    
    for (let i = 1; i <= 10; i++) {
        tableHtml += `
            <tr>
                <td class="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">${i}</td>
                <td class="px-2 py-1"><input type="number" step="0.0001" id="aforo${aforoIndex}-vacio-${i}" class="w-full rounded-md border-gray-300 shadow-sm text-sm"></td>
                <td class="px-2 py-1"><input type="number" step="0.000001" id="aforo${aforoIndex}-lleno-${i}" class="w-full rounded-md border-gray-300 shadow-sm text-sm"></td>
                <td class="px-2 py-1"><input type="number" step="0.0001" id="aforo${aforoIndex}-m-${i}" class="w-full rounded-md border-gray-300 shadow-sm bg-gray-100 text-sm" readonly></td>
                <td class="px-2 py-1"><input type="number" step="0.1" id="aforo${aforoIndex}-temp_agua-${i}" class="w-full rounded-md border-gray-300 shadow-sm text-sm"></td>
                <td class="px-2 py-1"><input type="number" step="0.1" id="aforo${aforoIndex}-temp_amb-${i}" class="w-full rounded-md border-gray-300 shadow-sm text-sm"></td>
                <td class="px-2 py-1"><input type="number" step="0.1" id="aforo${aforoIndex}-presion-${i}" class="w-full rounded-md border-gray-300 shadow-sm text-sm"></td>
                <td class="px-2 py-1"><input type="number" step="0.1" id="aforo${aforoIndex}-humedad-${i}" class="w-full rounded-md border-gray-300 shadow-sm text-sm"></td>
            </tr>
        `;
    }
    
    tableHtml += '</tbody></table>';
    container.innerHTML = headerHtml + tableHtml;

    // Añadir listeners para el cálculo automático de m = lleno - vacio
    for (let i = 1; i <= 10; i++) {
        const vacio_el = document.getElementById(`aforo${aforoIndex}-vacio-${i}`);
        const lleno_el = document.getElementById(`aforo${aforoIndex}-lleno-${i}`);
        const m_el = document.getElementById(`aforo${aforoIndex}-m-${i}`);
        
        const calculateM = () => {
            const vacio = parseFloat(vacio_el.value) || 0;
            const lleno = parseFloat(lleno_el.value) || 0;
            m_el.value = (lleno - vacio).toFixed(6);
        };
        
        vacio_el.addEventListener('input', calculateM);
        lleno_el.addEventListener('input', calculateM);
    }
}

// --- LÓGICA DE CÁLCULO (FASE 3) ---

function collectFormData() {
    const volNominal = parseFloat(document.getElementById('vol_nominal').value);
    const data = {
        // Constantes del documento oficial SCAN0000.PDF
        constantes: {
            // Correcciones ambientales - **RESTAURADAS A LA VERSIÓN ANTERIOR VALIDADA**
            corr_ta_y: { a: 0.0062, b: -0.2566, c: 2.8131 },
            corr_tamb_y: { a: -0.03, b: 1.2487, c: -12.859 },
            corr_hr_y: { a: 0.0045, b: -0.4757, c: 10.806 },
            corr_patm_y: { a: -0.000003, b: 0.0043, c: -1.1253 },
            
            // Densidad del Agua (Tanaka)
            tanaka_a1: -3.983035,
            tanaka_a2: 301.797,
            tanaka_a3: 522528.9,
            tanaka_a4: 69.34881,
            tanaka_a5: 999.97495,

            // Densidad del Aire (CIPM) - Estos valores parecen ser del Excel, no del PDF. Se mantienen por ahora.
            rho_aire_o51: 0.34848, rho_aire_o52: 0.009, rho_aire_o53: 0.061, rho_aire_o54: 0,
            alpha_material_pp: 0.00024, rho_pesa_n74: 8000,
        },
        entradas_generales: {
            // Datos del cliente y servicio
            nombre_cliente: document.getElementById('nombre_cliente').value,
            fecha_recepcion: document.getElementById('fecha_recepcion').value,
            fecha_calibracion: document.getElementById('fecha_calibracion').value,
            numero_servicio: document.getElementById('numero_servicio').value,
            numero_certificado: document.getElementById('numero_certificado').value,
            // Datos del instrumento
            descripcion_instrumento: document.getElementById('descripcion_instrumento').value,
            marca_instrumento: document.getElementById('marca_instrumento').value,
            modelo_instrumento: document.getElementById('modelo_instrumento').value,
            serie_instrumento: document.getElementById('serie_instrumento').value,
            id_instrumento: document.getElementById('id_instrumento').value,
            vol_nominal: parseFloat(document.getElementById('vol_nominal').value) || 0,
            unidades: document.getElementById('unidades').value,
            material: document.getElementById('material').value,
            clase_instrumento: document.getElementById('clase_instrumento').value,
            tipo_instrumento: document.getElementById('tipo_instrumento').value,
            tipo_volumen: document.getElementById('tipo_volumen').value,
            tipo_calibracion: document.getElementById('tipo_calibracion').value,
            ajuste_realizado: document.getElementById('ajuste_realizado').value,
            // Datos del reporte de servicio
            direccion_cliente_reporte: document.getElementById('direccion_cliente_reporte').value,
            correo_cliente_reporte: document.getElementById('correo_cliente_reporte').value,
            telefono_cliente_reporte: document.getElementById('telefono_cliente_reporte').value,
            contacto_reporte_directo: document.getElementById('contacto_reporte_directo').value,
            intervalo_min_reporte: document.getElementById('intervalo_min_reporte').value,
            intervalo_max_reporte: document.getElementById('intervalo_max_reporte').value,
            // Fin datos del reporte
            observaciones: document.getElementById('observaciones').value,
            cotizacion: document.getElementById('cotizacion').value, // <-- AÑADIDO: Faltaba recolectar este dato
            div_min_valor: parseFloat(document.getElementById('div_min_valor').value) || 0, // <-- AÑADIDO
            div_min_unidad: document.getElementById('div_min_unidad').value,
            tolerancia: document.getElementById('tolerancia').value,
            cuello_instrumento: document.getElementById('cuello_instrumento').value,
            t_descarga: document.getElementById('t_descarga').value,
            puntas_valor: document.getElementById('puntas_valor').value,
            puntas_unidad: document.getElementById('puntas_unidad').value,
            limpieza: document.getElementById('limpieza').value,
            patron_seleccionado: document.getElementById('patron_seleccionado').value,
            auxiliar_ta: document.getElementById('auxiliar_ta').value,
            auxiliar_ca: document.getElementById('auxiliar_ca').value,
            debug_mode: true, // <-- AÑADIDO: Activa el modo de diagnóstico en el backend
            mantenimientos: Array.from(document.querySelectorAll('input[name="mantenimiento"]:checked')).map(el => el.value),
            condiciones_iniciales: {
                promedio1: parseFloat(document.getElementById('inicial-promedio-1').value),
                promedio2: parseFloat(document.getElementById('inicial-promedio-2').value),
                promedio3: parseFloat(document.getElementById('inicial-promedio-3').value),
            },
            firma_gerente: {
                nombre: document.getElementById('firma_nombre').value,
                cargo: document.getElementById('firma_cargo').value,
            }
        }
    };

    for (let a = 1; a <= 3; a++) {
        const medicionesMasa = [];
        const medicionesVacio = [];
        const medicionesLleno = [];
        const medicionesAmbientales = [];
        for (let i = 1; i <= 10; i++) {
            // Ahora usamos la columna 'm' calculada
            medicionesMasa.push(parseFloat(document.getElementById(`aforo${a}-m-${i}`).value) || 0);
            medicionesAmbientales.push({
                temp_agua: parseFloat(document.getElementById(`aforo${a}-temp_agua-${i}`).value),
                temp_amb: parseFloat(document.getElementById(`aforo${a}-temp_amb-${i}`).value),
                presion: parseFloat(document.getElementById(`aforo${a}-presion-${i}`).value),
                humedad: parseFloat(document.getElementById(`aforo${a}-humedad-${i}`).value),
            });
            medicionesVacio.push(parseFloat(document.getElementById(`aforo${a}-vacio-${i}`).value) || 0);
            medicionesLleno.push(parseFloat(document.getElementById(`aforo${a}-lleno-${i}`).value) || 0);
        }
        let valor_nominal_aforo;
        if (a === 1) valor_nominal_aforo = volNominal / 10;
        else if (a === 2) valor_nominal_aforo = volNominal / 2;
        else valor_nominal_aforo = volNominal;

        data[`aforo${a}`] = {
            valor_nominal: valor_nominal_aforo,
            mediciones_masa: medicionesMasa,
            mediciones_ambientales: medicionesAmbientales,
            mediciones_vacio: medicionesVacio,
            mediciones_lleno: medicionesLleno,
        };
    }
    return data;
}

function validateForm() {
    const requiredFields = [];
    let firstInvalidTab = -1;

    // Limpiar estilos de error previos
    document.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500', 'border-2'));

    // Validar campos de mediciones en los aforos
    for (let a = 1; a <= 3; a++) {
        for (let i = 1; i <= 10; i++) {
            const fieldsToCheck = [
                `aforo${a}-vacio-${i}`, `aforo${a}-lleno-${i}`,
                `aforo${a}-temp_agua-${i}`, `aforo${a}-temp_amb-${i}`,
                `aforo${a}-presion-${i}`, `aforo${a}-humedad-${i}`
            ];
            fieldsToCheck.forEach(fieldId => {
                const el = document.getElementById(fieldId);
                if (el && el.value.trim() === '') {
                    requiredFields.push(el);
                    if (firstInvalidTab === -1) firstInvalidTab = a;
                }
            });
        }
    }

    if (requiredFields.length > 0) {
        const statusMsg = document.getElementById('status-message');
        statusMsg.textContent = `Error: Faltan ${requiredFields.length} datos obligatorios en las mediciones. Por favor, complete los campos resaltados.`;
        statusMsg.className = 'text-sm font-medium text-red-600';

        requiredFields.forEach(el => {
            el.classList.add('border-red-500', 'border-2');
        });

        // Cambiar a la primera pestaña con errores
        if (firstInvalidTab !== -1) changeTab(firstInvalidTab);
        return false; // Validación fallida
    }
    return true; // Validación exitosa
}

async function handleGenerateReport() {
    const btn = document.getElementById('generar-reporte-btn');
    const statusMsg = document.getElementById('status-message');
    const resultsContainer = document.getElementById('results-container');
    
    // Limpiar mensajes de estado previos
    statusMsg.textContent = '';
    statusMsg.className = 'text-sm font-medium';

    // Ejecutar la validación antes de continuar
    if (!validateForm()) {
        return; // Detener si la validación falla
    }

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Calculando...';
    const loader = document.createElement('div');
    loader.id = 'loader';
    btn.prepend(loader);

    statusMsg.textContent = 'Calculando...';
    statusMsg.className = 'text-sm font-medium text-gray-600';
    resultsContainer.classList.add('hidden');
    document.getElementById('certificate-container').classList.add('hidden');

    try {
        const formData = collectFormData();
        const response = await fetch(`${API_BASE_URL}/calcular`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error del servidor: ${response.status}`);
        }

        const results = await response.json();
        displayResults(results);
        // Mostrar los botones de exportar PDF
        document.getElementById('export-buttons-container').classList.remove('hidden');
        statusMsg.textContent = 'Reporte generado con éxito.';
        statusMsg.classList.add('text-green-600');

    } catch (error) {
        console.error('Error al generar el reporte:', error);
        statusMsg.textContent = `Error: ${error.message}`;
        statusMsg.classList.add('text-red-600');
    } finally {
        btn.disabled = false;
        btn.querySelector('span').textContent = 'Generar Reporte';
        if (btn.querySelector('#loader')) {
            btn.querySelector('#loader').remove();
        }
    }
}

async function handleExportPdf(reportType) {
    const btn = document.getElementById(`export-${reportType}-btn`);
    const statusMsg = document.getElementById('status-message');
    const originalBtnText = btn.querySelector('span').textContent;

    btn.disabled = true;
    btn.querySelector('span').textContent = '...';

    // Obtener los resultados guardados para generar el HTML del PDF al momento
    const results = window.latestResults;
    if (!results) {
        statusMsg.textContent = 'Error: No hay resultados para exportar. Genere un reporte primero.';
        statusMsg.className = 'text-sm font-medium text-red-600';
        btn.disabled = false;
        btn.querySelector('span').textContent = originalBtnText;
        return;
    }

    const serviceReportHtml = buildServicioReport_PDF(results, myChart ? myChart.toBase64Image() : ''); // Genera el HTML para el PDF
    const certificateHtml = buildCertificadoReport_PDF(results, window.errorIncertidumbreChart ? window.errorIncertidumbreChart.toBase64Image() : '');

    const medidasHtml = document.getElementById('medidas-report-container')?.innerHTML || 'No hay datos de mediciones.';

    if (!serviceReportHtml || !certificateHtml || !medidasHtml.includes('table')) {
        statusMsg.textContent = 'Error: Genere un reporte primero antes de exportar.';
        statusMsg.className = 'text-sm font-medium text-red-600';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/exportar-pdf`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                report_type: reportType,
                service_report_html: serviceReportHtml,
                certificate_html: certificateHtml,
                medidas_html: medidasHtml,
                base_url: window.location.origin + '/'
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error del servidor: ${response.status}`);
        }

        // Obtener el nombre del archivo desde las cabeceras de la respuesta
        const disposition = response.headers.get('Content-Disposition');
        let filename = 'reporte.pdf';
        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) { 
                filename = matches[1].replace(/['"]/g, '');
            }
        }

        // El navegador se encargará de la descarga
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

    } catch (error) {
        console.error('Error al exportar a PDF:', error);
        statusMsg.textContent = `Error al exportar: ${error.message}`;
        statusMsg.className = 'text-sm font-medium text-red-600';
    } finally {
        btn.disabled = false;
        btn.querySelector('span').textContent = originalBtnText;
    }
}

function buildMedidasHeader(results) {
    if (!results || !results.textos_reporte || !results.aforos) {
        console.error('Datos incompletos para generar el reporte');
        return '';
    }

    const eg = results.textos_reporte.entradas_generales || {};
    const aforos = results.aforos || [];
    const unidades = results.textos_reporte.unidades || 'µL';

    // Recuperar los datos brutos del formulario para el reporte de medidas
    const formData = collectFormData();
    const aforosBrutos = [formData.aforo1, formData.aforo2, formData.aforo3];


    // Función auxiliar para formatear números
    const formatNumber = (num, decimals) => {
        if (num === null || num === undefined) return '0,' + '0'.repeat(decimals);
        return num.toFixed(decimals).replace('.', ',');
    };

    // Formatear fechas
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const fontSizeStyle = "font-size: 10px;"; // Reducido para optimizar espacio
    const headerHtml = `
    <div style="margin-top: 0.1cm;">
        <table style="width: 100%; border-collapse: collapse; border-spacing: 0;">
            <tbody>
                <tr>
                    <td style="width: 80%; vertical-align: top; border: 1px solid black; padding: 0;">
                        <table style="width: 100%; font-size: 11px; line-height: 1.2; border: none;">
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">CLIENTE</td><td style="padding: 1px 4px; border: none;" colspan="5">${eg.nombre_cliente || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">FECHA REC.</td><td style="padding: 1px 4px; border: none;">${formatDate(eg.fecha_recepcion)}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">INSTRUMENTO</td><td style="padding: 1px 4px; border: none;" colspan="3">${eg.descripcion_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">TIPO</td><td style="padding: 1px 4px; border: none;">${eg.tipo_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">FECHA CAL.</td><td style="padding: 1px 4px; border: none;">${formatDate(eg.fecha_calibracion)}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">MARCA</td><td style="padding: 1px 4px; border: none;">${eg.marca_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">VOL. NOMI.</td><td style="padding: 1px 4px; border: none;">${eg.vol_nominal || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">VOLUMEN</td><td style="padding: 1px 4px; border: none;">${eg.tipo_volumen || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">Ɵ CUELLO:</td><td style="padding: 1px 4px; border: none;">${eg.cuello_instrumento || 'N.A.'}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">MODELO</td><td style="padding: 1px 4px; border: none;">${eg.modelo_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">UNIDAD</td><td style="padding: 1px 4px; border: none;">${eg.unidades || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">T. DESCARGA</td><td style="padding: 1px 4px; border: none;">${eg.t_descarga || 'N.A.'}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">PUNTAS</td><td style="padding: 1px 4px; border: none;">${eg.puntas_valor || ''} ${eg.puntas_unidad || ''}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">SERIE</td><td style="padding: 1px 4px; border: none;">${eg.serie_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">CLASE</td><td style="padding: 1px 4px; border: none;">${eg.clase_instrumento || 'N.A.'}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">DIV. MÍN.</td><td style="padding: 1px 4px; border: none;">${eg.div_min_valor || ''} ${eg.div_min_unidad || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">TOLERANCIA</td><td style="padding: 1px 4px; border: none;">${eg.tolerancia || 'N.A.'}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">ID</td><td style="padding: 1px 4px; border: none;">${eg.id_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">CALIBRADO PARA</td><td style="padding: 1px 4px; border: none;">${eg.tipo_calibracion || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">MATERIAL</td><td style="padding: 1px 4px; border: none;">${eg.material || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">RESOLUCIÓN</td><td style="padding: 1px 4px; border: none;">${eg.div_min_valor || ''}</td></tr>
                        </table>
                    </td>
                    <td style="width: 20%; vertical-align: top; border: 1px solid black; padding: 0;">
                        <table style="width: 100%; font-size: 11px; line-height: 1.2; border: none;">
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">SERVICIO</td><td style="padding: 1px 4px; border: none;">${eg.numero_servicio || ''}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">CERTIFICADO</td><td style="padding: 1px 4px; border: none;">${eg.numero_certificado || ''}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">PATRÓN</td><td style="padding: 1px 4px; border: none;">${eg.patron_seleccionado || ''}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">AUXILIAR TA</td><td style="padding: 1px 4px; border: none;">${eg.auxiliar_ta || ''}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">AUXILIAR CA</td><td style="padding: 1px 4px; border: none;">${eg.auxiliar_ca || ''}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">LIMPIEZA</td><td style="padding: 1px 4px; border: none;">${eg.limpieza || ''}</td></tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `;

    // Función para generar una tabla de aforo
    const generateAforoTable = (aforoIndex) => {
        const aforo = aforoIndex < aforos.length ? aforos[aforoIndex] : null;
        const showData = aforoIndex < aforos.length;
        const cellStyle = `border: 1px solid black; padding: 2px 3px; text-align: right; ${fontSizeStyle}`;
        const headerCellStyle = `border: 1px solid black; padding: 2px; text-align: center; color: white; ${fontSizeStyle}`;

        const diagonalLine = !showData ? /*html*/`
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden;">
                <svg width="100%" height="100%" style="position: absolute; top: 0; left: 0;">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="black" stroke-width="1"/>
                </svg>
            </div>
        ` : '';

        return /*html*/`
            <div style="width: 48%;">
                <table style="width: 100%; border-collapse: collapse; ${fontSizeStyle} line-height: 1.2; margin-bottom: 0;">
                    <!-- Fila de encabezado con fondo rojo -->
                    <tr class="medidas-header">
                        <td style="border: none; padding: 2px 4px; color: white;"><strong>AFORO:</strong> ${showData ? aforoIndex + 1 : ''}</td>
                        <td style="border: none; padding: 2px 4px; color: white;"><strong>VOL. NOM:</strong> ${showData ? formatNumber(aforo.valor_nominal, 2) : ''}</td>
                        <td style="border: none; padding: 2px 4px; color: white;"><strong>PUNTA:</strong> ${showData ? '1' : ''}</td>
                        <td style="border: none; padding: 2px 4px; color: white;"><strong>PASOS:</strong></td>
                    </tr>
                </table>
                <div style="position: relative;">
                    ${diagonalLine}
                    <table style="width: 100%; border-collapse: collapse; ${fontSizeStyle} line-height: 1.2; table-layout: fixed;">
                        <colgroup>
                            <col style="width: 8%;">
                            <col style="width: 12%;">
                            <col style="width: 12%;">
                            <col style="width: 12%;">
                            <col style="width: 14%;">
                            <col style="width: 14%;">
                            <col style="width: 14%;">
                            <col style="width: 14%;">
                        </colgroup>
                        <tr class="medidas-header">
                            <th style="border: none; padding: 2px; text-align: center; color: white;">No.</th>
                            <th style="border: none; padding: 2px; text-align: center; color: white;">VACÍO<br>(g)</th>
                            <th style="border: none; padding: 2px; text-align: center; color: white;">LLENO<br>(g)</th>
                            <th style="border: none; padding: 2px; text-align: center; color: white;">MASA<br>(g)</th>
                            <th style="border: none; padding: 2px; text-align: center; color: white;">TEMP.<br>AGUA (°C)</th>
                            <th style="border: none; padding: 2px; text-align: center; color: white;">PRESIÓN<br>(hPa)</th>
                            <th style="border: none; padding: 2px; text-align: center; color: white;">HUMEDAD<br>(%)</th>
                            <th style="border: none; padding: 2px; text-align: center; color: white;">TEMP.<br>AMB. (°C)</th>
                        </tr>
                        ${[...Array(10)].map((_, i) => {
                            const medicionBruta = showData ? (aforosBrutos[aforoIndex]?.mediciones_ambientales?.[i] || {}) : {};
                            const vacio = showData ? (aforosBrutos[aforoIndex]?.mediciones_vacio?.[i] || 0) : null;
                            const lleno = showData ? (aforosBrutos[aforoIndex]?.mediciones_lleno?.[i] || 0) : null;
                            const masa = showData ? (lleno - vacio) : null;

                            return `
                                <tr style="border-top: 1px solid black;">
                                    <td style="${cellStyle} text-align: center;">${i + 1}</td>
                                    <td style="${cellStyle}">${showData ? formatNumber(vacio, 4) : '&nbsp;'}</td>
                                    <td style="${cellStyle}">${showData ? formatNumber(lleno, 6) : '&nbsp;'}</td>
                                    <td style="${cellStyle}">${showData ? formatNumber(masa, 4) : '&nbsp;'}</td>
                                    <td style="${cellStyle}">${showData ? formatNumber(medicionBruta.temp_agua, 1) : '&nbsp;'}</td>
                                    <td style="${cellStyle}">${showData ? formatNumber(medicionBruta.presion, 1) : '&nbsp;'}</td>
                                    <td style="${cellStyle}">${showData ? formatNumber(medicionBruta.humedad, 1) : '&nbsp;'}</td>
                                    <td style="${cellStyle}">${showData ? formatNumber(medicionBruta.temp_amb, 1) : '&nbsp;'}</td>
                                </tr>
                            `;
                        }).join('')}
                    </table>
                </div>
            </div>
        `;
    };


    // Construir las tablas de aforos en formato 2x2
    const aforosHtml = `
        <div style="margin-top: 0.1cm;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.1cm;">
                ${generateAforoTable(0, results)}
                ${generateAforoTable(1, results)}
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 0.1cm;">
                ${generateAforoTable(2, results)}
                ${generateAforoTable(3, results)}
            </div>
        </div>
    `;

    // Tarea 1: Añadir la sección final de Observaciones y Firmas
    const footerHtml = `
        <div style="margin-top: 0.1cm; font-size: 11px; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse; border: none;">
                <!-- Fila con las 3 columnas principales -->
                <tr style="vertical-align: top; page-break-inside: avoid;">
                    <!-- Columna 1: Observaciones -->
                    <td style="width: 33.33%; padding-right: 0.5cm; border: none;">
                        <div style="padding: 5px; min-height: 40px; font-size: 11px;">
                            <div style="font-weight: bold;">Observaciones</div>
                            <div style="margin-top: 5px;">${eg.observaciones || ''}</div>
                        </div>
                    </td>
                    <!-- Columna 2: Ajuste -->
                    <td style="width: 33.33%; padding-left: 0.25cm; padding-right: 0.25cm; border: none;">
                        <div style="padding: 5px; min-height: 40px; font-size: 11px;">
                            <span>¿Se realizó ajuste? S/N</span>
                            <span style="border: 1px solid black; padding: 1px 4px; margin-left: 10px; background-color: #f3f4f6;">
                                ${eg.ajuste_realizado || 'N'}
                            </span>
                            <span style="border: 1px solid black; padding: 1px 4px; margin-left: 10px; background-color: #f3f4f6;">
                                AA
                            </span>
                        </div>
                    </td>
                    <!-- Columna 3: Prueba de Condiciones Iniciales -->
                    <td style="width: 33.33%; padding-left: 0.5cm; border: none;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                            <tr class="medidas-header">
                                <th style="border: none; padding: 2px; color: white; text-align: center;" colspan="3">Prueba de Condiciones Iniciales</th>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black; padding: 2px; text-align: center;">${eg.vol_nominal ? formatNumber(eg.vol_nominal / 10, 2) : ''}</td>
                                <td style="border: 1px solid black; padding: 2px; text-align: center;">${eg.vol_nominal ? formatNumber(eg.vol_nominal / 2, 2) : ''}</td>
                                <td style="border: 1px solid black; padding: 2px; text-align: center;">${eg.vol_nominal ? formatNumber(eg.vol_nominal, 2) : ''}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black; padding: 2px; text-align: center;">${formatNumber(eg.condiciones_iniciales?.promedio1, 2)}</td>
                                <td style="border: 1px solid black; padding: 2px; text-align: center;">${formatNumber(eg.condiciones_iniciales?.promedio2, 2)}</td>
                                <td style="border: 1px solid black; padding: 2px; text-align: center;">${formatNumber(eg.condiciones_iniciales?.promedio3, 2)}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- Fila para las firmas -->
                <tr style="page-break-inside: avoid;">
                    <td style="padding-top: 0.2cm; text-align: center; border: none;">
                        <div style="border-top: 1px solid black; margin: 0 auto; width: 60%;"></div>
                        <div style="font-size: 9px; margin-top: 2px;">REALIZÓ</div>
                    </td>
                    <td style="border: none;"></td> <!-- Celda vacía para espaciar -->
                    <td style="padding-top: 0.2cm; text-align: center; border: none;">
                        <div style="border-top: 1px solid black; margin: 0 auto; width: 60%;"></div>
                        <div style="font-size: 9px; margin-top: 2px;">SUPERVISÓ</div>
                    </td>
                </tr>
            </table>
        </div>
    `;

    return headerHtml + aforosHtml + footerHtml;
}

function buildServicioReport_PDF(results, chartImage = '') {
    const unidades = results.textos_reporte.unidades || 'µL';

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const eg = results.textos_reporte.entradas_generales || {};

    let html = `
        <section>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="6">Rastreabilidad</th>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none;">Fecha de Servicio:</td>
                    <td style="padding: 4px; border: none;">${formatDate(eg.fecha_calibracion)}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Servicio:</td>
                    <td style="padding: 4px; border: none;">${eg.numero_servicio || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Cotización:</td>
                    <td style="padding: 4px; border: none;">${eg.cotizacion || ''}</td>
                </tr>
            </table>
        </section>

        <section style="margin-top: 0.3cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="6">Datos del cliente</th>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none;">Nombre del cliente:</td>
                    <td style="padding: 4px; border: none;" colspan="2">${eg.nombre_cliente || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Contacto:</td>
                    <td style="padding: 4px; border: none;" colspan="2">${eg.contacto_reporte_directo || ''}</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none;">Dirección:</td>
                    <td style="padding: 4px; border: none;" colspan="2">${eg.direccion_cliente_reporte || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Teléfono:</td>
                    <td style="padding: 4px; border: none;" colspan="2">${eg.telefono_cliente_reporte || ''}</td>
                </tr>
            </table>
        </section>

        <section style="margin-top: 0.3cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="6">Datos del instrumento</th>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none;">Descripción:</td>
                    <td style="padding: 4px; border: none;">${eg.descripcion_instrumento || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Marca:</td>
                    <td style="padding: 4px; border: none;">${eg.marca_instrumento || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Modelo:</td>
                    <td style="padding: 4px; border: none;">${eg.modelo_instrumento || ''}</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none;">Serie:</td>
                    <td style="padding: 4px; border: none;">${eg.serie_instrumento || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Identificación:</td>
                    <td style="padding: 4px; border: none;">${eg.id_instrumento || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Tipo:</td>
                    <td style="padding: 4px; border: none;">${eg.tipo_instrumento || ''}</td>
                </tr>
                 <tr>
                    <td style="padding: 4px; font-weight: bold; border: none;">Intervalo:</td>
                    <td style="padding: 4px; border: none;">${eg.intervalo_min_reporte || ''} a ${eg.intervalo_max_reporte || ''} ${unidades}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Volumen:</td>
                    <td style="padding: 4px; border: none;">${eg.tipo_volumen || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Resolución:</td>
                    <td style="padding: 4px; border: none;">${eg.div_min_valor || ''} ${eg.div_min_unidad || ''}</td>
                </tr>
            </table>
        </section>

        <section style="margin-top: 0.3cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="4">Condiciones ambientales</th>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none;">Temperatura del líquido de calibración:</td>
                    <td style="padding: 4px; border: none;">${results.condiciones_finales.temp_liquido.toFixed(2)} °C</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Temperatura ambiente:</td>
                    <td style="padding: 4px; border: none;">${results.condiciones_finales.temp_ambiente.toFixed(2)} °C</td>
                </tr>
                <tr>
                    <td style="padding: 4px; border: none; font-style: italic; color: #555;" colspan="2">Calibration Liquid Temperature</td>
                    <td style="padding: 4px; border: none; font-style: italic; color: #555;" colspan="2">Room temperature</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none;">Presión atmosférica:</td>
                    <td style="padding: 4px; border: none;">${results.condiciones_finales.presion.toFixed(2)} hPa</td>
                    <td style="padding: 4px; font-weight: bold; border: none;">Humedad Relativa:</td>
                    <td style="padding: 4px; border: none;">${results.condiciones_finales.humedad.toFixed(2)} %HR</td>
                </tr>
                <tr>
                    <td style="padding: 4px; border: none; font-style: italic; color: #555;" colspan="2">Atmospheric Pressure</td>
                    <td style="padding: 4px; border: none; font-style: italic; color: #555;" colspan="2">Relative Humidity</td>
                </tr>
            </table>
        </section>

        <section style="margin-top: 0.3cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="2">Instrumentos utilizados</th>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; vertical-align: top; width: 20%;">Patrones de Referencia:</td>
                    <td style="padding: 4px; border: none;">${results.textos_reporte.especificacion_principal}</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; vertical-align: top;">Equipo Auxiliar:</td>
                    <td style="padding: 4px; border: none;">${results.textos_reporte.especificacion_ca}</td>
                </tr>
                <tr>
                    <td style="padding: 4px; border: none;"></td>
                    <td style="padding: 4px; border: none;">${results.textos_reporte.especificacion_ta}</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; vertical-align: top;">Lugar de Servicio:</td>
                    <td style="padding: 4px; border: none;">${results.textos_reporte.lugar_servicio}</td>
                </tr>
            </table>
        </section>

        <!-- Mantenimiento -->
        <section style="margin-top: 0.3cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="2">Mantenimiento</th>
                </tr>
                <tr>
                    <td style="padding: 4px; border: none; width: 50%; vertical-align: top;">
                        ${eg.mantenimientos.includes('Limpieza externa') ? '&#x2713;' : '&#x2717;'} Limpieza externa<br>
                        ${eg.mantenimientos.includes('Limpieza interna') ? '&#x2713;' : '&#x2717;'} Limpieza interna<br>
                        ${eg.mantenimientos.includes('Revisión de resortes') ? '&#x2713;' : '&#x2717;'} Revisión de resortes
                    </td>
                    <td style="padding: 4px; border: none; width: 50%; vertical-align: top;">
                        ${eg.mantenimientos.includes('Revisión de empaques') ? '&#x2713;' : '&#x2717;'} Revisión de empaques<br>
                        ${eg.mantenimientos.includes('Lubricación') ? '&#x2713;' : '&#x2717;'} Lubricación<br>
                        ${eg.mantenimientos.includes('Ajuste') ? '&#x2713;' : '&#x2717;'} Ajuste
                    </td>
                </tr>
            </table>
        </section>

        <!-- Resultados del Servicio -->
        <section style="margin-top: 0.3cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;">Resultados del Servicio</th>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc; background-color: #f8f9fa;">${results.textos_reporte.introduccion}</td>
                </tr>
            </table>
        </section>

        <!-- Tabla de Mediciones -->
        <section style="margin-top: 0.3cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 10px; text-align: center;">
                <thead class="medidas-header">
                    <tr>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">No.</th>
                        ${results.aforos.map(aforo => `
                            <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">${aforo.valor_nominal.toFixed(0)} ${unidades}</th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${[...Array(10).keys()].map(i => `
                        <tr>
                            <td style="border: 1px solid #999; padding: 4px; font-weight: bold;">${i + 1}</td>
                            ${results.aforos.map(aforo => `
                                <td style="border: 1px solid #999; padding: 4px;">${(aforo.mediciones_volumen_ul[i] || 0).toFixed(2).replace('.', ',')}</td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </section>

        <!-- Tabla de Resumen de Errores -->
        <section style="margin-top: 0.3cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: center;">
                <thead class="medidas-header">
                    <tr>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">CANAL</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">VALOR NOMINAL</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">VOLUMEN DEL *IBC (V20 °C)</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">ERROR DE MEDIDA</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;"></th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">${unidades}</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">${unidades}</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">${unidades}</th>
                    </tr>
                </thead>
                <tbody>
                    ${results.aforos.map((aforo, index) => `
                        <tr>
                            <td style="border: 1px solid #999; padding: 4px; font-weight: bold;">${index + 1}</td>
                            <td style="border: 1px solid #999; padding: 4px;">${aforo.valor_nominal.toFixed(2).replace('.', ',')}</td>
                            <td style="border: 1px solid #999; padding: 4px;">${aforo.promedio_volumen_ul.toFixed(2).replace('.', ',')}</td>
                            <td style="border: 1px solid #999; padding: 4px;">${aforo.error_medida_ul.toFixed(2).replace('.', ',')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <p style="font-size: 10px; margin-top: 5px;">* IBC Instrumento Bajo Calibración</p>
        </section>

        <!-- Gráfico -->
        <section style="margin-top: 0.5cm; text-align: center; page-break-inside: avoid;">
            <h3 style="font-size: 12px; font-weight: bold; margin-bottom: 0.3cm; text-align: center;">Error de medida Vs. Valor de referencia</h3>
            ${chartImage ? `
                <img src="${chartImage}" style="max-width: 70%; height: auto; margin: 0 auto; display: block;">
            ` : `
                <div style="border: 1px dashed #ccc; padding: 20px; color: #777;">
                    Gráfico no disponible.
                </div>
            `}
        </section>

        <!-- Observaciones -->
        <section style="margin-top: 0.5cm; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;">Observaciones</th>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc; background-color: #f8f9fa;">${results.textos_reporte.observaciones}</td>
                </tr>
            </table>
        </section>

        <!-- Firmas -->
        <section style="margin-top: 2.5cm; page-break-inside: avoid; font-size: 11px;">
            ${(() => { const firma = results.textos_reporte.firma_gerente || {}; return `
            <table style="width: 100%; border-collapse: collapse; border: none;">
                <tr>
                    <td style="width: 50%; text-align: center; padding: 0 1cm; border: none;">
                        <div style="border-top: 1px solid #333; margin-bottom: 5px;"></div>
                        <div>${firma.nombre || ''}</div>
                        <div style="font-weight: bold;">${firma.cargo || ''}</div>
                    </td>
                    <td style="width: 50%; text-align: center; padding: 0 1cm; border: none;">
                        <div style="border-top: 1px solid #333; margin-bottom: 5px;"></div>
                        <div>Nombre y Firma</div>
                        <div style="font-weight: bold;">Cliente</div>
                    </td>
                </tr>
            </table>
            `})()}
        </section>
    `;

    return html;
}

function buildServicioReport_HTML(results) {
    const unidades = results.textos_reporte.unidades || 'µL';

    const eg = results.textos_reporte.entradas_generales || {};
    const cf = results.condiciones_finales || {};

    let html = `
        <section class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h1 class="text-2xl font-bold text-center mb-6">Reporte de Servicio</h1>

            <!-- Condiciones Ambientales -->
            <h3 class="text-lg font-semibold mt-6 mb-2">
                Condiciones ambientales
                <span class="block text-sm font-normal italic text-gray-500">Ambient conditions</span>
            </h3>
            <table class="min-w-full border text-center text-sm">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-2">Temperatura del líquido de calibración<br><em class="font-normal">Calibration liquid temperature</em></th>
                        <th class="px-4 py-2">Temperatura ambiente<br><em class="font-normal">Ambient temperature</em></th>
                        <th class="px-4 py-2">Presión atmosférica<br><em class="font-normal">Atmospheric pressure</em></th>
                        <th class="px-4 py-2">Humedad Relativa<br><em class="font-normal">Relative humidity</em></th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr>
                        <td class="px-4 py-2">${cf.temp_liquido.toFixed(2)} °C</td>
                        <td class="px-4 py-2">${cf.temp_ambiente.toFixed(2)} °C</td>
                        <td class="px-4 py-2">${cf.presion.toFixed(2)} hPa</td>
                        <td class="px-4 py-2">${cf.humedad.toFixed(2)} %</td>
                    </tr>
                </tbody>
            </table>

            <!-- Instrumentos Utilizados -->
            <h3 class="text-lg font-semibold mt-8 mb-2">
                Instrumentos utilizados
                <span class="block text-sm font-normal italic text-gray-500">Instruments used</span>
            </h3>
            <div class="text-sm p-4 border rounded-lg bg-gray-50 space-y-3">
                <p><strong>Patrones de Referencia:</strong> ${results.textos_reporte.especificacion_principal}</p>
                <div>
                    <strong>Equipo Auxiliar:</strong>
                    <ul class="list-disc list-inside pl-4 mt-1">
                        <li>${results.textos_reporte.especificacion_ta}</li>
                        <li>${results.textos_reporte.especificacion_ca}</li>
                    </ul>
                </div>
                <p><strong>Lugar de Servicio:</strong> ${results.textos_reporte.lugar_servicio}</p>
            </div>

            <!-- Resultados del Servicio -->
            <h3 class="text-lg font-semibold mt-8 mb-2">
                Resultados del Servicio
                <span class="block text-sm font-normal italic text-gray-500">Service Results</span>
            </h3>
            <p class="text-base text-gray-600 mb-4 p-4 border-l-4 border-blue-500 bg-blue-50">
                ${results.textos_reporte.introduccion}
            </p>

            <!-- Tabla de Mediciones Detalladas -->
            <table class="min-w-full border text-center text-sm mb-6">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-2 py-2">No.</th>
                        ${results.aforos.map(a => `<th class="px-2 py-2">${a.valor_nominal.toFixed(2)} ${unidades}</th>`).join('')}
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${[...Array(10).keys()].map(i => `
                        <tr class="divide-x divide-gray-200">
                            <td class="px-2 py-1">${i + 1}</td>
                            ${results.aforos.map(a => `<td class="px-2 py-1">${a.mediciones_volumen_ul[i].toFixed(2)}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <!-- Tabla de Resumen de Resultados -->
            <table class="min-w-full border text-center text-sm">
                <thead class="bg-gray-50">
                    <tr class="divide-x divide-gray-200">
                        <th class="px-2 py-2">CANAL</th>
                        <th class="px-2 py-2">Valor Nominal (${unidades})</th>
                        <th class="px-2 py-2">VOLUMEN DEL *IBC (V20 °C) (${unidades})</th>
                        <th class="px-2 py-2">Error de Medida (${unidades})</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${results.aforos.map((a, index) => `
                        <tr class="divide-x divide-gray-200">
                            <td class="px-2 py-2">${index + 1}</td>
                            <td class="px-2 py-2">${a.valor_nominal.toFixed(2)}</td>
                            <td class="px-2 py-2">${a.promedio_volumen_ul.toFixed(2)}</td>
                            <td class="px-2 py-2 font-medium ${a.error_medida_ul >= 0 ? 'text-blue-600' : 'text-red-600'}">
                                ${a.error_medida_ul.toFixed(2)}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <p class="text-xs text-gray-500 mt-2">* IBC Instrumento Bajo Calibración</p>

            <!-- Gráfico de Errores -->
            <h3 class="text-lg font-semibold mt-8 mb-2 text-center">Gráfico de Errores</h3>
            <div class="p-4 border rounded-lg bg-gray-50 h-80" style="position: relative;">
                <div class="mx-auto h-full" style="max-width: 70%; position: relative;">
                    <canvas id="errorChart"></canvas>
                </div>
            </div>

            <!-- Observaciones -->
            <h3 class="text-lg font-semibold mt-8 mb-2">Observaciones</h3>
            <p class="text-sm p-4 border rounded-lg bg-gray-50">${results.textos_reporte.observaciones}</p>

        </section>
    `;
    return html;
}

function buildCertificadoReport_PDF(results, chartImage = '') {
    const eg = results.textos_reporte.entradas_generales || {};
    const unidades = results.textos_reporte.unidades || 'µL';

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    let html = `
        <!-- Rastreabilidad -->
        <section>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="6">
                        Rastreabilidad <br> <em style="font-weight: normal;">Traceability</em>
                    </th>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Fecha Recepción:<br><span style="font-style: italic; color: #555; font-weight: normal;">Reception Date</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${formatDate(eg.fecha_recepcion)}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Fecha Calibración:<br><span style="font-style: italic; color: #555; font-weight: normal;">Calibration Date</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${formatDate(eg.fecha_calibracion)}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Certificado:<br><span style="font-style: italic; color: #555; font-weight: normal;">Certificate</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.numero_certificado || ''}</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Fecha Emisión:<br><span style="font-style: italic; color: #555; font-weight: normal;">Issued Date</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${formatDate(eg.fecha_emision)}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Servicio:<br><span style="font-style: italic; color: #555; font-weight: normal;">Service</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.numero_servicio || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Magnitud evaluada:<br><span style="font-style: italic; color: #555; font-weight: normal;">Evaluated magnitude</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">Volumen</td>
                </tr>
            </table>
        </section>

        <!-- Datos del Cliente -->
        <section style="margin-top: 0.5cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="4">
                        Datos del Cliente <br> <em style="font-weight: normal;">Customer information</em>
                    </th>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left; width: 20%;">Nombre del cliente:<br><span style="font-style: italic; color: #555; font-weight: normal;">Customer name</span></td>
                    <td style="padding: 4px; border: none; text-align: left; width: 30%;">${eg.nombre_cliente || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left; width: 15%;">Contacto:<br><span style="font-style: italic; color: #555; font-weight: normal;">Contact</span></td>
                    <td style="padding: 4px; border: none; text-align: left; width: 35%;">${eg.contacto_reporte_directo || ''}</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Dirección:<br><span style="font-style: italic; color: #555; font-weight: normal;">Address</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.direccion_cliente_reporte || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Correo:<br><span style="font-style: italic; color: #555; font-weight: normal;">Email</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.correo_cliente_reporte || ''}</td>
                </tr>
            </table>
            <p style="font-size: 9px; text-align: left; margin-top: 2px;">Los datos fueron proporcionados por el cliente.</p>
        </section>

        <!-- Datos del Ítem (IBC) -->
        <section style="margin-top: 0.5cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="6">
                        Datos del ítem (IBC) <br> <em style="font-weight: normal;">Ítem data</em>
                    </th>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Descripción:<br><span style="font-style: italic; color: #555; font-weight: normal;">Description</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.descripcion_instrumento || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Marca:<br><span style="font-style: italic; color: #555; font-weight: normal;">Manufacturer</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.marca_instrumento || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Modelo:<br><span style="font-style: italic; color: #555; font-weight: normal;">Model / Type</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.modelo_instrumento || ''}</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Serie:<br><span style="font-style: italic; color: #555; font-weight: normal;">Serial</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.serie_instrumento || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Identificación:<br><span style="font-style: italic; color: #555; font-weight: normal;">Id Number</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.id_instrumento || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Tipo:<br><span style="font-style: italic; color: #555; font-weight: normal;">Type</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.tipo_instrumento || ''}</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Intervalo:<br><span style="font-style: italic; color: #555; font-weight: normal;">Nominal Range</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.intervalo_min_reporte || ''} a ${eg.intervalo_max_reporte || ''} ${unidades}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Volumen:<br><span style="font-style: italic; color: #555; font-weight: normal;">Indication</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${eg.tipo_volumen || ''}</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Resolución:<br><span style="font-style: italic; color: #555; font-weight: normal;">Resolution</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${(eg.div_min_valor || '0').toString().replace('.', ',')} ${eg.div_min_unidad || ''}</td>
                </tr>
            </table>
            <p style="font-size: 9px; text-align: left; margin-top: 2px;">Los datos fueron proporcionados por el cliente.</p>
        </section>

        <!-- Condiciones Ambientales -->
        <section style="margin-top: 0.5cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;" colspan="4">
                        Condiciones Ambientales durante la calibración <br> <em style="font-weight: normal;">Enviromental Conditions</em>
                    </th>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left; width: 30%;">Temperatura del líquido de calibración:<br><span style="font-style: italic; color: #555; font-weight: normal;">Calibration Liquid Temperature</span></td>
                    <td style="padding: 4px; border: none; text-align: left; width: 20%;">${(results.condiciones_finales.temp_liquido || 0).toFixed(1).replace('.', ',')} °C</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left; width: 20%;">Temperatura ambiente:<br><span style="font-style: italic; color: #555; font-weight: normal;">Room temperature</span></td>
                    <td style="padding: 4px; border: none; text-align: left; width: 30%;">${(results.condiciones_finales.temp_ambiente || 0).toFixed(1).replace('.', ',')} °C</td>
                </tr>
                <tr>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Presión atmosférica:<br><span style="font-style: italic; color: #555; font-weight: normal;">Atmospheric Pressure</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${(results.condiciones_finales.presion || 0).toFixed(1).replace('.', ',')} hPa</td>
                    <td style="padding: 4px; font-weight: bold; border: none; text-align: left;">Humedad Relativa:<br><span style="font-style: italic; color: #555; font-weight: normal;">Relative Humidity</span></td>
                    <td style="padding: 4px; border: none; text-align: left;">${(results.condiciones_finales.humedad || 0).toFixed(1).replace('.', ',')} %HR</td>
                </tr>
            </table>
        </section>

        <!-- Trazabilidad Metrológica -->
        <section style="margin-top: 0.5cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;">
                        Trazabilidad Metrológica <br> <em style="font-weight: normal;">Metrological Traceability</em>
                    </th>
                </tr>
                <tr>
                    <td style="padding: 8px; border: none;">
                        <p><strong>Patrones de Referencia:</strong> <em style="font-style: italic; color: #555;">Standards Used</em><br>${results.textos_reporte.especificacion_principal}</p>
                        <p style="margin-top: 8px;"><strong>Equipo auxiliar:</strong> <em style="font-style: italic; color: #555;">Auxiliary equipment</em><br>${results.textos_reporte.especificacion_ta}<br>${results.textos_reporte.especificacion_ca}</p>
                        <p style="margin-top: 8px;"><strong>Trazabilidad metrológica:</strong> <em style="font-style: italic; color: #555;">Metrological Traceability</em><br>${results.textos_reporte.trazabilidad_nacional}</p>
                        <p style="margin-top: 8px;"><strong>Procedimiento utilizado:</strong> <em style="font-style: italic; color: #555;">Procedure used</em><br>${results.textos_reporte.procedimiento_utilizado}</p>
                        <p style="margin-top: 8px;"><strong>Lugar de Calibración:</strong> <em style="font-style: italic; color: #555;">Calibration Location</em><br>${results.textos_reporte.lugar_servicio}</p>
                    </td>
                </tr>
            </table>
        </section>

        <!-- Resultados de la Calibración -->
        <section style="margin-top: 0.5cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;">
                        Resultados de la Calibración <br> <em style="font-weight: normal;">Calibration Results</em>
                    </th>
                </tr>
                <tr>
                    <td style="padding: 8px; border: none;">${eg.introduccion_certificado}</td>
                </tr>
            </table>
        </section>

        <!-- Tabla de Resultados del Certificado -->
        <section style="margin-top: 0.5cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 10px; text-align: center;">
                <thead class="medidas-header">
                    <tr>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">CANAL</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">VALOR NOMINAL<br>(${unidades})</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">VOLUMEN DEL *IBC<br>(V20 °C) (${unidades})</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">ERROR DE MEDIDA<br>(${unidades})</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">ERROR DE MEDIDA<br>(%)</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">INCERTIDUMBRE<br>EXPANDIDA (${unidades})</th>
                        <th style="border: 1px solid #999; padding: 4px; font-weight: bold; color: white;">EMT</th>
                    </tr>
                </thead>
                <tbody>
                    ${results.aforos.map((aforo, index) => `
                        <tr>
                            <td style="border: 1px solid #999; padding: 4px;">${index + 1}</td>
                            <td style="border: 1px solid #999; padding: 4px;">${aforo.valor_nominal.toFixed(2)}</td>
                            <td style="border: 1px solid #999; padding: 4px;">${aforo.promedio_volumen_ul.toFixed(2)}</td>
                            <td style="border: 1px solid #999; padding: 4px;">${aforo.error_medida_ul.toFixed(2)}</td>
                            <td style="border: 1px solid #999; padding: 4px;">${aforo.error_medida_porcentaje !== null ? aforo.error_medida_porcentaje.toFixed(2) : 'N/A'}</td>
                            <td style="border: 1px solid #999; padding: 4px;">${aforo.incertidumbre_expandida !== null ? aforo.incertidumbre_expandida.toFixed(3) : 'N/A'}</td>
                            <td style="border: 1px solid #999; padding: 4px;">${aforo.emt !== null ? aforo.emt.toFixed(1) : 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <p style="font-size: 10px; margin-top: 5px;">* IBC Instrumento Bajo Calibración</p>
        </section>

        <!-- Gráfico de Incertidumbre -->
        <section style="margin-top: 0.5cm; text-align: center; page-break-inside: avoid;">
            <h3 style="font-size: 12px; font-weight: bold; margin-bottom: 0.3cm; text-align: center;">Error de medida ±Incertidumbre de medida Vs. Valor de referencia</h3>
            ${chartImage ? `
                <img src="${chartImage}" style="max-width: 80%; height: auto; margin: 0 auto; display: block;">
            ` : `
                <div style="border: 1px dashed #ccc; padding: 20px; color: #777;">
                    Gráfico no disponible.
                </div>
            `}
        </section>

        <!-- Notas y Observaciones -->
        <section style="margin-top: 0.5cm;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr class="medidas-header">
                    <th style="border: none; padding: 4px; color: white; text-align: center;">
                        Notas y Observaciones <br> <em style="font-weight: normal;">Notes and Observations</em>
                    </th>
                </tr>
                <tr>
                    <td style="padding: 8px; border: none; font-size: 10px;">
                        ${results.textos_reporte.notas_certificado.map(nota => `<p style="margin-bottom: 5px;">${nota}</p>`).join('')}
                        <p style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ddd;">
                            ${document.getElementById('puntas_valor').value ? `Se realizó con puntas nuevas.` : ''}
                        </p>
                        <p>${results.textos_reporte.observaciones}</p>
                    </td>
                </tr>
            </table>
        </section>

        <!-- Fin del Documento y Firma -->
        <div style="text-align: center; font-weight: bold; color: #555; margin-top: 1.5cm;">
            <p>FIN DEL DOCUMENTO</p>
        </div>

        <section style="margin-top: 2.5cm; page-break-inside: avoid; font-size: 11px;">
            ${(() => { const firma = results.textos_reporte.firma_gerente || {}; return `
            <table style="width: 100%; border-collapse: collapse; border: none;">
                <tr>
                    <td style="width: 50%; text-align: center; padding: 0 1cm; border: none;">
                        <div style="border-top: 1px solid #333; margin-bottom: 5px;"></div>
                        <div>${firma.nombre || ''}</div>
                        <div style="font-weight: bold;">${firma.cargo || ''}</div>
                    </td>
                </tr>
            </table>
            `})()}
        </section>
    `;

    return html;
}

function displayResults(results) {
    window.latestResults = results; // Guardar resultados para la exportación
    const serviceReportContainer = document.getElementById('results-container');
    const certificateContainer = document.getElementById('certificate-container');
    
    // Crear un contenedor específico para el reporte de medidas
    const medidasReportContainer = document.getElementById('medidas-report-container') || document.createElement('div');
    if (!medidasReportContainer.id) {
        medidasReportContainer.id = 'medidas-report-container';
        medidasReportContainer.style.display = 'none'; // Oculto, solo para la exportación
        document.body.appendChild(medidasReportContainer);
    };

    // Construir el contenido del reporte de Servicio para la VISTA PREVIA HTML
    const html = buildServicioReport_HTML(results);
    serviceReportContainer.innerHTML = html;

    // Construir el contenido del reporte de Medidas
    const medidasHeaderHtml = buildMedidasHeader(results);
    medidasReportContainer.innerHTML = medidasHeaderHtml;

    // --- Generar el contenido del Certificado ---
    const eg = results.textos_reporte.entradas_generales || {};    const unidades = results.textos_reporte.unidades || 'µL';    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    let certificateHtml = `
        <section class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h1 class="text-2xl font-bold text-center mb-6">Certificado de Calibración Volumen</h1>
            <!-- Trazabilidad Metrológica -->
            <h3 class="text-lg font-semibold mt-6 mb-2">
                Trazabilidad Metrológica
                <span class="block text-sm font-normal italic text-gray-500">Metrological Traceability</span>
            </h3>

            <div class="text-sm p-4 border rounded-lg bg-gray-50 space-y-3">
                <div>
                    <p>
                        <strong>Patrones de Referencia:</strong><br>
                        <em class="italic text-gray-500">Standards Used</em>
                    </p>
                    <p class="pl-4">
                        ${results.textos_reporte.especificacion_principal}
                    </p>
                </div>
                <div>
                    <strong>Equipo auxiliar:</strong><br>
                    <em class="italic text-gray-500">Auxiliary equipment</em>
                    <ul class="list-disc list-inside pl-4 mt-1">
                        <li>${results.textos_reporte.especificacion_ta}</li>
                        <li>${results.textos_reporte.especificacion_ca}</li>
                    </ul>
                </div>
                <div>
                    <p>
                        <strong>Trazabilidad metrológica:</strong><br>
                        <em class="italic text-gray-500">Metrological Traceability</em>
                    </p>
                    <p class="pl-4">
                        ${results.textos_reporte.trazabilidad_nacional}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Procedimiento utilizado:</strong><br>
                        <em class="italic text-gray-500">Procedure used</em>
                    </p>
                    <p class="pl-4">
                        ${results.textos_reporte.procedimiento_utilizado}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Lugar de Calibración:</strong><br>
                        <em class="italic text-gray-500">Calibration Location</em>
                    </p>
                    <p class="pl-4">
                        ${results.textos_reporte.lugar_servicio}
                    </p>
                </div>
            </div>

            <!-- Resultados de la Calibración -->
            <h3 class="text-lg font-semibold mt-8 mb-2">
                Resultados de la Calibración
                <span class="block text-sm font-normal italic text-gray-500">Calibration Results</span>
            </h3>

            <p class="text-sm text-gray-600 mb-4 p-4 border-l-4 border-blue-500 bg-blue-50">
                ${eg.introduccion_certificado}
            </p>

            <!-- Tabla de Resultados del Certificado -->
            <div class="mb-6">
                <table class="min-w-full border text-center text-xs">
                    <thead class="bg-gray-50">
                        <tr class="divide-x divide-gray-200 text-xs font-medium text-gray-500 uppercase">
                            <th class="px-2 py-2">CANAL</th>
                            <th class="px-2 py-2">VALOR NOMINAL (${unidades})</th>
                            <th class="px-2 py-2">VOLUMEN DEL *IBC (V20 °C) (${unidades})</th>
                            <th class="px-2 py-2">ERROR DE MEDIDA (${unidades})</th>
                            <th class="px-2 py-2">ERROR DE MEDIDA (%)</th>
                            <th class="px-2 py-2">INCERTIDUMBRE EXPANDIDA (${unidades})</th>
                            <th class="px-2 py-2">EMT</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${results.aforos.map((aforo, index) => `
                            <tr class="divide-x divide-gray-200">
                                <td class="px-2 py-2">${index + 1}</td>
                                <td class="px-2 py-2">${aforo.valor_nominal.toFixed(2)}</td>
                                <td class="px-2 py-2">${aforo.promedio_volumen_ul.toFixed(2)}</td>
                                <td class="px-2 py-2 font-medium ${aforo.error_medida_ul >= 0 ? 'text-blue-600' : 'text-red-600'}">
                                    ${aforo.error_medida_ul.toFixed(2)}
                                </td>
                                <td class="px-2 py-2">
                                    ${aforo.error_medida_porcentaje !== null ? aforo.error_medida_porcentaje.toFixed(2) : 'N/A'}
                                </td>
                                <td class="px-2 py-2">
                                    ${aforo.incertidumbre_expandida !== null ? aforo.incertidumbre_expandida.toFixed(3) : 'N/A'} 
                                </td>
                                <td class="px-2 py-2">${aforo.emt !== null ? aforo.emt.toFixed(1) : 'N/A'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <p class="text-xs text-gray-500 mt-2">* IBC Instrumento Bajo Calibración</p>

                <!-- Gráfico de Incertidumbre -->
                <h3 class="text-lg font-semibold mt-8 mb-2 chart-container">Error de medida ±Incertidumbre de medida Vs. Valor de referencia</h3>
                <div class="p-4 border rounded-lg bg-gray-50 h-96 chart-container">
                    <canvas id="errorIncertidumbreChart"></canvas>
                </div>

                <!-- Notas y Observaciones -->
                <h3 class="text-lg font-semibold mt-8 mb-2">
                    Notas y Observaciones
                    <span class="block text-sm font-normal italic text-gray-500">Notes and Observations</span>
                </h3>
                <div class="text-xs text-gray-600 p-4 border rounded-lg bg-gray-50 space-y-3">
                    ${results.textos_reporte.notas_certificado.map(nota => `<p>${nota}</p>`).join('')}
                    
                    <!-- Observación dinámica -->
                    <p class="mt-4 pt-3 border-t border-gray-200">
                        ${
                            document.getElementById('puntas_valor').value ? `Se realizó con puntas nuevas.` : ''
                        }
                    </p>
                    <p>
                        ${results.textos_reporte.observaciones}
                    </p>
                </div>

                <div class="text-center font-bold text-gray-700 mt-8">
                    <p>FIN DEL DOCUMENTO</p>
                </div>
            </div>
        </section>
    `;

    certificateContainer.innerHTML = certificateHtml;

    // Calcular el rango de los datos para añadir un "padding" a los ejes
    const xValues = results.aforos.map(a => a.promedio_volumen_ul);
    const yValues = results.aforos.map(a => a.error_medida_ul);

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xRange = xMax - xMin;
    const yRange = yMax - yMin; // <-- CORREGIDO

    // Añadir un 15% de espacio extra a cada lado de los ejes
    const xPadding = xRange > 0 ? xRange * 0.15 : 2;
    const yPadding = yRange > 0 ? yRange * 0.15 : 0.1;

    const suggestedXMax = xMax + xPadding;
    const suggestedYMax = yMax + yPadding;
    
    const scatterData = {
        datasets: [
            {
                label: 'Error de Medida',
                data: results.aforos.map(a => ({ x: a.promedio_volumen_ul, y: a.error_medida_ul })),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                pointRadius: 6,
                pointHoverRadius: 8
            },
        ]
    };

    // Mostrar los contenedores ANTES de renderizar los gráficos
    serviceReportContainer.classList.remove('hidden');
    certificateContainer.classList.remove('hidden');

    // Destruir el gráfico anterior si existe
    if(window.myChart instanceof Chart) { window.myChart.destroy(); }

    // // Renderizar gráfico de Errores (Reporte de Servicio)
    const errorChartCtx = document.getElementById('errorChart').getContext('2d');
    if(myChart) { myChart.destroy(); }
    myChart = new Chart(errorChartCtx, {
        type: 'scatter',
        data: scatterData,
        options: {
            scales: {
                y: {
                    //beginAtZero: false, // Dejamos que Chart.js decida el mínimo o lo calculamos
                    max: suggestedYMax, // Establecer el máximo del eje Y con padding
                    title: { display: false },
                    grace: '10%' // Alternativa: pedir a chart.js que añada un 10% de gracia
                },
                x: {
                    type: 'linear',
                    position: 'bottom',
                    max: suggestedXMax, // Establecer el máximo del eje X con padding
                    grace: '10%'
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Error de medida Vs. Valor de referencia',
                    font: { size: 16 },
                    padding: { top: 10, bottom: 20 }
                },
                legend: { 
                    display: false 
                },
                datalabels: {
                    display: true,
                    align: 'top',
                    offset: 5,
                    formatter: (value, context) => {
                        return value.x.toFixed(2); // Muestra el valor del eje X (Volumen) con 2 decimales
                    },
                    font: {
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` (Promedio: ${context.parsed.x.toFixed(4)} µL, Error: ${context.parsed.y.toFixed(4)} µL)`;
                        }
                    }
                }
            }
        }
    });

    // El gráfico está listo. La imagen se generará bajo demanda en handleExportPdf.
    // No se necesita una promesa aquí.

    // --- Renderizar el nuevo gráfico de Incertidumbre ---

    const errorIncertidumbreData = {
        datasets: [
            {
                label: 'Rango de Incertidumbre',
                data: results.aforos.map(a => ({
                    x: a.promedio_volumen_ul,
                    y: [a.error_medida_ul - a.incertidumbre_expandida, a.error_medida_ul + a.incertidumbre_expandida]
                })),
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Rosa semitransparente
                borderColor: 'rgba(255, 99, 132, 1)', // Rosa sólido
                borderWidth: 1,
                barPercentage: 0.05, // Hace las barras de error muy delgadas para que parezcan líneas
                categoryPercentage: 1.0,
                order: 2 // Asegura que las barras se dibujen detrás de los puntos
            },
            {
                label: 'Error de Medida',
                data: results.aforos.map(a => ({
                    x: a.promedio_volumen_ul,
                    y: a.error_medida_ul
                })),
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgba(54, 162, 235, 1)',
                type: 'scatter',
                pointRadius: 6,
                pointHoverRadius: 8,
                order: 1 // Asegura que los puntos se dibujen encima de las barras
            }
        ]
    };

    // Renderizar gráfico de Incertidumbre (Certificado)
    if (window.errorIncertidumbreChart instanceof Chart) { window.errorIncertidumbreChart.destroy(); }
    const errorIncertidumbreCtx = document.getElementById('errorIncertidumbreChart').getContext('2d');
    window.errorIncertidumbreChart = new Chart(errorIncertidumbreCtx, {
        type: 'bar', // El tipo base es 'bar' para las barras de error
        data: errorIncertidumbreData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: -0.10,
                    max: 0.07,
                    ticks: {
                        stepSize: 0.01
                    },
                    title: { 
                        display: false
                    }
                },
                x: {
                    type: 'linear',
                    position: 'bottom',
                    grace: '10%'
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    display: true,
                    align: 'bottom',
                    offset: 8,
                    color: '#444',
                    font: {
                        weight: 'bold',
                        size: 10,
                    },
                    formatter: (value, context) => {
                        // Mostrar solo en el dataset de scatter (puntos)
                        if (context.dataset.type === 'scatter') {
                            return value.x.toFixed(2);
                        }
                        return null;
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    });

}
const syncFields = [ // CORREGIDO: IDs no existían, ahora se usan los correctos.
    { from: 'direccion_cliente_reporte', to: 'direccion_cliente' }, // Ejemplo, ajusta según tu necesidad
    { from: 'correo_cliente_reporte', to: 'correo_cliente' },
    { from: 'telefono_cliente_reporte', to: 'telefono_cliente' },
    { from: 'contacto_reporte_directo', to: 'contacto_reporte'},
];

document.addEventListener('DOMContentLoaded', () => {
    // Registrar el plugin de etiquetas de datos globalmente una sola vez.
    Chart.register(ChartDataLabels);
    // Desactivar datalabels por defecto para todos los gráficos, se activarán por configuración.
    Chart.defaults.set('plugins.datalabels', {
        display: false
    });

    generateAforoContent('tab-1', 1);
    generateAforoContent('tab-2', 2);
    generateAforoContent('tab-3', 3);
    
    document.getElementById('div_min_valor').addEventListener('input', (e) => {
        document.getElementById('resolucion').value = e.target.value;
    });

    document.getElementById('vol_nominal').addEventListener('input', updateAforoHeaders);

    document.getElementById('autocomplete-btn').addEventListener('click', autocompleteWithTestData);
    document.getElementById('generar-reporte-btn').addEventListener('click', handleGenerateReport);
    document.getElementById('clear-form-btn').addEventListener('click', clearForm);
    document.getElementById('export-servicio-btn').addEventListener('click', () => handleExportPdf('servicio'));
    document.getElementById('export-certificado-btn').addEventListener('click', () => handleExportPdf('certificado'));
    document.getElementById('export-medidas-btn').addEventListener('click', () => handleExportPdf('medidas'));

    // Sincronizar campos entre secciones
    syncFields.forEach(pair => {
        const fromEl = document.getElementById(pair.from);
        const toEl = document.getElementById(pair.to);
        if(fromEl && toEl){
            fromEl.addEventListener('input', () => toEl.value = fromEl.value);
        }
    });
    
    // Carga inicial
    clearForm();
    loadSiteConfig();
});