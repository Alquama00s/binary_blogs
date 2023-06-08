import multiprocessing

bind = "0.0.0.0:8000"
workers = multiprocessing.cpu_count() * 2 + 1

wsgi_app='backend.wsgi:application'
reload=False
capture_output=True
accesslog='./logs/access.log'
errorlog='./logs/error.log'
loglevel='info'
proc_name='forecast_api_django'
pidfile='./logs/process.pid'