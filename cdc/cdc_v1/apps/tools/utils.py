from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
import json

def to_json(data):
    return HttpResponse(json.dumps(data, cls=DjangoJSONEncoder), content_type='application/json')