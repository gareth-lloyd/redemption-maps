from redemptionmap.settings import *

DEBUG = False

GEOS_LIBRARY_PATH = os.path.join(os.environ.get('GEOS_LIBRARY_PATH', ''), 'libgeos_c.so')
GDAL_LIBRARY_PATH = os.path.join(os.environ.get('GDAL_LIBRARY_PATH', ''), 'libgdal.so')
