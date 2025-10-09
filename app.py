from flask import Flask, request, jsonify, render_template, make_response
from flask_cors import CORS
from weasyprint import HTML
import calculadora
import calculadora_nueva # <-- 1. Importar el nuevo módulo
import math # Importar math para usarlo en la validación
import json
import pathlib
import os
from datetime import datetime
import logging
from logging.handlers import RotatingFileHandler

# --- CONFIGURACIÓN DE LOGGING ---
log_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
log_file = 'app.log'

file_handler = RotatingFileHandler(log_file, maxBytes=1024 * 1024 * 5, backupCount=2) # 5 MB por archivo
file_handler.setFormatter(log_formatter)
file_handler.setLevel(logging.INFO)

app = Flask(__name__)
CORS(app)

# Cargar las especificaciones de los patrones al iniciar la aplicación
PATRONES_ESPECIFICACIONES = {}
try:
    with open(os.path.join(app.static_folder, 'config', 'patrones.json'), 'r', encoding='utf-8') as f:
        PATRONES_ESPECIFICACIONES = json.load(f)
    # No usamos app.logger aquí porque aún no está configurado
except Exception as e:
    print(f"ERROR CRÍTICO: No se pudo cargar el archivo de patrones: {e}")

# Cargar configuración del sitio
SITE_CONFIG = {}
try:
    with open(os.path.join(app.static_folder, 'config', 'site_config.json'), 'r', encoding='utf-8') as f:
        SITE_CONFIG = json.load(f)
except Exception as e:
    print(f"ERROR CRÍTICO: No se pudo cargar el archivo de configuración del sitio: {e}")

# Cargar configuración de EMT
EMTS_CONFIG = {}
try:
    with open(os.path.join(app.static_folder, 'config', 'emts.json'), 'r', encoding='utf-8') as f:
        EMTS_CONFIG = json.load(f)
except Exception as e:
    print(f"ERROR CRÍTICO: No se pudo cargar el archivo de configuración de EMT: {e}")

@app.route('/')
def index():
    """Sirve la página principal de la aplicación."""
    return render_template('index.html')

