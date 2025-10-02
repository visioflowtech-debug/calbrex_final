import streamlit as st
import json

st.title("Calibration Dashboard")

try:
    with open('results.json', 'r') as f:
        results = json.load(f)
    st.json(results)
except FileNotFoundError:
    st.write("No results available. Please perform a calculation first.")
