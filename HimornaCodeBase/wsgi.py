import sys
import logging
import os
sys.path.insert(0, "")
from api import app

sys.stdout = sys.stderr
logging.basicConfig(stream=sys.stderr)

if os.environ.get("DEBUG", "").strip() == "1":
    print("LAUNCHED IN DEBUG MODE")
    app.debug = True
    from werkzeug.debug import DebuggedApplication
    app = DebuggedApplication(app, evalex=True, pin_security=False, pin_logging=False)

application = app