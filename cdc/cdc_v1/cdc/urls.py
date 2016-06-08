from django.conf.urls import patterns, include, url
from settings import STATIC_ROOT

urlpatterns = patterns('apps.views',
    url(r'^$', 'index', name='index'),
    url(r'^monitor/', include('apps.monitor.urls', namespace='monitor')),
    url(r'^analyze/', include('apps.analyze.urls', namespace='analyze')),
    url(r'^report/', include('apps.report.urls', namespace='report')),
)
urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)