import sys
import re
import json

data = open(sys.argv[1]).read()
translate_text = re.search('translate\((.*),(.*)\)', data)
translate = map(float, translate_text.groups()) if translate_text else [0.0,0.0]
point_data = re.search(' d="(.*)"', data).groups()[0].split()
points = []
absolute = False
current_point = translate
for raw_point in point_data:
    if len(raw_point) > 1:
        delta = map(float, raw_point.split(','))
        if absolute:
            current_point = (delta[0], delta[1])
        else:
            current_point = (current_point[0]+delta[0]),(current_point[1]+delta[1])
        points.append(current_point)
    else:
        if raw_point in 'ML': 
            absolute = True
        if raw_point in 'ml': 
            absolute = False

output = {}
output['type'] = 'graphics.polygon'
output['animations'] = {}
output['animations']['default'] = [points]

print json.dumps(output)

