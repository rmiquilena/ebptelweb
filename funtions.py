from django.http import request
from django.core.mail import send_mail
from django.conf import settings


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


def SendEmail(title, correo, solicitud):
        
    titulo  = title
    msg_html = "Estimado(a):  " + correo + ","
    msg_html+= "\n\n"
    msg_html+= " Su número de Solicitud es: " +  solicitud
    msg_html+= "\n\n"
    email = correo
    
    send_mail(
        titulo,
        msg_html,
            settings.EMAIL_HOST_USER,
            [email],
                    fail_silently=False
    )  


