class NetflixException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class AuthException(NetflixException):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class UserException(NetflixException):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class ProfileException(NetflixException):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)