function buildMedidasHeader(results) {
    if (!results || !results.textos_reporte || !results.aforos) {
        console.error('Datos incompletos para generar el reporte');
        return '';
    }

    const eg = results.textos_reporte.entradas_generales || {};
    const aforos = results.aforos || [];
    const unidades = results.textos_reporte.unidades || 'µL';

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

    // Construir el encabezado
    const headerHtml = `
    <div style="margin-top: 0.5cm;">
        <table style="width: 100%; border-collapse: collapse; border-spacing: 0;">
            <tbody style="font-size: 7px;">
                <tr>
                    <td style="width: 80%; vertical-align: top; border: 1px solid black; padding: 0;">
                        <table style="width: 100%; font-size: 7px; line-height: 1.2; border: none;">
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">CLIENTE</td><td style="padding: 1px 4px; border: none;" colspan="5">${eg.nombre_cliente || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">FECHA REC.</td><td style="padding: 1px 4px; border: none;">${formatDate(eg.fecha_recepcion)}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">INSTRUMENTO</td><td style="padding: 1px 4px; border: none;" colspan="3">${eg.descripcion_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">TIPO</td><td style="padding: 1px 4px; border: none;">${eg.tipo_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">FECHA CAL.</td><td style="padding: 1px 4px; border: none;">${formatDate(eg.fecha_calibracion)}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">MARCA</td><td style="padding: 1px 4px; border: none;">${eg.marca_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">VOL. NOMI.</td><td style="padding: 1px 4px; border: none;">${eg.vol_nominal || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">VOLUMEN</td><td style="padding: 1px 4px; border: none;">${eg.tipo_volumen || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">Ɵ CUELLO:</td><td style="padding: 1px 4px; border: none;">${eg.cuello_instrumento || 'N.A.'}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">MODELO</td><td style="padding: 1px 4px; border: none;">${eg.modelo_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">UNIDAD</td><td style="padding: 1px 4px; border: none;">${eg.unidades || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">T. DESCARGA</td><td style="padding: 1px 4px; border: none;">${eg.t_descarga || 'N.A.'}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">PUNTAS</td><td style="padding: 1px 4px; border: none;">${eg.puntas_valor || ''} ${eg.puntas_unidad || ''}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">SERIE</td><td style="padding: 1px 4px; border: none;">${eg.serie_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">CLASE</td><td style="padding: 1px 4px; border: none;">${eg.clase_instrumento || 'N.A.'}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">DIV. MÍN.</td><td style="padding: 1px 4px; border: none;">${eg.div_min_valor || ''} ${eg.div_min_unidad || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">TOLERANCIA</td><td style="padding: 1px 4px; border: none;">${eg.tolerancia || 'N.A.'}</td></tr>
                            <tr><td style="padding: 1px 4px; font-weight: bold; border: none;">ID</td><td style="padding: 1px 4px; border: none;">${eg.id_instrumento || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">CALIBRADO PARA</td><td style="padding: 1px 4px; border: none;">${eg.tipo_calibracion || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">MATERIAL</td><td style="padding: 1px 4px; border: none;">${eg.material || ''}</td><td style="padding: 1px 4px; font-weight: bold; border: none;">RESOLUCIÓN</td><td style="padding: 1px 4px; border: none;">${eg.div_min_valor || ''}</td></tr>
                        </table>
                    </td>
                    <td style="width: 20%; vertical-align: top; border: 1px solid black; padding: 0;">
                        <table style="width: 100%; font-size: 7px; line-height: 1.2; border: none;">
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

        return `
            <div style="width: 48%;">
                <table style="width: 100%; border-collapse: collapse; font-size: 7px;">
                    <tr style="background-color: #f3f4f6;">
                        <th style="border: 1px solid black; padding: 4px; text-align: center; white-space: nowrap;" colspan="8">
                            AFORO ${aforoIndex + 1}
                            ${showData ? `VOL. NOM. ${formatNumber(aforo.valor_nominal, 2)}` : ''} ${unidades}
                            PUNTA ${aforoIndex + 1}
                            PASOS
                        </th>
                    </tr>
                    <tr style="background-color: #f3f4f6;">
                        <th style="border: 1px solid black; padding: 4px; text-align: center;">No.</th>
                        <th style="border: 1px solid black; padding: 4px; text-align: center;">VACÍO<br>(g)</th>
                        <th style="border: 1px solid black; padding: 4px; text-align: center;">LLENO<br>(g)</th>
                        <th style="border: 1px solid black; padding: 4px; text-align: center;">MASA<br>(g)</th>
                        <th style="border: 1px solid black; padding: 4px; text-align: center;">TEMP.<br>AGUA (°C)</th>
                        <th style="border: 1px solid black; padding: 4px; text-align: center;">PRESIÓN<br>(hPa)</th>
                        <th style="border: 1px solid black; padding: 4px; text-align: center;">HUMEDAD<br>(%)</th>
                        <th style="border: 1px solid black; padding: 4px; text-align: center;">TEMP.<br>AMB. (°C)</th>
                    </tr>
                    ${showData ? [...Array(10)].map((_, i) => {
                        const medicion = aforo.mediciones_ambientales?.[i] || { temp_agua: 0, temp_amb: 0, presion: 0, humedad: 0 };
                        const masa = aforo.mediciones_masa?.[i] || 0;
                        return `
                            <tr>
                                <td style="border: 1px solid black; padding: 4px; text-align: center;">${i + 1}</td>
                                <td style="border: 1px solid black; padding: 4px; text-align: right;">0,0000</td>
                                <td style="border: 1px solid black; padding: 4px; text-align: right;">${formatNumber(masa, 6)}</td>
                                <td style="border: 1px solid black; padding: 4px; text-align: right;">${formatNumber(masa, 4)}</td>
                                <td style="border: 1px solid black; padding: 4px; text-align: right;">${formatNumber(medicion.temp_agua, 1)}</td>
                                <td style="border: 1px solid black; padding: 4px; text-align: right;">${formatNumber(medicion.presion, 1)}</td>
                                <td style="border: 1px solid black; padding: 4px; text-align: right;">${formatNumber(medicion.humedad, 1)}</td>
                                <td style="border: 1px solid black; padding: 4px; text-align: right;">${formatNumber(medicion.temp_amb, 1)}</td>
                            </tr>
                        `;
                    }).join('') : ''}
                </table>
            </div>
        `;
    };

    // Construir las tablas de aforos en formato 2x2
    const aforosHtml = `
        <div style="margin-top: 0.5cm;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 1cm;">
                ${generateAforoTable(0)}
                ${generateAforoTable(1)}
            </div>
            <div style="display: flex; justify-content: space-between;">
                ${generateAforoTable(2)}
                ${generateAforoTable(3)}
            </div>
        </div>
    `;

    return headerHtml + aforosHtml;
}