import sys
import re
import json

data = open(sys.argv[1]).read()
translate = map(float, re.search('translate\((.*),(.*)\)', data).groups())
point_data = re.search('d="m (.*) z"', data).groups()[0].split()
points = []
current_point = translate
for raw_point in point_data:
    delta = map(float, raw_point.split(','))
    current_point = (current_point[0]+delta[0]),(current_point[1]+delta[1])
    points.append(current_point)
output = {}
output['type'] = 'Polygon'
output['animations'] = {}
output['animations']['default'] = [points]

print json.dumps(output)

