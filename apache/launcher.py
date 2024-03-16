import multiprocessing
import os

env = dict(os.environ)
debug = bool(int(env.get("DEBUG", "0")))

args = ["apache2ctl", "-D", "FOREGROUND"]
if debug:
    args.extend(("-D", "PY_DEBUG"))
    env["WSGI_THREADS"] = "1"
else:
    procs = max(1, min(8, multiprocessing.cpu_count()))
    env["WSGI_PROCESSES"] = str(procs)
    env["WSGI_THREADS"] = "4"

os.execvpe("apache2ctl", args, env)