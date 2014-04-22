#!/usr/bin/env python2

import cgi
import sys
import json
import re

form = cgi.FieldStorage()
scale = float(form.getfirst('scale', '1'))
xoff = int(form.getfirst('xoff', '0'))
yoff = int(form.getfirst('yoff', '0'))
fle = form.getfirst('file')
if not re.match('[A-Za-z_]*\.json', fle):
    print 'failure invalid filename'
    sys.exit(1)
file = '../gfx/' + fle 

print 'Content-Type: text/html\n\n'

if not file:
    print "No file, quitting"
    sys.exit(1)

animation = 'default'

with open(file) as f:
    polygon = json.load(f)

# remove old scale
if 'scale' in polygon:
    del polygon['scale']

frames = polygon['animations'][animation]
for frame in frames:
    for point in frame:
        point[0] *= scale
        point[0] += xoff
        point[1] *= scale
        point[1] += yoff

with open(file, 'w') as f:
    json.dump(polygon, f)

print 'success'

