"""
Test Google Earth Engine connection and authentication
"""
import os
from dotenv import load_dotenv
import ee

load_dotenv()

print("=" * 60)
print("Testing Google Earth Engine Connection")
print("=" * 60)

# Get project ID from env
project_id = os.getenv('GEE_PROJECT_ID')
print(f"\n1. Project ID from .env: {project_id}")

# Check credentials file
credentials_path = os.path.expanduser('~/.config/earthengine/credentials')
print(f"\n2. Credentials file exists: {os.path.exists(credentials_path)}")

# Try to initialize GEE
print("\n3. Attempting to initialize GEE...")
try:
    if project_id:
        ee.Initialize(project=project_id)
        print(f"   ✅ GEE initialized successfully with project: {project_id}")
    else:
        ee.Initialize()
        print("   ✅ GEE initialized successfully (no project specified)")
except Exception as e:
    print(f"   ❌ GEE initialization failed: {e}")
    print("\n   Troubleshooting:")
    print("   - Run: earthengine authenticate")
    print(f"   - Run: earthengine set_project {project_id or 'YOUR_PROJECT_ID'}")
    exit(1)

# Try a simple test query
print("\n4. Testing data access with a simple query...")
try:
    # Test with elevation data (SRTM)
    srtm = ee.Image('USGS/SRTMGL1_003')
    point = ee.Geometry.Point([77.1734, 31.1048])  # Shimla, India
    elevation = srtm.sample(point, 30).first().get('elevation').getInfo()
    print(f"   ✅ Successfully fetched elevation: {elevation}m")
    print("   GEE is working correctly!")
except Exception as e:
    print(f"   ❌ Data access failed: {e}")
    print("\n   This might be a project permission issue.")
    print("   Make sure your GEE project has Earth Engine API enabled.")

print("\n" + "=" * 60)
print("Test Complete")
print("=" * 60)
