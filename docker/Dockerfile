# https://github.com/turbot/steampipe/issues/209#issuecomment-782885225

FROM ubuntu

ARG USER=steampipe

RUN apt-get update && \
    apt-get install -y curl less && \
    useradd -ms /bin/bash $USER

RUN /bin/sh -c "$(curl -fsSL https://raw.githubusercontent.com/turbot/steampipe/main/install.sh)"

USER $USER
WORKDIR /home/$USER

RUN steampipe plugin install steampipe aws github

ENTRYPOINT [ "/usr/local/bin/steampipe" ]

CMD [ "query" ]