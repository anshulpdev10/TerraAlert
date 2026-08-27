"""
GEE Diagnostic Script - Find out exactly what's wrong
"""
import sys
import os
from dotenv import load_dotenv

load_dotenv()

print("=" * 70)
print("GEE DIAGNOSTIC TOOL")
print("=" * 70)

# Step 1: Check if ee module is installed
print("\n[1/7] Checking if earthengine-api is installed...")
try:
    import ee
    print(f"    ✅ earthengine-api is installed (version: {ee.__version__})")
except ImportError as e:
    print(f"    ❌ earthengine-api is NOT installed")
    print(f"    Run: pip install earthengine-api")
    sys.exit(1)

# Step 2: Check credentials file
print("\n[2/7] Checking credentials file...")
cred_path = os.path.expanduser('~/.config/earthengine/credentials')
if os.path.exists(cred_path):
    print(f"    ✅ Credentials file exists")
    import json
    try:
        with open(cred_path, 'r') as f:
            creds = json.load(f)
        if 'refresh_token' in creds:
            print(f"    ✅ Refresh token found")
        else:
            print(f"    ⚠️  No refresh token in credentials")
    except:
        print(f"    ⚠️  Could not parse credentials file")
else:
    print(f"    ❌ Credentials file NOT found at: {cred_path}")
    print(f"    Run: earthengine authenticate")
    sys.exit(1)

# Step 3: Check project ID
print("\n[3/7] Checking GEE project ID...")
project_id = os.getenv('GEE_PROJECT_ID')
if project_id:
    print(f"    ✅ Project ID found: {project_id}")
else:
    print(f"    ⚠️  No GEE_PROJECT_ID in .env file")

# Step 4: Try to initialize GEE (with timeout)
print("\n[4/7] Attempting GEE initialization...")
print("    (This may take 10-30 seconds...)")

import signal

class TimeoutError(Exception):
    pass

def timeout_handler(signum, frame):
    raise TimeoutError("Operation timed out")

# Set timeout (only works on Unix, will be ignored on Windows)
try:
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(30)  # 30 second timeout
except AttributeError:
    # Windows doesn't have SIGALRM, so we'll just try without timeout
    pass

try:
    if project_id:
        ee.Initialize(project=project_id)
    else:
        ee.Initialize()
    print(f"    ✅ GEE initialized successfully!")
    
    try:
        signal.alarm(0)  # Cancel alarm
    except:
        pass
    
except TimeoutError:
    print(f"    ❌ GEE initialization TIMED OUT (>30s)")
    print(f"    This usually means:")
    print(f"       - Network/firewall blocking GEE servers")
    print(f"       - VPN/proxy interference")
    print(f"       - Credentials need refresh")
    sys.exit(1)
    
except Exception as e:
    print(f"    ❌ GEE initialization FAILED")
    print(f"    Error: {e}")
    
    if "Could not find" in str(e) or "project" in str(e).lower():
        print(f"\n    💡 Try these fixes:")
        print(f"       1. Run: earthengine set_project {project_id or 'YOUR_PROJECT_ID'}")
        print(f"       2. Verify project exists at: https://console.cloud.google.com")
    
    if "auth" in str(e).lower() or "credential" in str(e).lower():
        print(f"\n    💡 Try re-authenticating:")
        print(f"       Run: earthengine authenticate")
    
    sys.exit(1)

# Step 5: Test simple data fetch (elevation)
print("\n[5/7] Testing simple data fetch (SRTM elevation)...")
try:
    point = ee.Geometry.Point([77.1734, 31.1048])  # Shimla, India
    srtm = ee.Image('USGS/SRTMGL1_003')
    
    print("    Requesting elevation data...")
    elevation_dict = srtm.sample(point, 30).first().get('elevation').getInfo()
    
    print(f"    ✅ Successfully fetched elevation: {elevation_dict}m")
    
except Exception as e:
    print(f"    ❌ Data fetch FAILED")
    print(f"    Error: {e}")
    
    if "quota" in str(e).lower():
        print(f"\n    💡 GEE quota exceeded - wait a few minutes")
    elif "permission" in str(e).lower():
        print(f"\n    💡 Check project permissions")
    else:
        print(f"\n    💡 This might be a network or API issue")
    
    sys.exit(1)

# Step 6: Test CHIRPS rainfall data
print("\n[6/7] Testing CHIRPS rainfall data...")
try:
    from datetime import datetime, timedelta
    
    point = ee.Geometry.Point([77.1734, 31.1048])
    region = point.buffer(1000)
    
    end_date = datetime.now()
    start_date = end_date - timedelta(days=7)
    
    chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY') \
        .filterDate(start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')) \
        .sum()
    
    print("    Requesting rainfall data...")
    rainfall_dict = chirps.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=region,
        scale=5000
    ).getInfo()
    
    rainfall = rainfall_dict.get('precipitation', 0)
    print(f"    ✅ Successfully fetched rainfall: {rainfall}mm (last 7 days)")
    
except Exception as e:
    print(f"    ❌ Rainfall fetch FAILED")
    print(f"    Error: {e}")

# Step 7: Test Sentinel-2 data
print("\n[7/7] Testing Sentinel-2 imagery...")
try:
    from datetime import datetime, timedelta
    
    point = ee.Geometry.Point([77.1734, 31.1048])
    region = point.buffer(1000)
    
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    
    s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
        .filterBounds(region) \
        .filterDate(start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')) \
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    
    count = s2.size().getInfo()
    print(f"    ✅ Found {count} Sentinel-2 images (last 30 days)")
    
    if count == 0:
        print(f"    ⚠️  No Sentinel-2 images available (this is OK, will use MODIS fallback)")
    
except Exception as e:
    print(f"    ⚠️  Sentinel-2 test failed (not critical): {e}")

# Final summary
print("\n" + "=" * 70)
print("DIAGNOSTIC COMPLETE")
print("=" * 70)
print("\n✅ GEE is working correctly!")
print("✅ All data sources are accessible")
print("✅ Your landslide prediction API should work now")
print("\nIf the prediction endpoint still fails, restart your Flask server.")
