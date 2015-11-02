#!/usr/bin/env python2

import cgi
import sys
import json
import os

sprites = os.listdir('gfx/')
filtered_sprites = [sprite[:-5] for sprite in sprites if sprite[-5:] == '.json']

print 'Content-type: text/json\n'
print json.dumps(filtered_sprites)

