from django.conf.urls import patterns,url
dir = 'analyze'
urlpatterns = patterns('apps.'+dir+'.views',
    url(r'^$', 'index', name='index'),
    url(r'^getCentList/$', 'getCentList', name='getCentList'),
)