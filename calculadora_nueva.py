import math

# --- FUNCIONES DE DENSIDAD DE AGUA Y SU INCERTIDUMBRE (Pasos 1-5) ---

def calcular_densidad_agua_tanaka(temp_agua, constantes_tanaka):
    a1 = constantes_tanaka['tanaka_a1']
    a2 = constantes_tanaka['tanaka_a2']
    a3 = constantes_tanaka['tanaka_a3']
    a4 = constantes_tanaka['tanaka_a4']
    a5 = constantes_tanaka['tanaka_a5']
    numerador = ((temp_agua + a1)**2) * (temp_agua + a2)
    denominador = a3 * (temp_agua + a4)
    return a5 * (1 - (numerador / denominador)) + constantes_tanaka.get('CmpA', 0)

def calcular_incertidumbre_temperatura(u_resolucion_termometro, u_calibracion_termometro, u_deriva_termometro):
    u_sq_total = u_resolucion_termometro**2 + u_calibracion_termometro**2 + u_deriva_termometro**2
    return math.sqrt(u_sq_total)

def calcular_coef_sensibilidad_temp_agua():
    return -0.2236

def calcular_incertidumbre_constantes_tanaka():
    return 4.15e-4

def calcular_u_densidad_agua(u_temp, coef_sens_temp, u_constantes):
    """
    Calcula la incertidumbre combinada de la densidad del agua u(ρA).
    """
    contribucion_temp_sq = (coef_sens_temp * u_temp)**2
    contribucion_constantes_sq = u_constantes**2
    return math.sqrt(contribucion_temp_sq + contribucion_constantes_sq)


# --- FUNCIONES DE INCERTIDUMBRE COMBINADA (Nuevo Enfoque) ---

# --- PASO 1: Funciones para los componentes de la Balanza ---

def calcular_u_resolucion_balanza(resolucion_g):
    """Calcula la incertidumbre por resolución de la balanza en Kg."""
    return (resolucion_g / 1000) / math.sqrt(12)

def calcular_u_calibracion_balanza(incertidumbre_max_g):
    """Calcula la incertidumbre por calibración de la balanza en Kg."""
    return (incertidumbre_max_g / 1000) / 2

def calcular_u_excentricidad_balanza(excentricidad_max_g):
    """Calcula la incertidumbre por excentricidad de la balanza en Kg."""
    return (excentricidad_max_g / 1000) / math.sqrt(12)

# --- PASO 2: Función para el Coeficiente de Sensibilidad de la Masa ---

def calcular_c_masa(volumen_promedio_m3, masa_promedio_kg):
    """Calcula el coeficiente de sensibilidad de la masa (con el signo corregido)."""
    if masa_promedio_kg == 0:
        return 0
    return -volumen_promedio_m3 / masa_promedio_kg

# --- PASO FINAL: Función para la Incertidumbre Combinada (u_c) ---

def calcular_incertidumbre_combinada(contribuciones):
    """
    Calcula la incertidumbre combinada a partir de una lista de contribuciones.
    """
    suma_de_cuadrados = sum(c**2 for c in contribuciones)
    return math.sqrt(suma_de_cuadrados)

def calcular_densidad_aire_cipm(temp_aire, presion_hpa, humedad_rel, constantes_aire):
    """
    Calcula la densidad del aire (en kg/m³) usando la fórmula CIPM-2007.
    """
    c = constantes_aire
    # El diccionario de constantes del frontend usa 'rho_aire_o51', etc.
    # Nos aseguramos de usar las claves correctas.
    exp_term = math.exp(c.get('rho_aire_o53', 0) * temp_aire)
    numerador = (c.get('rho_aire_o51', 0) * presion_hpa) - (c.get('rho_aire_o52', 0) * humedad_rel * exp_term)
    denominador = 273.15 + temp_aire
    return numerador / denominador if denominador != 0 else 0

def calcular_u_densidad_aire(temp_amb):
    """
    Calcula la incertidumbre de la densidad del aire.
    """
    # Fórmula basada en el código original: sqrt(1.9688e-6 + (0.0004 * temp_amb)²)
    return math.sqrt(1.9688e-6 + (0.0004 * temp_amb)**2)