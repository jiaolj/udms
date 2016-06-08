# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
pubTitle='D-Insight'

def index(req):
    seoTitle=pubTitle
    index=1
    return HttpResponseRedirect('/monitor/')
    #return render_to_response('index.html',locals())
