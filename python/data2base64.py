#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
 本脚本支持直接将所有文件直接拖拽到
 本脚本的图标上执行并生成文件的base64编码
"""

import sys
import base64

for i in xrange(1, len(sys.argv)):
  fsname = sys.argv[i]
  
  f1 = open(fsname, 'rb')
  s = f1.read()
  f1.close()

  f2 = open(fsname + '.b64', 'w')
  f2.write(base64.b64encode(s))
  f2.close()
