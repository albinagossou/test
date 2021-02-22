from sqlalchemy import Column, String

from .base import Base, IdPkMixin


class Company(Base, IdPkMixin):
    def get_small_data(User):
        b = super().get_small_data()
        if User.company is not None:
            b['users_qty'] = User.company.users
        return b
    name = Column(String(35), nullable=False)
    siren = Column(String(9), unique=True, nullable=False)
    email = Column(String(50), nullable=False)
    phone = Column(String(13), nullable=False)

 
#return admin name
def admin_name():
    pass 