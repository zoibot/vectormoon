#!/usr/bin/env python2

import cgi
import sys
import json
import os

maps = os.listdir('../maps/')
filtered_maps = [map[:-5] for map in maps if map[-5:] == '.json']

print 'Content-type: text/json\n'
print json.dumps(filtered_maps)

