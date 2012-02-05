#!/usr/bin/env python
 
import os
import os.path
import sys

import subprocess
import select
#TODO this requires python3, should make it so it works in both
from http.server import HTTPServer, SimpleHTTPRequestHandler

#assuming we're in project root
os.chdir('pub')

def make():
    print(subprocess.call('jake', cwd='..'))
    has_changed() # we know it just changed, so ignore this one

httpd = HTTPServer(('', 8000), SimpleHTTPRequestHandler)
print('serving at port 8000')

last_changed = 0
def has_changed():
    old_time = last_changed
    last_changed = os.path.getmtime('.')
    return old_time < last_changed

while True:
    ready, _, _ = select.select([httpd, sys.stdin], [], [])
    for f in ready:
        if f == httpd:
            # have a server request
            if has_changed():
                # rebuild js
                make()
            httpd.handle_request()
        elif f == sys.stdin:
            cmd = sys.stdin.readline().strip()
            print(cmd)
            if cmd in ['r','']:
                print('Forcing make')
                make()
            elif cmd in ['q', 'quit', 'exit']:
                print('Quitting')
                break


