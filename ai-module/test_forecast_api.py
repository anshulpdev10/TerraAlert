import requests
import time

API_KEY = "***REMOVED***"
lat, lon = 30.0668, 79.0193

url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"

print("Testing API key activation...")
response = requests.get(url)
print("Status:", response.status_code)

if response.status_code == 200:
    data = response.json()
    print("✅ API KEY WORKS!")
    print(f"Got {len(data['list'])} forecasts")
else:
    print("Response:", response.json())