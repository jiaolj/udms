# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse
from urls import dir
pubTitle='D-Insight'

def index(req):
    seoTitle=pubTitle
    return render_to_response(dir+'/index.html',locals())
