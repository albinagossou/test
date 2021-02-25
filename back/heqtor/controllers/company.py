from heqtor.core import Session
from heqtor.models import User, Company


def create_company(name: str, siren: str, email: str, phone: str, made_by_id: int):
    session = Session()
    try:
        creator = session.query(User).get(made_by_id)
        if creator is None:
            raise Exception("Company creator not found")
        company = Company(name=name, siren=siren, email=email, phone=phone)
        session.add(company)
        session.query(Company).filter(
            Company.siren == siren,
        ).one()  # update company instance with id from database
        creator.company_id = company.id
        session.commit()
        return company.get_small_data()
    except:
        session.rollback()
        return False
    finally:
        session.close()

   
# TODO
# get company by id, delete company

def get_company_by_id(company_id: int):
    session = Session()
    company = session.query(Company).get(company_id)
    if company is not None:
        company = company.get_small_data()
    session.close()
    return company

def update_company_data(company_id: int, phone: str = None):
    session = Session()
    try:
        company = session.query(Company).get(company_id)
        if phone is not None:
            company.phone = phone
        session.commit()
        return company.get_small_data()
    except:
        session.rollback()
        return False
    finally:
        session.close()

def delete_company(company_id: int):
    session = Session()
    try:
        company = session.query(Company).get(company_id)
        session.delete(company)
        session.commit()
        return True
    except:
        session.rollback()
        return False
    finally:
        session.close()

def get_all_companies():
    session = Session()
    companies = [company.get_small_data() for company in session.query(Company).all()]
    session.close()
    return companies

def get_all_users_from_company(company_id: int):
    session = Session()
    users = [user.get_small_data() for user in session.query(User).filter(User.company_id == company_id).all()]
    session.close()
    return users
    
def add_user_to_company(user_id: int, company_id: int):
    session = Session()
    user = session.query(User).get(user_id)
    if user.company_id is not None:
        session.close()
        return False
    user.company_id = company_id
    session.commit()
    session.close()
    
def remove_user_from_company(user_id: int, company_id: int):
    session = Session()
    user = session.query(User).get(user_id)
    if user.company_id != company_id:
        session.close()
        return False
    user.company_id = None
    session.commit()
    session.close()
    return True





