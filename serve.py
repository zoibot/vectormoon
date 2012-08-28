#!/usr/bin/env python
 
import os
import os.path
import sys

import subprocess
import select
try:
    # python 3
    from http.server import HTTPServer, SimpleHTTPRequestHandler
except:
    # python 2
    from BaseHTTPServer import HTTPServer
    from SimpleHTTPServer import SimpleHTTPRequestHandler

#assuming we're in project root
os.chdir('pub')

is_win = sys.platform == 'win32'

def make():
    print(subprocess.call('jake', cwd='..', shell=is_win))
    has_changed() # we know it just changed, so ignore this one

httpd = HTTPServer(('', 8000), SimpleHTTPRequestHandler)
print('serving at port 8000')

last_changed = 0
def has_changed():
    global last_changed
    old_time = last_changed
    last_changed = os.path.getmtime('.')
    return old_time < last_changed

inputs = [httpd, sys.stdin]
# work around broken select on windows
if is_win:
    inputs = [httpd]
while True:
    ready, _, _ = select.select(inputs, [], [])
    for f in ready:
        if f == httpd:
            # have a server request
            if has_changed():
                # rebuild js
                make()
            httpd.handle_request()
        elif f == sys.stdin:
            cmd = sys.stdin.readline().strip()
            if cmd in ['r','']:
                print('Forcing make')
                make()
            elif cmd in ['q', 'quit', 'exit']:
                print('Quitting')
                break

