from django.conf.urls import patterns,url
#from apps.tools.utils import getDirName
dir = 'report'
urlpatterns = patterns('apps.'+dir+'.views',
    url(r'^$', 'index', name='index'),
    url(r'^getCentList/$', 'getCentList', name='getCentList'),
)