# How to Fix GEE Integration

## Problem Identified

GEE initialization is **timing out**. This means:
- ✅ earthengine-api is installed
- ✅ Credentials file exists  
- ❌ GEE cannot connect to Google servers (timeout)

## Solution Steps

### Step 1: Re-authenticate GEE

Open a **new PowerShell terminal** (not VS Code terminal) and run:

```powershell
earthengine authenticate
```

This will:
1. Open your browser
2. Ask you to log in with Google
3. Generate new credentials

**Important:** Make sure you're logged in with the same Google account that has access to the `gee-integration-geosafe` project.

### Step 2: Set Project ID

After authentication, set your project:

```powershell
earthengine set_project gee-integration-geosafe
```

### Step 3: Verify Earth Engine API is Enabled

1. Go to: https://console.cloud.google.com/apis/library/earthengine.googleapis.com
2. Select project: `gee-integration-geosafe`
3. Make sure it says **"API Enabled"** (green checkmark)
4. If not, click **"ENABLE"**

### Step 4: Test the Fix

Run the diagnostic again:

```powershell
cd backend
python diagnose_gee.py
```

It should complete all 7 steps successfully.

### Step 5: Restart Flask Server

After GEE is working:
1. Stop your Flask server (Ctrl+C)
2. Restart it: `python app.py`
3. Test the prediction endpoint

---

## Alternative: Use Mock Data (Temporary Workaround)

If re-authentication doesn't work or you want to test the app immediately, you can use mock data:

### Enable Mock Mode

1. Open: `backend/services/gee_service.py`

2. Add this at the top of the `get_all_features` method (around line 20):

```python
def get_all_features(self, lat: float, lon: float, start_date: str, end_date: str, buffer: int = 1000) -> Optional[Dict]:
    """..."""
    
    # TEMPORARY: Use mock data while fixing GEE
    import random
    print("⚠️  Using MOCK GEE data (GEE integration disabled)")
    return {
        'soil_type': random.randint(1, 5),
        'ndvi': round(random.uniform(0.2, 0.8), 2),
        'ndwi': round(random.uniform(-0.3, 0.1), 2),
        'rainfall_3d': round(random.uniform(0, 50), 1),
        'rainfall_7d': round(random.uniform(10, 100), 1),
        'rainfall_14d': round(random.uniform(20, 200), 1),
        'rainfall_30d': round(random.uniform(50, 400), 1),
        'elevation': round(random.uniform(200, 3000), 1),
        'slope': round(random.uniform(5, 45), 1),
        'aspect': round(random.uniform(0, 360), 1)
    }
    
    # Original code continues below...
    try:
        point = ee.Geometry.Point([lon, lat])
        # ... rest of code
```

3. Restart Flask server

4. Test prediction - it will work with realistic mock data

5. **Remove the mock code** after fixing real GEE integration

---

## Common Issues

### Issue: "earthengine: command not found"

**Fix:** Reinstall earthengine-api:
```powershell
pip install --upgrade earthengine-api
```

### Issue: Authentication hangs forever

**Fix:** 
1. Close browser
2. Try in incognito/private window
3. Or use: `earthengine authenticate --authorization-code-flow`

### Issue: "Project not found"

**Fix:**
1. Go to: https://console.cloud.google.com/projectselector2
2. Verify `gee-integration-geosafe` exists
3. If not, create a new project or use a different project name

### Issue: Still timing out after re-auth

**Possible causes:**
- Corporate/school network blocking Google APIs
- VPN interference
- Firewall blocking ports

**Fix:**
1. Try different network (mobile hotspot, home WiFi)
2. Disable VPN temporarily
3. Check firewall settings
4. Or use mock data temporarily (see above)

---

## Quick Test Commands

### Test authentication:
```powershell
earthengine authenticate --quiet
```

### Test GEE access:
```powershell
python -c "import ee; ee.Initialize(); print('GEE OK')"
```

### Test prediction endpoint:
```powershell
curl -X POST http://localhost:5000/api/predict -H "Content-Type: application/json" -d '{\"lat\": 31.1048, \"lon\": 77.1734}'
```

---

## Next Steps

1. **Try re-authentication first** (Steps 1-4 above)
2. **If that doesn't work**, use mock data temporarily
3. **Test your Flask app** to make sure everything else works
4. **Debug GEE network issues** (try different network, check firewall)

Need help with any of these steps? Let me know!