@app.route('/calcular', methods=['POST'])
def calcular_ruta():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400

        # Validar que los archivos de configuración se hayan cargado
        if not PATRONES_ESPECIFICACIONES:
            return jsonify({"error": "El archivo de configuración de patrones (patrones.json) no se pudo cargar o está vacío."}), 500
        if not SITE_CONFIG:
            return jsonify({"error": "El archivo de configuración del sitio (site_config.json) no se pudo cargar o está vacío."}), 500
        if not EMTS_CONFIG:
            return jsonify({"error": "El archivo de configuración de EMT (emts.json) no se pudo cargar o está vacío."}), 500

        # Inyectar las especificaciones de los patrones (ahora vacío, pero no importa por el hardcode)
        data['especificaciones_patrones'] = PATRONES_ESPECIFICACIONES
        data['site_config'] = SITE_CONFIG
        data['emts_config'] = EMTS_CONFIG

        # Validación de estructura más robusta
        required_keys = ['constantes', 'entradas_generales', 'aforo1', 'aforo2', 'aforo3']
        if not all(key in data for key in required_keys):
             return jsonify({"error": "Estructura de datos incompleta. Faltan claves principales."}), 400

        # --- INICIO: Bloque de validación para la nueva calculadora ---
        if data.get('entradas_generales', {}).get('debug_mode', False):
            print("\n--- VALIDACIÓN CALCULADORA PARALELA ---")

            def comparar_valores(calculado, objetivo, tolerancia=1e-5):
                """Función auxiliar para comparar valores y mostrar un estado visual."""
                if abs(calculado - objetivo) < tolerancia:
                    return "✅ [OK]"
                else:
                    return f"❌ [MISMATCH]"

            try:
                # --- PASOS 1-5: VALIDACIÓN DE DENSIDAD DE AGUA Y SU INCERTIDUMBRE ---
                aforo1_data = data['aforo1']
                constantes_frontend = data['constantes']
                promedios_ambientales_original = calculadora.corregir_y_promediar_condiciones(
                    aforo1_data['mediciones_ambientales'], constantes_frontend
                )
                temp_agua_para_calculo = promedios_ambientales_original['temp_agua']

                # PASO 1
                print("\n--- PASO 1: Densidad del Agua (ρA) ---")
                objetivo_densidad = 998.37332066
                rho_agua_nueva = calculadora_nueva.calcular_densidad_agua_tanaka(temp_agua_para_calculo, constantes_frontend)
                print(f"  Calculado: {rho_agua_nueva:.8f}")
                print(f"  Objetivo:  {objetivo_densidad:.8f} {comparar_valores(rho_agua_nueva, objetivo_densidad)}")

                # PASO 2
                print("\n--- PASO 2: Incertidumbre de Temperatura (u_tₐ) ---")
                objetivo_u_temp = 0.06454972
                u_res_term = 0.1 / math.sqrt(12)
                u_cal_term = 0.1 / 2
                u_deriva_term = 0.05 / math.sqrt(3)
                incertidumbre_temp = calculadora_nueva.calcular_incertidumbre_temperatura(u_res_term, u_cal_term, u_deriva_term)
                print(f"  Calculado: {incertidumbre_temp:.8f}")
                print(f"  Objetivo:  {objetivo_u_temp:.8f} {comparar_valores(incertidumbre_temp, objetivo_u_temp)}")

                # PASO 3
                print("\n--- PASO 3: Coef. Sensibilidad Temp. (∂ρA/∂tₐ) ---")
                objetivo_coef_sens_temp = -0.2236
                coef_sens_temp = calculadora_nueva.calcular_coef_sensibilidad_temp_agua()
                print(f"  Calculado: {coef_sens_temp:.4f}")
                print(f"  Objetivo:  {objetivo_coef_sens_temp:.4f} {comparar_valores(coef_sens_temp, objetivo_coef_sens_temp)}")

                # PASO 4
                print("\n--- PASO 4: Incertidumbre de Constantes Tanaka ---")
                objetivo_u_constantes = 4.15e-4
                u_constantes = calculadora_nueva.calcular_incertidumbre_constantes_tanaka()
                print(f"  Calculado: {u_constantes:.2e}")
                print(f"  Objetivo:  {objetivo_u_constantes:.2e} {comparar_valores(u_constantes, objetivo_u_constantes)}")

                # PASO 5
                print("\n--- PASO 5: Incertidumbre Total de Densidad del Agua u(ρA) ---")
                objetivo_u_rho_agua = 0.01443927
                u_rho_agua_final = calculadora_nueva.calcular_u_densidad_agua(incertidumbre_temp, coef_sens_temp, u_constantes)
                print(f"  Calculado: {u_rho_agua_final:.8f}")
                print(f"  Objetivo:  {objetivo_u_rho_agua:.8f} {comparar_valores(u_rho_agua_final, objetivo_u_rho_agua)}")

                # --- PASO 6: Validar la densidad del aire ---
                print("\n--- PASO 6: Densidad del Aire (ρ_a) ---")
                # Obtenemos el valor objetivo calculándolo con la lógica original para una comparación real
                factores_originales = calculadora.calcular_factores_de_correccion(promedios_ambientales_original, constantes_frontend)
                objetivo_rho_aire = factores_originales['rho_aire']
                rho_aire_nueva = calculadora_nueva.calcular_densidad_aire_cipm(
                    promedios_ambientales_original['temp_amb'],
                    promedios_ambientales_original['presion'],
                    promedios_ambientales_original['humedad'],
                    constantes_frontend
                )
                print(f"  Calculado: {rho_aire_nueva:.8f}")
                print(f"  Objetivo:  {objetivo_rho_aire:.8f} {comparar_valores(rho_aire_nueva, objetivo_rho_aire)}")

                # --- PASO 7: Validar la incertidumbre de la densidad del aire ---
                print("\n--- PASO 7: Incertidumbre de la Densidad del Aire u(ρ_a) ---")
                # El código original usa una fórmula directa, la replicamos para el objetivo
                objetivo_u_rho_aire = math.sqrt(1.9688e-6 + (0.0004 * promedios_ambientales_original['temp_amb'])**2)
                u_rho_aire_nueva = calculadora_nueva.calcular_u_densidad_aire(promedios_ambientales_original['temp_amb'])
                print(f"  Calculado: {u_rho_aire_nueva:.8f}")
                print(f"  Objetivo:  {objetivo_u_rho_aire:.8f} {comparar_valores(u_rho_aire_nueva, objetivo_u_rho_aire)}")

                # --- PASO FINAL: VALIDACIÓN DE INCERTIDUMBRE COMBINADA (u_c) ---
                print("\n" + "="*50)
                print("--- NUEVO ENFOQUE: VALIDACIÓN DE INCERTIDUMBRE COMBINADA (u_c) ---")
                print("="*50)

                datos_patron = {
                    'resolucion_g': 0.0001,
                    'incertidumbre_max_g': 0.00032,
                    'excentricidad_max_g': 0.0002
                }
                datos_medicion = {
                    'volumen_promedio_m3': 2.0082E-09,
                    'masa_promedio_kg': 0.0000020029,
                    'u_repetibilidad_m3': 1.3376E-11,
                    'u_resolucion_instrumento_m3': 5.7735E-12
                }

                u_res_bal = calculadora_nueva.calcular_u_resolucion_balanza(datos_patron['resolucion_g'])
                u_cal_bal = calculadora_nueva.calcular_u_calibracion_balanza(datos_patron['incertidumbre_max_g'])
                u_exc_bal = calculadora_nueva.calcular_u_excentricidad_balanza(datos_patron['excentricidad_max_g'])

                c_masa = calculadora_nueva.calcular_c_masa(datos_medicion['volumen_promedio_m3'], datos_medicion['masa_promedio_kg'])

                u_y_res_bal = c_masa * u_res_bal
                u_y_cal_bal = c_masa * u_cal_bal
                u_y_exc_bal = c_masa * u_exc_bal
                u_y_rep = datos_medicion['u_repetibilidad_m3']
                u_y_res_inst = datos_medicion['u_resolucion_instrumento_m3']

                lista_contribuciones = [u_y_res_bal, u_y_cal_bal, u_y_exc_bal, u_y_rep, u_y_res_inst]

                u_c_calculada_m3 = calculadora_nueva.calcular_incertidumbre_combinada(lista_contribuciones)
                u_c_calculada_ul = u_c_calculada_m3 * 1e9
                objetivo_uc = 0.24520

                print(f"\n--- PASO FINAL: Incertidumbre Combinada (u_c) ---")
                print(f"  Calculado (µL): {u_c_calculada_ul:.5f}")
                print(f"  Objetivo (µL):  {objetivo_uc:.5f} {comparar_valores(u_c_calculada_ul, objetivo_uc)}")

            except Exception as e:
                print(f"Error en el bloque de validación: {e}")
                import traceback
                traceback.print_exc()
        # --- FIN: Bloque de validación ---

        resultados_finales = calculadora.procesar_todos_los_aforos(data)

        # Save results for Streamlit dashboard
        with open('results.json', 'w') as f:
            json.dump(resultados_finales, f)

        return jsonify(resultados_finales)

    except (ValueError, TypeError) as e:
        # Errores causados por datos malformados (ej. un string donde se espera un número)
        app.logger.warning(f"Error de datos del cliente: {e}")
        return jsonify({"error": f"Datos inválidos o malformados: {e}"}), 400

    except Exception as e:
        # Log del error en la terminal del servidor usando el logger de Flask
        app.logger.error(f"Error interno no capturado: {e}", exc_info=True)
        return jsonify({"error": "Ocurrió un error interno en el servidor"}), 500

