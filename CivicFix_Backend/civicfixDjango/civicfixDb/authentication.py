from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework import exceptions
from django.utils.translation import gettext_lazy as _

class TokenOnlyAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            return None

        raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
            # Don't look for user; just pass the payload
            return (validated_token.payload, validated_token)
        except InvalidToken as e:
            raise AuthenticationFailed(_('Invalid token.')) from e
