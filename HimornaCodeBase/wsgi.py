import sys
import logging
import os
sys.path.insert(0, "")
from api import app


sys.stdout = sys.stderr
logging.basicConfig(stream=sys.stderr)

if os.environ.get("DEBUG", "").strip():
    from werkzeug.debug import DebuggedApplication
    app = DebuggedApplication(app, True)

application = app