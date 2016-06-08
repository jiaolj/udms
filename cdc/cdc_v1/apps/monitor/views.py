# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse
from apps.tools.utils import to_json
from urls import dir
import urllib,json
pubTitle='D-Insight'

def index(req):
    seoTitle = pubTitle
    return render_to_response(dir+'/index.html',locals())

#def getjson(req):
#    parid = req.GET.get('parid')
#    cnt = urllib.urlopen('http://10.13.93.252:8081/concept?parid='+parid).read()
#    return to_json(json.loads(cnt))
