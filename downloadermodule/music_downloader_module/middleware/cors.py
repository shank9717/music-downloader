from django.utils.deprecation import MiddlewareMixin
 
class CorsMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        response["Acces-Control-Allow-Origin"] = "*"
        return response