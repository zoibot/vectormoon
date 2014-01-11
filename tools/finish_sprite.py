import sys
import json
import argparse

parser = argparse.ArgumentParser(description='Tool for resizing sprites')
parser.add_argument('file', help='sprite to modify')
parser.add_argument('-s', '--scale', type=float, help='scaling factor')
parser.add_argument('-x', '--xoff', type=int, help='x translate')
parser.add_argument('-y', '--yoff', type=int, help='y translate')

args = parser.parse_args()

animation = 'default'

with open(args.file):
    polygon = json.load()

# calculate scale
scale = float(polygon['scale'])
del polygon['scale']
if args.scale:
    scale *= args.scale

# calculate xoff
xoff = args.xoff or 0

# calculate yoff
yoff = args.yoff or 0

frames = polygon['animations'][animation]
for frame in frames:
    for point in frame:
        point[0] *= scale
        point[0] += xoff
        point[1] *= scale
        point[1] += yoff

print json.dumps(polygon)