@app.route('/exportar-pdf', methods=['POST'])
def exportar_pdf_ruta():
    try:
        # Recibimos el HTML ya generado por el frontend
        data = request.get_json()
        report_type = data.get('report_type', 'certificado') # 'servicio', 'certificado', 'medidas'
        service_report_html = data.get('service_report_html')
        certificate_html = data.get('certificate_html')
        medidas_html = data.get('medidas_html')
        if not service_report_html or not certificate_html or not medidas_html:
            return jsonify({"error": "No se recibió el contenido HTML para generar el PDF."}), 400

        # Seleccionar el contenido y el nombre de archivo según el tipo de reporte
        if report_type == 'medidas':
            content_html = medidas_html
            file_name = f"Medidas_{datetime.now().strftime('%d%m%Y%H%M%S')}.pdf"
        elif report_type == 'servicio':
            content_html = service_report_html
            file_name = f"Reporte_de_servicio_{datetime.now().strftime('%d%m%Y%H%M%S')}.pdf"
        else: # Por defecto, el certificado
            content_html = certificate_html
            file_name = f"Certificado_{datetime.now().strftime('%d%m%Y%H%M%S')}.pdf"

        # Construir la URL base para los archivos locales en el servidor
        # Esto es mucho más rápido y fiable que usar una URL HTTP.
        base_path = pathlib.Path(os.path.abspath(os.path.dirname(__file__)))
        base_url = base_path.as_uri() + "/"

        # Renderizamos la plantilla principal del PDF con el contenido recibido
        rendered_html = render_template(
            'report_template.html',
            content_html=content_html,
            base_url=base_url,
            report_type=report_type
        )

        # Generamos el PDF con WeasyPrint
        pdf = HTML(string=rendered_html).write_pdf()

        # Creamos la respuesta para que el navegador descargue el archivo
        response = make_response(pdf)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = f'attachment; filename="{file_name}"'
        return response

    except Exception as e:
        app.logger.error(f"Error al generar el PDF: {e}", exc_info=True)
        return jsonify({"error": "Ocurrió un error interno al generar el PDF."}), 500

if __name__ == '__main__':
    # Silenciar completamente el logger por defecto de Flask que escribe en la consola.
    app.logger.handlers.clear()
    
    # Para producción, el modo debug debe estar desactivado.
    # El servidor WSGI de PythonAnywhere se encargará de ejecutar la app.
    app.run(debug=False)
