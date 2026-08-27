"""
Fixed GEE Test - Tests the actual get_all_features method
Uses coordinates in India (Shimla) where landslide data is more relevant
"""
from services.gee_service import GEEService
from utils.data_processor import DataProcessor
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

print("=" * 70)
print("TESTING GOOGLE EARTH ENGINE CONNECTION")
print("=" * 70)

# Get project ID
project_id = os.getenv('GEE_PROJECT_ID')
print(f"\n1. GEE Project ID: {project_id}")

# Initialize GEE service
print("\n2. Initializing GEE Service...")
gee = GEEService(project_id=project_id)

# Initialize data processor
processor = DataProcessor()

# Test coordinates - Shimla, Himachal Pradesh (landslide-prone area)
lat = 31.1048
lon = 77.1734
location_name = "Shimla, Himachal Pradesh, India"

print(f"\n3. Test Location: {location_name}")
print(f"   Coordinates: {lat}, {lon}")

# Date range (last 30 days)
end_date = datetime.now()
start_date = end_date - timedelta(days=30)

print(f"\n4. Date Range:")
print(f"   Start: {start_date.strftime('%Y-%m-%d')}")
print(f"   End: {end_date.strftime('%Y-%m-%d')}")

print("\n" + "=" * 70)
print("FETCHING GEE DATA...")
print("=" * 70)

# Fetch all features (this is what the API actually uses)
try:
    print("\nCalling gee.get_all_features()...")
    data = gee.get_all_features(
        lat=lat,
        lon=lon,
        start_date=start_date.strftime('%Y-%m-%d'),
        end_date=end_date.strftime('%Y-%m-%d'),
        buffer=1000
    )
    
    if data:
        print("\n" + "=" * 70)
        print("✅ SUCCESS! GEE DATA FETCHED")
        print("=" * 70)
        
        print("\n📊 RAW GEE FEATURES:")
        print("-" * 70)
        for key, value in data.items():
            print(f"  {key:20} : {value}")
        
        # Process data for model
        print("\n" + "=" * 70)
        print("PROCESSING DATA FOR MODEL...")
        print("=" * 70)
        
        processed = processor.prepare_model_input(data)
        
        if processed:
            print("\n✅ DATA PROCESSED SUCCESSFULLY!")
            print("\n📈 MODEL INPUT:")
            print("-" * 70)
            print(f"\nFeature Names ({len(processed['feature_names'])}):")
            for i, name in enumerate(processed['feature_names']):
                print(f"  {i+1}. {name}")
            
            print(f"\nFeature Values ({len(processed['features'])}):")
            for i, (name, value) in enumerate(zip(processed['feature_names'], processed['features'])):
                print(f"  {name:20} : {value}")
            
            print("\n" + "=" * 70)
            print("✅ ALL TESTS PASSED!")
            print("=" * 70)
            print("\n✓ GEE is working correctly")
            print("✓ Data can be fetched and processed")
            print("✓ Ready for landslide predictions")
        else:
            print("\n❌ FAILED: Data processing failed")
            print("The data was fetched but couldn't be processed for the model")
    else:
        print("\n" + "=" * 70)
        print("❌ FAILED: NO DATA RETURNED")
        print("=" * 70)
        print("\n⚠️  GEE returned None - Possible causes:")
        print("  1. Authentication issue")
        print("  2. Network connectivity problem")
        print("  3. Data not available for this location/date")
        print("  4. GEE API quota exceeded")
        print("\n🔧 Troubleshooting steps:")
        print("  1. Run: earthengine authenticate")
        print("  2. Run: earthengine set_project gee-integration-geosafe")
        print("  3. Check: https://console.cloud.google.com/apis/library/earthengine.googleapis.com")
        print("     Make sure Earth Engine API is ENABLED")
        
except Exception as e:
    print("\n" + "=" * 70)
    print("❌ ERROR OCCURRED")
    print("=" * 70)
    print(f"\nError Type: {type(e).__name__}")
    print(f"Error Message: {e}")
    
    import traceback
    print("\nFull Traceback:")
    print("-" * 70)
    print(traceback.format_exc())
    
    print("\n🔧 Troubleshooting:")
    print("  1. Check if GEE is authenticated: earthengine authenticate")
    print("  2. Set project: earthengine set_project gee-integration-geosafe")
    print("  3. Verify internet connection")
    print("  4. Check Flask backend console for more details")

print("\n" + "=" * 70)
print("TEST COMPLETE")
print("=" * 70)
