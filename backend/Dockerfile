FROM python:3.10.13-alpine3.18
EXPOSE 5000
WORKDIR /app
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD [ "flask", "run", "--host", "0.0.0.0" ]

# docker run -dt --name cont --rm -p 5000:5000 pydev