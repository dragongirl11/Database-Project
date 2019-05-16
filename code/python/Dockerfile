FROM dtr.it.vt.edu/rquintin/cs4604-proj-java:latest

RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  python3-psycopg2

COPY code/python /app
COPY sql/install.sql /app/sql/schema.sql
COPY sql/load.sql /app/sql/data.sql

WORKDIR /app

RUN pip3 install -r requirements.txt

ENV FLASK_APP app.py
ENV FLASK_DEBUG 1

RUN chmod +x start_flask.sh
ENTRYPOINT ["./start_flask.sh"]
