from django.conf.urls import patterns,url
dir = 'monitor'
urlpatterns = patterns('apps.'+dir+'.views',
    url(r'^$', 'index', name='index'),
    url(r'^getjson/$', 'getjson', name='getjson'),
)