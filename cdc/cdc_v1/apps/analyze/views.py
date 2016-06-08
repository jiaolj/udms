# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse
from urls import dir
pubTitle='D-Insight'

def index(req):
    seoTitle=pubTitle
    evt_id = req.GET.get('evt_id','')
    blog_id = req.GET.get('blog_id','')
    if evt_id:
        return render_to_response(dir+'/evt.html',locals())
    if blog_id:
        return render_to_response(dir+'/blog.html',locals())
    
